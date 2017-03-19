var express = require('express')
var vhost = require('vhost')

var app2014 = require('./2014/app')
var app2015 = require('./2015/app')
var app2016 = require('./2016/app')
var app17 = require('./17/app')
var appSplash = require('./splash/app')

var redirect = express()

redirect.get('/', function (req, res) {
  res.redirect(301, 'https://2017.coldfront.co')
})

var server = express()
server.set('port', process.env.PORT || 8080)

server.use(vhost('2014.coldfront.co', app2014))
server.use(vhost('2015.coldfront.co', app2015))
server.use(vhost('2016.coldfront.co', app2016))
server.use(vhost('2017.coldfront.co', appSplash))
server.use(vhost('17.coldfront.co', app17))
server.use(vhost('coldfront.co', redirect))
server.use(vhost('localhost', app17))

server.listen(server.get('port'), function () {
  console.log('Express server listening on port %d in %s mode', server.get('port'), server.settings.env)
})
