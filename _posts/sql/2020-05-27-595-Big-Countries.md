---
layout: post
title: 595. Big Countries
date: 2020-05-27 22:11
description: Solving Leetcode problem "595. Big Countries"
tag:
  - leetcode
  - easy
  - sql
link: https://leetcode.com/problems/big-countries/

---

There is a table `World`{:.language-markdown}.

```
+-----------------+------------+------------+--------------+---------------+
| name            | continent  | area       | population   | gdp           |
+-----------------+------------+------------+--------------+---------------+
| Afghanistan     | Asia       | 652230     | 25500100     | 20343000      |
| Albania         | Europe     | 28748      | 2831741      | 12960000      |
| Algeria         | Africa     | 2381741    | 37100000     | 188681000     |
| Andorra         | Europe     | 468        | 78115        | 3712000       |
| Angola          | Africa     | 1246700    | 20609294     | 100990000     |
+-----------------+------------+------------+--------------+---------------+
```

A country is big if it has an area of bigger than 3 million square km or a population of more than 25 million.

Write a SQL solution to output big countries' name, population and area.

For example, according to the above table, we should output:

```
+--------------+-------------+--------------+
| name         | population  | area         |
+--------------+-------------+--------------+
| Afghanistan  | 25500100    | 652230       |
| Algeria      | 37100000    | 2381741      |
+--------------+-------------+--------------+
```



### Solution

```mysql
# Write your MySQL query statement below
select 
    name, population, area 
from 
    World 
where 
    area > 3000000 or population > 25000000
```

I really, really, really, really don't enjoy writing SQL.

##### [Try it on Leetcode]({{ page.link }}){:target="_blank"}