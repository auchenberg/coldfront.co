(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-49872618-1', 'coldfrontconf.com');
ga('send', 'pageview');

// Twitter
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location) ? 'http' : 'https';
    if (!d.getElementById(id)) {
        js = d.createElement(s);
        js.id = id;
        js.src = p + '://platform.twitter.com/widgets.js';
        fjs.parentNode.insertBefore(js, fjs);
    }
})(document, 'script', 'twitter-wjs');

// Facebook
(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=1396360133947588";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


document.querySelector('.venue').addEventListener('mousedown', function (e) {
    document.querySelector('.venue iframe').style.pointerEvents = 'all'
})

var splashDegX = 0;
var splashDegY = 0;

document.querySelector('.splash').addEventListener('mousemove', function (e) {
    var screenWidth = window.screen.width / 2
    var screenHeight = window.screen.height / 2

    var centroX = e.clientX - screenWidth
    var centroY = screenHeight - (e.clientY + 13)

    splashDegX = centroX * 0.1
    splashDegY  = centroY * 0.1
})

function animation() {
    document.querySelector('.splash .movable').style['transform'] = 'perspective(600px)' + 'rotateY('+ splashDegX +'deg)  rotateX('+ splashDegY +'deg)'
    requestAnimationFrame(animation);
}

requestAnimationFrame(animation);
