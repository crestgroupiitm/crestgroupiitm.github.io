/* PI RAIL SCROLLSPY */
document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.pi-rail-link');
  if (!links.length) return;
  const blocks = [...links]
    .map(l => document.querySelector(l.getAttribute('href')))
    .filter(Boolean);

  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-25% 0px -65% 0px' });

  blocks.forEach(b => spy.observe(b));
});
