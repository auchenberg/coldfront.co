var express = require('express')
var lessMiddleware = require('less-middleware')
var autoprefixer = require('express-autoprefixer')
var expressLayouts = require('express-ejs-layouts')
var compression = require('compression')
var staticAsset = require('static-asset')

var server = express()

server.set('view engine', 'ejs')
server.set('views', __dirname + '/views')
server.set('layout', 'default')
server.use(expressLayouts)
server.use(compression())

server.use(lessMiddleware(__dirname + '/assets'))
server.use(autoprefixer({
  options: 'last 2 versions'
}))

server.use(staticAsset(__dirname + '/assets'))
server.use(express.static(__dirname + '/assets'))

server.get('/', function (req, res) {
  res.render('index', {
    schedule: require('./schedule'),
    pageClass: ''
  })
})

server.get('/partners', function (req, res) {
  res.render('partners', {
    pageClass: ''
  })
})

server.get('/workshop', function (req, res) {
  res.render('workshop', {
    pageClass: 'page-workshop'
  })
})

server.get('/speakers', function (req, res) {
  res.render('speakers', {
    pageClass: 'page-speakers',
    schedule: require('./schedule'),
  })
})

module.exports = server
