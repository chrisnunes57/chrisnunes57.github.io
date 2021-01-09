---
layout: post
title: 171. Excel Sheet Column Number
date: 2020-05-04 23:14
description: Solving Leetcode problem "171. Excel Sheet Column Number"
link: https://leetcode.com/problems/excel-sheet-column-number/
tag:
  - leetcode
  - easy
  - basic math
---

Given a column title as appear in an Excel sheet, return its corresponding column number.

For example:

```markdown
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

```markdown
Input: "A"
Output: 1
```

**Example 2:**

```markdown
Input: "AB"
Output: 28
```

**Example 3:**

```markdown
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

We start at the beginning of the given string and calculate the distance of the current letter from the letter 'A'. We use the ASCII values of the letter to do this, using python's ```ord()```{:.language-markdown} method.

​		- Example:  ```ord('B') - ord('A') = 1```{:.language-markdown}

 Then, for each new letter, we multiply the current column number by 26 to represent the increase in magnitude.

​		- Reasoning: The 'A' in the column title ```'BA'```{:.language-markdown} has a value of 1, while the 'A' in the column title ```'AB'```{:.language-markdown} has a value of 26.



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}
