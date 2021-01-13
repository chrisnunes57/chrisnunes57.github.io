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

In the previous post, we set up an HTML page with a Canvas element. Then, we drew up one single circle in the middle of the page. In this post, we'll create a `Circle`{:.language-markdown} class so that we can easily generate new circles in our canvas.

If you didn't read that previous post, the code for it is online [here](https://codepen.io/chrisnunes57/pen/GRpzGNr). You should definitely read it though. Please give me more web traffic.

#### Creating a Javascript Class

A lot of people don't actually realize it, but ever since the release of ECMAScript in 2015, you can actually use the `class`{:.language-markdown} keyword in Javascript to replace prototype-based classes. It doesn't introduce any object-oriented behavior to the language, but allows you to simulate it pretty well.

We're going to create a `Circle`{:.language-markdown} class so that we can easily draw circles. Let's scrap the Javascript code from last time and replace it with this:

```javascript
class Circle {
  constructor(radius) {
    this.size = radius * 2;
  }
}
```

If you're familiar with object-oriented programming, you know what this is. If not, you can read about it [on the MDN website.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) Essentially, we're able to create objects with the properties that a circle would have.

For example, creating a variable like `let circ = new Circle(10)`{:.language-markdown} will create a Circle object with a `size`{:.language-markdown} property of 10.

#### More Properties

Right now, our object only has one property: the radius of the circle. Here are a few more variables that we'll want to keep track of:

```
- xPosition
    - Keeps track of the horizontal position
- yPosition
    - Keeps track of the vertical position
```

However, instead of passing these variables into the object, it would be more fun if the intial `(x, y)`{:.language-markdown} coordinate was generated randomly. So, we can update our `Circle`{:.language-markdown} class with those randomly generated properties.

```javascript
class Circle {
  constructor(radius) {
    this.size = radius * 2;
    this.x = Math.random() * 500;
    this.y = Math.random() * 500;
  }
}
```

If you aren't familiar with `Math.random()`{:.language-markdown}, it is a method that returns a random decimal number anywhere in the range `0`{:.language-markdown} to `0.99999...`{:.language-markdown}. This is not exactly useful for getting  a random X or Y value, because any value less that 1 will have your object in the top left corner of the screen.

Instead, we use `Math.random() * 500`{:.language-markdown}, where 500 is the size of each screen dimension. This ensures a range that spans the entire screen. Now if we run our code...

<p class="html">
<style>
  canvas {
    border: 2px solid black;
    background: white;
  }
</style>
<canvas id="myCanvas" width="500" height="500" />
</p>


Oops, we have nothing. We created our `Circle`{:.language-markdown} object, but we never actually drew it. Let's expand our `Circle`{:.language-markdown} class by giving it a `draw()`{:.language-markdown} method so that it can paint itself on the canvas. That would look like this:

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

Now, let's try creating a circle. Now that we have our fancy `Circle`{:.language-markdown} class, we can create and draw a circle in just two lines of code.

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

#### Drawing Multiple Circles

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

The finished code after this tutorial can be seen in the CodePen [here.](https://codepen.io/chrisnunes57/pen/abvXKNr)



#### Conclusion

That's it for this post. Next time, we'll expand our `Circle`{:.language-markdown} class to move our circles around the canvas.
