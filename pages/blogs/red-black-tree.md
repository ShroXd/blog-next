---
title: 'Algorithm Connect! Re: Dive - Red Black Tree'
date: '2022-11-8'
lastmod: '2022-11-8'
tags: ['algorithm', 'search']
draft: true
summary: ''
authors: ['default']
---

[[toc]]

# Overview

We have discussed the binary search tree. It's a practical data structure that offers $O(lgn)$ time complexity for search, insertion, and deletion in the average case. But ironically, in the worst case, the time complexity for those functions will be $O(n)$; and it happens when we insert items orderly. In this situation, the binary search tree degenerates into a linked list.

One straightforward solution for this scenario is to shuffle the keys before inserting them into the binary search tree. It keeps the tree as balanced as possible. In some scenarios, however, we won't have control over the insertion order if it happens on the client side.

A widely used solution is using **2-3 trees**. We'll discuss the details of this data structure later, but basically, it is a kind of tree that can keep perfectly balanced for any input without any control over the client side. Maintaining a 2-3 tree is difficult; thus, we often implement it as a **red-black tree**. The key idea of a red-black tree is to assign different colors for the links between nodes to distinguish different kinds of nodes. In this solution, we don't need to change most of the logic of search & insertion.

We'll discuss the 2-3 trees first. After understanding the advantages of that data structure, we'll jump into the red-black tree. It's easy to implement the search & insertion. But the deletion is hard because we need to keep the tree balanced after insertion. Algorithms 4th gives a clear and beautiful solution, and we're going to go through all of the details of the code.













