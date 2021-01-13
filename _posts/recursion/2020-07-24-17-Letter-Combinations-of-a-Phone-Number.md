---
layout: post
title: 17. Letter Combinations of a Phone Number
date: 2020-07-24 21:17
description: Solving Leetcode problem "17. Letter Combinations of a Phone Number"
tag:
  - leetcode
  - medium
  - recursion
link: https://leetcode.com/problems/letter-combinations-of-a-phone-number/
---

Given a string containing digits from `2-9`{:.language-markdown} inclusive, return all possible letter combinations that the number could represent.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

![img](https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Telephone-keypad2.svg/200px-Telephone-keypad2.svg.png)

**Example:**

```markdown
Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
```

**Note:**

Although the above answer is in lexicographical order, your answer could be in any order you want.



### Solution

```python
class Solution:
    def letterCombinations(self, digits: str) -> List[str]:
        output = []
        mapping = {
            '2': ['a', 'b', 'c'],
            '3': ['d', 'e', 'f'],
            '4': ['g', 'h', 'i'],
            '5': ['j', 'k', 'l'],
            '6': ['m', 'n', 'o'],
            '7': ['p', 'q', 'r', 's'],
            '8': ['t', 'u', 'v'],
            '9': ['w', 'x', 'y', 'z']
        }
        
        def generate(combination, next_digits):
            
            # check to see if we have more digits to process
            if len(next_digits) == 0:
                output.append(combination)
            else:
                # we have more numzz
                for c in mapping[next_digits[0]]:
                    generate(combination + c, next_digits[1:])
        
        if digits:
            generate("", digits)
            
        return output
```

This solution isn't super complex to code, but if you're not familiar with recursion, it'll be complex to understand. I'm not great with recursion myself, but I'll try to explain (for my own sake). At a basic level, this program goes through every digit provided in the list and iterates through all of their letters.

This function tracks two things: a current combination of letters that we're building, and a list `next_digits`{:.language-markdown}, which tracks all of the digits in the given string that we're yet to add to our current combination. We also have a dictionary `mapping`{:.language-markdown}, which provides a mapping between each digit and the letters associated with it.

We start off the same way that every recursive method does: the base case, where we stop recursing if a condition is met. In this case, we stop calling the method when we have run out of digits to add to the current combination. 

If there are still digits remaining to test, we loop through each letter that the digit is associated with. Then, for each letter, we first remove the current digit from the `next_digits`{:.language-markdown} list and then add the current letter to the `combination`{:.language-markdown} variable. Using these updated values, we recur and the same process happens again.

When the program runs out of digits and letters to process, it adds the current 	`combination`{:.language-markdown} to a list of combinations. In the end, we return this list of combinations as our final answer.

### Notes

Was asked a variation of this question on a Whole Foods HackerRank!

##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}