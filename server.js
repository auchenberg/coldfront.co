var express = require('express')
var vhost = require('vhost')

var app2014 = require('./2014/app')
var app2015 = require('./2015/app')
var app2016 = require('./2016/app')
var appSplash = require('./splash/app')

var redirect = express()

redirect.get('/', function (req, res) {
  res.redirect(301, 'https://2016.coldfrontconf.com')
})

var server = express()
server.set('port', process.env.PORT || 8000)

server.use(vhost('2014.coldfrontconf.com', app2014))
server.use(vhost('2015.coldfrontconf.com', app2015))
server.use(vhost('2016.coldfrontconf.com', app2016))
server.use(vhost('coldfrontconf.com', redirect))
server.use(vhost('localhost', redirect))

server.listen(server.get('port'), function () {
  console.log('Express server listening on port %d in %s mode', server.get('port'), server.settings.env)
})
