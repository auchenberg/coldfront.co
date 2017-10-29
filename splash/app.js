var express = require('express')
var lessMiddleware = require('less-middleware')
var autoprefixer = require('express-autoprefixer')
var expressLayouts = require('express-ejs-layouts')
var compression = require('compression')
var staticAsset = require('static-asset')
var browserify = require('browserify-middleware')
var markdown = require( "markdown" ).markdown;

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
    pageClass: ''
  })
})

module.exports = server
