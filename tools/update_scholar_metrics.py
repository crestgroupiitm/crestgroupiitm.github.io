#!/usr/bin/env python3
"""
Refresh the Google Scholar citation count and h-index across the CREST site.

Two data paths, tried in order:

  1. SerpApi  — reliable, needs the SERPAPI_API_KEY env var. Google Scholar has no
                public API, so this is the only dependable way to read it from a
                datacenter IP (GitHub Actions runners are blocked by Scholar).
  2. scholarly — free, scrapes Scholar directly. Works from residential IPs; from
                CI it is best-effort and will often be refused. That is fine: if
                both paths fail the script leaves every file untouched and exits 0.

The script never writes a value it cannot sanity-check, so a throttled or garbage
response can't vandalise the published numbers.

Usage:
    python tools/update_scholar_metrics.py --dry-run
    python tools/update_scholar_metrics.py
"""

from __future__ import annotations

import argparse
import io
import os
import re
import sys
from datetime import date
from pathlib import Path

SCHOLAR_USER_ID = "gAIc9hEAAAAJ"
ROOT = Path(__file__).resolve().parent.parent

# Files that display the metrics, and how they display them.
TARGET_FILES = ["index.html", "pi.html", "publications.html"]

# Guard rails — a fetched value outside these bounds is treated as a bad read.
MIN_CITATIONS = 5_000
MAX_CITATIONS = 500_000
MIN_H_INDEX = 30
MAX_H_INDEX = 200
# Citations essentially never fall. Allow a small dip for Scholar's own corrections.
MAX_ALLOWED_DROP_RATIO = 0.90


# ─────────────────────────── fetching ───────────────────────────

def fetch_via_serpapi(api_key: str) -> tuple[int, int] | None:
    """Read total citations and h-index from SerpApi's Google Scholar Author API."""
    try:
        import urllib.parse
        import urllib.request
        import json

        params = urllib.parse.urlencode(
            {"engine": "google_scholar_author", "author_id": SCHOLAR_USER_ID, "api_key": api_key}
        )
        url = f"https://serpapi.com/search.json?{params}"
        with urllib.request.urlopen(url, timeout=60) as resp:
            data = json.loads(resp.read().decode("utf-8"))

        table = data.get("cited_by", {}).get("table", [])
        citations = h_index = None
        for row in table:
            if "citations" in row:
                citations = row["citations"].get("all")
            if "h_index" in row:
                h_index = row["h_index"].get("all")
        if citations is None or h_index is None:
            print("serpapi: response did not contain cited_by.table values")
            return None
        return int(citations), int(h_index)
    except Exception as exc:  # noqa: BLE001 - any failure means "fall through"
        print(f"serpapi: {exc}")
        return None


def fetch_via_scholarly() -> tuple[int, int] | None:
    """Read the same two numbers by scraping, via the `scholarly` package."""
    try:
        from scholarly import scholarly  # type: ignore

        author = scholarly.search_author_id(SCHOLAR_USER_ID)
        author = scholarly.fill(author, sections=["indices"])
        citations = author.get("citedby")
        h_index = author.get("hindex")
        if citations is None or h_index is None:
            print("scholarly: profile returned no indices")
            return None
        return int(citations), int(h_index)
    except Exception as exc:  # noqa: BLE001
        print(f"scholarly: {exc}")
        return None


def fetch_metrics() -> tuple[int, int] | None:
    key = os.environ.get("SERPAPI_API_KEY", "").strip()
    if key:
        print("Fetching via SerpApi…")
        result = fetch_via_serpapi(key)
        if result:
            return result
        print("SerpApi failed; falling back to scholarly.")
    else:
        print("No SERPAPI_API_KEY set; using scholarly (best-effort).")
    return fetch_via_scholarly()


# ─────────────────────────── formatting ───────────────────────────

def display_citations(n: int) -> tuple[str, int]:
    """
    Match the site's existing convention: round DOWN to the nearest thousand and
    append '+', e.g. 10001 -> ('10,000+', 10000). The second value is what the
    animated counter counts up to.
    """
    if n < 1000:
        return f"{n:,}", n
    floored = (n // 1000) * 1000
    return f"{floored:,}+", floored


# ─────────────────────────── rewriting ───────────────────────────

def build_patterns(cite_text: str, cite_target: int, h_index: int, as_of: str):
    """(regex, replacement) pairs, each anchored on its own visible label."""
    return [
        # index.html / publications.html impact strip — animated citation counter
        (
            re.compile(
                r'(<span class="counter" data-target=")\d+("></span>|">0</span>)'
                r'(<span class="plus">\+</span></div>\s*<div class="impact-label">Total Citations)'
            ),
            lambda m: f"{m.group(1)}{cite_target}{m.group(2)}{m.group(3)}",
        ),
        # index.html / publications.html impact strip — h-index
        (
            re.compile(r'(<div class="impact-num">)\d+(</div>\s*<div class="impact-label">h&#8209;Index)'),
            lambda m: f"{m.group(1)}{h_index}{m.group(2)}",
        ),
        # pi.html / publications.html hero stat — citations
        (
            re.compile(r'(<strong>)[\d,]+\+?(</strong>\s*<span>Citations</span>)'),
            lambda m: f"{m.group(1)}{cite_text}{m.group(2)}",
        ),
        # pi.html / publications.html hero stat — h-index
        (
            re.compile(r'(<strong>)\d+(</strong>\s*<span>h&#8209;[Ii]ndex</span>)'),
            lambda m: f"{m.group(1)}{h_index}{m.group(2)}",
        ),
        # provenance line under the stats
        (
            re.compile(r'(class="[^"]*metrics-asof[^"]*"[^>]*>.*?as of )[A-Z][a-z]+ \d{4}', re.S),
            lambda m: f"{m.group(1)}{as_of}",
        ),
    ]


def current_citations(text: str) -> int | None:
    m = re.search(r'<span class="counter" data-target="(\d+)"[^>]*></?span>?<span class="plus">', text)
    if m:
        return int(m.group(1))
    m = re.search(r"<strong>([\d,]+)\+?</strong>\s*<span>Citations</span>", text)
    return int(m.group(1).replace(",", "")) if m else None


def shown_metrics(text: str) -> tuple[int, int, str] | None:
    """(citations, h-index, "Month YYYY") as a page currently displays them."""
    c = current_citations(text)
    h = re.search(r"<strong>(\d+)</strong>\s*<span>h&#8209;[Ii]ndex</span>", text)
    a = re.search(r'class="[^"]*metrics-asof[^"]*"[^>]*>.*?as of ([A-Z][a-z]+ \d{4})', text, re.S)
    return (c, int(h.group(1)), a.group(1)) if c and h and a else None


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true", help="report changes without writing")
    ap.add_argument("--citations", type=int, help="skip fetching; use this citation count")
    ap.add_argument("--h-index", type=int, help="skip fetching; use this h-index")
    ap.add_argument("--as-of", help='month to show, e.g. "November 2026" (default: this month)')
    args = ap.parse_args()

    if args.citations and args.h_index:
        citations, h_index = args.citations, args.h_index
        print(f"Using supplied values: {citations} citations, h-index {h_index}")
    else:
        fetched = fetch_metrics()
        if not fetched:
            print("Could not read Scholar metrics. Leaving all files unchanged.")
            return 0
        citations, h_index = fetched
        print(f"Fetched: {citations} citations, h-index {h_index}")

    # Sanity guards — refuse to publish an implausible read.
    if not (MIN_CITATIONS <= citations <= MAX_CITATIONS):
        print(f"REFUSED: citation count {citations} outside {MIN_CITATIONS}–{MAX_CITATIONS}.")
        return 0
    if not (MIN_H_INDEX <= h_index <= MAX_H_INDEX):
        print(f"REFUSED: h-index {h_index} outside {MIN_H_INDEX}–{MAX_H_INDEX}.")
        return 0

    existing = current_citations((ROOT / "publications.html").read_text(encoding="utf-8"))
    if existing and citations < existing * MAX_ALLOWED_DROP_RATIO:
        print(f"REFUSED: {citations} is a suspicious drop from {existing}.")
        return 0

    cite_text, cite_target = display_citations(citations)
    as_of = args.as_of or date.today().strftime("%B %Y")
    patterns = build_patterns(cite_text, cite_target, h_index, as_of)

    total = 0
    for name in TARGET_FILES:
        path = ROOT / name
        if not path.exists():
            print(f"skip {name} (not found)")
            continue
        original = path.read_text(encoding="utf-8")
        updated = original
        hits = 0
        for regex, repl in patterns:
            updated, n = regex.subn(repl, updated)
            hits += n
        if updated != original:
            if not args.dry_run:
                io.open(path, "w", encoding="utf-8", newline="").write(updated)
            print(f"{'would update' if args.dry_run else 'updated'} {name} ({hits} substitutions)")
            total += hits
        else:
            print(f"{name} already current ({hits} substitutions matched, no change)")

    print(f"\nDisplay values: {cite_text} citations · h-index {h_index} · as of {as_of}")
    print(f"{'Would apply' if args.dry_run else 'Applied'} {total} change(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main())
