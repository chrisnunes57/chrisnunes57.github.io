---
layout: post
title: "Physics with Javascript - Part 2: More Shapes"
date: 2020-05-21 17:15
description: Using Javascript and Canvas to build basic phyisics simulations
tag:
  - physics
  - canvas
  - things like that
link:
---

#### Intro

In the previous post, we set up an HTML page with a Canvas element. Then, we drew up one single circle in the middle of the page. In this post, we'll create a `Circle` class so that we can easily generate new circles in our canvas.

#### Creating a Javascript Class

A lot of people don't actually realize it, but ever since the release of ECMAScript in 2015, you can actually use the `class` keyword in Javascript to replace prototype-based classes. It doesn't introduce any object-oriented behavior to the language, but allows you to simulate it pretty well.

We're going to create a `Circle` class so that we can easily draw circles. Let's scrap the Javascript code from last time and replace it with this:

```javascript
class Circle {
  constructor(radius) {
    this.size = radius * 2;
  }
}
```

If you're familiar with object-oriented programming, you know what this is. If not, you can read about it [on the MDN website.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) Essentially, we're able to create objects with the properties that a circle would have.

For example, creating a variable like `let circ = new Circle(10)` will create a Circle object with a `size` property of 10.

Right now, our object only has one property: the radius of the circle. Here are a few more variables that we'll want to keep track of:

```
- xPosition
    - Keeps track of the horizontal position
- yPosition
    - Keeps track of the vertical position
```

However, instead of passing these variables into the object, it would be more fun if the intial `(x, y)` coordinate was generated randomly. So, we can update our `Circle` class with those randomly generated properties.

```javascript
class Circle {
  constructor(radius) {
    this.size = radius * 2;
    this.x = Math.random() * 500;
    this.y = Math.random() * 500;
  }
}
```

If you aren't familiar with `Math.random()`, it is a method that returns a random decimal number anywhere in the range `0` to `0.99999`. This is not exactly useful for getting  a random X or Y value, because any value less that 1 will have your object in the top left corner of the screen.

Instead, we use `Math.random() * 500`, where 500 is the size of each screen dimension. This ensures a range that spans the entire screen. Now if we run our code...

<p class="html">
<style>
  canvas {
    border: 2px solid black;
    background: white;
  }
</style>
<canvas id="myCanvas" width="500" height="500" />
</p>


Oops, we have nothing. We created our `Circle` object, but we never actually drew it. Let's expand our `Circle` class by giving it a `draw()` method so that it can paint itself on the canvas. That would look like this:

```javascript
class Circle {
  constructor(radius) {
    this.size = radius * 2;
    this.x = Math.random() * 500;
    this.y = Math.random() * 500;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#003300';
    ctx.stroke();
  }
}
```

Now, let's try creating a circle. Now that we have our fancy `Circle` class, we can create and draw a circle in just two lines of code.

```javascript
let c = new Circle(20);
c.draw();
```

Now our result...

<p>
<canvas id="myCanvas2" width="500" height="500" />
<script>
class Circle {
  constructor(radius) {
    this.size = radius * 2;
    this.x = Math.random() * 500;
    this.y = Math.random() * 500;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#003300';
    ctx.stroke();
  }
}
let ctx = document.getElementById("myCanvas2").getContext("2d");
let c = new Circle(20);
c.draw();
</script>
</p>


Cool! If you refresh the page, you'll see that the circle changes location each time.  Now that we can create circles really easily, let's have some fun with it.

```javascript
for (let i = 0; i < 20; i++) {
  let c = new Circle(20);
  c.draw();
}
```

This snippet of code will create 20 new circles in a loop and draw all of them.

<p>
<canvas id="myCanvas3" width="500" height="500" />
<script>
ctx = document.getElementById("myCanvas3").getContext("2d");
for (let i = 0; i < 20; i++) {
  let c1 = new Circle(20);
  c1.draw();
}
</script>
</p>
Again, you can see that the circles all change location when you refresh the page. See if you can play around with this code and generate a bunch of circles with random sizes!

Here is all the code you need to recreate the final demo:

<p>
<p class="codepen" data-height="500" data-theme-id="light" data-default-tab="result" data-user="chrisnunes57" data-slug-hash="abvXKNr" data-preview="true" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Canvas Collision Detection - Part 2">
  <span>See the Pen <a href="https://codepen.io/chrisnunes57/pen/abvXKNr">
  Canvas Collision Detection - Part 2</a> by Chris Nunes (<a href="https://codepen.io/chrisnunes57">@chrisnunes57</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</p>



#### Conclusion

That's it for this post. Next time, we'll expand our `Circle` class to move our circles around the canvas.
