---
layout: post
title: 1347. Minimum Number of Steps to Make Two Strings Anagram
date: 2020-05-14 20:37
description: Solving Leetcode problem "1347. Minimum Number of Steps to Make Two Strings Anagram"
tag:
  - leetcode
  - medium
  - strings
link: https://leetcode.com/problems/minimum-number-of-steps-to-make-two-strings-anagram/
---



Given two equal-size strings `s` and `t`. In one step you can choose **any character** of `t` and replace it with **another character**.

Return *the minimum number of steps* to make `t` an anagram of `s`.

An **Anagram** of a string is a string that contains the same characters with a different (or the same) ordering.



**Example 1:**

```
Input: s = "bab", t = "aba"
Output: 1
Explanation: Replace the first 'a' in t with b, t = "bba" which is anagram of s.
```

**Example 2:**

```
Input: s = "leetcode", t = "practice"
Output: 5
Explanation: Replace 'p', 'r', 'a', 'i' and 'c' from t with proper characters to make t anagram of s.
```

**Example 3:**

```
Input: s = "anagram", t = "mangaar"
Output: 0
Explanation: "anagram" and "mangaar" are anagrams.
```

**Example 4:**

```
Input: s = "xxyyzz", t = "xxyyzz"
Output: 0
```

**Example 5:**

```
Input: s = "friend", t = "family"
Output: 4
```



**Constraints:**

- `1 <= s.length <= 50000`
- `s.length == t.length`
- `s` and `t` contain lower-case English letters only.



### Solution 1: Non-Optimal

```python
class Solution:
    def minSteps(self, s: str, t: str) -> int:

        for c in s:
            t = t.replace(c, "", 1)

        return len(t)
```



This is one of the simplest solutions I could think of. Since we know that both of the input strings are the same length, we can find the solution by finding the number of letters that are in string 2 and not string 1. This will leave us with only the letters that are different, and the number of different letters is our answer.

However, it runs a LOT slower than other solutions. This is because of a few things. First, our solution is of order ```O(n * n)```, where ```n``` is the length of the strings. This can be optimized to ```O(n)```, as we see in the second solution. Additionally, this solution deals with a lot of string concatenation. String are immutable, which means that you can't modify them the same way you would arrays. Instead, you have to create a copy of the string and modify the copy.

This is ***dummy*** slow.



### Solution 2: No String Concatenation

```python
from collections import defaultdict

class Solution:
    def minSteps(self, s: str, t: str) -> int:

        letters = defaultdict(int)

        for c in s:
            letters[c] += 1

        count = 0

        for c in t:
            letters[c] -= 1

        for val in letters.values():
            count += max(val, 0)

        return count
```



In this solution, we use a ```dict``` to keep track of the count of every letter. We increment through every letter in our first word, and store the counts in our dictionary.

Lets use an example: ```minSteps("abba", "dcba")```

If we looped through the word ```"abba"```, our dict would look like this:

```json
{
  "a": 2,
  "b": 2
}
```



Next, we compare the second word. For every letter in the next word, we subtract one from its frequency, which is basically the opposite of what we did with the first word. So if the next word to process was ```"dcba"```, our dict would look like this (although not necessarily in sorted order).



```json
{
  "a": 1,
  "b": 1,
  "c": -1,
  "d": -1
}
```



As you can see, the dict shows the differences in frequency for each letter. Interestingly, we can get the expected answer (which is 2) by summing either the positive values or the negative values. In my solution I chose to sum the positive values so that I could avoid taking the absolute value of the negative numbers.



#### Notes

We established that the first solution was order ```O(n * n)```. The optimal solution is order ```O(n)```, as we have no nested loops or functions.



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}
