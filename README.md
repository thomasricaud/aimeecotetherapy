# How to add a new blog
Let say you want to create blog number X and add it to the web site.

Try following the procedure below.
## new entry in data
Create a new file ./src/data/blogX.json as a copy of ./src/data/blog2.json

This is the main entry it will decided if the blog is displayed on the web site and where.

Deleting this file will hide the blog even if teh translation file are still here.

Once the file is created:
- Modify the Author field if needed
- Modify the prominent field to true if you want this blog to appear on the Home Page

The file content should look like
```
[{
    "author": "Aimee cote",
    "prominent": false
  }]
```
Blogs will be displayed in reverse alphabetical order ( Blog10 first then Blog9 => ... Blog1 => Blog0 )

## English content
Create a new file in ./src/locales/en/ named blogX.json

include the following content
```
  {
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