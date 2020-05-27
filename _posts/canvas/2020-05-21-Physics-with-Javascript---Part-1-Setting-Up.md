---
layout: post
title: "Physics with Javascript - Part 1: Setting Up"
date: 2020-05-21 14:03
description: Using Javascript and Canvas to build basic phyisics simulations
tag:
  - physics
  - canvas
  - things like that
link:
---



This post will be something a little different. Instead of a solution to a problem or a puzzle, it'll be more of a guide to creating a project.

#### Intro

I've used a lot of Javascript and Canvas before, but I've never been able to do too much with it because I didn't really understand the geometry/physics aspect of 2D graphics. This series will cover some basics in 2D graphic stuff, as well as how to use [HTML5 Canvas](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).

#### Setting up our Canvas

The first thing we have to do is set up an empty HTML document with a `<canvas>` element in it. That would look like this:

```html
<!DOCTYPE html>
<html>
  <body>
    <canvas id="myCanvas" width="500" height="500" />
  </body>
</html>
```

We give it the id `myCanvas` so that we have a way to reference it in our Javascript code later. We give it a width and height to make it look nice. We can also add in some styles to make our canvas look snazzy:

```html
<!DOCTYPE html>
<html>
  <body>
    <style>
    	canvas {
        border: 2px solid black;
        background: white;
      }
    </style>
    <canvas id="myCanvas" width="500" height="500" />
  </body>
</html>
```
<p class="html">
<style>
  canvas {
    border: 2px solid black;
    background: white;
  }
</style>
<canvas id="myCanvas" width="500" height="500" />
</p>
There. Isn't it beautiful? This is the canvas we'll be working with. To actually start messing around with it, we need to use Javascript. You can either put this code in a `<script>` tag in your main HTML file, or in a separate Javascript file entirely.

If you were to include this code in your main HTML file, this is what it would look like:

```html
<!DOCTYPE html>
<html>
  <body>
    <style>
    	canvas {
        border: 2px solid black;
        background: white;
      }
    </style>
    <canvas id="myCanvas" width="500" height="500" />

    <script>
    	// Javascript code goes here!
    </script>
  </body>
</html>
```

To start out, we get a reference to our canvas using the [`getElementById()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementById) method and the ID of our HTML element.

We can then get the [drawing context](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext) of our canvas, which allows us create shapes, patterns, and really whatever we want on the canvas.

```javascript
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");
```

This code alone doesn't do anything visual, but now we have everything we need in order to start drawing.

#### Drawing our first shape

First, we'll draw a circle. The method to draw a circle is `arc`, and it takes five parameters: `ctx.arc(x, y, radius, startAngle, endAngle)`. For complete circles, the start angle will always be **0** and the end angle will always be **2π**. Therefore, we only have to worry  about the coordinates and the size.

For example, the method `ctx.arc(250, 250, 20, 0, 2 * Math.PI)` will draw a an arc at coordinate `(250, 250)` with a radius of 20 pixels.

<p class="html">
<canvas id="myCanvas2" width="500" height="500" />
<script>
let canvas = document.getElementById("myCanvas2");
let ctx = canvas.getContext("2d");
ctx.beginPath();
ctx.arc(250, 250, 20, 0, 2 * Math.PI);
ctx.fillStyle = "white";
ctx.fill();
ctx.stroke();
</script>
</p>


Whoa. Beautiful. It's absolutely incredible what we can do with Canvas. The finished code after this tutorial can be seen in the CodePen [here.](https://codepen.io/chrisnunes57/pen/GRpzGNr)

As you can see in the CodePen demo, we used a few more commands than we talked about before. The extra commands are just to fill the circle with white, and then draw the black outline.



#### Conclusion

That's all that we'll do for this post. In the next one, we'll create a reusable `Circle()` class that we can use to create many, many, many circles.
