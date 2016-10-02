(function () {
	var socket = io();
	var toggleButton = document.querySelector('.toggle');
	var buttonStatus = false;

	toggleButton.addEventListener('click', function(){
		if(this.classList.contains('active')){
			this.classList.remove('active');
			buttonStatus = false;
		}else{
			this.classList.add('active');
			buttonStatus = true
		}
		socket.emit('toggleClient', buttonStatus);
	});

	socket.on('toggleAllClients', function (data) {
		toggleButton.classList.toggle('active');
	});
})();