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

## Page flow and which painting is used where
1. Cover: `opening.webp` (couple's feet), tap to open
2. Page 1, "With divine blessings" and the names: `scene-blessing.webp`
3. Page 2, save the date: `scene-celebrate.webp`
4. Page 3, the wedding (Dharmapuri, 7:00 AM, See location): `scene-celebrate.webp`
5. Page 4 (last), countdown + "We look forward to celebrating with you.": `scene-sunrise.webp`
"Start over" on the last page returns to the cover.
To use higher-resolution paintings, replace the files with the same names (portrait, about 9:16; 1170 x 2080 px is ideal).

## Things to know
- The paintings carry a small white sparkle mark in the bottom-right corner (added by the image tool). It is left untouched.
- The countdown is automatic (India time): it shows days, switches to hours in the last 24 hours, says "Today" on the wedding day and thanks guests afterwards.
- Venue / time / map link: `index.html`, section `s3`.

## Background music (optional)
Put a licensed track at `assets/music/nadaswaram.mp3`. It starts when the guest taps to open (browsers only allow sound after a tap) and a small speaker button appears. If the file is missing, no button is shown.

## About hiding the code
Anything a browser can run can be read by visitors, so code cannot be truly secret on a public site.
Later options: minify + obfuscate the JavaScript in a GitHub Action, or keep the repo private and host from Netlify / Cloudflare Pages.
