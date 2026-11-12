/* HOME PAGE INTERACTIONS
   1. Reveal   sections fade up gently as they enter the screen.
   2. Count    the lab-in-numbers figures count up once, when first seen.
   3. Grow     the hero photograph widens towards full width as you scroll.
   Everything is visible without JavaScript, and nothing moves for visitors
   who ask their system for reduced motion. */
(() => {
    const still = document.documentElement.classList.contains('reduce-motion');

    /* 1. Reveal ---------------------------------------------------------- */
    const reveals = document.querySelectorAll('[data-reveal]');
    if (still || !('IntersectionObserver' in window)) {
        reveals.forEach((el) => el.classList.add('is-in'));
    } else {
        const io = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (!e.isIntersecting) return;
                e.target.classList.add('is-in');
                io.unobserve(e.target);
            });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
        reveals.forEach((el) => io.observe(el));
    }

    /* 2. Count up -------------------------------------------------------- */
    const counters = document.querySelector('[data-countup]');
    if (counters && !still && 'IntersectionObserver' in window) {
        const items = [...counters.querySelectorAll('strong')].map((el) => {
            const text = el.textContent;
            const m = text.match(/[\d,]+/);
            if (!m) return null;
            const target = parseInt(m[0].replace(/,/g, ''), 10);
            const useComma = m[0].includes(',');
            return { el, text, raw: m[0], target, useComma };
        }).filter(Boolean);

        const format = (n, comma) => (comma ? n.toLocaleString('en-US') : String(n));
        const run = () => {
            const t0 = performance.now();
            const dur = 1400;
            const step = (now) => {
                const k = Math.min(1, Math.max(0, (now - t0) / dur));
                const ease = 1 - Math.pow(1 - k, 3);
                items.forEach((it) => {
                    const v = Math.round(it.target * ease);
                    it.el.textContent = it.text.replace(it.raw, format(v, it.useComma));
                });
                if (k < 1) requestAnimationFrame(step);
                else items.forEach((it) => { it.el.textContent = it.text; });
            };
            requestAnimationFrame(step);
        };
        const co = new IntersectionObserver((entries) => {
            if (entries.some((e) => e.isIntersecting)) { co.disconnect(); run(); }
        }, { threshold: 0.35 });
        co.observe(counters);
    }

    /* 3. Hero photograph grows with scroll -------------------------------- */
    const grow = document.querySelector('[data-grow]');
    if (grow && !still) {
        let ticking = false;
        const update = () => {
            ticking = false;
            const r = grow.getBoundingClientRect();
            const vh = window.innerHeight;
            // 0 when the photo's top reaches the bottom of the screen, 1 when it is a third of the way up
            const p = Math.min(1, Math.max(0, (vh - r.top) / (vh * 0.75)));
            grow.style.setProperty('--grow', p.toFixed(3));
        };
        const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll, { passive: true });
        update();
    }
})();
