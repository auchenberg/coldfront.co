var express = require('express')
var vhost = require('vhost')

var app2014 = require('./2014/app')
var app2015 = require('./2015/app')
var app2016 = require('./2016/app')
var app17 = require('./2017/app')
var appSplash = require('./splash/app')

var root = express().get('/', function (req, res) {
  res.send(`<!doctype html><meta http-equiv="refresh" content="0;url=https://2017.coldfront.co">`)
})

var root2016 = express().get('/', function (req, res) {
  res.send(`<!doctype html><meta http-equiv="refresh" content="0;url=https://2016.coldfront.co">`)
})

var root2015 = express().get('/', function (req, res) {
  res.send(`<!doctype html><meta http-equiv="refresh" content="0;url=https://2015.coldfront.co">`)
})

var root2014 = express().get('/', function (req, res) {
  res.send(`<!doctype html><meta http-equiv="refresh" content="0;url=https://2014.coldfront.co">`)
})

var server = express()
server.set('port', process.env.PORT || 8080)

server.use(vhost('2014.coldfrontconf.com', root2014))
server.use(vhost('2014.coldfront.co', app2014))

server.use(vhost('2015.coldfront.co', app2015))
server.use(vhost('2015.coldfrontconf.com', root2015))

server.use(vhost('2016.coldfront.co', app2016))
server.use(vhost('2016.coldfrontconf.com', root2016))

server.use(vhost('2017.coldfrontconf.com', root))
server.use(vhost('2017.coldfront.co', app17))
server.use(vhost('preview.coldfront.co', app17))

server.use(vhost('coldfront.co', root))
server.use(vhost('localhost', app17))

server.listen(server.get('port'), function () {
  console.log('Express server listening on port %d in %s mode', server.get('port'), server.settings.env)
})
