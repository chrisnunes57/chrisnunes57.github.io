---
layout: post
title: Google XSS Game - Level 3
date: 2020-05-08 15:16
description: Solving Google XSS Game - Level 3
tag:
  - xss
  - security
  - ctf
  - things like that
link: https://xss-game.appspot.com/
---

### Solving Google XSS Challenge

**Cross-site Scripting (XSS)** is a security vulnerability that can affect web applications. It most commonly occurs when a website incorporates user input into their site without properly sanitizing it. Cross-site scripting vulnerabilities can allow attackers to run Javascript code on your HTML page when a user views it. This allows the attacker to completely change the appearance of the website, steal private data, save keystrokes, hijack the user's session, and more.

Google has created an environment that allows you to practice finding and exploiting XSS vulnerabilities. There are 6 levels that range from easiest to hardest.

**The objective of each level:** to successfully execute Javascript code on the webpage that they give you. This is my solution to part three of the challenge.



### Problem

![A website that allows you to choose between three different photos](/assets/img/google-xss/google-xss-level-3-basic.png)

The third level gives us a webpage that lets us peruse a few different images. Unlike the last two levels, this website doesn't give us any input fields to type in. Whenever there isn't any obvious way to provide input to the website, it is always a good idea to check the URL of the page to see if any information is being passed in that way.

Here are the URLs for the three pages of the website:

- ```https://xss-game.appspot.com/level3/frame#1```{:.language-markdown}
- ```https://xss-game.appspot.com/level3/frame#2```{:.language-markdown}
- ```https://xss-game.appspot.com/level3/frame#3```{:.language-markdown}

It looks like the only thing that changes is the final part of the URL, the ```#```{:.language-markdown} and the number following it. Let's look at the source code and see if we can figure out how the server is using this parameter. 

```javascript
var html = "Image " + parseInt(num) + "<br>";
html += "<img src='/static/level3/cloud" + num + ".jpg' />";
```

After some digging, we find this snippet of code, which uses the value from the URL. It looks like the server is just taking this value and using it to determine which image to load. So, if we alter that part of the URL, we can control the source of the image that is added to the page!

Let's try going to the URL ```https://xss-game.appspot.com/level3/frame#asdf```{:.language-markdown} and see what happens. 

![A message that says "image failed to load"](/assets/img/google-xss/google-xss-level-3-failed.png)

All that we can see from an initial look at the webpage is that it tried to load an image and failed. Let's use Inspect Element to see what actually happened.

![A snippet of code showing an image with a strange URL"](/assets/img/google-xss/google-xss-level-3-inspect.png)

Well, now we know exactly what happens with the URL parameter. It goes straight into the image ```src```{:.language-markdown} to determine which image is fetched. That's pretty cool, but how do we use that to run Javascript on the webpage? 

One idea is to revisit our solution from [the previous level.](/Google-XSS-Game-Level-3/) We know from level 2 that if the webpage loads an ```<img>```{:.language-markdown} tag with an invalid source, we can use the ```onerror```{:.language-markdown} attribute to execute malicious Javascript code. We also know that on our current level, we can force the webpage to render an image that doesn't load, such as ```<img src='/static/level3/cloudWhateverYouWant.jpg' />```{:.language-markdown}. Wouldn't it be nifty if we could also add in an ```onerror```{:.language-markdown} attribute on that image?

We want to turn this:

```html
<img src='/static/level3/cloudWhateverYouWant.jpg' />
```

Into this:

```html
<img src='/static/level3/cloud' onerror="alert(1)".jpg' />
```



If you compare the two, you can see that we just inserted the ```onerror```{:.language-markdown} attribute after the ```src```{:.language-markdown} attribute. But how do we actually do that? Let's look back at the source code for the website again.

```javascript
html += "<img src='/static/level3/cloud" + num + ".jpg' />";
```

We can see that the site takes whatever we give it and appends it to the ```<img>```{:.language-markdown} string. So, what if we just try the simplest solution: enter in the missing section of our target code and see what happens.

We want the final HTML string to say ```<img src='/static/level3/cloud' onerror="alert(1)".jpg' />```{:.language-markdown}, so the missing part of our string is ```' onerror="alert(1)"```{:.language-markdown}.

Let's try refreshing the page with that parameter in the URL and see what happens.

!["An alert telling us that we finished level 3](/assets/img/google-xss/google-xss-level-3-solved.png)

The final solution was to use the URL ```https://xss-game.appspot.com/level3/frame#' onerror="alert(1)"```{:.language-markdown}. 



#### Recap

In the end, we solved this level using the same method as [level two:](/Google-XSS-Game-Level-2/) we made the webpage attempt to load an image with an invalid source, and then executed our code through the ```onerror```{:.language-markdown} event when the image inevitably didn't load. The only difference from last level is the method of inserting our payload. 

For this level, we had to figure out how to use query parameters and read the source code to see how they are used.



##### [Try it yourself]({{ page.link }}){:target="_blank"}
