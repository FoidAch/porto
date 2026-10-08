# Alex Rivera — Portfolio Website

A minimalist developer portfolio built with **pure HTML, Vanilla CSS, and Vanilla JavaScript**.
No frameworks, no build step, no dependencies. Open `index.html` and it runs.

---

## Quick start

```bash
# Option 1 — just open it
start index.html

# Option 2 — local dev server
npx -y serve -l 5173 .
```

Then visit <http://localhost:5173>.

---

## File structure

```
.
├── index.html        # Home — hero, stats, selected work, skills
├── projects.html     # Full project grid with category filters
├── about.html        # Bio, experience timeline, capabilities
├── contact.html      # Contact methods + validated form
├── css/
│   └── style.css     # Design tokens, layout, components, responsive rules
├── js/
│   ├── data.js       # ★ ALL editable content lives here
│   └── main.js       # Rendering, theme, nav, filtering, form behaviour
└── assets/
    └── favicon.svg
```

---

## Editing content

> **Everything you want to change is in [`js/data.js`](js/data.js).** No markup edits required.

| Constant | Controls |
| --- | --- |
| `PROFILE` | Name, monogram, title, email, location, bio, facts, social links |
| `STATS` | The four metrics in the home page strip |
| `PROJECTS` | Every project card (title, description, tags, category, artwork hue) |
| `FILTERS` | Filter pill labels on the projects page |
| `EXPERIENCE` | Timeline entries on the about page |
| `SKILLS` | Skill cards and proficiency percentages |
| `TOOLKIT` | The scrolling marquee strip |
| `TINTS` | Colour palettes for the generated project artwork |

### Adding a project

Append an object to `PROJECTS`:

```js
{
  title: "Project Name",
  description: "One or two sentences about the problem you solved.",
  year: "2026",
  role: "Your role",
  tags: ["React", "TypeScript"],
  category: "web",        // must match a FILTERS key
  href: "https://…",
  featured: true,         // optional — highlights on the home page
  tint: "indigo",         // indigo | cyan | violet | emerald | amber | rose
  index: "07"
}
```

### Swapping the artwork

Project thumbnails and the About portrait are **generated inline SVG** — no image files.
To use a real photo instead, replace the `projectArtwork(...)` / `portraitArtwork()`
output in [js/data.js](js/data.js) with an `<img>` tag.

---

## Theming

Dark is the default; light mode activates via OS preference or the toggle in the nav.
The choice persists in `localStorage` under `portfolio-theme`.

To change the palette, edit the custom properties at the top of
[css/style.css](css/style.css):

```css
:root {
  --bg: #08090a;
  --accent: #5e6ad2;
  --gradient-accent: linear-gradient(135deg, #5e6ad2, #7c8cff, #a78bfa);
}
```

---

## Contact form

The form validates **client-side only** and logs the payload to the console — there is
no backend. To make it live, point the submit handler at your endpoint
(e.g. Formspree, Netlify Forms, or your own API) in
`initForm()` in [js/main.js](js/main.js).

---

## Accessibility & SEO

- Semantic landmarks, one `<h1>` per page, skip-to-content link
- Visible focus rings, `aria-*` state on nav and filter controls
- `prefers-reduced-motion` honoured throughout
- Per-page titles, meta descriptions, Open Graph tags, JSON-LD `Person` schema
- [sitemap.xml](sitemap.xml) and [robots.txt](robots.txt) included

> Update the `https://alexrivera.dev/` URLs in `sitemap.xml` and `robots.txt`
> once you have a real domain.

---

## Verification

```bash
node --check js/data.js     # JS syntax
node --check js/main.js
npx -y html-validate "*.html"
```
