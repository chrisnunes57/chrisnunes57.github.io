---
layout: post
title: Super Speedy Blog Post Workflow
date: 2021-01-31 10:21
description: A short walkthrough of shortcuts I use to help me quickly create new Markdown file
tag:
  - scripting
  - terminal
  - shell
link: 
---

## Introduction

Like the archetypal tech nerd, I like to script literally anything that can be done programmatically. I have scripts on my computer to deploy websites, text friends, and show/hide my desktop icons. I even built a system with a servo motor and a reed switch to turn off my light when I left my room.

All this to say, I like to save time. In this post I'll be sharing some shortcuts I use to make writing blog posts much faster. This post will be short and sweet, just like my blog post workflow.

## The Problem
This blog is created using [https://jekyllrb.com/](https://jekyllrb.com/){:target="_blank"}, which means that each blog post is written in markdown. So, whenever I want to create a new post, I have to create a new markdown file in a Jekyll-specific format. For example, this is a boilerplate markdown file that I used for posting Leetcode solutions.

```markdown
---
layout: post
title: 
date: yyyy-mm-dd 12:34
description: Solving Leetcode problem ""
tag:
  - leetcode
  - easy
  - arrays
link: 
---

** Problem goes here **

##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}
```

All the data at the top within the two "\-\-\-" lines is post metadata, while the bottom part of the file is where the actual post content goes.

This would be annoying to type out for each new post, and copying and pasting it from an existing file would take FAR too long. 

## The Solution

My goal was to create **one** terminal command that would create a new markdown file with Jekyll post metadata already in place. In the end, I didn't accomplish this exact goal, but I got close enough to make it equally seamless.

The end result I achieved was this: whenever I enter the command `post`{:.language-markdown} on my terminal, it will open a new markdown in [Typora](https://typora.io/){:target="_blank"}, a markdown editor that I like. Then, the markdown template will be automatically copied to my keyboard, so I just have to paste it into the document to get started.

In the end, the entire process only takes a few seconds from beginning to end: 

![A short video showing someone entering a command, then a window popping up on their computer with markdown content in it](/assets/img/blog-workflow-post/process.gif)

## How it Works

#### Note: If you just want the code, skip to the bottom for a recap.

The actual programming for this is really short, but it can be confusing if you are new to working with scripts. First, I created a file in my home directory called `post_template.md`{:.language-markdown}. This is the file that will contain the post template that we want to use. I use a slightly more generic template than the one I showed above, so the contents of my `post-template.md`{:.language-markdown} file are:

```markdown
---
layout: post
title: 
date: yyyy-mm-dd 12:34
description: 
tag:
  - 
  - 
  - 
link: 
---

##### [Try it out]({{ page.link }}){:target="_blank"}
```

I save this file in my home directory, but you can save it wherever you want. 

Next, we need to copy the contents of this file to the keyboard. Doing this programmatically is a two-step operation: 

  1. Use the `cat`{:.language-markdown} command to output the contents of the file
  2. Use [piping](https://thoughtbot.com/blog/input-output-redirection-in-the-shell){:target="_blank"} to redirect the output into our clipboard

To accomplish this on a MacOS terminal, you would run this code: `cat ~/post-template.md | pbcopy`{:.language-bash}.

The `cat ~/post-template.md`{:.language-bash} command on its own simply prints out the contents of the file to the terminal. When `| pbcopy`{:.language-bash} is appended, it sends the contents of the file to the user's clipboard, as if they had copied it themselves.

Note that this command assumes that the `post-template.md`{:.language-markdown} file is in the home directory. If the file was in a different location, the command would have to be updated to reflect the new file path.

Once this is done, we need to open up the Typora application. This is much simpler, and the command is just `open -a Typora`{:.language-bash}. 

Now, we can condense these commands and run both of them in just one line of input. To combine these commands so that they can both be entered on the same line, we simply join them together with a semicolon. So, our new (longer) command is `cat ~/post-template.md | pbcopy; open -a Typora`{:.language-bash}.

Now if we input that command into a terminal, we will have the template copied to our keyboard and Typora will open. However, this isn't enough! We don't want to type out that whole thing every time we want to create a new blog post. Instead, we just want to enter `post`{:.language-bash} and have the terminal know what we mean.

We can accomplish this using an *alias*. An alias does what the name implies: it takes a command and gives it a different name. This allows us to give simple names to longer or more complicated commands.

In our case, we want to run `cat ~/post-template.md | pbcopy; open -a Typora`{:.language-bash} whenever we enter the command `post`{:.language-bash}. We are *aliasing* the longer command and giving it a shorter name.

To add an alias to your system, you need to modify the `~/.zshrc`{:.language-markdown} or `~/.bashrc`{:.language-markdown} file on your system, whichever one it uses. I have a newer Macbook, so I use a zsh shell. Inside of my `~/.zshrc`{:.language-markdown} file, I added the line `alias post='cat ~/post_template.md | pbcopy; open -a Typora'`{:.language-bash}. This line is long, so we can break it down.

An alias always starts with the keywords `alias <alias_name>`{:.language-markdown}. The placeholder `<alias_name>`{:.language-markdown} is the alias that you are giving the longer command. Then, we have the second part of the line: `alias <alias_name>`{:.language-markdown}`='<long_command_1234>'`{:.language-bash}. The placeholder `<long_command_1234>`{:.language-markdown} represents the longer command that you are aliasing.

In the end, we create an alias named `post`{:.language-markdown} for our longer command. After reloading our zsh session, we can run `post`{:.language-markdown} and it will copy the template to the keyboard and open typora!

## Recap

To recap, here were the steps I took to set up this workflow:

1. Create a markdown file with the template we want to use for posts.
2. Create a script to copy the template file to our clipboard and open Typora
    - `cat ~/post-template.md | pbcopy; open -a Typora`{:.language-bash}
3. Add an alias to our `~/.zshrc` directory
    - `alias post='cat ~/post_template.md | pbcopy; open -a Typora'`{:.language-bash}
4. Gain ability to write start a new blog post by running `post`{:.language-markdown} in terminal
5. Profit???

As far as scripts go, this one is tiny, and it really only saves me about 20 seconds of typing every time I start a blog post (which is not often). BUT — I made it, and using it makes me feel like a terminal master.

Hopefully this gives you great inspiration for your own productivity scripts, or serves as a nice little guide if you've never done anything like this before. Either way, I hope you enjoyed, and if you haven't yet, read my most recent post about how I created an interactive, real-time chess game!