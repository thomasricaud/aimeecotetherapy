# How to add a new blog
Let say you want to create blog number X and add it to the web site.

Try following the procedure below.

## new english entry in locales en
Create a new file ./src/locales/en/blogX.json as a copy of ./src/locales/en/blog2.json

This is the main entry it will decided if the blog is displayed on the web site and where.

Blogs will be displayed in reverse alphabetical order ( Blog10 first then Blog9 => ... Blog1 => Blog0 )

include the following content
```
  {
    "blogX.image": "Type the name of the image to use (stored in src/assetes/articles) OR hide if there's no image",
    "blogX.vidoe": "Type a link to the video OR hide if there's no video",
    "blogX.title": "Type the eglish title here",
    "blogX.content": "And the english content here. It can include html formatting",
    "blogX.category": "Here it's for the category of the blog 'Couple', 'Family', 'Individual' or 'Event' or anything"
  }
```
tips: https://wordtohtml.net/ is a good website to use html formatting.

## French and spanish content
Copy the blogX.json file previously created with the english content into ./src/locales/fr and ./src/locales/es

Translate the fr file content into French and the es one into spanish
## Add a picture
Add a new jpg file named blogX.jpg under ./src/assets/articles 
