---
layout: post
title: 1309. Decrypt String from Alphabet to Integer Mapping
date: 2020-05-18 13:24
description: Solving Leetcode problem "1309. Decrypt String from Alphabet to Integer Mapping"
tag:
  - leetcode
  - easy
  - strings
link: https://leetcode.com/problems/decrypt-string-from-alphabet-to-integer-mapping/
---



Given a string `s`{:.language-markdown} formed by digits (`'0'`{:.language-markdown} - `'9'`{:.language-markdown}) and `'#'`{:.language-markdown} . We want to map `s`{:.language-markdown} to English lowercase characters as follows:

- Characters (`'a'`{:.language-markdown} to `'i')`{:.language-markdown} are represented by (`'1'`{:.language-markdown} to `'9'`{:.language-markdown}) respectively.
- Characters (`'j'`{:.language-markdown} to `'z')`{:.language-markdown} are represented by (`'10#'`{:.language-markdown} to `'26#'`{:.language-markdown}) respectively. 

Return the string formed after mapping.

It's guaranteed that a unique mapping will always exist.

 

**Example 1:**

```markdown
Input: s = "10#11#12"
Output: "jkab"
Explanation: "j" -> "10#" , "k" -> "11#" , "a" -> "1" , "b" -> "2".
```

**Example 2:**

```markdown
Input: s = "1326#"
Output: "acz"
```

**Example 3:**

```markdown
Input: s = "25#"
Output: "y"
```

**Example 4:**

```markdown
Input: s = "12345678910#11#12#13#14#15#16#17#18#19#20#21#22#23#24#25#26#"
Output: "abcdefghijklmnopqrstuvwxyz"
```

 

**Constraints:**

- `1 <= s.length <= 1000`{:.language-markdown}
- `s[i]`{:.language-markdown} only contains digits letters (`'0'`{:.language-markdown}-`'9'`{:.language-markdown}) and `'#'`{:.language-markdown} letter.
- `s`{:.language-markdown} will be valid string such that mapping is always possible.



### Solution:

```python
class Solution:
    def freqAlphabets(self, s: str) -> str:
        
        i = len(s) - 1
        result = []
        
        while i >= 0:
            if s[i] == "#":
                temp = int(s[i - 1]) + int(s[i - 2]) * 10
                result.insert(0, chr(temp + 96))
                i -= 2
            else:
                result.insert(0, chr(int(s[i]) + 96))
                
            i -= 1
            
        return "".join(result)
```



It took me longer than it should have to figure out an approach for this problem. Eventually, I arrived at this solution. We iterate backwards through the string, and for each number we arrive at, we add the equivalent letter to the result. If we run into a `#`{:.language-markdown} character, we take the following two-digit number and put its corresponding letter into our result.







##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}