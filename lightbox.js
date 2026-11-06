(function () {
  'use strict';

  /* ── Build lightbox DOM ──────────────────────────────────────────── */
  var lb = document.createElement('div');
  lb.id = 'crest-lb';
  lb.className = 'lb-overlay';
  lb.setAttribute('role', 'dialog');
  lb.setAttribute('aria-modal', 'true');
  lb.innerHTML =
    '<button class="lb-btn lb-close" aria-label="Close">' +
      '<i class="fa-solid fa-xmark"></i>' +
    '</button>' +
    '<button class="lb-btn lb-nav lb-prev" aria-label="Previous photo">' +
      '<i class="fa-solid fa-chevron-left"></i>' +
    '</button>' +
    '<div class="lb-stage">' +
      '<div class="lb-img-bg"></div>' +
      '<p class="lb-caption"></p>' +
    '</div>' +
    '<button class="lb-btn lb-nav lb-next" aria-label="Next photo">' +
      '<i class="fa-solid fa-chevron-right"></i>' +
    '</button>' +
    '<span class="lb-counter"></span>';
  document.body.appendChild(lb);

  var lbStage   = lb.querySelector('.lb-stage');
  var lbImgBg   = lb.querySelector('.lb-img-bg');
  var lbCaption = lb.querySelector('.lb-caption');
  var lbClose   = lb.querySelector('.lb-close');
  var lbPrev    = lb.querySelector('.lb-prev');
  var lbNext    = lb.querySelector('.lb-next');
  var lbCounter = lb.querySelector('.lb-counter');

  var items        = [];
  var current      = 0;
  var touchStartX  = 0;

  /* ── Open / navigate / close ─────────────────────────────────────── */
  function show(idx) {
    current = ((idx % items.length) + items.length) % items.length;
    var it = items[current];
    lbImgBg.style.backgroundImage = 'url("' + it.src + '")';
    lbCaption.textContent = it.caption;
    lbCounter.textContent = (current + 1) + ' ∕ ' + items.length;
    lbPrev.style.display = items.length > 1 ? '' : 'none';
    lbNext.style.display = items.length > 1 ? '' : 'none';
    lb.classList.add('lb-active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    lb.classList.remove('lb-active');
    document.body.style.overflow = '';
    setTimeout(function () { lbImgBg.style.backgroundImage = ''; }, 320);
  }

  /* ── Controls ────────────────────────────────────────────────────── */
  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click',  function () { show(current - 1); });
  lbNext.addEventListener('click',  function () { show(current + 1); });

  lb.addEventListener('click', function (e) {
    if (e.target === lb || e.target === lbStage) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('lb-active')) return;
    if (e.key === 'Escape')     close();
    if (e.key === 'ArrowLeft')  show(current - 1);
    if (e.key === 'ArrowRight') show(current + 1);
  });

  /* Touch swipe */
  lb.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  lb.addEventListener('touchend', function (e) {
    var dx = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  });

  /* ── Right-click / drag protection ──────────────────────────────── */
  document.addEventListener('contextmenu', function (e) {
    if (e.target.tagName === 'IMG') e.preventDefault();
  }, true);

  lb.addEventListener('contextmenu', function (e) { e.preventDefault(); });

  /* ── Init: gather images, attach transparent shields ────────────── */
  function initLightbox() {
    items = [];
    var existing = document.querySelectorAll('.img-protect-overlay');
    for (var i = 0; i < existing.length; i++) existing[i].remove();

    var galleryWraps = document.querySelectorAll('.gallery-card-img');
    for (var g = 0; g < galleryWraps.length; g++) {
      var gWrap = galleryWraps[g];
      var gImg  = gWrap.querySelector('img');
      if (!gImg) continue;
      var gCard = gWrap.closest('.gallery-card');
      var gCap  = '';
      if (gCard) {
        var gTitleEl = gCard.querySelector('.gallery-card-title');
        if (gTitleEl) gCap = gTitleEl.textContent.trim();
      }
      items.push({ src: gImg.src, caption: gCap });
      attachShield(gWrap, items.length - 1);
    }

    var equipWraps = document.querySelectorAll('.equip-card-img');
    for (var q = 0; q < equipWraps.length; q++) {
      var eWrap = equipWraps[q];
      var eImg  = eWrap.querySelector('img');
      if (!eImg) continue;
      var eCard = eWrap.closest('.equip-card');
      var eCap  = '';
      if (eCard) {
        var eNameEl = eCard.querySelector('.equip-card-name');
        if (eNameEl) eCap = eNameEl.textContent.trim();
      }
      items.push({ src: eImg.src, caption: eCap });
      attachShield(eWrap, items.length - 1);
    }
  }

  function attachShield(wrap, idx) {
    var img = wrap.querySelector('img');
    if (img) {
      img.setAttribute('draggable', 'false');
      img.style.pointerEvents = 'none';
    }
    var shield = document.createElement('div');
    shield.className = 'img-protect-overlay';
    shield.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    (function (i) {
      shield.addEventListener('click', function () { show(i); });
    }(idx));
    wrap.appendChild(shield);
  }

  /* Expose for gallery.html to call after each renderGallery() */
  window.initLightbox = initLightbox;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
  } else {
    initLightbox();
  }
}());
