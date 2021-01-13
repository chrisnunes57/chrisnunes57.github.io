---
layout: post
title: 693. Binary Number with Alternating Bits
date: 2020-05-05 15:45
description: Solving Leetcode problem "693. Binary Number with Alternating Bits"
tag:
  - leetcode
  - easy
  - bit manipulation
link: https://leetcode.com/problems/binary-number-with-alternating-bits/
---

Given a positive integer, check whether it has alternating bits: namely, if two adjacent bits will always have different values.

**Example 1:**

```markdown
Input: 5
Output: True
Explanation:
The binary representation of 5 is: 101
```



**Example 2:**

```markdown
Input: 7
Output: False
Explanation:
The binary representation of 7 is: 111.
```



**Example 3:**

```markdown
Input: 11
Output: False
Explanation:
The binary representation of 11 is: 1011.
```



**Example 4:**

```markdown
Input: 10
Output: True
Explanation:
The binary representation of 10 is: 1010.
```



### Solution

```python
class Solution:
    def hasAlternatingBits(self, n: int) -> bool:

        last_bit = n & 1

        while n > 0:
            n >>= 1

            if n & 1 == last_bit:
                return False

            last_bit = n & 1

        return True
```



This one is pretty straightforward. We iterate through each of the bits of the input number, starting with the least significant bit. We keep track of the last bit we saw, and compare it to the current. If the last bit we saw is the same as the current, we know that it is not alternating.

We use two bit operations here, the bitwise ```AND```{:.language-markdown} and ```SHIFT```{:.language-markdown}:

- ```n & 1```{:.language-markdown} performs bitwise AND on the operands and returns the least significant bit in n
- ```n >> 1```{:.language-markdown} performs a left bitwise shift, which essentially divides the number by two and removes the last bit
  - Example: ```1010011 >> 1    =>   101001```{:.language-markdown}



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}
