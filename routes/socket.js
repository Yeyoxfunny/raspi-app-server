module.exports = function(server){
	var io = require('socket.io')(server);
	var statusApplication = { 
		isOn : false, 
		timeSleep: false,
		delay: undefined,
		option: undefined,
		isPong: false
	};

	io.on('connection', function(socket){
		socket.emit('statusApp', statusApplication);

		console.log('Alguien se ha conectado', socket.handshake.address);
		socket.on('toggleClient', function (data) {
			statusApplication.isOn = data.isOn;
			statusApplication.timeSleep = data.timeSleep;
			socket.broadcast.emit('toggleAllClients', statusApplication);

			io.sockets.emit('toggleServer',{ text: 'Hola amigo!'});
		});

		socket.on('shutdownClient', function(data){
			statusApplication.isOn = data.isOn;
			statusApplication.timeSleep = data.timeSleep;
			statusApplication.delay = data.delay;
			statusApplication.option = data.option;
			socket.broadcast.emit('shutdownAllClients',statusApplication);
			io.sockets.emit('shutdownServer', data);
		});

		socket.on('togglePi', function (data) {
			statusApplication.isOn = data.isOn;
			statusApplication.timeSleep = false;
			statusApplication.isPong = data.isPong;
			io.sockets.emit('toggleAllClients', data);
			io.sockets.emit('shutdownAllClients',data);
		});

		socket.on('cancelShutdownClient',function() {
			statusApplication.timeSleep = false;
			io.sockets.emit('shutdownAllClients',{isPong: true});
			io.sockets.emit('cancelShutdownServer');
		});
	});
}