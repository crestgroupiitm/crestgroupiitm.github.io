// ----------------------------------------------
// CREST RESEARCH LABORATORY - Interactive Scripts
// Premium Edition
// ----------------------------------------------

/* 0. ANTI-CLICKJACKING: GitHub Pages cannot send X-Frame-Options / frame-ancestors
   headers, so refuse to run inside another site's frame. */
if (window.top !== window.self) {
    try { window.top.location.replace(window.self.location.href); }
    catch (e) { document.documentElement.style.display = 'none'; }
}

/* 0b. CLEAN ADDRESSES: the site links to /facilities, not /facilities.html.
   A visitor arriving through an old .html link (a bookmark, an older search
   result) sees the clean address too. Only the address bar changes; the page
   is not reloaded. Skipped when a file is opened straight from disk. */
if (/^https?:$/.test(location.protocol) && /\.html$/.test(location.pathname)) {
    const cleanPath = location.pathname.replace(/(^|\/)index\.html$/, '$1').replace(/\.html$/, '');
    history.replaceState(history.state, '', cleanPath + location.search + location.hash);
}

/* 1. PAGE LOADER */
window.addEventListener('load', () => {
    const loader = document.getElementById('page-loader');
    if (loader) {
        setTimeout(() => loader.classList.add('loaded'), 800);
    }
});

/* 2. SCROLL REVEAL ANIMATIONS */
document.addEventListener("DOMContentLoaded", () => {
    const sr = ScrollReveal({
        origin: 'bottom',
        distance: '40px',
        duration: 800,
        delay: 150,
        reset: false,
        easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
    });

    sr.reveal('.reveal', { interval: 90 });
    sr.reveal('.hero-title', { origin: 'bottom', distance: '50px', delay: 300 });
    sr.reveal('.hero-subtitle', { origin: 'bottom', distance: '40px', delay: 420 });
    sr.reveal('.hero-stats', { origin: 'bottom', distance: '40px', delay: 540 });
    sr.reveal('.hero-visual', { origin: 'right', distance: '80px', delay: 400 });
    sr.reveal('.impact-item', { origin: 'bottom', distance: '30px', interval: 80, delay: 100 });
    sr.reveal('.news-card', { origin: 'bottom', distance: '35px', interval: 100, delay: 100 });
    sr.reveal('.pillar-card', { origin: 'bottom', distance: '35px', interval: 90, delay: 100 });
});

/* 3. STICKY NAVBAR + SCROLL PROGRESS BAR */
const navbar = document.querySelector('.navbar');
const scrollBar = document.getElementById('scrollProgressBar');

window.addEventListener('scroll', () => {
    // Navbar state
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll progress bar
    if (scrollBar) {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        scrollBar.style.width = pct + '%';
    }

    // Back-to-top visibility
    const btt = document.getElementById('backToTop');
    if (btt) {
        if (window.scrollY > 600) {
            btt.classList.add('visible');
        } else {
            btt.classList.remove('visible');
        }
    }
}, { passive: true });

/* 4. BACK-TO-TOP BUTTON */
const btt = document.getElementById('backToTop');
if (btt) {
    btt.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* 5. MOBILE MENU: Slide-in Drawer */
const menuToggle = document.getElementById('menuToggle') || document.querySelector('.menu-toggle');
const navLinks = document.getElementById('navLinks') || document.querySelector('.nav-links');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');
const mobileNavClose = document.getElementById('mobileNavClose');

function openMobileNav() {
    if (navLinks) navLinks.classList.add('active');
    if (mobileNavOverlay) {
        mobileNavOverlay.style.display = 'block';
        requestAnimationFrame(() => mobileNavOverlay.classList.add('open'));
    }
    document.body.style.overflow = 'hidden';
}

function closeMobileNav() {
    if (navLinks) navLinks.classList.remove('active');
    if (mobileNavOverlay) {
        mobileNavOverlay.classList.remove('open');
        setTimeout(() => { mobileNavOverlay.style.display = 'none'; }, 350);
    }
    document.body.style.overflow = '';
}

if (menuToggle) menuToggle.addEventListener('click', openMobileNav);
if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileNav);

// Close on nav link click (mobile)
if (navLinks) {
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMobileNav);
    });
}

// Escape key closes nav
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMobileNav();
});

/* 6. NUMBER COUNTER ANIMATION: eased */
const startCounters = () => {
    document.querySelectorAll('.counter').forEach(counter => {
        const target = +counter.getAttribute('data-target');
        let started = false;

        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && !started) {
                started = true;
                observer.disconnect();
                const duration = 1800;
                const start = performance.now();

                const easeOut = t => 1 - Math.pow(1 - t, 3);

                const tick = (now) => {
                    const elapsed = now - start;
                    const progress = Math.min(elapsed / duration, 1);
                    counter.innerText = Math.floor(easeOut(progress) * target).toLocaleString();
                    if (progress < 1) requestAnimationFrame(tick);
                    else counter.innerText = target.toLocaleString();
                };
                requestAnimationFrame(tick);
            }
        }, { threshold: 0.4 });

        observer.observe(counter);
    });
};

document.addEventListener('DOMContentLoaded', startCounters);

/* 5. PRINCIPAL INVESTIGATOR PHOTO PULL EFFECT */
document.addEventListener('DOMContentLoaded', () => {
    const photoContainer = document.querySelector('.pi-avatar-container');
    const photo = document.querySelector('.pi-avatar');

    if (!photoContainer || !photo || window.matchMedia('(pointer: coarse)').matches) {
        return;
    }

    const maxOffset = 30;

    photoContainer.addEventListener('mousemove', (event) => {
        const bounds = photoContainer.getBoundingClientRect();
        const relativeX = (event.clientX - bounds.left) / bounds.width - 0.5;
        const relativeY = (event.clientY - bounds.top) / bounds.height - 0.5;
        const moveX = relativeX * maxOffset;
        const moveY = relativeY * maxOffset;

        photoContainer.style.transform = `translate(${moveX}px, ${moveY}px)`;
        photo.style.transform = `perspective(900px) translateZ(26px) scale(1.08) translate(${moveX * 0.55}px, ${moveY * 0.55}px)`;
        photo.style.boxShadow = '0 34px 74px rgba(10, 25, 47, 0.28)';
    });

    photoContainer.addEventListener('mouseleave', () => {
        photoContainer.style.transform = 'translate(0, 0)';
        photo.style.transform = 'perspective(900px) translateZ(0) scale(1) translate(0, 0)';
        photo.style.boxShadow = '0 18px 40px rgba(10, 25, 47, 0.16)';
    });
});

/* 6. PARTICLES.JS BACKGROUND CONFIGURATION */
/* Configured for a "breezy", light, airy environment mimicking diffusion/gases */
/* Guarded: if the CDN fails, the rest of this file must still run */
if (typeof particlesJS === 'function') particlesJS("particles-js", {
  "particles": {
    "number": {
      "value": 40,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": ["#ad8f61", "#1a233d", "#8d9ab8"] // Champagne gold, midnight ink, slate
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      }
    },
    "opacity": {
      "value": 0.3,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 4,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ad8f61",
      "opacity": 0.14,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2, // Slow, breezy movement
      "direction": "top-right", // Mimic airflow
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "grab"
      },
      "onclick": {
        "enable": false,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 140,
        "line_linked": {
          "opacity": 0.5
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
});

/* 7. FOOTER PERLIN NOISE FLOW FIELD */

// Minimal Perlin noise (2D)
const _perlin = (() => {
    const perm = new Uint8Array(512);
    const p    = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const t = p[i]; p[i] = p[j]; p[j] = t;
    }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];

    const fade = t => t * t * t * (t * (t * 6 - 15) + 10);
    const lerp = (a, b, t) => a + t * (b - a);
    const grad = (h, x, y) => {
        const u = (h & 2) ? -x : x;
        const v = (h & 1) ? -y : y;
        return u + v;
    };

    return (x, y) => {
        const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
        x -= Math.floor(x); y -= Math.floor(y);
        const u = fade(x), v = fade(y);
        const a = perm[X] + Y, b = perm[X + 1] + Y;
        return lerp(
            lerp(grad(perm[a],     x,     y), grad(perm[b],     x - 1, y),     u),
            lerp(grad(perm[a + 1], x,     y - 1), grad(perm[b + 1], x - 1, y - 1), u),
            v
        );
    };
})();

function initFooterCanvas() {
    const canvas = document.getElementById('footer-canvas');
    if (!canvas) return;

    const ctx    = canvas.getContext('2d');
    const footer = canvas.closest('.footer');
    let   particles = [], animId, time = 0;

    const COUNT      = 200;
    const SCALE      = 0.0028;
    const SPEED      = 1.1;
    const TIME_DELTA = 0.00025;
    const PALETTE    = ['173,143,97', '212,185,140', '227,207,168', '141,154,184'];

    function resize() {
        canvas.width  = footer.offsetWidth;
        canvas.height = footer.offsetHeight;
        // Seed the canvas with the footer background so trails look native
        ctx.fillStyle = '#0a101f';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    function mkParticle(staggerAge) {
        return {
            x:      Math.random() * canvas.width,
            y:      Math.random() * canvas.height,
            age:    staggerAge ? Math.floor(Math.random() * 180) : 0,
            maxAge: 140 + Math.random() * 220,
            spd:    SPEED * (0.6 + Math.random() * 0.8),
            col:    PALETTE[Math.floor(Math.random() * PALETTE.length)]
        };
    }

    function initParticles() {
        particles = [];
        for (let i = 0; i < COUNT; i++) particles.push(mkParticle(true));
    }

    function animate() {
        // Gentle fade instead of hard clear: creates the flowing trail effect
        ctx.fillStyle = 'rgba(10, 16, 31, 0.045)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        time += TIME_DELTA;

        for (let i = 0; i < particles.length; i++) {
            const p     = particles[i];
            const angle = _perlin(p.x * SCALE, p.y * SCALE + time) * Math.PI * 4;
            const ox    = p.x, oy = p.y;

            p.x   += Math.cos(angle) * p.spd;
            p.y   += Math.sin(angle) * p.spd;
            p.age += 1;

            const life  = p.age / p.maxAge;
            const alpha = (life < 0.12 ? life / 0.12 : 1 - life) * 0.28;

            ctx.beginPath();
            ctx.moveTo(ox, oy);
            ctx.lineTo(p.x, p.y);
            ctx.strokeStyle = `rgba(${p.col},${alpha})`;
            ctx.lineWidth   = 0.85;
            ctx.stroke();

            if (p.age >= p.maxAge || p.x < -2 || p.x > canvas.width + 2 ||
                                      p.y < -2 || p.y > canvas.height + 2) {
                particles[i] = mkParticle(false);
            }
        }

        animId = requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { animate(); }
        else { cancelAnimationFrame(animId); }
    }, { threshold: 0.05 });

    observer.observe(footer);
    resize();
    initParticles();
    window.addEventListener('resize', () => { resize(); initParticles(); });
}

document.addEventListener('DOMContentLoaded', initFooterCanvas);

/* 8. DYNAMIC RESEARCH CARDS HOVER COLOR */
document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll('.research-card').forEach(card => {
        const color = card.getAttribute('data-color');
        if (color) {
            card.style.borderTopColor = color;
            card.addEventListener('mouseenter', () => {
                card.style.boxShadow = `0 15px 35px rgba(31, 38, 135, 0.1), 0 0 10px ${color}44`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.boxShadow = `0 8px 32px 0 rgba(31, 38, 135, 0.05)`;
            });
        }
    });
});

/* 9. GALLERY LIGHTBOX */
document.addEventListener('DOMContentLoaded', () => {
    // Build lightbox elements if not already present
    if (!document.getElementById('crestLightbox')) {
        const lb = document.createElement('div');
        lb.id = 'crestLightbox';
        lb.className = 'lightbox-overlay';
        lb.innerHTML = `
            <button class="lightbox-close" aria-label="Close"><i class="fa-solid fa-xmark"></i></button>
            <img class="lightbox-img" src="" alt="">
            <div class="lightbox-caption"></div>
        `;
        document.body.appendChild(lb);

        const lbImg = lb.querySelector('.lightbox-img');
        const lbCaption = lb.querySelector('.lightbox-caption');
        const lbClose = lb.querySelector('.lightbox-close');

        function openLightbox(src, alt) {
            lbImg.src = src;
            lbImg.alt = alt;
            lbCaption.textContent = alt;
            lb.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeLightbox() {
            lb.classList.remove('active');
            document.body.style.overflow = '';
            setTimeout(() => { lbImg.src = ''; }, 300);
        }

        lbClose.addEventListener('click', closeLightbox);
        lb.addEventListener('click', (e) => { if (e.target === lb) closeLightbox(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });

        // Wire up gallery masonry images
        document.querySelectorAll('.gallery-masonry-item img, .gallery-item img').forEach(img => {
            img.style.cursor = 'zoom-in';
            img.addEventListener('click', () => openLightbox(img.src, img.alt));
        });
    }
});

/* 10. PUBLICATION SEARCH FILTER */
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('pubSearchInput');
    if (!searchInput) return;

    searchInput.addEventListener('input', () => {
        const q = searchInput.value.toLowerCase().trim();
        document.querySelectorAll('.publication').forEach(pub => {
            const text = pub.textContent.toLowerCase();
            pub.style.display = (!q || text.includes(q)) ? '' : 'none';
        });
        // Hide year headings that have no visible items
        document.querySelectorAll('.pub-year-group').forEach(group => {
            const visible = [...group.querySelectorAll('.publication')].some(p => p.style.display !== 'none');
            group.style.display = visible ? '' : 'none';
        });
    });
});

/* 11. PROTECT IMAGES: disable right-click and drag */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('draggable', 'false');
    });
});

/* PHOTO PROTECTION: no right-click save, drag-out or long-press save on images.
   (A deterrent for casual copying; anything shown on screen can still be captured.) */
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
}, true);
document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') e.preventDefault();
}, true);

/* IMAGE FALLBACK: replaces a broken news image with an icon placeholder
   (was an inline onerror handler, which the Content-Security-Policy blocks). */
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('img[data-fallback-icon]').forEach(img => {
        const swap = () => {
            const box = document.createElement('div');
            box.className = 'news-card-img-placeholder';
            const icon = document.createElement('i');
            icon.className = 'fa-solid ' + img.getAttribute('data-fallback-icon');
            box.appendChild(icon);
            if (img.parentElement) img.parentElement.replaceChildren(box);
        };
        if (img.complete && img.naturalWidth === 0) swap();
        else img.addEventListener('error', swap, { once: true });
    });
});

/* 12. EMAIL ADDRESS PROTECTION
   The address is stored reversed + base64 in data-mx and is only written into the
   page after a real visitor interacts (mouse move, touch, scroll, key or click).
   Harvesting bots that just download or render the page never see it. */
function revealEmails() {
    document.querySelectorAll('.email-protect[data-mx]').forEach(el => {
        const decoded = atob(el.getAttribute('data-mx')).split('').reverse().join('');
        if (el.tagName === 'A') {
            const subject = el.getAttribute('data-subject');
            el.href = 'mailto:' + decoded + (subject ? '?subject=' + subject : '');
        }
        el.textContent = decoded;
        el.removeAttribute('data-mx');
    });
}
document.addEventListener('DOMContentLoaded', () => {
    const targets = document.querySelectorAll('.email-protect[data-mx]');
    if (!targets.length) return;
    targets.forEach(el => {
        if (!el.textContent.trim()) el.textContent = 'Show email address';
        if (el.tagName === 'A') {
            el.addEventListener('click', (e) => {
                if (el.hasAttribute('data-mx')) { e.preventDefault(); revealEmails(); }
            });
        }
    });
    const events = ['pointermove', 'pointerdown', 'touchstart', 'keydown', 'wheel', 'scroll'];
    const onHuman = () => {
        events.forEach(ev => window.removeEventListener(ev, onHuman, true));
        revealEmails();
    };
    events.forEach(ev => window.addEventListener(ev, onHuman, { capture: true, passive: true }));
});

/* 13. ACTIVE NAV LINK ON SCROLL (single-page sections) */
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section[id]');
    if (sections.length === 0) return;

    const navItems = document.querySelectorAll('.nav-links a');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navItems.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
                });
            }
        });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach(s => observer.observe(s));
});
