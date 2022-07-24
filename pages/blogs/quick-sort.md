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

As we discussed, the process of quick sort can be divided into 3 steps:

1. Divide an array into sub-arrays by selecting a __pivot__ element. At this moment, we should keep the elements less than pivot are on the left side and elements greater than pivot are on the right side of the pivot.
2. Divide the left and right sub-arrays using the same approach. Continuing this processs until each sub-arrays contains a single element.
3. Combine elements to form a sorted array.

According to above procedure, we can implement the quick sort algorithm as the following code:

```kotlin
// lo: low bounds of the array
// hi: high bounds of the array
fun quickSort(array, lo, hi):
  if (hi <= lo) return

  set pivot = partition(array, lo, hi)
  quickSort(array, lo, pivot - 1)
  quickSort(array, pivot + 1, hi)
```

As you can see, quick sort also is a recursive sorting algorithm just like merge sort. But the difference is quick sort do the two recursive calls _after_ working on the whole array. And merge sort will divide the original array in half; for quick sort, the position of the __pivot__ depends on the contents of the array.

# Partition

The key of the quick sort is the partition process. There are some different way to implement this process, but we will follow the general strategy:

1. Chose the first position of array as the partitioning item
2. Scan the array from _left_ end until finding an item _greater_/equal than the partiotioning item.
3. Scan the array from _right_ end until finding an item _less_/equal than the partiotioning item.
4. Exchange the item of two pointers, continuing in this way until _i_ and _j_ cross.
5. Exchange the _partiotioning item_ with the rightmost item of the left sub-array.

![](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/blog/202207241510917.png)

According to the steps and the diagram, we have the following pseudo-code:

```kotlin
// lo: low bounds of the array
// hi: high bounds of the array
fun partition(array, lo, hi):
  set i = lo
  set j = hi + 1
  set pivot = array[lo]

  while (true):
    while (a[++i] < pivot):
      if (i == hi): break
    while (a[--j] > pivot):
      if (j == lo): break
    
    // two pointers cross
    if (i >= j): break

    exchange the array[i] with array[j]

  exchange the pivot with array[j]

  return j
```
