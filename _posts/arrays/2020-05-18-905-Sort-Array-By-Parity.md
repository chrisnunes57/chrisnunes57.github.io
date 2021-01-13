---
layout: post
title: 905. Sort Array By Parity
date: 2020-05-19 13:45
description: Solving Leetcode problem "905. Sort Array By Parity"
tag:
  - leetcode
  - easy
  - arrays
link: https://leetcode.com/problems/sort-array-by-parity/
---

Given an array `A`{:.language-markdown} of non-negative integers, return an array consisting of all the even elements of `A`{:.language-markdown}, followed by all the odd elements of `A`{:.language-markdown}

You may return any answer array that satisfies this condition.

 

**Example 1:**

```markdown
Input: [3,1,2,4]
Output: [2,4,3,1]
The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.
```

 

**Note:**

1. `1 <= A.length <= 5000`{:.language-markdown}
2. `0 <= A[i] <= 5000`{:.language-markdown}



### Solution 1: Naïve

```python
class Solution:
    def sortArrayByParity(self, A: List[int]) -> List[int]:
        
        result = []
        
        for n in A:
            if n % 2 == 0:
                result.append(n)
                
        for n in A:
            if n % 2 == 1:
                result.append(n)
                
        return result
```

This solution is the most basic one I could conceive. First, we create an empty array to store our result. Then we loop through the given list twice: the first time to add all of the even numbers, and the second time to add all of the odd numbers.

This is an easy solution, and it is order `O(n)`{:.language-markdown}, which is the best time complextity we can get for this problem. However, this solution also requires `O(n)`{:.language-markdown} space due to us creating a separate list to return.

How would we solve this without using any additional data structures?

### Solution 2: Swapping in Place

```python
class Solution:
    def sortArrayByParity(self, A: List[int]) -> List[int]:
        
        front = 0
        back = len(A) - 1
        
        while front < back:
            if A[front] % 2 == 1 and A[back] % 2 == 0:
                # we should swap
                A[front], A[back] = A[back], A[front]
                
            if A[front] % 2 == 0:
                front += 1
            if A[back] % 2 == 1:
                back -= 1
                
        return A
```

This solution uses part of the quicksort algorithm. We start with two pointers, one to the front of the list and one to the back. We start moving them towards each other, swapping values if they are in the wrong place.

Eventually, our pointers meet in the middle, and we know that both halves of the array are sorted. [This Medium post](https://medium.com/karuna-sehgal/a-quick-explanation-of-quick-sort-7d8e2563629b) has a really good graphic demonstrating how QuickSort works.

As you can see, this solution uses no additional data structures, and in the end we return the same list that we were given. And although QuickSort is usually order `O(n * log(n))`{:.language-markdown}, this solution is order `O(n)`{:.language-markdown} because we only pass through the list once.



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}