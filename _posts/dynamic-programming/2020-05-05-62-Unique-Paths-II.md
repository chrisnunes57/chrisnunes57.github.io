---
layout: post
title: 62. Unique Paths II
date: 2020-05-05 11:38
description: Solving Leetcode problem "62. Unique Paths II"
tag:
  - leetcode
  - medium
  - dynamic programming
link: https://leetcode.com/problems/unique-paths-ii/
---

A robot is located at the top-left corner of a `*m* x *n*`{:.language-markdown} grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time.  The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

Now consider if some obstacles are added to the grids. How many unique paths would there be?

![img](https://assets.leetcode.com/uploads/2018/10/22/robot_maze.png)

An obstacle and empty space is marked as `1`{:.language-markdown} and `0`{:.language-markdown} respectively in the grid.

**Note:** *m* and *n* will be at most 100.

**Example 1:**

```markdown
Input:
[
  [0,0,0],
  [0,1,0],
  [0,0,0]
]
Output: 2
Explanation:
There is one obstacle in the middle of the 3x3 grid above.
There are two ways to reach the bottom-right corner:
1. Right -> Right -> Down -> Down
2. Down -> Down -> Right -> Right
```



### Solution

```python
class Solution:
    def uniquePathsWithObstacles(self, obstacleGrid: List[List[int]]) -> int:
        n, m = len(obstacleGrid), len(obstacleGrid[0])

        grid = [[0] * m for i in range(n)]

        # Handle case where there is an obstacle in the first or last spot
        if obstacleGrid[0][0] == 1 or obstacleGrid[-1][-1] == 1:
            return 0

        grid[0][0] = 1

        for r in range(n):
            for c in range(m):
                if obstacleGrid[r][c] == 0:
                    if r - 1 >= 0:
                        grid[r][c] += grid[r - 1][c]
                    if c - 1 >= 0:
                        grid[r][c] += grid[r][c - 1]

        return grid[-1][-1]
```



This is essentially the same as the dynamic programming solution for the [previous "Unique Paths" problem](/62-Unique-Paths/), but with a few changes. We terminate early if the first or last squares have obstacles on them, because that would make solving the grid impossible. The only other change is in our main loops, where we have to make sure that we don't add points to a square that has an obstacle on it.

#### Notes

While the [previous Unique Paths](/62-Unique-Paths/) solution that used dynamic programming was not the optimal method, the addition of obstacles makes dynamic programming the fastest option. This solution runs in 32ms, faster than ~100% of other Python solutions.



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}
