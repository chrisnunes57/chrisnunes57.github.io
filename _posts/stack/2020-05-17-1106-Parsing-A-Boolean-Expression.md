---
layout: post
title: 1106. Parsing A Boolean Expression
date: 2020-05-17 11:42
description: Solving Leetcode problem "1106. Parsing A Boolean Expression"
tag:
  - leetcode
  - hard
  - stack
link: https://leetcode.com/problems/parsing-a-boolean-expression/
---

Return the result of evaluating a given boolean `expression`, represented as a string.

An expression can either be:

- `"t"`, evaluating to `True`;
- `"f"`, evaluating to `False`;
- `"!(expr)"`, evaluating to the logical NOT of the inner expression `expr`;
- `"&(expr1,expr2,...)"`, evaluating to the logical AND of 2 or more inner expressions `expr1, expr2, ...`;
- `"|(expr1,expr2,...)"`, evaluating to the logical OR of 2 or more inner expressions `expr1, expr2, ...`



**Example 1:**

```
Input: expression = "!(f)"
Output: true
```

**Example 2:**

```
Input: expression = "|(f,t)"
Output: true
```

**Example 3:**

```
Input: expression = "&(t,f)"
Output: false
```

**Example 4:**

```
Input: expression = "|(&(t,f,t),!(t))"
Output: false
```



**Constraints:**

- `1 <= expression.length <= 20000`
- `expression[i]` consists of characters in `{'(', ')', '&', '|', '!', 't', 'f', ','}`.
- `expression` is a valid expression representing a boolean, as given in the description.



### Solution 1

```python
class Solution:
    def parseBoolExpr(self, expression: str) -> bool:

        # lets try parsing it as a prefix notated expression
        stack = []
        count = 0
        operators = {"|", "&", "!"}

        for tok in expression:
            if tok == "f":
                stack.append(False)
            elif tok == "t":
                stack.append(True)
            elif tok == "(":
                stack.append(tok)
            elif tok in operators:
                stack.append(tok)
            elif tok == ")":
                # here is where we have to do the op stuff
                # popoff until we get to the beginning of expression
                operands = []
                temp = -1
                while stack and temp != "(":
                    temp = stack.pop()
                    if temp not in {"(", ","}:
                        operands.append(temp)
                # now do the op
                op = stack.pop()
                if op == "&":
                    stack.append(all(operands))
                elif op == "|":
                    stack.append(any(operands))
                elif op == "!":
                    stack.append(not operands[0])

        return stack.pop()
```



This solution is really long, so it can be hard to understand at first. In essence we're parsing this boolean expression as if it were in [Polish/Prefix notation](https://wiki.c2.com/?PolishNotation). We iterate through the list once, using a stack to keep track of what we have already seen. Our algorithm goes something like this:

```
- For each token in the expression:
    - If token is a 't' or 'f' value
        - Add True/False to the stack
    - Else if the token is an operator or the "(" symbol
        - Add the token to the stack
    - Else if our token is ")"
        - Here, we're at the end of an expression.
            - We go backwards until we hit the matching "(" token
        - Now, we have all of our operands in a list.
        - We evaluate the operands and then append the result to our stack
```

In the end, our stack should be left with only one value (if we did everything right). We pop off that value and return it.



### Solution 2: Refactored with Lambda

```python
class Solution:
    def parseBoolExpr(self, expression: str) -> bool:

        # lets try parsing it as a prefix notated expression
        stack = []
        operators = {
            "|": any,
            "&": all,
            "!": lambda nums: not nums[0]
        }

        for tok in expression:
            if tok == "f":
                stack.append(False)
            elif tok == "t":
                stack.append(True)
            elif tok in operators or tok == "(":
                stack.append(tok)
            elif tok == ")":
                # here is where we have to do the op stuff
                # popoff until we get to the beginning of expression
                operands = []
                temp = -1
                while stack and temp != "(":
                    temp = stack.pop()
                    if temp not in {"(", ","}:
                        operands.append(temp)
                # now do the op
                stack.append(operators[stack.pop()](operands))

        return stack.pop()
```



This solution is functionally the same as the last one, but it is refactored to use Python's lambda expressions. This maps each operator to the function that we want to use when we evaluate it.

This solution works the exact same way, but we are able to make it much shorter by using lambda functions.



#### Notes

This one didn't really feel like a Leetcode hard problem. Or maybe I'm just saying that because I actually solved it.



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}
