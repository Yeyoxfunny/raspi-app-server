module.exports = function(server){
	var io = require('socket.io')(server);
	io.on('connection', function(socket){
		console.log('Alguien se ha conectado');
		socket.on('toggleClient', function (data) {
			console.log('Estado ', data);
			socket.broadcast.emit('toggleAllClients', data);

			io.sockets.emit('toggleServer',{ text: 'Hola amigo!'});
		});
	});
}