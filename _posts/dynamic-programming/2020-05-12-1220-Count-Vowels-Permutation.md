---
layout: post
title: 1220. Count Vowels Permutation
date: 2020-05-12 17:58
description: Solving Leetcode problem "1220. Count Vowels Permutation"
tag:
  - leetcode
  - hard
  - dynamic programming
link: https://leetcode.com/problems/count-vowels-permutation/
---

Given an integer `n`{:.language-markdown}, your task is to count how many strings of length `n`{:.language-markdown} can be formed under the following rules:

- Each character is a lower case vowel (`'a'`{:.language-markdown}, `'e'`{:.language-markdown}, `'i'`{:.language-markdown}, `'o'`{:.language-markdown}, `'u'`{:.language-markdown})
- Each vowel `'a'`{:.language-markdown} may only be followed by an `'e'`{:.language-markdown}.
- Each vowel `'e'`{:.language-markdown} may only be followed by an `'a'`{:.language-markdown} or an `'i'`{:.language-markdown}.
- Each vowel `'i'`{:.language-markdown} **may not** be followed by another `'i'`{:.language-markdown}.
- Each vowel `'o'`{:.language-markdown} may only be followed by an `'i'`{:.language-markdown} or a `'u'`{:.language-markdown}.
- Each vowel `'u'`{:.language-markdown} may only be followed by an `'a'.`{:.language-markdown}

Since the answer may be too large, return it modulo `10^9 + 7.`{:.language-markdown}



**Example 1:**

```markdown
Input: n = 1
Output: 5
Explanation: All possible strings are: "a", "e", "i" , "o" and "u".
```

**Example 2:**

```markdown
Input: n = 2
Output: 10
Explanation: All possible strings are: "ae", "ea", "ei", "ia", "ie", "io", "iu", "oi", "ou" and "ua".
```

**Example 3:**

```markdown
Input: n = 5
Output: 68
```



**Constraints:**

- `1 <= n <= 2 * 10^4`{:.language-markdown}



### Solution

```python
class Solution:
    def countVowelPermutation(self, n: int) -> int:
        bases = {
            "a": 1,
            "e": 1,
            "i": 1,
            "o": 1,
            "u": 1
        }

        for i in range(n - 1):
            new = dict()

            new["a"] = bases["e"]
            new["e"] = bases["a"] + bases["i"]
            new["i"] = bases["a"] + bases["e"] + bases["o"] + bases["u"]
            new["o"] = bases["i"] + bases["u"]
            new["u"] = bases["a"]

            bases = new

        return sum(bases.values()) % (10 ** 9 + 7)
```



For this solution, I wasn't sure exactly how to start. I ended up with a very simple solution, that kind of works by following the steps given in the problem.

The algorithm is straightforward, in a DP way. We have a table that maps each letter to the number of combinations starting with that letter that are possible. We loop for ```n - 1```{:.language-markdown} iterations, and update our table with new values each iteration. This new value is the sum of all combinations starting with a letter that can be combined with our current letter.

For example, the vowel "a" can only be followed by the vowel "e". So, the new value of ```table["a"]```{:.language-markdown} is going to be ```table["e"]```{:.language-markdown}, as these are all of the combinations that start with "e". 

We do the same for other letters, and eventually our table will have all of the combinations that start with each letter. We sum those up and perform the modulus operation, and we're set.



#### Notes 

There are more efficient solutions that use 2D arrays, but I'm not big brained enough to understand those yet.

##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}
