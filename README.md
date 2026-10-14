# Ragini & Prem · Wedding invite (final)

Static website. No build step, no server code. Works on any static host.

## Files
- `index.html` – page structure and wording
- `css/style.css` – design, layout, animation
- `js/app.js` – tap-to-open, swipe / scroll / tap navigation, rolling digits, countdown, petals, music
- `assets/scenes/` – the four painted scenes (`opening`, `scene-blessing`, `scene-sunrise`, `scene-celebrate`, all .webp)
- `assets/music/` – optional background music (see below)
- `build.py` – optional: makes a one-file copy (`dist/invite.html`) with everything inlined

## Host it on GitHub Pages
1. Create a new repository on GitHub (public).
2. Upload everything in this folder (keep `index.html` at the top level). Do not upload `dist/` if you don't want it.
3. Repository → Settings → Pages → "Deploy from a branch" → branch `main`, folder `/ (root)` → Save.
4. After a minute your invite is live at `https://<your-username>.github.io/<repo-name>/`. Share that link.
Tip: if you change an image, rename it (or add `?v=2` to its name in the CSS) so phones do not show the old cached copy.

## Which painting is used where
- Opening: `opening.webp` (couple's feet)
- Page 1, blessings and names: `scene-blessing.webp`
- Pages 2 to 4, save the date / the wedding / countdown: `scene-sunrise.webp`
- Page 5, closing: `scene-celebrate.webp`
To use higher-resolution paintings, replace the files with the same names (portrait, ratio 9:16 or similar; 1170 x 2080 px is ideal for sharp phones).

## Things to know
- The paintings carry a small white sparkle mark in the bottom-right corner (added by the image tool). It is left untouched.
- The date logic is automatic (India time): before the wedding it shows the countdown, on the day it says "Today", afterwards it thanks guests.
- Venue / time / map link: `index.html`, section `s3`.

## Background music (optional)
Put a licensed track at `assets/music/nadaswaram.mp3`. It starts when the guest taps to open (browsers only allow sound after a tap) and a small speaker button appears. If the file is missing, no button is shown.

## About hiding the code
Anything a browser can run can be read by visitors, so code cannot be truly secret on a public site.
Later options: minify + obfuscate the JavaScript in a GitHub Action, or keep the repo private and host from Netlify / Cloudflare Pages.
