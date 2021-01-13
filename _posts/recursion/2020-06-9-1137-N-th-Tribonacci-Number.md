---
layout: post
title: 1137. N-th Tribonacci Number
date: 2020-06-9 22:24
description: Solving Leetcode problem "1137. N-th Tribonacci Number"
tag:
  - leetcode
  - easy
  - recursion
link: https://leetcode.com/problems/n-th-tribonacci-number/
---

The Tribonacci sequence Tn is defined as follows: 

T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0.

Given `n`{:.language-markdown}, return the value of Tn.

 

**Example 1:**

```markdown
Input: n = 4
Output: 4
Explanation:
T_3 = 0 + 1 + 1 = 2
T_4 = 1 + 1 + 2 = 4
```

**Example 2:**

```markdown
Input: n = 25
Output: 1389537
```

 

**Constraints:**

- `0 <= n <= 37`{:.language-markdown}
- The answer is guaranteed to fit within a 32-bit integer, ie. `answer <= 2^31 - 1`{:.language-markdown}.

### Solution 1: Recursion with Memoization

```python
class Solution:
    
    cache = {
        0: 0,
        1: 1,
        2: 1
    }
    
    def tribonacci(self, n: int) -> int:
        
        if n not in self.cache:
            self.cache[n] = self.tribonacci(n - 1) + self.tribonacci(n - 2) + self.tribonacci(n - 3)
        
        return self.cache[n]
```

This solution is similar to the recursive solution to solving the [regular fibonacci sequence](/509-Fibonacci-Number/). The only difference is that instead of calculating the previous *two* values, we calculate the previous three.  

### Solution 2: Cheese 🧀

There is actually a way to solve this method in order `O(1)`{:.language-markdown} time and `O(n)`{:.language-markdown} space. We do this by manually calculating the first 37 tribonacci numbers and hard-coding them into our solution.

Note: we use the first 37 values because Leetcode only tests for values in the range of `0 <= n <= 37`{:.language-markdown}. 

```python
class Solution:
    
    def tribonacci(self, n: int) -> int:
        
        nums = [0,1,1,2,4,7,13,24,44,81,149,274,504,927,1705,3136,5768,10609,19513,35890,66012,121415,223317,410744,755476,1389537,2555757,4700770,8646064,15902591,29249425,53798080,98950096,181997601,334745777,615693474,1132436852,2082876103]
        
        return nums[n]
```



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}