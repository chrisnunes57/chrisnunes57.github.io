---
layout: post
title: Google XSS Game - Level 1
date: 2020-05-05 22:04
description: Solving Google XSS Game - Level 1
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

**The objective of each level:** to successfully execute Javascript code on the webpage that they give you. This is my solution to part one of the challenge.



### Problem

![A blank website with one search bar in the middle](/assets/img/google-xss/google-xss-level-1-basic.png)

This is the most basic of XSS vulnerabilites. The website displays a text box that allows you to search for a term on the site. When we search for a term such as ```"hi there!"```, we are taken to a regular search results page.

![A website showing the words "no results for your query"](/assets/img/google-xss/google-xss-level-1-query.png)

This is pretty normal, and seems like something you would find on any website. However, it doesn't reveal anything about potential XSS vulnerabilities on the site. For that, we have to test the input field with something that it wouldn't normally see. Let's reuse our previous example of ```"hi there!"```, but surround it in an html tag. Our new query will be ```<h1>hi there!</h1>```

![A website with the same error message as before, but with HTML styles](/assets/img/google-xss/google-xss-level-1-malicious-query.png)

This looks different! It looks like the website inserted our HTML code into the page without performing any checks on it! If we look at the source code for the site we're attacking, we can see that this is exactly what happened.

![A snippet of code from the source of the website](/assets/img/google-xss/google-xss-level-1-code.png)

Looking at the code above, we can see that the server just takes our input and sticks it right back into the HMTL. So, if anyone wanted to be *malicious* and run Javascript on the site, we could just insert a script element, like ```<script>alert("hi there!")</script>```. This gets us the following result:

![A message saying that we passed the level](/assets/img/google-xss/google-xss-level-1-solved.png)

We did it! Notice that we didn't have to do anything fancy, like actually "hack" a user or change the website. Just proving that it's possible is enough.



#### Notes

![An image of a website that says "I am vulnerable!"](/assets/img/google-xss/google-xss-level-1-vulnerable.png)

Me too :/

##### [Try it yourself]({{ page.link }}){:target="_blank"}
