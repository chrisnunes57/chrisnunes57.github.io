---
layout: post
title: 746. Min Cost Climbing Stairs
date: 2020-05-14 20:37
description: Solving Leetcode problem "746. Min Cost Climbing Stairs"
tag:
  - leetcode
  - easy
  - dynamic programming
link: https://leetcode.com/problems/min-cost-climbing-stairs/submissions/
---



On a staircase, the `i`{:.language-markdown}-th step has some non-negative cost `cost[i]`{:.language-markdown} assigned (0 indexed).

Once you pay the cost, you can either climb one or two steps. You need  to find minimum cost to reach the top of the floor, and you can either  start from the step with index 0, or the step with index 1.

**Example 1:**

```markdown
Input: cost = [10, 15, 20]
Output: 15
Explanation: Cheapest is start on cost[1], pay that cost and go to the top.
```



**Example 2:**

```markdown
Input: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
Output: 6
Explanation: Cheapest is start on cost[0], and only step on 1s, skipping cost[3].
```



**Note:**

1. `cost`{:.language-markdown} will have a length in the range `[2, 1000]`{:.language-markdown}.
2. Every `cost[i]`{:.language-markdown} will be an integer in the range `[0, 999]`{:.language-markdown}.



### Solution

```python
class Solution:
    def minCostClimbingStairs(self, cost: List[int]) -> int:
        table = [0] * len(cost)

        table[0] = cost[0]
        table[1] = cost[1]

        for i in range(2, len(cost)):
            table[i] = cost[i] + min(table[i - 1], table[i - 2])

        return min(table[-1], table[-2])
```



This problem might originally seem complicated, or like it requires a method like recursive backtracking. In actuality, you can solve the problem very simply with dynamic programming. We use a bottom up approach, starting at the beginning of the "stairs" and working our way up.

We take the first two values and manually put them into our table. Then, to populate the rest of the table, we follow this algorithm:

```markdown
- For each "stair" in the staircase
    - Add the cost from the table
    - Compare the costs of the stairs 1 and 2 positions below current
        - We want the lowest possible score, so add whichever stair has a lower value
- Finally, we compare the costs of the last two steps.
- Whichever one of those is cheaper is the one that we return.
```



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}
