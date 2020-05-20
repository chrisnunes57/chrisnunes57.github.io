---
layout: post
title: 520. Detect Capital
date: 2020-05-19 23:05
description: Solving Leetcode problem "520. Detect Capital"
tag:
  - leetcode
  - easy
  - strings
link: https://leetcode.com/problems/detect-capital/
---

Given a word, you need to judge whether the usage of capitals in it is right or not.

We define the usage of capitals in a word to be right when one of the following cases holds:

1. All letters in this word are capitals, like "USA".
2. All letters in this word are not capitals, like "leetcode".
3. Only the first letter in this word is capital, like "Google".

Otherwise, we define that this word doesn't use capitals in a right way.

 

**Example 1:**

```
Input: "USA"
Output: True
```

 

**Example 2:**

```
Input: "FlaG"
Output: False
```

 

**Note:** The input will be a non-empty word consisting of uppercase and lowercase latin letters.



### Solution 1: The Easy Way

```python
class Solution:
    def detectCapitalUse(self, word: str) -> bool:
        
        return word.isupper() or word.islower() or word.istitle()
```

Using built-in Python functions we can solve this one really quickly. The `isupper()` method checks to see whether it's all uppercase, the `islower()` method checks to see whether it's all lowercase, and `istitle()` checks to see if it only has the first letter capitalized.

### Solution 2: The Hard Way

```python
class Solution:
    def detectCapitalUse(self, word: str) -> bool:
        
        lower_count = 0
        upper_count = 0
        
        for i, c in enumerate(word):
            if c.isupper():
                upper_count += 1
                if i != 0 and lower_count > 0:
                    return False
            else:
                lower_count += 1
                if upper_count > 1:
                    return False
                
        return True
```

In an interview, it probably won't be good enough to just whip together some Python functions. It will be impressive to show off your Python knowledge, but it will also be important to show that you know how to solve the problem from scratch.

In this algorithm we simply track how many uppercase and lowercase letters we've seen. We check in each iteration to make sure that the string is still valid, and we terminate early if not.



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}