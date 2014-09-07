var express = require('express');
var lessMiddleware = require('less-middleware');
var autoprefixer = require('express-autoprefixer');
var expressLayouts = require('express-ejs-layouts')

var app = express();

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layout');

// Middelware
app.use(expressLayouts)
app.use(lessMiddleware(__dirname + '/assets'));
app.use(autoprefixer({
    options: 'last 2 versions'
}));
app.use(express.static(__dirname + '/assets'));

// Routes
app.get('/', function(req, res) {
    res.render('index', {
        schedule: require('./schedule')
    })
});

app.get('/become-a-partner', function(req, res) {
    res.render('sponsors')
});

module.exports = app;