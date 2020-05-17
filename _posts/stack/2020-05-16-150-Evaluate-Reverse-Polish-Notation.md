---
layout: post
title: 150. Evaluate Reverse Polish Notation
date: 2020-05-17 2:02
description: Solving Leetcode problem "150. Evaluate Reverse Polish Notation"
tag:
  - leetcode
  - medium
  - stack
link: https://leetcode.com/problems/evaluate-reverse-polish-notation/
---

Evaluate the value of an arithmetic expression in [Reverse Polish Notation](http://en.wikipedia.org/wiki/Reverse_Polish_notation).

Valid operators are `+`, `-`, `*`, `/`. Each operand may be an integer or another expression.

**Note:**

- Division between two integers should truncate toward zero.
- The given RPN expression is always valid. That means the expression would always evaluate to a result and there won't be any divide by zero operation.

**Example 1:**

```
Input: ["2", "1", "+", "3", "*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9
```

**Example 2:**

```
Input: ["4", "13", "5", "/", "+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6
```

**Example 3:**

```
Input: ["10", "6", "9", "3", "+", "-11", "*", "/", "*", "17", "+", "5", "+"]
Output: 22
Explanation: 
  ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22
```



### Solution 1: Else/If

```python
class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        
        stack = []
        operators = {"+", "-", "*", "/"}
        
        for tok in tokens:
            if tok in operators:
                r = stack.pop()
                l = stack.pop()
                if tok == "+":
                    stack.append(l + r)
                elif tok == "-":
                    stack.append(l - r)
                elif tok == "*":
                    stack.append(l * r)
                else:
                    stack.append(int(l / r))
            else:
                stack.append(int(tok))
                
        return stack.pop()
```



If you aren't familiar with Reverse Polish Notation/Postfix Notation, learn about it [here](https://wiki.c2.com/?PostfixNotation). It is basically a different way of representing equations so that the operator groupings are not ambiguous (basically, no need to worry about [PEMDAS](https://www.purplemath.com/modules/orderops.htm)). 

The solution is very simple. Two operands will be followed by their operator, so we can just iterate over each operand and add it to our stack. When we arrive at an operator, we pop the two most recent operands off of the stack and perform the operation. Once the new operation is finished, we put our new value back on the stack and continue. 

This solution is simple and efficient, but results in us having a long chain of if/else statements. If we were to add in more operators, such as exponentiation or bitwise operators, this chain of if/else statements would get unbearably long.

### Solution 2: Lambda Functions

```python
class Solution:
    def evalRPN(self, tokens: List[str]) -> int:
        
        stack = []
        operators = {
            "+": (lambda right, left: left + right),
            "-": (lambda right, left: left - right),
            "*": (lambda right, left: left * right),
            "/": (lambda right, left: int(left / right))
        }
        
        for tok in tokens:
            if tok not in operators:
                stack.append(int(tok))
            else:
                l, r = stack.pop(), stack.pop()
                stack.append(operators[tok](l,r))
                
        return stack.pop()
```



This solution uses the same algorithm as the previous, but is refactored to use predefined lambda functions instead of large if/else blocks. We define the function for each operator ahead of time, so that when we arrive at an operator we can simply call the function mapped to that operator. 



#### Notes

I ran into issues solving this in Python, because both the `/` and `//` operators in Python behave differently than the division that we want to achieve. Instead, we use `int(a/b)`. 



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}