---
layout: post
title: 171. Excel Sheet Column Number
date: 2020-05-04 23:14
description: Solving Leetcode problem "171. Excel Sheet Column Number"
tag:
  - leetcode
  - easy
  - basic math
---

Given a column title as appear in an Excel sheet, return its corresponding column number.

For example:

```
    A -> 1
    B -> 2
    C -> 3
    ...
    Z -> 26
    AA -> 27
    AB -> 28
    ...
```

**Example 1:**

```
Input: "A"
Output: 1
```

**Example 2:**

```
Input: "AB"
Output: 28
```

**Example 3:**

```
Input: "ZY"
Output: 701
```



### Solution

```python
class Solution:
    def titleToNumber(self, s: str) -> int:

        sum = 0

        for char in s:
            sum = sum * 26 + ord(char) - 64

        return sum
```



### Explanation

We start at the beginning of the given string and calculate the distance of the current letter from the letter 'A'. We use the ASCII values of the letter to do this, using python's ```ord()``` method.

​		- Example:  ```ord('B') - ord('A') = 1```

 Then, for each new letter, we multiply the current column number by 26 to represent the increase in magnitude.

​		- Reasoning: The 'A' in the column title ```'BA'``` has a value of 1, while the 'A' in the column title ```'AB'``` has a value of 26.
