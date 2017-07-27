var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-103503457-1']);
_gaq.push(['_trackPageview']);

(function () {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();


// Track how many times words are checked by click button
function trackButtonClick(e) {
    _gaq.push(['_trackEvent', e.target.id, 'clicked']);
};

document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('#btnCheckWord')
    button.addEventListener('click', trackButtonClick)
}, false);


// Track how many times words are checked by enter key press
function trackEnterPress(e) {
    _gaq.push(['_trackEvent', e.target.id, 'enterPressed']);
};

document.addEventListener("keypress", function (e) {
    if (e.keyCode === 13) {
        trackEnterPress(e)
    }
})
