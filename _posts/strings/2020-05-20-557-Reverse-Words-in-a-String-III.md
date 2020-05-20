---
layout: post
title: 557. Reverse Words in a String III
date: 2020-05-20 16:11
description: Solving Leetcode problem "557. Reverse Words in a String III"
tag:
  - leetcode
  - easy
  - strings
link: https://leetcode.com/problems/reverse-words-in-a-string-iii/
---

Given a  string, you need to reverse the order of characters in each word within a sentence while still preserving whitespace and initial word order.

**Example 1:**

```
Input: "Let's take LeetCode contest"
Output: "s'teL ekat edoCteeL tsetnoc"
```



**Note:** In the string, each word is separated by single space and there will not be any extra space in the string.



### Solution 1: The easy way

```python
class Solution:
    def reverseWords(self, s: str) -> str:
        
        s = s.split(" ")
        
        for i, word in enumerate(s):
            s[i] = word[::-1]
            
        return " ".join(s)
```

In this solution we rely heavily on Python's ability to easily reverse strings using `[::-1]` string slicing. We split up the initial string by space, then reversed each individual word using string slicing. 

However, let's pretend we were doing this in a programming language that didn't have really easy ways to reverse lists built in.

### Solution 2: The hard way

```c
char * reverseWords(char * s){
    
    int follow = 0;
    int lead = 0;
    
    while( s[lead] != '\0') {
        if( s[lead] == ' ') {
            reverse(s, follow, lead - 1);
            lead++;
            follow = lead;
        } else {
            lead++;
        }
    }
    
    // we make one additional call for the last word
    reverse(s, follow, lead - 1);
    
    return s;
}

void reverse(char* s, int front, int back) {
    while(front < back) {
        char temp = s[front];
        s[front] = s[back];
        s[back] = temp;
        
        front++;
        back--;
    }   
}
```

This pained me to do, but I wrote this one in C to show what the most basic solution would look like. We loop through our original string, finding the beginning and ending index of each consecutive word. 

When we find the beginning and end indices of each word, we reverse it using the same algorithm that we used for [Reverse Words in a String - Part 1](https://chrisnunes57.github.io/334-Reverse-String/). 

### Solution 3: Back to the good stuff

```python
class Solution:
    def reverseWords(self, s: str) -> str:
        
        return " ".join([word[::-1] for word in s.split(" ")])
```

Python one-liner. Much better.



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}