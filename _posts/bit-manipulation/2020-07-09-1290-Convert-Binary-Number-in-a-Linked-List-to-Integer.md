---
layout: post
title: 1290. Convert Binary Number in a Linked List to Integer
date: 2020-07-09 14:02
description: Solving Leetcode problem "1290. Convert Binary Number in a Linked List to Integer"
tag:
  - leetcode
  - easy
  - bit manipulation
  - binary
  - linked list
link: https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/
---

Given `head` which is a reference node to a singly-linked list. The value of each  node in the linked list is either 0 or 1. The linked list holds the  binary representation of a number.

Return the *decimal value* of the number in the linked list.

 

**Example 1:**

![img](https://assets.leetcode.com/uploads/2019/12/05/graph-1.png)

```
Input: head = [1,0,1]
Output: 5
Explanation: (101) in base 2 = (5) in base 10
```

**Example 2:**

```
Input: head = [0]
Output: 0
```

**Example 3:**

```
Input: head = [1]
Output: 1
```

**Example 4:**

```
Input: head = [1,0,0,1,0,0,1,1,1,0,0,0,0,0,0]
Output: 18880
```

**Example 5:**

```
Input: head = [0,0]
Output: 0
```

 

**Constraints:**

- The Linked List is not empty.
- Number of nodes will not exceed `30`.
- Each node's value is either `0` or `1`.



### Solution

```python
class Solution:
    def getDecimalValue(self, head: ListNode) -> int:
        
        result = 0
        
        while head:
            result = (result << 1) | head.val
            head = head.next
        
        return result
```

In this solution we have an integer, `result`, in which we store our current result. As we loop through each node in the linked list, we take the bit value at each node and update our result accordingly. 

The algorithm goes like this:

- For each node in the list
  - **Left Shift** `result` by 1 bit to make space for the new bit value
  - Set result equal to `result OR new_bit`
  - Update our current node and move to the next one
- When we're finished, return our result.

### Notes

Blog is back! Going to be posting more.

##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}

