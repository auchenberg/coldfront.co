var express = require('express');
var lessMiddleware = require('less-middleware');
var autoprefixer = require('express-autoprefixer');
var expressLayouts = require('express-ejs-layouts')
var compression = require('compression')


var server = express();

server.set('view engine', 'ejs');
server.set('views', __dirname + '/views');
server.set('layout', 'default');
server.use(expressLayouts)
server.use(compression());

server.use(lessMiddleware(__dirname + '/assets'));
server.use(autoprefixer({
    options: 'last 2 versions'
}));

server.use(express.static(__dirname + '/assets', {
	maxAge: 86400000
}));

server.get('/', function(req, res) {
 	res.render('index', {
 		schedule: require('./schedule')
 	});
});

server.get('/partners', function(req, res) {
    res.render('partners')
});


module.exports = server;