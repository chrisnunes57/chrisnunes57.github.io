---
layout: post
title: 2. Add Two Numbers
date: 2020-05-05 13:37
description: Solving Leetcode problem "2. Add Two Numbers"
tag:
  - leetcode
  - medium
  - linked lists
link: https://leetcode.com/problems/add-two-numbers/
---

You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order** and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Example:**

```
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
```



### Solution

```python
class Solution:
    def addTwoNumbers(self, l1: ListNode, l2: ListNode) -> ListNode:
        root = ListNode(0)
        root_ref = root
        carry = 0

        while l1 is not None or l2 is not None:
            temp_sum = (l1.val if l1 else 0) + (l2.val if l2 else 0)
            if carry:
                temp_sum += 1
                carry = 0
            if temp_sum > 9:
                carry = 1
                temp_sum %= 10

            root.next = ListNode(temp_sum)
            root = root.next
            l1 = l1.next if l1 else None
            l2 = l2.next if l2 else None

        if carry:
            root.next = ListNode(1)

        return root_ref.next
```



This solution is kinda long, but it is straightforward. We basically loop through the linked lists and add the numbers the same way we would by hand.

The algorithm is pretty simple: we loop through each digit of ```L1``` and ```L2``` simultaneously, and combine them to get the value of the new node. If it the new value would be 10 or greater, we need to carry the 1 to the next digit.

There is one potential edge case that arises when you finish looping through the lists but there is still a carry value leftover.

  * Example: Both input lists are `[5]`, so you combine them and get `[0]`. Then, you forget to add the `[1]` at the end.

#### Notes

Fun fact: I was asked this question in an interview with Snapchat and I bombed it.



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}
