document.addEventListener('DOMContentLoaded', async function () {
  const researchList = document.getElementById('research-articles-list');
  const editedBooksList = document.getElementById('edited-books-list');
  const bookChaptersList = document.getElementById('book-chapters-list');
  const proceedingsList = document.getElementById('proceedings-list');
  const heroCovers = document.querySelectorAll('.pub2-covers-group:not([aria-hidden]) img');
  const coverLightbox = document.getElementById('pub-cover-lightbox');
  const coverLightboxImage = document.getElementById('pub-cover-lightbox-image');
  const coverLightboxCaption = document.getElementById('pub-cover-lightbox-caption');

  /* ── Cover lightbox ─────────────────────────────────────── */
  function openCoverLightbox(image) {
    if (!coverLightbox || !coverLightboxImage || !coverLightboxCaption) return;

    coverLightboxImage.src = image.getAttribute('src') || '';
    coverLightboxImage.alt = image.getAttribute('alt') || 'Publication cover';
    coverLightboxCaption.textContent = image.getAttribute('alt') || '';
    coverLightbox.hidden = false;
    coverLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCoverLightbox() {
    if (!coverLightbox || !coverLightboxImage || !coverLightboxCaption) return;

    coverLightbox.hidden = true;
    coverLightbox.setAttribute('aria-hidden', 'true');
    coverLightboxImage.src = '';
    coverLightboxImage.alt = '';
    coverLightboxCaption.textContent = '';
    document.body.style.overflow = '';
  }

  heroCovers.forEach(image => {
    image.setAttribute('tabindex', '0');
    image.setAttribute('role', 'button');
    image.setAttribute('aria-label', `Open cover: ${image.getAttribute('alt') || 'Publication cover'}`);

    image.addEventListener('click', () => openCoverLightbox(image));
    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openCoverLightbox(image);
      }
    });
  });

  if (coverLightbox) {
    coverLightbox.querySelectorAll('[data-lightbox-close]').forEach(element => {
      element.addEventListener('click', closeCoverLightbox);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !coverLightbox.hidden) {
        closeCoverLightbox();
      }
    });
  }

  /* ── Archive rendering ──────────────────────────────────── */
  function bindResearchAbstractToggles() {
    if (!researchList) return;

    researchList.querySelectorAll('.publication').forEach(publication => {
      const abstract = publication.querySelector('.pub-abstract');
      const actions = publication.querySelector('.pub-actions');
      const disabledAbstract = actions ? actions.querySelector('.btn-journal.disabled[aria-disabled="true"]') : null;

      if (abstract && disabledAbstract && disabledAbstract.textContent.trim() === 'Abstract') {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'btn-journal btn-abstract-toggle';
        button.setAttribute('aria-expanded', 'false');
        button.textContent = 'Abstract';
        disabledAbstract.replaceWith(button);
      }
    });

    researchList.querySelectorAll('.btn-abstract-toggle').forEach(button => {
      button.addEventListener('click', () => {
        const publication = button.closest('.publication');
        const abstract = publication ? publication.querySelector('.pub-abstract') : null;
        if (!abstract) return;

        const isHidden = abstract.hasAttribute('hidden');

        // Close all other open abstracts first
        researchList.querySelectorAll('.pub-abstract:not([hidden])').forEach(openAbstract => {
          if (openAbstract !== abstract) {
            openAbstract.setAttribute('hidden', '');
            const openBtn = openAbstract.closest('.publication')?.querySelector('.btn-abstract-toggle');
            if (openBtn) openBtn.setAttribute('aria-expanded', 'false');
          }
        });

        if (isHidden) {
          abstract.removeAttribute('hidden');
          button.setAttribute('aria-expanded', 'true');
        } else {
          abstract.setAttribute('hidden', '');
          button.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* MISSING COVERS: a cover image that fails to load (or an entry with no cover yet)
     shows a styled placeholder with the journal/book name instead of a broken image.
     Adding the real file later (e.g. Assests/jcover/23.jpeg) makes it appear automatically. */
  function fillMissingCovers(scope) {
    if (!scope) return;
    scope.querySelectorAll('.pub-cover .cover-placeholder').forEach(box => {
      const showPlaceholder = () => {
        const entry = box.closest('.publication');
        const source = entry && entry.querySelector('.pub-journal em, .pub-journal');
        // journal/book name only: drop volume/pages after the first comma and any trailing year
        const name = source
          ? source.textContent.replace(/\s+/g, ' ').split(',')[0].replace(/\s*\b(19|20)\d{2}\b.*$/, '').trim()
          : '';
        const icon = document.createElement('i');
        icon.className = 'fa-solid fa-book-open';
        icon.setAttribute('aria-hidden', 'true');
        box.replaceChildren(icon);
        if (name) {
          const label = document.createElement('span');
          label.textContent = name;
          box.appendChild(label);
        }
        box.classList.add('cover-missing');
      };
      const img = box.querySelector('img');
      if (!img) { showPlaceholder(); return; }
      if (img.complete && img.naturalWidth === 0) showPlaceholder();
      else img.addEventListener('error', showPlaceholder, { once: true });
    });
  }

  function removePdfAndSuppInfoButtons(scope) {
    if (!scope) return;

    const blockedLabels = new Set(['pdf', 'supp. info', 'supp info']);
    scope.querySelectorAll('.pub-actions .btn-journal').forEach(button => {
      const label = button.textContent.trim().toLowerCase();
      if (blockedLabels.has(label)) {
        button.remove();
      }
    });
  }

  function getResearchYears() {
    if (!researchList) return [];

    return [...researchList.querySelectorAll('.pub-year-group[data-year]')]
      .map(section => section.getAttribute('data-year'))
      .filter(Boolean)
      .sort((a, b) => Number(b) - Number(a));
  }

  function filterResearchArticles() {
    if (!researchList) return;

    const query = (document.getElementById('pub-search-input')?.value || '').toLowerCase().trim();
    const selectedYear = document.getElementById('pub-year-select')?.value || 'all';
    const noResults = document.getElementById('pub-no-results');
    let totalVisible = 0;

    researchList.querySelectorAll('.pub-year-group').forEach(group => {
      const yearMatches = selectedYear === 'all' || group.getAttribute('data-year') === selectedYear;

      // Use explicit CSS class so display:none !important beats .publication{display:flex}
      if (!yearMatches) {
        group.classList.add('pub-yr-hidden');
        return;
      }

      group.classList.remove('pub-yr-hidden');

      if (!query) {
        // No search: show all articles in this group
        group.querySelectorAll('.publication').forEach(pub => pub.classList.remove('pub-item-hidden'));
        totalVisible++;
        return;
      }

      let groupVisible = false;
      group.querySelectorAll('.publication').forEach(pub => {
        const matches = pub.textContent.toLowerCase().includes(query);
        pub.classList.toggle('pub-item-hidden', !matches);
        if (matches) groupVisible = true;
      });
      if (!groupVisible) group.classList.add('pub-yr-hidden');
      else totalVisible++;
    });

    if (noResults) noResults.hidden = totalVisible > 0;
  }

  function buildResearchYearFilters() {
    const yearSelect = document.getElementById('pub-year-select');
    const searchInput = document.getElementById('pub-search-input');
    if (!yearSelect || !researchList) return;

    const years = getResearchYears();
    yearSelect.innerHTML = '<option value="all">Filter Year: All</option>'
      + years.map(yr => `<option value="${yr}">${yr}</option>`).join('');

    yearSelect.addEventListener('change', () => {
      filterResearchArticles();
      // Scroll search bar into view so the filtered results are immediately visible
      const bar = document.getElementById('pub-search-bar');
      if (bar) {
        const y = bar.getBoundingClientRect().top + window.pageYOffset - 130;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    });
    if (searchInput) searchInput.addEventListener('input', filterResearchArticles);
  }

  async function loadResearchArticles() {
    if (!researchList) return;

    try {
      const response = await fetch('research-articles.html', { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to load research articles: ${response.status}`);
      }

      researchList.innerHTML = await response.text();
      removePdfAndSuppInfoButtons(researchList);
      fillMissingCovers(researchList);
      bindResearchAbstractToggles();
      buildResearchYearFilters();
      filterResearchArticles();
    } catch (error) {
      console.error(error);
      researchList.innerHTML = '<p class="pub2-arch-copy">Research articles could not be loaded. If you are opening this page directly from the file system, please use a local web server.</p>';
    }
  }

  async function loadHtmlFragment(target, fileName, fallbackMessage) {
    if (!target) return;

    try {
      const response = await fetch(fileName, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error(`Failed to load ${fileName}: ${response.status}`);
      }

      target.innerHTML = await response.text();
      removePdfAndSuppInfoButtons(target);
      fillMissingCovers(target);
    } catch (error) {
      console.error(error);
      target.innerHTML = `<p class="pub2-arch-copy">${fallbackMessage}</p>`;
    }
  }

  await loadResearchArticles();
  await loadHtmlFragment(
    editedBooksList,
    'edited-books.html',
    'Edited books could not be loaded. If you are opening this page directly from the file system, please use a local web server.'
  );
  await loadHtmlFragment(
    bookChaptersList,
    'book-chapters.html',
    'Book chapters could not be loaded. If you are opening this page directly from the file system, please use a local web server.'
  );
  await loadHtmlFragment(
    proceedingsList,
    'proceedings.html',
    'Proceedings could not be loaded. If you are opening this page directly from the file system, please use a local web server.'
  );
});
