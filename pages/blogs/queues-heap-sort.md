---
title: 'Algorithm Connect! Re: Dive - Priority queues'
date: '2022-8-9'
lastmod: '2022-8-9'
tags: ['algorithm', 'sort']
draft: true
summary: 'Sorting plays a major role in commercial data processing and in modern scientific computing'
authors: ['default']
---

[[toc]]

# Overview

The heap-sort is an excellent sorting algorithm. (add more information about heap-sort) But before jumping into the algorithm, it's vital to talk about a data structure: __Priority queue__.

We will start with basic schedule theory and explain why priority queue is significant. After that, we will talk about its elementary implementation of it and a widespread implementation: binary heap representation. And of course, as two required methods of the heap, we will also talk about _sink_ and _swim_.

As the last thing, we will talk about the heap-sort itself. At that moment, it will be straightforward to use the methods we discussed earlier to build the sorting algorithm.

The application of the priority queue is vital, but we can't discuss too many details in this article. So we will briefly talk about popular systems that use priority queue as the primary data structure.

# Queue

The queue is a vital data structure in computer programming. It's a linear structure that stores information in a particular order, and the user of this data structure will process this information in that order. It looks like the __stack__, but for a normal queue, the order of data it stores is _First In First Out (FIFO)_.

![](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/blog/202208152020050.png)

We can understand the queue from two aspects: __processing order__ and __underlying structure__.

First is the processing order. The queue is like the stack; they define some _rules_ to process data with some sequences. The sequence depends on the specific issues. The starting point for determining the order is the other theories like _schedule theory_.

A well-known example is the OS scheduler. To process multi-tasks, we need to design a scheduler that can generate a TODO list for CPU or other hardware. Different kinds of schedulers have various performances. A simple schedule strategy is the _shortest job first (SJF)_. It's easy to know if we use this scheduling strategy; our work is to implement a data structure that can return current work via the API.

Second is the underlying structure, it affects the way to implement the data structure. Two elementary way is using a __linked list__ or __array__. We will talk about the detail later.

## Priority queue

The __priority queue__ is an abstract data structure just like a _queue_. It holds some data before it is processed. But as we mentioned, the key to the priority queue is the order of processing data. The priority queue doesn't process data from the end of the queue; it always processes the data based on the priority level. In other words, the priority queue is a more generic abstraction of the queue. If we always give the lowest priority level of the new node and put it at the start of the priority queue, it will work like the standard queue.

There are two necessary methods to implement the priority queue: `insert`, which can add new data to the queue, and `delMax`, which can remove and return the current maximum data from the queue. We can use the interface to describe the functionality of the priority queue:

_Note: there are two kinds of priority queues: the max priority and the min priority. The only difference is that `del` returns the current max or min priority level value. But we only discuss max priority queue here._

```kotlin
interface MaxPriorityQueue {
    fun isEmpty(): Boolean
    fun insert(v: Int)
    fun max(): Int
    fun delMax(): Int
}
```

# Implementation

In a nutshell, we some elementary ways to implement the priority, which is using the _array_ or _linked list_. According to the rules of whether use the __lazy approach__, we can store the data ordered or unordered in the array. Taken as a whole, there is no difference between the two strategies. The only trade-off is _when_ to place the computing task.

Another way is to use the __Heap__. Based on this excellent data structure, we can reduce the time complexity to $log{N}$.

| data structure  |  insert  | remove max |
| :-------------: | :------: | :--------: |
|  ordered array  |   $N$    |     1      |
| unordered array |    1     |    $N$     |
|      heap       | $log{N}$ |  $log{N}$  |

## Elementary implementation

// TODO

## Binary Heap

// TODO
