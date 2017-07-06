var AOS = require('aos');


;(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r
  i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date()
  a = s.createElement(o),
  m = s.getElementsByTagName(o)[0]
  a.async = 1
  a.src = g
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga')

ga('create', 'UA-49872618-1', 'coldfront.co')
ga('send', 'pageview')

AOS.init();


document.querySelectorAll('.movable').forEach((elm) => {
  
  elm.addEventListener('mousemove', (e) => {
    var screenWidth = document.body.clientWidth / 2
    var screenHeight = document.body.clientHeight / 2

    let centroX = e.clientX - window.innerWidth / 2
    let centroY = window.innerHeight / 2 - (e.clientY + 100)
    let degX = centroX * .05
    let degY = centroY * .05

    e.target.style['transform'] = 'perspective(600px)' + 'rotateY('+ degX +'deg)  rotateX('+ degY +'deg)'    
  })
  
})


document.querySelectorAll('.schedule li.state-speaker').forEach((elm) => {
  
  elm.addEventListener('click', (e) => {
    var elmLi = e.target;

    if(elm.classList.contains('state-expanded')) {
      elm.classList.remove('state-expanded')
    } else {
      elm.classList.add('state-expanded')
    }  
  })
  
})
