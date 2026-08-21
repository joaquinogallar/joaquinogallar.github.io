# Joaquin Ogallar Portfolio

Personal portfolio website for Joaquin Ogallar, focused on backend development with Java and Spring Boot.

## Run Locally

Because the site loads project data with browser modules and `fetch`, serve it through a local HTTP server instead of opening `index.html` directly:

```bash
python3 -m http.server
```

Then open `http://localhost:8000` in a browser.

## Project Structure

- `index.html` — portfolio landing page.
- `index.css` — landing page styles and responsive layout.
- `main.js` — project listing, rendering, pagination, and tab navigation.
- `project.html` — project detail page.
- `project.js` — project detail rendering.
- `project-service.js` — project data loading and lookup.
- `assets/data.json` — project content and metadata.
- `assets/img/` — project, social, and technology images.
- `assets/cv/cv.pdf` — local CV file, when provided.

## Deployment

The site is static and can be deployed with GitHub Pages or any static hosting provider.
