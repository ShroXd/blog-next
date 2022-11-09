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

We have discussed the binary search tree. It's a practical data structure that offers $O(lgn)$ time complexity for searching, insertion, and deletion in the average case. But ironically, in the worst case, the time complexity for those functions will be $O(n)$; and it happens when we insert items orderly. In this situation, the binary search tree degenerates into a linked list.

One straightforward solution for this scenario is to shuffle the keys before inserting them into the binary search tree. It keeps the tree as balanced as possible. In some scenarios, however, we won't have control over the insertion order if it happens on the client side.

A widely used solution is using **2-3 trees**. We'll discuss the details of this data structure later, but basically, it is a kind of tree that can keep perfectly balanced for any input without any control over the client side. Maintaining a 2-3 tree is difficult; thus, we often implement it as a **red-black tree**. The key idea of a red-black tree is to assign different colors for the links between nodes to distinguish different kinds of nodes. In this solution, we don't need to change most of the logic of searching & insertion.

We'll discuss the 2-3 trees first. After understanding the advantages of that data structure, we'll jump into the red-black tree. It's easy to implement the searching & insertion. But the deletion is hard because we need to keep the tree balanced after insertion. Algorithms 4th gives a clear and beautiful solution, and we're going to go through all of the details of the code.

# 2-3 tree

Recall that, for binary search trees, the worst case time for searching, insertion and deletion are all $O(N)$. It happens when we insert items with ordinal keys. A binary search tree degenerates into a linked list in that scenario. In other words, the tree's height is not always same for all paths from root to leaf nodes. Consequently, the upper limit of operations for the binary search tree will be $O(N)$. 

Actually, we can guarantee $O(lgN)$ time complexity for all three methods by using a **balanced tree**. For a balanced tree, the height of tree will always be $O(lgN)$. As an improvement of the binary search tree, we're going to introduce the **2-3 tree** here.

Before defining the 2-3 tree, we introduce two types of nodes in this kind of data structure. In a classical 2 binary tree, every node stores one key and two links; we call this kind of node 2-nodes. Suppose a node stores two keys and three links; we call this kind of node 3-nodes.

Based on the assumptions above, we define a 2-3 tree as a tree comprised of 2-nodes & 3-nodes. It's perfectly balanced and in symmetric order by key. The first property means each path from the root to the leaves is all the same length, and the second property means an in-order traversal will yield keys in ascending order. The following is an example.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221108212343.png)

We mentioned the tree is not only perfectly balanced but also in symmetric order by key. Thus as you can see, for every node, the keys in the left child nodes are both smaller than the current node's key, and those in the right are both larger than the current node's key. Of course, the child nodes' keys in the middle path of the 3-node are between those two keys.

## Searching

Cause the 2-3 tree is in symmetric order by key, as same as the binary search tree. So we don't need to rewrite the algorithm for searching a lot; we just need to handle the 3-node carefully. This means when we meet the 3-nodes, we need to compare the target key with two keys in this node to see to which range the target key belongs. The result will decide the path of the current search process.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221108221334.png)

If we consider the time complexity of searching, we'll find the worst case is the key is not exist in the tree. In that scenario, we'll traverse one path from the root to a leaf. The length of the path will be as same as the height of the tree, that is, $O(N)$.

## Insertion

Insertion of a 2-3 tree is more complicated cause we need to keep the tree perfectly balanced and in symmetric order by key. Thus the insertion process produces temporary 4-nodes. To discuss the detail of this algorithm, let's suppose we're going to insert `v` into the 2-3 tree.

### Downward phase

We cannot destroy the properties of the tree when inserting an element into a 2-3 tree. The first property to note is for any node in a valid 2-3 tree, the values appearing in the left subtree are smaller than the current node's value, while those in the right tree are bigger than it. So when the algorithm searches for the place to insert `v`, it's necessary to compare `v` with each value belonging to the current node to determine where to go.

After inserting the new node `v`, the height of each path will be different. The property path-length invariant would be violated. Thus we need to repair it.

### Base case

When pushing `v` in a leaf node, the path-length invariant would be violated since the height of the left subtree is different right subtree's, just like the _real 2-node_ in the picture below. Once we insert a new node `A` into this tree, it will violate the property.

Thus, for this scenario, we make a pseudo 2-node as shown in the picture below. It means there is no room for `v` downstairs. And we will consider the height of such a configuration to be the height of its subtrees since `v` is not considered a part of the configuration. As you can see, the `v` is kicked upstairs. This base case converts the downward phase of insertion into an upward phase.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221109215628.png)

### Upward phase

When kicking upstairs a node, there are two scenarios we may meet. The first is there is a 2-node upstairs. That 2-node can absorb the kicked-up value v. The resulting tree is still a valid 2-3 tree.

The second scenario is there is a 3-node upstairs. The 3-node can absorb `v`, but we need to kick upstairs the middle value of that temporary 4-node then. We continue the kicking-up process until the kicked-up value is absorbed or reaches the root of the tree. In the latter case, the kicked-up value becomes the value of a new 2-node that increases the height of the tree by one.

## Deletion

Deletion is similar to insertion. We need to find the parent of the node to be deleted first, delete the target then, and fix the tree if necessary.



