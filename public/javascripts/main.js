(function () {
	var socket = io();
	var toggleButton = document.querySelector('.toggle');
	var shutdownButton = document.getElementById('shutdown');
	var cancelShudownButton = document.getElementById('cancelShudown');
	var numberDelay = document.getElementById('numberTimeOut');
	var timeOptions = document.getElementById('timeOptions');
	var wb_incandescent = document.getElementById('wb_incandescent');
	var $timeOptions = $('#timeOptions');
	var statusApplication = { isOn : false, timeSleep: false };
	var buttonStatus = false;

	socket.on('toggleAllClients', toggleRender);
	socket.on('shutdownAllClients',shutdownRender);
	socket.on('statusApp',statusAppRender);

	toggleButton.addEventListener('click', function(){
		if(this.classList.contains('active')){
			this.classList.remove('active');
		wb_incandescent.classList.remove('animation-ligth');
			buttonStatus = false;
		}else{
			this.classList.add('active');
			wb_incandescent.classList.add('animation-ligth');
			buttonStatus = true
		}
		statusApplication.isOn = buttonStatus;
		socket.emit('toggleClient', statusApplication);
	});

	shutdownButton.addEventListener('click',function (event) {
		var valueTimeOptions = timeOptions.options[timeOptions.selectedIndex].value;
		console.log(valueTimeOptions);
		event.preventDefault();
		if (valueTimeOptions === '0' || numberDelay.value == '') {
			numberDelay.focus();
			return false;
		}
		var data = { 
			delay: numberDelay.value, 
			option: valueTimeOptions,
			isOn: statusApplication.isOn,
			timeSleep: !statusApplication.timeSleep
		};
		socket.emit('shutdownClient',data);
		console.log(numberDelay.value);
		console.log(valueTimeOptions);
		numberDelay.disabled = true;
		shutdownButton.classList.add('disabled');
		timeOptions.disabled = true;
		$timeOptions.material_select();
		cancelShudownButton.disabled = false;
	});

	cancelShudownButton.addEventListener('click',function (event) {
		event.preventDefault();
		socket.emit('cancelShutdownClient');
	});

	function toggleRender(data) {
		if (data.isOn) {
			toggleButton.classList.add('active');
			wb_incandescent.classList.add('animation-ligth');
		}else{
			toggleButton.classList.remove('active');	
			wb_incandescent.classList.remove('animation-ligth');
		}
	}	

	function shutdownRender(data){
		console.log('Hola desde shutdownRender',data);
		if (data.isPong) {
			console.log('Hola')
			numberDelay.disabled = false;
			shutdownButton.classList.remove('disabled');
			timeOptions.disabled = false;
			numberDelay.value = "";
			timeOptions.options["0"].selected = true;
			$timeOptions.material_select();
			cancelShudownButton.disabled = true;
		}else{
			numberDelay.focus();
			timeOptions.options[data.option].selected = true;
			numberDelay.value = data.delay;
			numberDelay.disabled = true;
			shutdownButton.classList.add('disabled');	
			timeOptions.disabled = true;
			$timeOptions.material_select();
			cancelShudownButton.disabled = false;
		}
	}
	function statusAppRender(data){
		console.log('Primeros datos de la aplicación',data);
		toggleRender(data);
		if (data.timeSleep) {
			shutdownRender(data);
		}
	}
})();