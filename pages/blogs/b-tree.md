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

It's worth mentioning that the `while` statement is going to implement a sequential search algorithm for a sorted list. Suppose the $n$ is the number of keys in the current node; the time complexity of this algorithm is $O(n)$. A good solution for this requirement is to use the _binary search algorithm_; this reduces the time complexity to $log{n}$. But in order to focus on the b tree in this blog, we will skip this improvement.

Another point that needs to be mentioned is the `idx`. Suppose we're using the sequential search algorithm in this method, as the code shown above. Because our sequential search algorithm starts from the end of the keys list, and the condition in the `while` statement is `node.keys[idx] > key`. Therefore, when the `while` statement ends, the key at the `idx` position will be **equal to** or **smaller than** the key we're searching for.

Consider the following scenario.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221204103016.png)

The `key` we are searching for is bigger than the 3rd key in the list but smaller than the 4th key. If we set the value of `idx` as `node.keys.size` and run the sequential search algorithm, the `while` statement will quit at the following moment.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221204164734.png)

After the sequential search algorithm, the value of `idx` will be `3`. This is very important because if we access the child node via `ndoe.children[idx]`, it will be the _left_ child node of this key. In other words, every key in that child node will be smaller than the 3rd key in this node. In the same way, if we want to make the sequential search algorithm starts from the head of `node.keys`, we also need to pay attention to the value of `idx` when the `while` statement finishes. The situation of the binary search algorithm can be a bit more complex, but the mechanism is the same.

To summarize, considering the search algorithm of the b tree is to think of the index of each key as the _left_ child node when we use it to access the child node list.

## Insertion

B tree is a self-balanced tree, or in other words, all leaves have the same depth. This is an essential property of the b tree, which gives the b tree the ability to search any element in $O(log n)$. We should not break this during the insertion procedure. Therefore, insertion operations always happen at the leaf node.

The insertion is a top-down procedure. It starts from the root node and compares the key which is going to be inserted with keys in the list to determine the direction of the next recursive calling. Before jumping into the next child node, check the keys list's size. If it's bigger than the upper bound, splitting the node. Once the algorithm reaches the bottom of the tree, insert the key into the keys list of the leaf node.

You may notice that we would split _each_ overloaded node during the downward recursion. We don't only split the leaf node because the splitting procedure may overload the inner node. We should not only handle the leaf nodes, but also the inner nodes.

### Start from root node

According to the discussion above, all we need to do is find an appropriate path down to a leaf node. But in fact, we missed a special scenario, inserting an element into an empty tree. The solution is pretty straightforward: Create a new root node. A good habit is to create a new node and assign values to the fields first and then point the `root` pointer to it. The following is the code.

```kotlin
fun insert(key: K) {
    // Create a new root when it's not exist
    if (root == null) {
        val temp = Node<K>(true)
        temp.keys.add(key)
        
        root = temp
    // Find the path down to a leaf node
    } else {
        val currentRoot = root!!
        
        // Check if the root node is full
        // All nodes can contain at most 2*t-1 keys
        if (currentRoot.keys.size == 2 * t - 1) {
            val newRoot = Node<K>(false)
            newRoot.children.add(currentRoot)
            
            // Split the root node
            splitChild(0, newRoot)
            
            // After splitting the root node, keys in right child node may smaller than the key
            val idx = 0
            if (newRoot.keys[0] < key) {
                idx += 1
            }
            
            // Insert the key in sub-tree
            insertNonFull(key, newRoot.children[idx])
            root = newRoot
        // If root node is not full, put the new key here
        } else {
            // Inert the key in root node
            insertNonFull(key, currentRoot)
        }
    }
}
```

### Split node

We should split the node when it's full. To be more precise, we should split the nodes whose number of keys equals `2 * t - 1`. It's easy to know for any natural number `t`, the result of `2 * t - 1` is odd. In other words, the number of keys is odd, and the number of child nodes is even.

Therefore, the splitting procedure is to push the middle key into the parent node and split the remaining keys. If that node is not a leaf node, split the child nodes.

```kotlin
private fun splitChild(idx: Int, node: Node<K>) {
    // The index of current child ndoe is `idx`, thus all keys is smaller than the parent node's
    val currentChild = node.children[idx]
    // The new child is in same level as current child node
    val newChild = Node<K>(currentChild.isLeaf)
    
    // Put the right part of keys into new child node
    newChild.keys = currentChild.keys.slice(t until currentChild.keys.size).toMutableList()
    // Handle the child nodes list if current child node is not a leaf node
    if (!currentChild.isLeaf) {
        newChild.children = currentChild.children.slice(t until currentChild.keys.size).toMutableList()
    }
    
    // Cause the index of list starts from 0, thus index of the middle key is t-1
    node.keys.add(idx, currentChild.keys[t - 1])
    // The structure of the node is
    // node
    // currentChild / newChild
    node.children.add(idx + 1, newChild)
    
    // Only the left part of keys remain
    currentChild.keys = currentChild.keys.slice(0 until t - 1).toMutableList()
    // Same logic for the child ndoes
    if (!currentChild.isLeaf) {
        currentChild.children = currentChild.children.slice(0 until t).toMutableList()
    }
}
```

### Insert into non-full node

This is the major part of the insertion procedure. It has two tasks, the first is to find the appropriate path down to a leaf node and insert the key into it, and the second is to split the full inner node in the path.

```kotlin
private fun insertNonFull(key: K, node: Node<K>) {
    // Do the sequential searching from the end of keys list
    var idx = node.keys.size - 1
    
    // Insert the key into the appropriate leaf node
    if (node.isLeaf) {
        while (idx >= 0 && node.keys[idx] > key) {
            idx -= 1
        }
        node.keys.add(idx + 1, key)
    } else {
        while (idx >= 0 && node.keys[idx] > key) {
            idx -= 1
        }
        
        // Check the child node which we're going to access
        // Split it if it's full
        if (node.children[idx + 1].keys.size == 2 * t - 1) {
            splitChild(idx + 1, node)
            // If the key from child node is smaller than the key to be inserted
            // We need to fix the idx
            if (node.keys[idx + 1] < key) {
                idx += 1
            }
        }
        
        // Continue the process on the path
        insertNonFull(key, node.children[idx + 1])
    }
}
```

## Deletion

























