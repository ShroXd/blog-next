---
title: 'Algorithm Connect! Re: Dive - Sort & Merge sort'
date: '2022-7-10'
lastmod: '2022-7-10'
tags: ['algorithm', 'sort']
draft: true
summary: 'Sorting plays a major role in commercial data processing and in modern scientific computing'
authors: ['default']
---

As we all known, __sorting__ is the process of rearranging a sequence of objects so as to put them is some logical order. Sorting doesn't only play an important role in the computer science, but also widely used in life. 

Today, almost all programming languages implement the _Sort_ method in their official library. The programmer can simply invoke it with a compare logic, so it seems there is no longer any need to learn sorting algorithm. But I want to say, when we build a huge system, the ability to process detail and the ability to design the structure are both important. In some scenario, we need to build the data structure and algorithm by ourselves, only then we can improve the program's performance and resolve large problems.

Similarly, the experience of learning algorithm gives us essential knowledge to learn ideas from other large systems. Many problems have been perfectly solved in these large systems, if we want to gain power from these great project, we need to understand their _language_. And algorithm is a important part of this kind of _language_.

We will start from sorting algorithm.

There are many interesting sorting algorithm, we don't want to focus on the implementation detail since different programming language have different syntax and it will result in different code. Spending too much time on the details like this is not what we want. So we're going to focus on specific topics and try to illustrate the mechanisms behind the algorithms.

Of course, talk is cheap, let's start. 

## Overview of merge sort

The sorting algorithm that we talk about in this section is based on a simple operation known as _merging_: __combining__ two ordered arrays to make one large ordered array. Based on it, the algorithm is super simple. We just divide a large array into two sub-array, sort the two halves recursively, and __merge__ the result.

We can use a diagram to illustrate the process of this algorithm.

![](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/blog/202207071620261.png)

This algorithm is one of the best-known examples of the utility of the __divide-and-conquer__ paradigm of efficient algorithm design. In this kinds of strategy, we solve a problem by dividing it into pieces, solving the sub-problems, then using the solutions for the pieces to solve the whole problem.

## Merge

If we observe the diagram, we'll notice the _merge_ process, it's the core of the _merge sort_ algorithm. The goal of this method is to merge two sorted arrays.

Our idea is to declare two pointers, each pointer start at the beginning of two sub-arrays.

![](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/blog/202207072100573.png)

Traverse the array and compare each pair of a[i] and a[j], put the smaller item in the result array and move the pointer.

According to the analysis, it's easy to write this method, and the following is the pseudo-code:

```kotlin
// lo: low bounds of the array
// hi: high bounds of the array
fun merge(array, lo, mid, hi):
  set i = lo
  set j = mid + 1
  set result = array

  for each position of the result:
    if left array is finished: copy right array into result .also { j++ }
    else if right array is finished: copy left array into result .also { i++ }
    else if a[i] < a[j]: copy a[i] into result .also { i++ }
    else: copy a[j] into result .also { j++ }
```

### Improvement

// TODO

## Top-down merge sort

The idea of this algorithm is very simple: if it sorts two sub-arrays, it sorts the whole array, by merging together the sub-arrays. That is, the recursive code divides the array into 2 sub-arrays, and the recursive code will return and merge when the it travel to the end.

The following is the pseudo-code:

```kotlin
// lo: low bounds of the array
// hi: high bounds of the array
fun topDownMergeSort(array, lo, mid, hi):
  // arrive at the leaf node of recursive tree
  if hi < lo: return
  set mid = mid index of the array

  topDownMergeSort(array, lo, mid)
  topDownMergeSort(array, mid+1, hi)
  merge(array, lo, mid, hi)
```

This algorithm is based on recursion. To truly understand this algorithm, we need to carefully analyze the behavior of this recursive code.

### Procedures and the processes they generate

When we talk about the recursion, the most important thing is to understand the processes it generate, otherwise we may not be able to understand it.

#### Linear recursion

Let's start with factorial function, we have definition:
$$
n! = n * (n - 1) * (n - 2) * ... * 3 * 2 * 1
$$
We can implement the following function to compute it:

```kotlin
fun factorial(n):
  if n = 1:
	return 1
  else:
    n * factorial(n - 1)  // unfold
```

When we invoke this function, the last line will unfold until it _touch_ the bottom. The following diagram illustrate this process.

![](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/blog/202207091449303.png)

As the left part shows, the call stack will store the called function until the __end condition__ is reached. At that time, the program will execute the function from top to down. If we consider the whole algorithm in terms of code execution, we can write the process at the right part.

We can easily observe that the whole process expands and then contracts, and the divider line is when the function reach the __end condition__. So in other words, this procedure have 2 phases:

1. Expanding - store the function calling in the _stack_
2. Shrink - execute the functions from top to down

During the first step, the program _record_ the function calls in the _TODO list_. And the order is very important, it will be reflected in the _shrink_ phase. In addition to these, we need to notice these 2 properties of this algorithm:

1. The end condition will only be reached __once__
2. Once shrinking starts, __no__ new function calls will be pushed onto the stack

#### Tree recursion

You might be curious, why we talk about the _linear recursion_? That is because it helps us understand a widely used recursion form: tree recursion. And it's also necessary to understand the _top-down merge sort_.

To illustrate the __tree recursion__, let's consider the Fibonacci numbers. We can use the following formula to compute them.

$$
Fib(n) =
\begin{cases}
0,  & \text{if }n\text{ is 0} \\
1,  & \text{if }n\text{ is 1} \\
Fib(n-1) + Fib(n-2), & \text{otherwise}
\end{cases}
$$

According the formula, we can easily write out the code.

```kotlin
fun fib(n):
  if n = 0: return 0
  else if n = 1: return 1
  else: return fib(n - 1) * fib(n - 2)
```

According to our analysis above, the recursion means recording function calls in the _TODO list_. But the difference between this function and _factorial_ is there are 2 recursion _entry_ in the _fib_. This difference leads to 2 ourcomes:

1. The end condition will be reached __multiple times__
2. During the shrinking phase, there may be __other function calls__ pushed onto the stack

Which means the process of this function will be difference with _factorial_.

![](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/blog/202207092007512.png)

As we can see, the shape of the code execution is not longer a simple _triangle_, it becomes a __tree__. Each function call that be pushed onto the stack has possibility to push new function calls onto the stack. It depends on whether the end conditions is reached or not.

### The process of top-down merge sort

According the analysis above, we know if we want to understand a recursive algorithm, we need to know 2 things: 

1. When the program reaches the end condition and how many times?
2. Which node will generate sub-tree?

Obviously, the _end condition_ is the following code:

```kotlin
if hi < lo: return
```

If we observe the recursion code, we know as the function calls are pushed onto the stack, the original array will be divided into two same length sub-arrays. The _end condition_ makes current function call return when the sub-array only has 1 element. On the other words, it's the leaf nodes of the tree.

It's super easy to draw the process:

![process of top-down merge](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/blog/202207092104151.png)

The program will try to divide the array as possible as it can, when it reach the _end condition_, which means the current array can't continue to divide. 

And if we observe the recursion code, we know this function is __post order traversal__. 

```kotlin
topDownMergeSort(array, lo, mid)
topDownMergeSort(array, mid+1, hi)
merge(array, lo, mid, hi)
```

It means when the recursion stop and the major part start, the __information__ of 2 sub-arrays can be access in the current _environment_. When I say information, I mean the elements of sub-arrays. For example, if the current environment is the `[3, 5]` array, the program knows the `[3]` and `[5]`. So the _merge_ function will merge these 2 sub-arrays. And the result is `[5, 3]`.

To be clear, although we use the word __'sub-array'__ to describe the results of recursive function calls, it doesn't means the algorithm creates real 2 sub-arrays. We actually only count the _index_ of original array. This tip can reduce a lot of useless execution.

### Number of comparisons

__Proposition__: Top-down merge sort uses at most $N\lg{N}$ compares to sort any array of length $N$.

To understand this proposition, we can consider the diagram above. Each node depicts a _merge_, and the height of the tree _h_ stand for the number of recursion.

For the $k$ th level, there are $2^k$ sub-arrays. Set the $n$ is the total levels of tree, the original array has $2^n$ elements, so for the $k$ th level, each sub-array has
$$
\frac{2^n}{2^k} = 2^{n-k}
$$
elements. Thus each sub-array requires __at most__  $2^{n-k}$ compares for the merge.

Thus we have $2^k * 2^{n-k} = 2^n$ total cost for __each__ of the $n$ levels, we have $n$ levels, for a total of $n2^n$. Since $2^n = N$ and $n=\lg{N}$, so we have $n2^n=N\lg{N}$

## Bottom-up merge sort

Another way to implement the merge sort is to process the whole array from bottom to top. We set a tiny number as the size of sub-arrays, pass those sub-arrays pairs to the merge function, increase the size by double it, pass the new sub-arrays pairs to the merge function. Continuing until we do a merge that encompasses the whole array. The following is the pseudo-code:

```kotlin
// sz: size of sub array
// lo: lower bound of sub array
fun bottomUpMergeSort(array):
  for sz in 1..n, step sz:
    for lo in 0..(array.length-size), step sz:
	  merge(
        array,  // the original array
        lo,     // start of sub array
        mid index of sub array,    // mid
        lower bound of next sub array or end of the array    // end of sub array
      )
```

When the array length is a power of 2, top-down and bottom-up merge sort perform precisely the same compares and array accesses, just in a different order. When the array length is not a power of 2, the sequence of compares and array accesses for the two algorithms will be different.

To proof this, we can _print_ the size of sub-array when we use the merge sort. Here we have a exercise:

Q. Give the sequence of sub-array sizes after each merge performed by both the top-down and the bottom-up merge sort algorithms, for n = 39.

A. Since the top-down is _tree traverse_ algorithm, so the size will effect each node of the recursion tree. The bottom-up merge is just _iteration_, which means the size will be stable for each iteration.

- Top-down merge sort: 2, 3, 2, 5, 2, 3, 2, 5, 10, 2, 3, 2, 5, 2, 3, 2, 5, 10, 20, 2, 3, 2, 5, 2, 3, 2, 5, 10, 2, 3, 2, 5, 2, 2, 4, 9, 19, 39.
- Bottom-up merge sort: 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 4, 4, 4, 4, 4, 4, 4, 4, 3, 8, 8, 8, 8, 7, 16, 16, 32, 39.

## The complexity of compare-based sorting algorithm

__Proposition__: Compare-based sorting algorithm need _at least_ $lg{N!} \sim Nlg{N}$ to sort a array with $N$ items.

To prove this, we can consider the following compare tree. An _internal node_ `i : j` corresponds to a compare operation between `a[i]` and `a[j]`. The left sub-tree corresponds the `a[i]` is smaller that `a[j]`, and the right sub-tree corresponds the `a[i]` is lager than `a[j]`. The leaf nodes means a permutation. And it's easy to know, a path from _root_ to _leaf_ corresponds to the sequence of compares that the algorithm uses to establish the ordering given in the leaf.

![](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/blog/202207101522827.png)

It's easy to know, for a array with $N$ items, there are $N!$ different permutations, which means the compare tree have $N!$ leaves at least. If there are fewer than $N!$ leaves, them some permutations is missing from the tree. The longest path from _root_ to _leaf_ is very important since it measures the worst-case number of compares used by the algorithm.

If we fill all of these _internal nodes_ and _leaf nodes_, the compare tree will become a complete binary tree. For a complete binary tree of height $h$, it has at most that $2^h$ leaves. According to the analysis in this section, we have:

$$
N! \leq number\ of\ leaves \leq 2^h
$$

The path of height $h$ corresponds the worst-case path, in other words, $h$ is precisely the worst-case number of compares. To get the scope of $h$, we take the logarithm (base 2) of both side of this equation, we will know the number of compares used by any compare-based algorithm must be __at least__ $lg{N!}$. Apply the Stirling's approximation, we have $lg{N!} \sim N\lg{N}$.
