var express = require('express')
var redirect = require("express-redirect");
var vhost = require('vhost')

var app2014 = require('./2014/app')
var app2015 = require('./2015/app')
var app2016 = require('./2016/app')
var app17 = require('./2017/app')
var appSplash = require('./splash/app')

var server = express()
redirect(server);

server.set('port', process.env.PORT || 8080)
server.use(vhost('2014.coldfront.co', app2014))
server.use(vhost('2015.coldfront.co', app2015))
server.use(vhost('2016.coldfront.co', app2016))
server.use(vhost('2017.coldfront.co', app17))
server.use(vhost('localhost', app17))

server.redirect("2017.coldfrontconf.com", "https://2017.coldfront.co");
server.redirect("2016.coldfrontconf.com", "https://2016.coldfront.co");
server.redirect("2015.coldfrontconf.com", "https://2015.coldfront.co");
server.redirect("2014.coldfrontconf.com", "https://2014.coldfront.co");
server.redirect("coldfrontconf.com", "https://2017.coldfront.co");
server.redirect("coldfront.co", "https://2017.coldfront.co");

server.listen(server.get('port'), function () {
  console.log('Express server listening on port %d in %s mode', server.get('port'), server.settings.env)
})
