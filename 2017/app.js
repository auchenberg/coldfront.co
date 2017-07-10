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

  var schedule = require('./schedule').map(d => {
    d.program = d.program.map(s => { 
      if(s.abstract) {
        s.abstractHTML =  markdown.toHTML(s.abstract)
      }
      return s;
    })
    return d
  })

  res.render('index', {
    speakers: require('./speakers'),
    schedule: schedule,
    pageClass: ''
  })
})

server.get('/speakers', (req, res) => {
  res.render('speakers', {
    pageTitle: 'Speakers',
    pageClass: 'page-speakers',
    speakers: require('./speakers'),
  })
})

server.get('/program', (req, res) => {
  var schedule = require('./schedule').map(d => {
    d.program = d.program.map(s => { 
      if(s.abstract) {
        s.abstractHTML =  markdown.toHTML(s.abstract)
      }
      return s;
    })
    return d
  })

  res.render('program', {
    pageTitle: 'Program',
    pageClass: 'page-program',
    speakers: require('./speakers'),
    schedule: schedule
  })
})

server.get('/speakers/:slug', (req, res) => {

  let schedule = require('./schedule').map(d => {
      d.program = d.program.map(s => { 
        if(s.abstract) {
          s.abstractHTML =  markdown.toHTML(s.abstract)
        }
        return s;
      })

      return d;
  });

  let talk = schedule[0].program.find(i => i.who === req.params.slug);
  if(!talk) {
    talk = schedule[1].program.find(i => i.who === req.params.slug);
  }
  
  var speaker = require('./speakers').find((s) => s.slug == req.params.slug)
  speaker.bioHTML = markdown.toHTML(speaker.bio)
  
  res.render('speaker', {
    pageTitle: 'Speakers',
    pageClass: 'page-speaker',
    speaker: speaker,
    talk: talk
  })

})

server.get('/diversity-scholarships', (req, res) => {
  res.render('diversity-scholarship', {
    pageTitle: 'Diversity Scholarships',
    pageClass: ''
  })
})

server.get('/about', (req, res) => {
  res.render('about', {
    pageTitle: 'About',
    pageClass: ''
  })
})

server.get('/themes', (req, res) => {
  res.render('themes', {
    pageTitle: 'Themes',
    pageClass: ''
  })
})

server.get('/roadbook', (req, res) => {
  res.render('roadbook', {
    pageClass: 'page-roadbook'
  })
})

module.exports = server
