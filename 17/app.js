var express = require('express')
var lessMiddleware = require('less-middleware')
var autoprefixer = require('express-autoprefixer')
var expressLayouts = require('express-ejs-layouts')
var compression = require('compression')
var staticAsset = require('static-asset')
var browserify = require('browserify-middleware')

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

server.get('/bundle.js', browserify(__dirname + '/assets/javascripts/app.js', {
  cache: true,
  precompile: true
}))

server.use(staticAsset(__dirname + '/assets'))
server.use(express.static(__dirname + '/assets'))

server.get('/', function (req, res) {
  res.render('index', {
    speakers: require('./speakers'),
    schedule: require('./schedule'),
    pageClass: ''
  })
})

server.get('/partners', function (req, res) {
  res.render('partners', {
    pageClass: ''
  })
})

server.get('/roadbook', function (req, res) {
  res.render('roadbook', {
    pageClass: 'page-roadbook'
  })
})

module.exports = server
