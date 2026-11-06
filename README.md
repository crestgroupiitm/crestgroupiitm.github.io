# CREST Research Laboratory — Website

Static website for the CREST group (Prof. Vinu Ravikrishnan, IIT Madras).
Live at: **https://crestgroupiitm.github.io**

## 1. Publishing on GitHub Pages (one-time setup)

1. GitHub account (personal or organization) named **`crestgroupiitm`**.
2. New **public** repository named exactly **`crestgroupiitm.github.io`**.
3. Upload the full contents of this folder to the repository root, including the
   hidden `.nojekyll` file and the `.github` folder.
   - Easiest: GitHub Desktop → clone the empty repo → copy these files in → Commit → Push.
   - The browser "Upload files" page skips hidden files/folders (`.nojekyll`, `.github`).
4. **Settings → Pages**: Source = *Deploy from a branch*, Branch = `main`, folder = `/ (root)` → Save.
5. **Settings → Pages → Enforce HTTPS**: tick it (available a few minutes after the first deploy).
6. Live within 1–2 minutes at https://crestgroupiitm.github.io

## 2. Google Search Console (SEO)

1. Open https://search.google.com/search-console → **Add property** → **URL prefix** →
   `https://crestgroupiitm.github.io/`
2. Verification method **HTML tag**: copy the `<meta name="google-site-verification" ...>` tag,
   paste it into `index.html` inside `<head>` (right below `<meta charset="UTF-8">`), commit, then click *Verify*.
3. **Sitemaps** → submit `sitemap.xml`.
4. **URL inspection** → paste the home page URL → *Request indexing*. Repeat for `pi.html` and `publications.html`.
5. Optional: do the same in Bing Webmaster Tools (it can import from Search Console in one click).

Already built in: page titles and descriptions, canonical URLs, sitemap, robots.txt,
structured data (lab as a ResearchOrganization, Prof. Vinu as a Person linked to ORCID /
Google Scholar / LinkedIn / ResearchGate), favicon, 404 page, mobile viewport.

## 3. Link previews (WhatsApp, LinkedIn, Facebook, X)

Every page shares with the card `Assests/og-image.jpg` (Prof. Vinu's photo + lab name).
After the site is live, paste a page link into https://www.linkedin.com/post-inspector/ and
https://developers.facebook.com/tools/debug/ (press *Scrape again*) to refresh their caches.
WhatsApp caches previews per link for a while; new links pick up the card immediately.

## 4. Security & privacy measures in this site

- Content-Security-Policy on every page: JavaScript only from this site (libraries are served
  locally, pinned versions); no inline scripts; no plugins; refuses to run inside another site's
  frame (clickjacking guard).
- The only third-party files are Google Fonts and Font Awesome (stylesheet with Subresource Integrity).
- Email address is never in the page source as text; it is assembled only after a real visitor
  moves, scrolls, taps or clicks, so address-harvesting bots do not get it.
- Photos: metadata (camera, GPS location) stripped; right-click / drag / long-press saving disabled;
  Google Images and AI-training crawlers (GPTBot, CCBot, ClaudeBot, Google-Extended, etc.)
  are blocked in `robots.txt`.
- Honest limit: anything a visitor can see can still be screenshotted, and `robots.txt` is only
  obeyed by well-behaved bots. Do not publish anything that must stay private.

## 5. Updating content

Edit the files and commit/push; GitHub republishes automatically within a minute or two.
- Keep file-name case exactly as referenced (`photo.JPG` ≠ `photo.jpg` on GitHub).
- Do not add inline `<script>` blocks or `onclick="..."` attributes: the security policy blocks
  them. Put JavaScript in a `.js` file under `js/` and include it with `<script src="...">`.

## 6. Automatic citation metrics (optional)

`.github/workflows/update-scholar-metrics.yml` refreshes the Google Scholar citation count and
h-index on the 1st of every month (or on demand: **Actions** tab → *Run workflow*).
- **Settings → Actions → General → Workflow permissions** → *Read and write permissions*.
- For reliable fetching add a SerpApi key: **Settings → Secrets and variables → Actions →
  New repository secret**, name `SERPAPI_API_KEY`. Without it a free scraper is used, which
  Google sometimes blocks (the numbers then just stay unchanged).
