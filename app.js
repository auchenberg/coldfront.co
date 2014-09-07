var express = require('express');
var lessMiddleware = require('less-middleware');
var autoprefixer = require('express-autoprefixer');
var expressLayouts = require('express-ejs-layouts')

var server = express();

server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');
server.set('layout', 'default');
server.use(expressLayouts)
server.use(lessMiddleware(__dirname + '/assets'));
server.use(autoprefixer({
    options: 'last 2 versions'
}));
server.use(express.static(__dirname + '/assets'));

server.get('/', function(req, res) {
 	res.render('index');
});

module.exports = server;