# Steering Guide (for maintainers and AI agents)

## What this app is
A single-page personal portfolio built with Create React App (React 18), styled-components, framer-motion, and React Router. It showcases your profile, background, featured projects, and mission, and is deployed to GitHub Pages.

- **Primary goals**: present identity, highlight achievements/projects, invite contact, and provide a visually polished, animated experience.
- **Deployment**: static build published to GitHub Pages using the `gh-pages` package and the `homepage` field in `package.json`.

## Tech stack
- **React 18** (`react`, `react-dom`)
- **Create React App** (`react-scripts`)
- **Routing**: `react-router-dom` (BrowserRouter)
- **Styling**: `styled-components`
- **Animations**: `framer-motion` (variants + in-view), plus CSS keyframes
- **Icons**: `lucide-react`
- **Media**: `react-player` (video background option)

## High-level architecture
- Global theme and CSS baselines live in `src/theme.js` via `ThemeProvider` + `GlobalStyles`.
- App shell is `src/App.jsx`: header and footer persist; central `<Routes>` renders route pages.
- Pages currently used for routing live in `src/pages/*`.
- Reusable section components exist in `src/components/*` (some are prototypes not currently routed).
- Public assets are served from `public/*` (images and video referenced with absolute paths like `/images/...`).

```
App.jsx
- ThemeProvider(GlobalStyles)
- BrowserRouter
  - Header (sticky)
  - Routes: "/", "/background", "/projects", "/mission"
  - Footer
```

## Routing
- Defined in `src/App.jsx` with `BrowserRouter`, `Routes`, `Route`.
- Navigation is in `src/components/Header/Header.jsx` using `Link` and active state highlighting.
- Note for GitHub Pages deep links: see Deployment section for SPA fallback.

## Data sources
- `src/portfolioData.js`: canonical profile info (name, role, email, bio, socials, skills, experience, education, projects). Used by `Footer`, `Home`, and some component prototypes.
- `src/data/projects.js`: `featuredProjects` array used by the routed `src/pages/Projects.jsx` (source of truth for the Projects page UI today).
- Recommendation: continue using `src/data/projects.js` for the Projects page; optionally unify later by reading from `portfolioData.projects` only.

## Pages (current routes)
- `src/pages/Home.jsx`
  - Animated hero title using your `portfolioData.name` and a custom typing effect for roles.
  - Elaborate animated background: layered gradients, orbs, textures, shimmer, subtle noise.
  - “My Journey” section with three story cards using images from `public/images`.
- `src/pages/Background.jsx`
  - Timeline-style “journal entries” with sticky-note cards and placeholder image frames.
- `src/pages/Projects.jsx`
  - Carousel of featured projects using `featuredProjects` (image/video placeholders; CTA to project and code).
- `src/pages/Mission.jsx`
  - “Coming soon” placeholder with shimmering skeleton, progress bar, and a modal mailing list form (Formspree + localStorage fallback).

## Shared UI
- `src/components/Header/Header.jsx`
  - Fixed, translucent header with logo, CTA email link, desktop links, and a mobile menu.
- `src/components/Footer/Footer.jsx`
  - Contact email copy-to-clipboard, social icons from `portfolioData.social`, and back-to-top button.

Note: There are additional component versions of Background/Projects/Mission in `src/components/*` that are not currently routed. They are more detailed variants that consume `portfolioData`. Treat them as prototypes or future upgrades.

## Theming and styling
- Central theme tokens in `src/theme.js`: colors, fonts, font sizes, spacing, breakpoints, shadows, transitions, z-indices, header heights.
- Global styles include fonts, base resets, custom scrollbar, page transition utility classes, and respects `prefers-reduced-motion`.
- All components use `styled-components` and receive theme via context.
- Color system is dark with red/gold/purple gradients.

## Animations and UX
- `framer-motion` variants for entrance and in-view animations (e.g., titles, cards, progress bars).
- CSS keyframes for flowing gradients, orbs, shimmer, and subtle texture motion.
- Accessibility: `prefers-reduced-motion` significantly reduces animations; keyboard focus styles present on buttons and links.

## Assets and media
- All public assets live in `public/images/*` (and video under the same folder). Reference them with absolute paths like `/images/sloan-win-stage.jpg`.
- Example assets used:
  - Header logo: `/images/logo1.png`
  - Home story images: `/images/young-me-2.png`, `/images/sloan-win-stage.jpg`, `/images/nature.png`
  - Optional hero video (unused in routed pages): `/images/swish.mp4`
- Some TODO items in data reference images/videos that may not yet exist; add them as needed.

## Loading behavior
- Images in content sections use native `loading="lazy"` where appropriate.
- Animations are in-view driven to avoid heavy offscreen work.
- Video components (optional) default to muted loop; controlled play in Projects component.

## Environment and scripts
- `npm start`: local dev at `http://localhost:3000`.
- `npm run build`: clean and build to `build/`.
- `npm run deploy`: builds and publishes `build/` to the `gh-pages` branch.
- `homepage` in `package.json` is set to `https://amaansupariwala.github.io/`.

## Deployment (GitHub Pages)
1. Ensure repository Pages settings point to the `gh-pages` branch, root.
2. Run:
   - `npm install`
   - `npm run deploy`
3. The `gh-pages` script pushes the `build` output to the `gh-pages` branch.
4. SPA deep links on GitHub Pages: Because we use `BrowserRouter`, direct navigation to nested routes like `/projects` can 404. Use one of the following:
   - Preferred: add a `public/404.html` that is an exact copy of `public/index.html` so GitHub Pages serves the SPA for unknown routes.
   - Alternative: switch to `HashRouter` if you prefer not to add a 404 fallback (URLs become `/#/projects`).

## How to make common changes

### Update profile, socials, and footer contact
- Edit `src/portfolioData.js` fields: `name`, `role`, `email`, `location`, and the `social` array.
- Header CTA mail link is in `src/components/Header/Header.jsx` (`CtaButton` `href=mailto:...`).

### Update theme (colors, fonts, spacing)
- Edit tokens in `src/theme.js`. Colors are centralized under `theme.colors` and gradients under `theme.colors.gradient`.

### Update Home content
- The displayed name comes from `portfolioData.name`.
- Typing effect texts are in `src/pages/Home.jsx` under `typingTexts`.
- Story card images are `/images/young-me-2.png`, `/images/sloan-win-stage.jpg`, `/images/nature.png`. Replace or add images in `public/images` and update `src/pages/Home.jsx` paths.

### Update Background page
- `src/pages/Background.jsx` uses a predefined timeline (`journalEntries`). Update text there. The image area is currently a stylized placeholder; swap `EntryImage` for actual `<img src="/images/..." />` if desired.

### Update Projects page
- Edit `src/data/projects.js` `featuredProjects` entries (title, category, description, `url`, `github`, `achievement`, `tags`).
- Provide assets referenced by `image`/`videoUrl` in `public/images`. For missing items, either add files or point to existing ones like `/images/sloan-win-stage.jpg`.

### Update Mission page
- Edit copy in `src/pages/Mission.jsx`.
- The modal posts to Formspree (`https://formspree.io/f/xgvyjaqv`). Change this endpoint if you want a different form or disable it.

### Add a new page
1. Create `src/pages/NewPage.jsx` and export a component.
2. Add a route in `src/App.jsx`:
   ```jsx
   <Route path="/new" element={<NewPage />} />
   ```
3. Add a nav link in `src/components/Header/Header.jsx` (new `<li><NavLink to="/new">New</NavLink></li>`).

### Images and video
- Place images/videos under `public/images/`.
- Reference them with absolute paths starting with `/images/...`.
- Prefer web-friendly sizes; compress large media.

## Known gotchas
- Deep linking on GitHub Pages with `BrowserRouter` needs a `404.html` fallback (see Deployment).
- There are two project data sources (`portfolioData.projects` and `data/featuredProjects`). Currently the routed Projects page uses `data/featuredProjects`.
- Some section components in `src/components/*` aren’t routed; they are safe to remove if you want to declutter, or you can replace the page versions with them if preferred.

## Quality checklist
- Images exist for all referenced paths; broken links removed.
- External links use `target="_blank"` with `rel="noopener noreferrer"`.
- Animations remain tasteful; verify reduced-motion behavior.
- Lighthouse pass for performance and accessibility.

## Open questions for the owner
- Should we unify project data to a single source (`portfolioData.projects`) instead of `data/featuredProjects`?
- Do you want to keep the component-based versions in `src/components/*` or fully adopt the current routed `src/pages/*` versions?
- Should the hero use the video background (`components/Hero/Hero.jsx`) or the current animated CSS background in `pages/Home.jsx`?
- Confirm the canonical contact email: header CTA currently points to `amaan2something@gmail.com`, footer uses `amaan.supariwala@gmail.com`.
- Do you want to add a `public/404.html` now to fix deep-link refresh on GitHub Pages?
- Any analytics or SEO additions (meta tags, OpenGraph/Twitter cards)?

## Local development quickstart
```
npm install
npm start
```

## Deploy
```
npm run deploy
```
After the first deploy, set GitHub Pages to serve from the `gh-pages` branch.
