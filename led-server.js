var http = require('http');
var server = http.createServer().listen(3000, 'localhost');
var io = require('socket.io')(server);

var Cylon = require('cylon');

Cylon.robot({
	connections: { raspi: { adaptor: 'raspi'} },
	devices: devices: [
        { name: 'led15', driver: 'led', pin: 15 },
        { name: 'led11', driver: 'led', pin: 11 },
        { name: 'led7', driver: 'led', pin: 7 }
    ],

    work: function (my) {
    	io.on('connect', function (socket) {
    		console.log('Conectado');

    		socket.on('toggleServer',function (data) {
    			console.log(data.text);
    		});
    	})
    }
});