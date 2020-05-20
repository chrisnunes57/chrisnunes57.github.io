---
layout: post
title: 728. Self Dividing Numbers
date: 2020-05-19 21:50
description: Solving Leetcode problem "728. Self Dividing Numbers"
tag:
  - leetcode
  - easy
  - basic math
link: https://leetcode.com/problems/self-dividing-numbers/
---

A *self-dividing number* is a number that is divisible by every digit it contains.

For example, 128 is a self-dividing number because `128 % 1 == 0`, `128 % 2 == 0`, and `128 % 8 == 0`.

Also, a self-dividing number is not allowed to contain the digit zero.

Given a lower and upper number bound, output a list of every possible self dividing number, including the bounds if possible.

**Example 1:**

```
Input: 
left = 1, right = 22
Output: [1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 12, 15, 22]
```



**Note:**

The boundaries of each input argument are `1 <= left <= right <= 10000`.

### Solution

```python
class Solution:
    def selfDividingNumbers(self, left: int, right: int) -> List[int]:
        
        result = []
        
        for i in range(left, right + 1):
            if self.isSelfDividing(i):
                result.append(i)
                
        return result
        
    
    def isSelfDividing(self, n):
        
        original_num = n
        
        while n > 0:
            digit = n % 10
            if digit == 0 or original_num % digit != 0:
                return False
            
            n //= 10
            
        return True
```

This solution is longer than most, because I created a helper method to check if a number was self-dividing. Basically, we iterate over each digit of the number by doing basic math. We can return the last digit of a number by doing `number % 10`, and we can truncate the last digit of a number by doing `number / 10`.

We use these properties to go through the given list of numbers and check if each one is a self dividing number.

##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}