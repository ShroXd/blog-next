---
title: 'Algorithm Connect! Re: Dive - B Tree'
date: '2022-12-3'
lastmod: '2022-12-3'
tags: ['algorithm', 'tree']
draft: true
summary: ''
authors: ['default']
---

[[toc]]

# Overview

We have talked about many self-balancing search trees. These kinds of trees aim to prevent the part of the tree from degenerating into a linked list, which will significantly increase the time complexity for searching, insertion, and deletion. Recalling 2-3 trees & red-black trees, these trees are able to keep perfectly balanced during the insertion and deletion process. In other words, they guarantee $O(log n)$ of time complicity during searching, which makes working with vast amounts of data to be efficient performance.

But the problem is, as the amount of data inserted grows, the height of the tree increases quickly. More precisely, supposing $n$ is the number of data in the tree, the height ($h$) will be $log_2n$. Most of the tree operations require $O(h)$ disk accesses. It doesn't cause performance issues only if the whole tree is stored in memory. In reality, however, some applications need to store millions of data, and we can't hold them in memory since high prices. Therefore, the hard disk drive (HDD) is the only option we have. It's clear that the speed of IO on HDD is slow, so we expect to reduce the number of reads from HDD. This is the main reason we use __B Tree__ as the underlying data structure of most database applications.

The B tree is a kind of _stocky_, perfectly balanced tree. Like other perfectly balanced trees, it guarantees $O(log n)$ during insertion & searching, but more importantly, it also makes the number of reads on HDD reduced significantly because the B tree can hold many keys in a single node and have multiple child nodes. This is the key that the B tree can decrease its height significantly compared with other perfectly balanced trees.

