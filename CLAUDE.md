# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static portfolio website for visual artist Verónica Rita Iriarte. No build system, no dependencies — pure HTML, CSS, and vanilla JavaScript. Deployed via GitHub Pages.

## Local Development

Because `script.js` uses `fetch('./data.json')`, the site must be served over HTTP (not opened as a file). Use any local static server, e.g.:

```bash
npx serve .
# or
python -m http.server
```

## Architecture

- **[index.html](index.html)** — Single-page layout: sticky header with filter nav, gallery grid, about section, lightbox modal.
- **[data.json](data.json)** — Source of truth for artwork metadata. Each entry has: `id`, `category`, `title`, `year`, `medium`, `size`, `image` (relative path).
- **[script.js](script.js)** — Fetches `data.json` on load, renders `.artwork-card` buttons into `#gallery`, handles category filtering, and manages the lightbox (open/close, keyboard Escape, backdrop click).
- **[styles.css](styles.css)** — CSS custom properties for the color palette (`--bg`, `--surface`, `--text`, `--muted`, `--line`). Responsive via `clamp()` and a single breakpoint at 920px.

## Adding Artwork

1. Place the image in the appropriate `assets/<category>/` subfolder.
2. Add an entry to `data.json` with the matching `category` value (`paisajes`, `juegos`, `lazos`, or `abstractos`).
3. To add a new category, also add a `.filter-btn` in `index.html`.

## Assets Structure

```
assets/
  artista/      # Artist photo (foto.jpg) and sub-series (jardines, juegos, lazos)
  docs/         # CVs (cveng.pdf, cvesp.pdf)
  taller/       # Workshop image (Taller.png)
  obras/        # (artwork images by category)
```
