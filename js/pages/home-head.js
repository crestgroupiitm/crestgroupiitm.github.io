// Home page, runs in <head>: marks the page as script-enabled so that the
// fade-in styles (html.js [data-reveal]) only hide content when home.js is
// there to reveal it. Without JavaScript everything is simply visible.
document.documentElement.classList.add('js');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add('reduce-motion');
}
