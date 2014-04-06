var express = require('express');
var app = express();

app.configure(function(){

	app.engine('ejs', require('ejs-locals'));

	app.set('port', process.env.PORT || 8080);
  	app.set('views', __dirname + '/views');
  	app.set('view engine', 'ejs');

  	app.use(express.bodyParser());
  	app.use(express.methodOverride());
  	app.use('/assets', express.static(__dirname + '/assets/'));

});

app.configure('development', function(){
 	app.use(express.errorHandler({ 
 		dumpExceptions: true, 
 		showStack: true 
 	}));
});

app.get('/', function(req, res) {
 	res.render('index', {
  		_layoutFile: 'layout'
  	})
});

app.listen(app.get('port'), function(){
 	console.log("Express server listening on port %d in %s mode", app.get('port'), app.settings.env);
});