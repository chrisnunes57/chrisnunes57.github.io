---
layout: post
title: 1299. Replace Elements with Greatest Element on Right Side
date: 2020-05-18 12:37
description: Solving Leetcode problem "1299. Replace Elements with Greatest Element on Right Side"
tag:
  - leetcode
  - easy
  - arrays
link: https://leetcode.com/problems/replace-elements-with-greatest-element-on-right-side/
---

Given an array `arr`{:.language-markdown}, replace every element in that array with the greatest element among the  elements to its right, and replace the last element with `-1`{:.language-markdown}.

After doing so, return the array.



**Example 1:**

```markdown
Input: arr = [17,18,5,4,6,1]
Output: [18,6,6,6,1,-1]
```



**Constraints:**

- `1 <= arr.length <= 10^4`{:.language-markdown}
- `1 <= arr[i] <= 10^5`{:.language-markdown}



### Solution 1

```python
class Solution:
    def replaceElements(self, arr: List[int]) -> List[int]:

        index = len(arr) - 2
        big = arr[-1]

        while index >= 0:
            temp = arr[index]
            arr[index] = big
            big = max(big, temp)

            index -= 1

        arr[-1] = -1

        return arr
```

This solution solves the problem by looping from the right size of the list and keeping track of the maximum value we've already seen. For each new element we arrive at, we replace it with the maxium value that we've seen before it.







##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}
