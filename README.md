# How to add a new blog

> Requires Node 18+

Blog content is stored as Markdown files and can be managed through the Netlify CMS interface.

## Admin interface

Run the site and visit `/admin` to create or edit posts with a WYSIWYG editor. Each post supports English, French and Spanish versions and an image selector.

## Manual creation

Posts live under `src/content/blog/<slug>/<locale>.md`.

Example of an English post:

```
---
title: "Challenges of Isolation during the Coronavirus Pandemic"
author: "Aimee cote"
category: "Family"
image: "blog1.jpg"
video: "hide"
---
Uncertainty about the future, anxiety about our well being and our loved ones' health...
```

Add images to `src/assets/articles`.
