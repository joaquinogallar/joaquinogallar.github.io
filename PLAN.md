# Portfolio Improvement Plan

## Context

Review of the portfolio repo (`joaquinogallar.github.io`) found real bugs in the project detail page, dead code, accessibility issues, and weak SEO metadata. This plan covers only changes that can be made inside this repo. CV content, work experience wording, and personal data changes are out of scope (see "Requires your decision").

## Step 1 — Fix project detail page (`project.js`, `project.html`, `main.js`)

- Extract `ProjectService` into its own module (`project-service.js`). Currently `project.js` imports `main.js`, which triggers the `ProjectPaginator` side effect and throws a `null.after()` error on every detail page.
- Update imports in `main.js` and `project.js` to use the new module.
- `project.js`: handle missing project (show a "Project not found" message instead of a `TypeError` on `proj.title`).
- `project.js`: make `steps` optional (`proj.details.steps ?? []`) — today the page crashes for `id=0` because `details` has no `steps`.
- `project.js`: assign `proj.image` to `#p-img` — the image is fetched but never rendered.
- `project.html`: add dynamic `alt` text to the image.

## Step 2 — Fix empty image on home (project id 0)

- In `ProjectRenderer._createProjectImage` (`main.js`): when `project.image` is empty, render a CSS gradient placeholder instead of `<img src="">` (broken image icon).
- Alternative that requires user input: upload a real image for Personal Blog.

## Step 3 — Accessibility for contact section

- Replace the `div onclick="window.open(...)"` elements for LinkedIn/GitHub/CV (`index.html:126-147`) with real `<a>` elements with `href`, `target="_blank"`, and `rel="noopener"`.

## Step 4 — Code cleanup

- Remove dead class `ProjectRenderById` and leftover `//test` comments in `main.js`.
- Remove the `OLD_STYLES` commented block in `index.css`.
- Fix `#oval3`: two conflicting `transform` declarations override the `rotate` (`index.css:178-190`).
- Fix duplicated `alt` attributes in the skills section (`index.html:152-210`).
- Fix typo "responsability" -> "responsibility" (`index.html:82`).
- Remove empty `srcset=""` attributes.

## Step 5 — SEO / metadata

- Add `<meta name="description">` and improve `og:description` (currently just "Personal portfolio").
- Add a favicon (simple SVG or reuse an existing asset) — optional.

## Step 6 — CV link

- Point the CV card to `/assets/cv/cv.pdf` with a `download` attribute.
- The PDF file itself must be placed at `assets/cv/cv.pdf` by the owner (cannot be generated from this repo).

## Step 7 — README

- Short README for the repo: what it is, how to run locally (`python3 -m http.server`), project structure.

## Verification (after each relevant step)

- Serve locally with `python3 -m http.server` and test: `/`, `/project.html?id=0`, `/project.html?id=5`, `/project.html?id=999`, `/project.html` (no id).
- Browser console free of errors.
- Mobile view in devtools (375px).

## Requires your decision (not included in these changes)

- Mark projects as `finished: true` if they are functional (Prok, Microservices System, Personal Blog).
- Current role title ("Web Administrator" vs something backend-related).
- Real image for Personal Blog.
- CV PDF file.

## Suggested commits

1. `fix: project detail page crashes and missing image` — Step 1
2. `fix: empty project image placeholder and cleanup dead code` — Steps 2 + 4
3. `feat: accessible contact links and seo metadata` — Steps 3 + 5
4. `docs: add readme and update cv link` — Steps 6 + 7
