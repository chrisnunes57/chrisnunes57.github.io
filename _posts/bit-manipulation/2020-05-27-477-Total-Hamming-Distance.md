---
layout: post
title: 477. Total Hamming Distance
date: 2020-05-27 23:33
description: Solving Leetcode problem "477. Total Hamming Distance"
tag:
  - leetcode
  - medium
  - bit manipulation
link: https://leetcode.com/problems/total-hamming-distance/
---



The [Hamming distance](https://en.wikipedia.org/wiki/Hamming_distance) between two integers is the number of positions at which the corresponding bits are different.

Now your job is to find the total Hamming distance between all pairs of the given numbers.

**Example:**

```markdown
Input: 4, 14, 2

Output: 6

Explanation: In binary representation, the 4 is 0100, 14 is 1110, and 2 is 0010 (just
showing the four bits relevant in this case). So the answer will be:
HammingDistance(4, 14) + HammingDistance(4, 2) + HammingDistance(14, 2) = 2 + 2 + 2 = 6.
```



**Note:**

1. Elements of the given array are in the range of `0`{:.language-markdown} to `10^9`{:.language-markdown}
2. Length of the array will not exceed `10^4`{:.language-markdown}. 

### Solution 1: Not good enough.

```python
class Solution:
    def totalHammingDistance(self, nums: List[int]) -> int:
        
        count = 0
        
        for i in range(len(nums)):
            for j in range(i + 1, len(nums)):
                count += self.hammingDistance(nums[i], nums[j])
                
        return count
        
    def hammingDistance(self, a, b):
        
        count = 0
        
        while a > 0 or b > 0:
            count += (a & 1) ^ (b & 1)
            
            a >>= 1
            b >>= 1
            
        return count
```

This first solution was the first, most basic thing that I came up with. We create a helper method, `hammingDistance()`{:.language-markdown}, that returns the hamming distance between two numbers.

Then, we use a nested loop to compare every possible pair of numbers and add up their hamming distances. This solution is valid and works, but does not pass every test case. 

That is because the time complexity of this solution is `O(n * n)`{:.language-markdown}, due to the nested `for`{:.language-markdown} loops. This is not good enough to pass larger test cases, and it appears that we need to find a way to reduce the order to `O(n)`{:.language-markdown}. 



### Solution 2: Good

```python
class Solution:
    def totalHammingDistance(self, nums: List[int]) -> int:
        
        count = 0
        
        for i in range(32):
            
            count1 = 0
            count0 = 0
            
            for n in nums:
                if (n >> i) & 1:
                    count1 += 1
                else:
                    count0 += 1
                    
            count += count1 * count0
            
        return count
```

This solution also has nested `for`{:.language-markdown} loops, but it runs in order `O(n)`{:.language-markdown} time. This is because, unlike in the previous solution, the outer loop does not change based on the length of `nums`{:.language-markdown}. Instead, we iterate exactly 32 times, no matter what.

These 32 iterations are to loop through each bit position in our ints. Given the constraints of the problem, specifically the one that says "Elements of the given array are in the range of `0 `{:.language-markdown} to `10^9`{:.language-markdown}", we know that each element in `nums`{:.language-markdown} will be a 32-bit integer. 

So, for each bit position, we loop through and count how many numbers have that bit set to 1, as well as how many numbers have that bit set to 0. Since we're no longer generating each possible pair manually, we have to figure out how to calculate how many differences there will be without actually solving each pair.

The number of differences at each bit index is actually equal to `num_zeros * num_ones`{:.language-markdown}, where these variables represent how many zeros and ones there are at that index. I'm honestly not really sure how to prove this, but it works. More thinking required.



##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}

