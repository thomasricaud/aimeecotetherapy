# How to add a new blog

> Requires Node 18+ with OpenSSL legacy provider enabled

Blog content is stored as Markdown files and can be managed through the Netlify CMS interface.

The build script sets `NODE_OPTIONS=--openssl-legacy-provider` to support Webpack 4 under Node 18.

## Admin interface

Run the site and visit `/admin` to create or edit posts with a WYSIWYG editor. When prompted, enter a GitHub personal access token to authenticate. Each post supports English, French and Spanish versions and an image selector.

## Manual creation

Posts live under `src/content/blog/<slug>/<locale>.md`.

Example of an English post:

```
---
title: "Challenges of Isolation during the Coronavirus Pandemic"
author: Aimee Cote
category: "Family"
image: "blog1.jpg"
video: "hide"
---
Uncertainty about the future, anxiety about our well being and our loved ones' health...
```

Add images to `public/img/uploads`.

## SEO checks

Use `npm run seo-check` to run Lighthouse in CI mode against all localized
pages. Set the `SITE_URL` environment variable to point to the deployed site
or leave it unset to check a local server at `http://localhost:8080`.
