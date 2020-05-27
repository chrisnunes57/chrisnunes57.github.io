---
layout: post
title: "Physics with Javascript - Part 3: Bouncing Ball"
date: 2020-05-21 23:42
description: Using Javascript and Canvas to build basic phyisics simulations
tag:
  - physics
  - canvas
  - things like that
link:
---

#### Intro

In the previous post, we created a `Circle` class that made it really easy to create new circles and draw them. In this post, we're going to move a circle around on the screen and have it bounce off of the edges of the Canvas.

If you didn't read that previous post, the code for it is online [here](https://codepen.io/chrisnunes57/pen/abvXKNr). You should definitely read it though. It's so good.

#### How do we give a stationary object velocity?

The first puzzle is figuring out to actually move an object. It's one thing to draw a shape on the canvas, it's another to move it. First let's figure out how the Canvas coordinate system works.

![An image showing the difference between regular coordinates and canvas coordinates](https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2014/03/1393985491canvas-coordinate-space.png)

Unlike a normal graph where the origin is in the center, the Canvas coordinate system places it in the top left corner. Increasing Y values move down in the grid, and X values move right in the grid. Any negative coordinates like `(100, -20)` simply will not show up in within the bounds of the window.

Knowing this, we can kind of figure out what we have to do to animate our circles. If we have a circle with a position of `(10, 20)`, then we move it to `(11, 20)`, `(12, 20)`, `(13, 20)`, etc, it will look like the circle is slowly moving across the screen to the right.

With this in mind, let's start adding to our implementation of the `Circle` class.



#### Creating velocity in code

First, we need to create a way to store our velocities inside of our `Circle` objects.

```javascript
constructor(radius) {
    this.size = radius * 2;
    this.x = Math.random() * 500;
    this.y = Math.random() * 500;

  	this.velocityX = 1;
  	this.velocityY = 1;
  }
```

These two new properties, `velocityX` and `velocityY`, will keep track of the velocities in each direction. Once we have this set up, we can begin adding to the other parts of our code.

#### Creating a game loop

There is one fundamental thing that we need to change in our code. Before we created a `Circle` object and drew it, but we never actually did anything with it after that (because we didn't need to).

Now, however, we want to animate our circle. This requires our code to update constantly in order to process non-stop changes. If you've heard the phrase "60 frames per second" in video games, this is where it comes from. We want our code to repeat some specific number of times (e.g., 60 times per second) to show our changes.

There is a Javascript function called [`requestAnimationFrame()`](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame) that handles all of this logic for us. Much like recursion, this function continually invokes a given callback function multiple times per second.

```javascript
function gameLoop() {
  circle.draw();

  requestAnimationFrame(gameLoop);
}

gameLoop();
```

This above code creates a function called `gameLoop` and calls it continually in a loop. If we throw this code into our project right now though, our circle still won't move. Why not? We never actually used our velocity variables to change our circle's position!

#### Changing our circle's position

Let's look back at our `Circle` class.

```javascript
class Circle {
  constructor(radius) {
    this.size = radius * 2;
    this.x = Math.random() * 500;
    this.y = Math.random() * 500;

    this.velocityX = 1;
    this.velocityY = 1;
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

We create a velocity for both the `x` and `y` direction, but we never actually use these to change the position of our circle. The easiest way to do this is to add a couple of lines of code to our `draw()` method.

```javascript
draw() {

    this.x += this.velocityX;
    this.y += this.velocityY;

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size / 2, 0, 2 * Math.PI, false);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#003300';
    ctx.stroke();
  }
```

As you can see at the top of the method, we add the velocity to our `x` and `y` position every time we call the `draw()` method. If our velocities are both `1`, then our circle will move `1 pixel` every frame.

If we run our code now, this is what we see:

![There are a lot of circles drawn on the screen in a straight line](/assets/img/canvas-physics/no-refresh-ball.gif)

So cool! Our circle is moving around the screen, but not as we intended. It's leaving a trail behind at every position where it has appeared before. Now we've discovered another property of Canvas: it doesn't automatically refresh the background for us.

We're drawing a circle at many different locations, and we have no code in place to erase the old circles that we don't want anymore. A simple way of doing this would be to draw a big white rectangle over our canvas every time we update, and then draw our circle on top of it.

We can accomplish this by adding one line of code to our `gameLoop()` function.

```javascript
function gameLoop() {
  ctx.fillRect(0, 0, 500, 500);
  circle.draw();

  requestAnimationFrame(gameLoop);
}
```

Now, in every frame we re-draw our background and then draw our circle on top of it. Our new result looks like this:

![A ball moves across the screen without leaving a trail](/assets/img/canvas-physics/refresh-ball.gif)

Cool! But now, to make it cooler, we want our circle to bounce off of the edges of the screen.

#### Collision detection with sides of screen

In order to do this, we have to figure out a way to tell whether our circle is touching the sides of the screen. This actually turns out to be pretty simple math. We know the `x` and `y` positions of the center of the circle, and we know the `radius` of the circle as well.

The last piece of information that we need is the `x` and `y` values of the borders of our canvas. Like we talked about earlier in the post, the left edge of the canvas has an `x` position of 0, and likewise, the top of the canvas has a `y` position of 0.

So, if we want to check if the edge of our circle is touching the left side of the screen, we could do so like:

```javascript
if ( circle.x - circle.radius <= 0) { ... }
```

And if we wanted to see if our circle was touching the left side of the screen, we could do this:

```javascript
if ( circle.y - circle.radius <= 0) { ... }
```

Note that this is the same thing, but we're checking the `y` position instead of `x`. It is also simple to check whether our circle is within the other bounds. We just make sure that the position of our ball is less than the outer bounds of the screen, which is conveniently `500` pixels in both directions.

When combined, we can create a function to check whether we're in bounds that is pretty easy to read:

```javascript
checkEdgeCollisions() {
  let radius = this.size / 2;

	if (this.x - radius <= 0 || this.x + radius >= 500) {
    // We are touching either the left edge or the right edge
  }

  if (this.y - radius <= 0 || this.y + radius >= 500) {
    // We are touching either the top edge or the bottom edge
  }
}
```

#### Bounce off of walls

Now we know when we hit a wall, but how do we actually make ourselves bounce off of it? The answer is actually pretty simple.

We keep track of the direction that our circle is moving with the `velocityX` and `velocityY` variables. It is actually very easy to reverse the speeds of the circle by "reversing" the value of each variable.  

For example, if our `velocityX` variable is `4`, then our circle will be moving 4 pixels to the right in every frame. If we reverse this and set the variable to `-4`, then the circle will suddenly start to move to the left as the same speed.

So, if we implement this in code, we have this:

```javascript
checkEdgeCollisions() {
  let radius = this.size / 2;

	if (this.x - radius <= 0 || this.x + radius >= 500) {
    this.velocityX = -this.velocityX;
  }

  if (this.y - radius <= 0 || this.y + radius >= 500) {
    this.velocityY = -this.velocityY;
  }
}
```

All that's left to do now is update our `draw()` method so that it calls our `checkEdgeCollisions()` method. It will look like this:

```javascript
draw() {

    this.checkEdgeCollisions();

    this.x += this.velocityX;
    this.y += this.velocityY;

    ctx.beginPath();
    .............
  }
```

Now, our ball will be bouncing off the sides of the screen! This is perfect, but there is still one edge case to handle.

#### Smarter Bouncing

Our ball is bouncing now, but there is still one more thing to fix. There is still the chance that our ball can get stuck within a wall, and our code won't be able to handle that case. It would look something like this:

![Ball is not bounding, it is stuck to one of the edges](/assets/img/canvas-physics/stuck-ball.gif)

This happens when a circle gets too far beyond the edge to be moved back in one frame, so it just keeps bouncing in place. We can fix that by manually changing the `x` and `y` positions to be within the borders of the canvas whenever we're past the edge.

This will make our `checkEdgeCollisions()` function much longer, but it's necessary to prevent this issue.

```javascript
checkEdgeCollisions() {
    let radius = this.size / 2;

    if (this.x - radius <= 0 || this.x + radius >= 500) {
      this.velocityX = -this.velocityX;
      if (this.x > 250) {
        this.x = 500 - radius;
      } else {
        this.x = radius;
      }
    }

    if (this.y - radius <= 0 || this.y + radius >= 500) {
      this.velocityY = -this.velocityY;

      if (this.y > 250) {
        this.y = 500 - radius;
      } else {
        this.y = radius;
      }
    }
  }
```

#### Conclusion

This was a super long post, but now we have a much better understanding of how coordinates work in the Canvas space, and we can detect collisions with the edge of the screen. Next time, we will learn how to detect collisions with other circles bouncing around the screen.

The finished code after this tutorial can be seen in the CodePen [here.](https://codepen.io/chrisnunes57/pen/vYNbazz)
