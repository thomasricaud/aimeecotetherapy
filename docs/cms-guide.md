# Admin CMS Guide

The Netlify CMS admin interface is available at `/admin` once the site is running.

## Managing blog posts

1. Log in with username `admin` and password `passw0rd`.
2. Open the **Blog** collection.
3. Each post is stored in `src/content/blog/<slug>/<locale>.md` with front matter fields:
   - `title`
   - `author`
   - `category`
   - `image`
   - `video`
   - body content in Markdown.
4. Use the editor to update translations for English, French and Spanish. The image widget lets you pick or upload an image.

![Admin screenshot](admin-screenshot.png)
