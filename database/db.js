var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.dbURI);

mongoose.connection.on('connected',function () {
  console.log('Conectado a la base de datos');
});

mongoose.connection.on('error', function (err) {
  console.error('Ha ocurrido un error '+err);
});

mongoose.connection.on('disconnected', function () {
  console.log('Se ha desconectado de la base de datos');
});

module.exports = mongoose.connection;