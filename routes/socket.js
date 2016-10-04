module.exports = function(server){
	var io = require('socket.io')(server);
	io.on('connection', function(socket){
		console.log('Alguien se ha conectado', socket.handshake.address);
		socket.on('toggleClient', function (data) {
			console.log('Estado ', data);
			socket.broadcast.emit('toggleAllClients', data);

			io.sockets.emit('toggleServer',{ text: 'Hola amigo!'});
		});

		socket.on('shutdownClient', function(data){
			console.log(data.delay);
			socket.broadcast.emit('shutdownAllClients',{isPong:false});
			io.sockets.emit('shutdownServer', data);
		});

		socket.on('togglePi', function (data) {
			io.sockets.emit('toggleAllClients', data);
			io.sockets.emit('shutdownAllClients',data);
		});
	});
}