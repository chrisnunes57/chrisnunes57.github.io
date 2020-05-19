---
layout: post
title: 832. Flipping an Image
date: 2020-05-19 14:55
description: Solving Leetcode problem "832. Flipping an Image"
tag:
  - leetcode
  - easy
  - arrays
link: https://leetcode.com/problems/flipping-an-image/
---

Given a binary matrix `A`, we want to flip the image horizontally, then invert it, and return the resulting image.

To flip an image horizontally means that each row of the image is reversed. For example, flipping `[1, 1, 0]` horizontally results in `[0, 1, 1]`.

To invert an image means that each `0` is replaced by `1`, and each `1` is replaced by `0`. For example, inverting `[0, 1, 1]` results in `[1, 0, 0]`.

**Example 1:**

```
Input: [[1,1,0],[1,0,1],[0,0,0]]
Output: [[1,0,0],[0,1,0],[1,1,1]]
Explanation: First reverse each row: [[0,1,1],[1,0,1],[0,0,0]].
Then, invert the image: [[1,0,0],[0,1,0],[1,1,1]]
```

**Example 2:**

```
Input: [[1,1,0,0],[1,0,0,1],[0,1,1,1],[1,0,1,0]]
Output: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
Explanation: First reverse each row: [[0,0,1,1],[1,0,0,1],[1,1,1,0],[0,1,0,1]].
Then invert the image: [[1,1,0,0],[0,1,1,0],[0,0,0,1],[1,0,1,0]]
```

**Notes:**

- `1 <= A.length = A[0].length <= 20`
- `0 <= A[i][j] <= 1`



### Solution 1: Cool

```python
class Solution:
    def flipAndInvertImage(self, A: List[List[int]]) -> List[List[int]]:
        
        result = []
        
        for r, row in enumerate(A):
            temp = [0] * len(row)
            for i in range(len(row)):
                temp[i] = 0 if row[len(row) - i - 1] else 1
            result.append(temp)
            
        return result
```

This solution follows the algorithm described in the problem. For each row, we reverse the bits and then flip them. 

### Solution 2: Cooler

```python
class Solution:
    def flipAndInvertImage(self, A: List[List[int]]) -> List[List[int]]:
        
        for r, row in enumerate(A):
            A[r] = [0 if n else 1 for n in reversed(row)]
            
        return A
```

We can take advantage of Python [List Comprehensions](https://docs.python.org/3/tutorial/datastructures.html#list-comprehensions) to rewrite this code in a much cleaner and pythonic way. For each row in `A`, we follow the same logic as before, but we can combine it into one list comprehension statement that is clear to read.

### Solution 3: Too Far

```python
class Solution:
    def flipAndInvertImage(self, A: List[List[int]]) -> List[List[int]]:
    
        return [[0 if n else 1 for n in reversed(row)] for r, row in enumerate(A)]
```

If we take our list comprehension even further, we're left with this monstrosity that combines all of our logic into one line. I think that this is bad coding style, as it makes it significantly harder to figure out what our solution is doing.



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}