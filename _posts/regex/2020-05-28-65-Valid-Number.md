---
layout: post
title: 65. Valid Number
date: 2020-05-28 19:39
description: Solving Leetcode problem "65. Valid Number"
tag:
  - leetcode
  - hard
  - regex
link: https://leetcode.com/problems/valid-number/
---

Validate if a given string can be interpreted as a decimal number.

Some examples:
 - `"0"`{:.language-markdown} => `true`{:.language-markdown}
 - `" 0.1 "`{:.language-markdown} => `true`{:.language-markdown}
 - `"abc"`{:.language-markdown} => `false`{:.language-markdown}
 - `"1 a"`{:.language-markdown} => `false`{:.language-markdown}
 - `"2e10"`{:.language-markdown} => `true`{:.language-markdown}
 - `" -90e3  "`{:.language-markdown} => `true`{:.language-markdown}
 - `" 1e"`{:.language-markdown} => `false`{:.language-markdown}
 - `"e3"`{:.language-markdown} => `false`{:.language-markdown}
 - `" 6e-1"`{:.language-markdown} => `true`{:.language-markdown}
 - `" 99e2.5 "`{:.language-markdown} => `false`{:.language-markdown}
 - `"53.5e93"`{:.language-markdown} => `true`{:.language-markdown}
 - `" --6 "`{:.language-markdown} => `false`{:.language-markdown}
 - `"-+3"`{:.language-markdown} => `false`{:.language-markdown}
 - `"95a54e53"`{:.language-markdown} => `false`{:.language-markdown}

**Note:** It is intended for the problem statement to be ambiguous. You should gather all requirements up front before  implementing one. However, here is a list of characters that can be in a valid decimal number:

- Numbers 0-9
- Exponent - "e"
- Positive/negative sign - "+"/"-"
- Decimal point - "."

Of course, the context of these characters also matters in the input.

### Solution 1: Regex

```python
import re

class Solution:
    def isNumber(self, s: str) -> bool:
        
        pattern = "^\s*[+-]?(\d+\.?|\.\d+)\d*(e[+-]?\d+)?\s*$"
        
        return re.match(pattern, s) is not None
```

For this problem, it seemed like you can go in one of two directions. You could either solve this by looping through the string and keeping track of state and edge cases, or you could use Regex to match a pattern.

If you don't know how Regex works, or need to refresh your memory, [this](https://regexone.com/) website is a great resource. You can view the solution and test cases for the above Regex at [this site](https://regex101.com/r/WZ23Iu/1). 

### Solution 2: Literally anything other than Regex

I did not want to take the brainpower to figure out how to actually do this problem, so Regex is as advanced as I'll get for this one. Maybe if I'm feeling brave one day I'll finish the problem in a different way.



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}