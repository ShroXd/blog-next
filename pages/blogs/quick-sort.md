---
title: 'Algorithm Connect! Re: Dive - Quick sort'
date: '2022-7-17'
lastmod: '2022-7-17'
tags: ['algorithm', 'sort']
draft: true
summary: 'Non terrae plus ultra!'
authors: ['default']
---

[[toc]]

Compare with other sort algorithms, __quick sort__ is more popular since it's not difficult to implement, works well for a variety of different kinds of input data, and is substantially faster than any other sorting algorithms in typical applications.

# Divide and conquer

__Divide and conquer__ is a way to break complex problems into two or more smaller sub-problems of the same or related type, and then combine the answers to solve the original problem. In simple terms, divide and conquer can be done in 3 steps:

1. divide (into sub-problems)
2. conquer (by solving the sub-problems)
3. combine (the answers to solve the original problem)

There are two aspects to this concept that require attention:

- the way to recursively divide the original problem
- the base case

# Overview of quick sort

Quick sort is a fast sorting algorithm based on the divide and conquer approach to sort the list. It works by selecting a __Pivot__ element from the array and partitioning the other elements into two sub-arrays, according to whether they are less than or greater than the pivot. The sub-arrays are then sorted recursively.

![](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/blog/202207182253627.png)

As we discussed, the process of quick sort can be divided into 3 steps:

__Divide__:
    1. Pick a pivot element, $A[q]$
    2. Partition or re-arrange the array into 2 sub-arrays: $A[p,...,q-1]$ such that all elements are less than 


