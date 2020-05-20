---
layout: post
title: 344. Reverse String
date: 2020-05-19 22:34
description: Solving Leetcode problem "344. Reverse String"
tag:
  - leetcode
  - easy
  - strings
link: 344. Reverse String
---

Write a function that reverses a string. The input string is given as an array of characters `char[]`.

Do not allocate extra space for another array, you must do this by **modifying the input array [in-place](https://en.wikipedia.org/wiki/In-place_algorithm)** with O(1) extra memory.

You may assume all the characters consist of [printable ascii characters](https://en.wikipedia.org/wiki/ASCII#Printable_characters).

 

**Example 1:**

```
Input: ["h","e","l","l","o"]
Output: ["o","l","l","e","h"]
```

**Example 2:**

```
Input: ["H","a","n","n","a","h"]
Output: ["h","a","n","n","a","H"]
```



### Solution

```python
class Solution:
    def reverseString(self, s: List[str]) -> None:
        """
        Do not return anything, modify s in-place instead.
        """
        
        front, back = 0, len(s) - 1
        
        while front < back:
            s[front], s[back] = s[back], s[front]
            
            front += 1
            back -= 1
```

This solution uses two pointers: one to the front of the list and one to the end of the list. The two pointers move towards each other, swapping values as they go. Once they meet in the middle, we know that both halves of the list have been processed and we're done.



#### Notes

This would be trivial to do in Python, since just calling `string.reverse()` would work. However, that felt like cheating, and I wanted to do it the long way.



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}