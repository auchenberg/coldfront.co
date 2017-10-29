var AOS = require('aos');

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
