# Copilot Instructions — בית"ר ירושלים Learning App

## Project Overview
An interactive Hebrew learning web app for kids, themed with Beitar Jerusalem football club colors (black & yellow). Teaches numbers 1-30, Hebrew alphabet, and includes quiz/memory games.

**Live**: https://asaflevi1983.github.io/Beitar/

## Architecture
- **Pure vanilla**: HTML5 + CSS3 + JavaScript (ES6+) — no frameworks, no build step
- **Single page**: `index.html` is the entry point
- **All logic**: `app.js` (main app logic, game modes, state management)
- **All styles**: `style.css` (responsive, RTL, Beitar black/yellow theme)
- **Assets**: `assets/images/` (SVG graphics), `assets/players/` (player images)
- **Deployment**: GitHub Pages from `main` branch root

## Key Conventions

### Language & RTL
- UI text is **Hebrew** — all labels, buttons, instructions in Hebrew
- Full **RTL** support throughout
- Comments in code can be English or Hebrew
- Web Speech API for Hebrew pronunciation (`lang: 'he-IL'`)

### Styling
- **Color palette**: Black (`#000`, `#1a1a2e`) backgrounds, Yellow (`#f5c518`, `#ffd700`) accents
- Beitar Jerusalem theme — football/soccer motifs everywhere
- Mobile-first responsive design
- No external CSS frameworks — pure CSS with Flexbox/Grid

### Code Style
- Vanilla JavaScript ES6+ (no TypeScript, no frameworks)
- `localStorage` for persisting scores and progress
- No external dependencies — everything self-contained
- SVG images inline or in `assets/` folder

### Game Modes
1. **Learning (למידה)** — Browse numbers 1-30 with visual soccer balls + Hebrew text-to-speech
2. **Quiz (חידון)** — Count soccer balls → pick the number
3. **Ordering (סדר נכון)** — Arrange 30 number cards in correct order (click-based, not drag & drop)
4. **Memory (זיכרון)** — Classic memory game with numbers (4×4, 6×6, 8×8 grids)
5. **Letters (אותיות)** — Learn the Hebrew alphabet (27 letters)

### Scoring
- Points system with streaks
- Auto-saved to localStorage
- Immediate feedback on answers

## When Making Changes
- Test in browser by opening `index.html` directly (no build needed)
- Keep it zero-dependency — don't add npm/webpack/etc.
- Maintain RTL and mobile responsiveness
- Keep the Beitar color scheme consistent
- All new text should be in Hebrew
- SVG is preferred for new graphics (scalable, theme-friendly)
- Ensure Web Speech API calls use `he-IL` locale

## File Map
```
index.html          — Main HTML (single page app)
app.js              — All JavaScript logic (~38KB)
style.css           — All styles (~13KB)
assets/images/      — SVG graphics (logos, stadium, icons)
assets/players/     — Player illustrations
images-demo.html    — Gallery page for all images
README.md           — Project documentation (Hebrew)
IMAGES.md           — Image asset documentation
```
