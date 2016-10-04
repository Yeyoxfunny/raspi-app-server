(function () {
	var socket = io();
	var toggleButton = document.querySelector('.toggle');
	var shutdownButton = document.getElementById('shutdown');
	var numberDelay = document.getElementById('numberTimeOut');
	var timeOptions = document.getElementById('timeOptions');
	var $timeOptions = $('#timeOptions');
	var buttonStatus = false;

	socket.on('toggleAllClients', toggleRender);
	socket.on('shutdownAllClients',shutdownRender);

	toggleButton.addEventListener('click', function(){
		if(this.classList.contains('active')){
			this.classList.remove('active');
			buttonStatus = false;
		}else{
			this.classList.add('active');
			buttonStatus = true
		}
		socket.emit('toggleClient', { isOn: buttonStatus});
	});

	shutdownButton.addEventListener('click',function (event) {
		var valueTimeOptions = timeOptions.options[timeOptions.selectedIndex].value;
		event.preventDefault();
		socket.emit('shutdownClient',{ delay: numberDelay.value, option: valueTimeOptions });
		console.log(numberDelay.value);
		console.log(valueTimeOptions);
		numberDelay.value = "";
		numberDelay.disabled = true;
		shutdownButton.classList.add('disabled');
		timeOptions.disabled = true;
		$timeOptions.material_select();
	});


	function toggleRender(data) {
		if (data.isOn) {
			toggleButton.classList.add('active');
		}else{
			toggleButton.classList.remove('active');	
		}
	}	

	function shutdownRender(data){
		if (data.isPong) {
			numberDelay.disabled = false;
			shutdownButton.classList.remove('disabled');
			timeOptions.disabled = false;
			$timeOptions.material_select();
		}else{
			numberDelay.disabled = true;
			shutdownButton.classList.add('disabled');	
			timeOptions.disabled = true;
			$timeOptions.material_select();		
		}
	}	
})();