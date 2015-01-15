var http = require('http'),
	conf = require('./conf')
	expressServer = require('./app/expressServer');
var app = new expressServer();

var server = http.createServer(app.expressServer);
server.listen(conf.port);
console.log("Running at http://localhost:3000");