var express = require('express');
var vhost = require('vhost')

var app = require("./app");
var app2014 = require("./2014/app");

var server = express();
server.set('port', process.env.PORT || 8000);

server.use(vhost('2014.coldfrontconf.com', app2014))
server.use(vhost('coldfrontconf.com', app));
server.use(vhost('localhost', app));
server.use(vhost('still-sands-3641.herokuapp.com', app));

server.listen(server.get('port'), function(){
 	console.log("Express server listening on port %d in %s mode", server.get('port'), server.settings.env);
});