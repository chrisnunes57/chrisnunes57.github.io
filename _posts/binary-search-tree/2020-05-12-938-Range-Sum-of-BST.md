---
layout: post
title: 938. Range Sum of BST
date: 2020-05-14 19:20
description: Solving Leetcode problem "938. Range Sum of BST"
tag:
  - leetcode
  - easy
  - binary search tree
link: https://leetcode.com/problems/range-sum-of-bst/
---

Given the `root` node of a binary search tree, return the sum of values of all nodes with value between `L` and `R` (inclusive).

The binary search tree is guaranteed to have unique values.



**Example 1:**

```
Input: root = [10,5,15,3,7,null,18], L = 7, R = 15
Output: 32
```

**Example 2:**

```
Input: root = [10,5,15,3,7,13,18,1,null,6], L = 6, R = 10
Output: 23
```



**Note:**

1. The number of nodes in the tree is at most `10000`.
2. The final answer is guaranteed to be less than `2^31`.



### Solution 1: Non-Optimal, Check Every Node

```python
class Solution:
    def rangeSumBST(self, root: TreeNode, L: int, R: int) -> int:

        if root is None:
            return 0

        result = 0

        result += self.rangeSumBST(root.left, L, R)
        result += root.val if L <= root.val <= R else 0
        result += self.rangeSumBST(root.right, L, R)

        return result
```



This solution works by recurring through each node in the tree. We use an inorder traversal to go through the tree, and add the node's value if it is within bounds. This solution is super simple, but it is non-optimal because it loops through every node in the tree.

In problems like this, every bit of information that the problem gives us is important. Often times, there are clues in the problem that help us find our optimal solution. In this case, the important bit of information is that we are using a **binary search tree**.



### Solution 2: Binary Search Tree, Smart Recursion

```python
class Solution:
    def rangeSumBST(self, root: TreeNode, L: int, R: int) -> int:

        result = 0
        if root:

            if L <= root.val <= R:
                result += root.val
            if L < root.val:
                result += self.rangeSumBST(root.left, L, R)
            if R > root.val:
                result += self.rangeSumBST(root.right, L, R)

        return result
```



This solution is more efficient because of the way it takes advantage of the properties of a [binary search tree](https://www.geeksforgeeks.org/binary-search-tree-data-structure/). The binary search tree is sorted, so the left subtree of each node contains only values less than the node. The opposite is true of the right subtree, as it only contains nodes greater than the root.

We can use this to our advantage for this problem. As we iterate through the tree, we check the children of the current node. If the current node is out of bounds, say, less than the lower bound, we know that every node in the left subtree will also be out of bounds, and there is no point in checking them.

This approach allows us to skip checking a lot of nodes that we know will be out of bounds. This could still result in us iterating through every node if the upper and lower bounds are very wide, but for most reasonable test cases it would save time.



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}
