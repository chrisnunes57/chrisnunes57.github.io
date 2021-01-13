---
layout: post
title: 70. Climbing Stairs
date: 2020-05-05 22:04
description: Solving Leetcode problem "70. Climbing Stairs"
tag:
  - leetcode
  - easy
  - dynamic programming
link: https://leetcode.com/problems/climbing-stairs/
---

You are climbing a stair case. It takes `*n*`{:.language-markdown} steps to reach to the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

**Note:** Given `*n*`{:.language-markdown} will be a positive integer.

**Example 1:**

```markdown
Input: 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
```

**Example 2:**

```markdown
Input: 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
```



### Solution 1: Dynamic Programming

```python
class Solution:
    def climbStairs(self, n: int) -> int:
        if n == 1:
            return 1

        grid = [0]  * (n + 1)

        grid[0] = 1
        grid[1] = 1

        for i in range(2, n + 1):
            grid[i] = grid[i - 2] + grid[i - 1]

        return grid[-1]
```



This solution was hard for me to understand at first, probably because I'm just not experienced with DP. It helped to draw out some test cases first.

- N = 1: 1 way to climb ```[1]```{:.language-markdown}
- N = 2: 2 ways to climb ```[1, 1], [2]```{:.language-markdown}
- N = 3: 3 ways to climb ```[1, 1, 1], [2, 1], [1, 2]```{:.language-markdown}
- N = 4: 5 ways to climb ```[1, 1, 1, 1], [1, 1, 2], [1, 2, 1], [2, 1, 1], [2, 2]```{:.language-markdown}
- N = 5: 8 ways to climb ```[1, 1, 1, 1, 1], [1, 1, 1, 2], [1, 1, 2, 1], [1, 2, 1, 1], [2, 1, 1, 1], [1, 2, 2], [2, 1, 2], [2, 2, 1]```{:.language-markdown}

There are a couple of patterns here. The first thing that I saw was that the solution for N steps was the sum of the solutiosn for N - 1 and N - 2. This led to the DP solution above. However, this pattern of ```f(n) = f(n - 1) + f(n - 2)```{:.language-markdown} looks a little familiar....



### Solution 2: Fibonacci

```python
class Solution:
    def climbStairs(self, n: int) -> int:

        if n == 1 or n == 2:
            return n

        a = 1
        b = 2
        c = 0

        for i in range(3, n + 1):
            c = a + b
            a = b
            b = c

        return c
```



Here are the test cases again:

- N = 1: 1 way to climb ```[1]```{:.language-markdown}
- N = 2: 2 ways to climb ```[1, 1], [2]```{:.language-markdown}
- N = 3: 3 ways to climb ```[1, 1, 1], [2, 1], [1, 2]```{:.language-markdown}
- N = 4: 5 ways to climb ```[1, 1, 1, 1], [1, 1, 2], [1, 2, 1], [2, 1, 1], [2, 2]```{:.language-markdown}
- N = 5: 8 ways to climb ```[1, 1, 1, 1, 1], [1, 1, 1, 2], [1, 1, 2, 1], [1, 2, 1, 1], [2, 1, 1, 1], [1, 2, 2], [2, 1, 2], [2, 2, 1]```{:.language-markdown}

For comparison, here is the Fibonacci sequence:

- N = 1: 1
- N = 2: 1
- N = 3: 2
- N = 4: 3
- N = 5: 5

If you look at the values in both examples, they both follow the pattern of ```1, 2, 3, 5, 8...```{:.language-markdown}.  The only things that change are the values of N. So, for ```N```{:.language-markdown} steps, we just need to calculate the  ``(N + 1)th``{:.language-markdown} fibonacci number.



#### Notes

Both of these solutions took me way too long to figure out. Need more DP practice.



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}
