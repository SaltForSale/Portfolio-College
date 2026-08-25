# Evan Lee Portfolio

A responsive static portfolio for Evan Lee, a Computer Science and Game Simulation Arts and Science student at Rensselaer Polytechnic Institute.

## Run locally

Serve the folder so every asset loads consistently:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Stack

- Semantic HTML5
- Bootstrap 5.3.8 CSS, vendored locally
- Custom responsive CSS
- Vanilla JavaScript

## Content architecture

- `index.html`: overview, experience, and selected work
- `about.html`: education, skills, and internship history
- `projects.html`: recent and archived projects
- `contact.html`: contact links and Summer 2027 availability
- `js/projects-data.js`: single source of truth for every project card and project detail
- `assets/resume/Evan_Lee_Resume.pdf`: current résumé used by all pages

## Search and sharing

Canonical, Open Graph, X/Twitter, and Schema.org metadata use this public base URL:

`https://saltforsale.github.io/Portfolio-College/`

Update that URL in the four HTML files, `robots.txt`, `sitemap.xml`, and `llms.txt` if the deployment domain changes.

## Design palette

- White: `#e6e9fa`
- Gray: `#5c6373`
- Black: `#010415`
- Reload Blue: `#009ffb`
