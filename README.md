# AETHERION

A drifting sky-realm where ancient magic and forgotten technology grew into
the same thing. Scroll to fly through a floating crystal citadel, past
glowing energy bridges, down to a living core you can drag and spin.

Built for the **3D Websites Hackathon**.

## Tech used

- React + Vite
- React Three Fiber / Three.js (3D scene)
- Custom GLSL shaders (hand-written, simplex-noise-displaced plasma material
  for the Heartstone core + a fresnel energy-field shell)
- @react-three/drei (Float, Sparkles, Stars, Environment, Html for 3D-anchored
  UI hotspots)
- @react-three/postprocessing (Bloom, God Rays, Chromatic Aberration, Vignette)
- Plain CSS (no framework) — Cinzel + Space Grotesk from Google Fonts

## Run it locally

```bash
npm install
npm run dev
```

Open the printed `localhost` URL. That's it — no env vars, no backend.

## Build for production

```bash
npm run build
```

Outputs a static site to `dist/`. This is a plain static site — no server
required to run it, just to build it.

## Deploy it (need a public link for submission)

**Easiest — Netlify Drop:**
1. Run `npm run build`
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder onto the page
4. You get a public URL instantly, no account required (an account lets you keep it permanently)

**Also easy — Vercel:**
1. Push this folder to a new GitHub repo
2. Go to https://vercel.com/new, import the repo
3. Framework preset: Vite. Leave build settings as default (`npm run build`, output `dist`)
4. Deploy — you get a public URL

**Also fine — GitHub Pages:** works too but needs a `base` path tweak in
`vite.config.js` if you don't deploy to the repo root — Netlify/Vercel avoid
that fuss, so they're recommended for a hackathon deadline.

## Where things live (if you want to tweak anything)

- `src/data/journey.js` — the 5 checkpoints: camera positions + all section
  copy. Edit text here without touching any 3D code.
- `src/scene/CameraRig.jsx` — the scroll-driven camera flythrough (spline
  through the checkpoints above)
- `src/scene/Heartstone.jsx` — the draggable glowing core
- `src/scene/Islands.jsx` / `Bridges.jsx` — the floating islands and the
  energy bridges connecting them
- `src/scene/Ambient.jsx` — stars, particles, fog, lights
- `src/ui/` — the scrolling text overlay, loader, side progress indicator
- `src/App.css` — every visual style, using the CSS variables at the top of
  `src/index.css` (colors, fonts) as the single source of truth for the palette

## Customizing quickly

- **Change the color palette:** edit the `--color-*` variables at the top of
  `src/index.css`. Everything (3D emissive colors, UI accents) reads from a
  handful of hex values duplicated into `journey.js` island colors and the
  scene files — search for the hex values there too if you want a full
  re-theme.
- **Add/remove a checkpoint:** add or remove an entry in
  `CHECKPOINTS` in `src/data/journey.js`. The camera path and side indicator
  update automatically. Keep `progress` values ascending 0 → 1.
- **Slow down / speed up the flythrough:** the whole site's length is
  controlled by how many sections exist (each is 100vh). More checkpoints =
  longer scroll = slower journey.

## Submission checklist (from the hackathon rules)

- [ ] Public website link (deploy first — see above)
- [ ] Project description — see suggested copy below
- [ ] At least 3 screenshots — take them at the hero, mid-scroll, and the
      Heartstone section for the best variety
- [ ] Demo video (optional, 1–5 min) — screen-record a slow scroll top to
      bottom, that alone sells it
- [ ] List of tech used — see "Tech used" above
- [ ] Source code — this whole folder (minus `node_modules`)

### Suggested project description

> AETHERION is a scroll-driven flythrough through a floating sky-realm where
> old magic and forgotten technology grew into the same thing. As you scroll,
> the camera flies past a crystal citadel, along glowing energy bridges, and
> down to a living core — the Heartstone — built from a hand-written GLSL
> shader that you can drag and spin yourself. Floating lore markers open
> field notes written in different in-world voices. God rays, bloom, and a
> custom glass/energy shell give the core real presence, and a slowly
> orbiting satellite and drifting asteroids keep the background alive. Built
> solo in React Three Fiber with a hand-tuned camera spline. Inspired by the
> idea that a website doesn't have to be a page you read — it can be a small
> world you visit.

Feel free to edit that to sound like you — judges can usually tell when copy
is too polished/generic, so add a sentence about what was hardest to get
right or what you'd add next if you had more time.
