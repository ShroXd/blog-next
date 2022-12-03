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

# Introduction of B-Tree

As we mentioned, the b tree is a self-balancing search tree. It stores multiple keys and pointers for child nodes in a single node inside the tree, which makes its height low, so total disk accesses for most operations are significantly reduced. The following is a classic b tree.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221203222048.png)

According to the definition, a b tree satisfies the following properties.

1. **The number of keys and child nodes**. The b tree is defined by a number called __order__. It depends upon disk block size. The root can hold a minimum of 1 key, but other nodes must contain at least $t-1$ keys, and at most $2*t-1$ keys. Besides, the number of children of any node is equal to the number of keys in it plus 1.

2. **The sort order**. The keys in a node are sorted in increasing order, and the keys in the left child node are smaller than its key, while those in the right are bigger. Take the _B/D_ node in the illustration above as an example; left most node containing _A_ is smaller than B, but the right one containing _C_ is bigger than it.

3. B tree grows and shrinks only from the root node.

## Node class

Cause the node in the b tree contains multiple keys and child nodes, we need to define it. Also, there are two different styles of basic data structure definition. The first is not only to define each field but also to define some encapsulated fields. And the second is to define the basic fields; it makes the invocation statement seem verbose but decreases our mental load. We will choose the second one, but it doesn't mean you need to be the same thing. On the contrary, you can choose any style you prefer. But whichever you choose, you need to keep the single style in your code.

The following is the definition of node class in the b tree.

```kotlin
data class Node<K : Comparable<K>>(var isLeaf: Boolean) {
    var keys: MutableList<K> = mutableListOf()
    var children: MutableList<Node<K>> = mutableListOf()
}
```

It's worth mentioning that the type constraints should be defined in the b tree class instead of the node class. Here is only for clarity.

# Operations

We will talk about all operations of a b tree, including searching, insertion, and deletion. There are different implementations in different papers or blogs; we don't discuss each idea of them; we only introduce a set of rigorous and easy-to-understand implementations.

## Searching

The search algorithm doesn't have significant differences from other self-balanced search trees. We used to use 3 keys node and a temporary 4 keys node in *2-3 tree*; now we need to generalize it to a b tree whose nodes contain at least $t$ keys. The procedure is to scan the tree from the root node and try to find the key. If found, return that node; if not, decide the child node that the function should go to according to the nearest key.

```kotlin
private fun search(key: K, node: Node<K>): Node<K>? {
    var idx = node.keys.size - 1
    
    while (idx >= 0 && node.keys[idx] > key) {
        idx -= 1
    }
    
    if (node.keys[if (idx == -1) 0 else idx] == key) {
        return node
    }
    
    if (node.isLeaf) {
        return null
    }
    
    return search(key, node, node.children[idx + 1])
}
```

TODO: explain the while statement.













