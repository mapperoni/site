---
title: Markdown Formatting
nextjs:
  metadata:
    title: Markdown Formatting
    description: Use markdown to customize your project.
---

A simple and easy way to style pages and text in your mapperoni project. {% .lead %}

## What is it?

Markdown allows you to write simple plain text that our system automatically converts to beautiful webpages. Markdown is extremely easy to learn, and is a standard syntax that is supported by many platforms like Notion and GitHub.

## Reference

### Headings
Use the \# symbol to apply a heading. Heading 1 is the largest and Heading 4 is the smallest.

```md
# Heading 1  
## Heading 2  
### Heading 3  
#### Heading 4  
```

### Text formatting
You can emphasize text with *italics* and **bold**, and include [hyperlinks](https://www.mapperoni.com)

You can also do bullet lists, and numbered lists.  
- First bullet 
- Second bullet
1. Item one  
2. Item two  


```markdown
You can emphasize text with *italics* and **bold**, and include [hyperlinks](https://www.mapperoni.com)

You can also do bullet lists, and numbered lists.  
- Item one  
- Item two  
1. Item one  
2. Item two  
```

### Special elements

Markdown supports Blockquotes, images and tables.

> "This is what a block quote looks like" - Michael Scott

Here is an image:

![The image caption goes here](https://www.mapperoni.com/favicon.ico)

And here is an example of a Table:

Column 1 | Column 2 | Column 3
--- | --- | ---
A1 | B1 | C1
A2 | B2 | C2

```
> "This is what a block quote looks like" - Michael Scott

Here is an image:

![The image caption goes here](https://www.mapperoni.com/logo.jpg)

Column 1 | Column 2 | Column 3  
--- | --- | ---
```

### Other markdown tips

Create a code block by enclosing text with three backticks  
\`\`\`  
Here is an example code block  
\`\`\`  

```
Here is an example code block
```

An empty line is required to start a new paragraph.
Line breaks are collapsed into paragraphs, like this one.

Line breaks are only maintained if you include two spaces at the end of a line.  
Like this line break.  
And this line break.  
And another line break.  

```
An empty line is required to start a new paragraph.
Line breaks are collapsed into paragraphs, like this one.

Line breaks are only maintained if you include two spaces at the end of a line.  
Like this line break.  
And this line break.  
And another line break.  
```

## Limitations

For security, we do not allow you to write plain HTML or CSS.

We support a limited subset of [GitHub Flavored Markdown](https://github.github.com/gfm/), but we do not support all features.

We do not plan to implement a "what you see is what you get" (WYSIWYG) editor experience or visual toolbar. Our editor is intentionally simple. Raw markdown is superior!
