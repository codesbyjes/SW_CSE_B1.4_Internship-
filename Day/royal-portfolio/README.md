# Jeslene Iniya D — Royal Portfolio (React + Vite)

## Run it
```
npm install
npm run dev
```

## Adding your own images later

**Navbar background image** (sits behind the navbar only, above Hero):
1. Put your image at `public/navbar-bg.jpg` (any filename is fine).
2. Open `src/components/Navbar/Navbar.css`.
3. Uncomment the `background-image: url('/navbar-bg.jpg');` line inside `.navbar-bg-card`.

**Project images**: put them in `public/projects/` using the filenames already
referenced in `src/data/projects.js` (e.g. `jes-quotes.jpg`), or update the
`image` field for each project to match your filenames. Until a real image
exists, each project card/detail page automatically shows a gold placeholder
instead of a broken image — nothing to fix, it just upgrades itself once the
file is there.

**Profile photo**: already wired up at `public/Jes-dp.png`. Replace that file
directly to update it everywhere (Hero + About).

## Notes
- Page switching (Home/About/Skills/Projects/Contact) uses plain React state
  in `App.jsx`, not React Router — see the comment there for why, and how to
  upgrade later.
- Theme (dark/light) is saved to `localStorage` under `portfolio-theme`.
- `GitHubStats` fetches live data from the public GitHub API for `codesbyjes`.
