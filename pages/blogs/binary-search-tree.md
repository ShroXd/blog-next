---
title: 'Algorithm Connect! Re: Dive - Binary Search Tree'
date: '2022-8-24'
lastmod: '2022-8-24'
tags: ['algorithm', 'search']
draft: false
summary: 'TODO'
authors: ['default']
---

[[toc]]

# Overview

__Symbol table__ (also called a __dictionary__) is a common data structure, and many major programming languages have built-in implementations. The idea of a symbol table is also pretty straightforward, create a data structure, and store the key-value pairs in it. We can search the key to get the value, just like we use a real dictionary. Benefit from how it's implemented; the speed of searching is fast.

We will start from the conceptions of the _symbol table_ and discuss its API; by the way, we'll talk a little bit about some intuitive but inefficient implementations: Unordered linked list and ordered array.

We always want to use more efficient data structures. Thus we will discuss the __Binary search tree__, a widely used and efficient implementation of the _symbol table_. Similarly, we'll also start from the definition and API. After that, since it's a __tree__ actually, so it's vital to know how to traverse it, and we'll also implement a useful method: _rank operation_. Of course, to manipulate a data structure in the real system, we need functionality that lets us __put__ new elements into and __remove__ elements from it; we will discuss this part at the end of this section.

Finally, we will study the relationship between _binary search tree_ and _quick sort_. It can help us understand them deeply.

# Symbol tables

The symbol table is a structure for organizing information. In most scenarios, the information will be key-value pairs. On the one hand, we can say the functionality of the symbol table is to store the __relationship__ between _key_ and _value_; on the other hand, the key can be seen as the unique identifier of the value, as you can see in many programming language built-in implementation of the symbol table, they always require the key should be unique; otherwise, the old value will be overwritten by the new value.

The following is an example of a symbol table:

| Character (key) | Description (value)                                          |
| :-------------- | ------------------------------------------------------------ |
| Spike Spiegel   | Spike Spiegel is a tall, lean, and slightly muscular 27-year-old bounty hunter born on Mars |
| Jet Black       | Known on his home satellite as the "Black Dog" for his tenacity, Jet Black is a 36-year-old former cop from Ganymede (a Jovian satellite) and acts as Spike's foil during the series |
| Faye Valentine  | Faye Valentine is one of the members of the bounty hunting crew in the anime series Cowboy Bebop |

According to the discussion above, we have the following interface design.

```kotlin
interface SymbolTable(K, V)<K: Comparable<K>, V> {
    fun get(k: K): V?
    fun put(k: K, v: V)
    fun delete(k: K)
    fun contains(k: K): Boolean
    fun isEmpty(): Boolean
}
```

Generally, we need the ability to _add_, _get_ and _delete_ elements from the data structure. Also, checking if an element exists and the data structure instance is empty is useful for the client.

## Inefficient implementations

The most straightforward way is using the _unordered linked list_. Each node has three fields: key, value, and the pointer to the next node. The _get_ is straightforward; just traversal the linked list and find the given key. But the problem is, in the worst case of the _get_ method, we need to traverse the entire list, and it requires $\sim n$ comparisons. On average, it requires $\sim n/2$ comparisons. Similarly, we need to check if the given key exists in the linked list when the client adds a new element; that said, the comparisons for this process will be $\sim n$.

Another opposite way is to use the _ordered array_. It's straightforward to search for a given key in an ordered array. Just traverse it! Going further, since it's an ordered array, we can use the __binary search__ to decrease time complexity. It can make both the average and worst-case number of comparison $\sim \lg{n}$. But this is an array after all; in other words, when inserting a new element, we need to move all the following elements. Consequently, the insertion cost is still $\sim n$ in the worst case and $\sim n/2$ on average.

# Binary search tree

A __binary search tree (BST)__ is a widely used data structure for implementing a symbol table. It combines the flexibility of insertion in linked lists with the efficiency of searching in an ordered array. A binary search tree is like a linked list Pro, but the nodes in the BST contain more information than those in the linked list -- fields containing the key, some associated data, and __two__ pointers to other nodes. The following is the data structure of the node.

```kotlin
data class Node<K, V)(val key: K, var value: V) {
    var left: Node<K, V>? = null
    val right: Node<K, V>? = null
}
```

And to be a binary search tree, it has to follow these properties:

1. The left sub-tree of a node contains only nodes with keys __lesser__ than the node's key
2. The right sub-tree of a node contains only nodes with keys __greater__ than the node's key
3. The left and right sub-tree each must also be a binary search tree

A binary search tree is a special tree, or one step more, a special type of __graph__. When we describe some tree components, we will use some specific vocabulary to describe them. You can find most of them on [this website](http://www.btechsmartclass.com/data_structures/tree-terminology.html). We will just discuss two important terminologies: symmetric order and perfectly balanced.

If every node's key is both larger than all keys in its left sub-tree and smaller than all in its right sub-tree, we say the tree is in __symmetric order__. If every non-left node has a left and right child and every leaf node is at the same level, we say the tree is __perfectly balanced__.

For a reasonably balanced tree of $n$ nodes, if we note its height is $m$, we have $1$ node of level $0$; $2$ nodes of level $1$, etc. Thus we have:

$$
n = 2^0 + 2^1 + 2^2 + 2^3 + \cdots + 2^m
$$

Since we have a formula for finite geometric series:

$$
\sum_{i=0}^{n}{r^i} = \frac{r^{i+1}-1}{r-1}
$$

Here, $r = 2$, we have:

$$
n = 2^{m+1} - 1
$$

Solving in the above for $m$, we have:

$$
m = \lg{(n+1)} - 1
$$

Thus we can say the height is $O(lg{n})$.

## Tree traversal

As we all know, we have three different ways of traversing the binary tree, and those are in-order traversal, post-order traversal, and pre-order traversal. We will discuss them based on a normal binary tree.

### In-order traversal

To implement an in-order traversal on a binary tree, we need:

1. visit all of the nodes in the sub-tree topped by $n$'s left child first
2. visit $n$ itself
3. visit all of the nodes in the sub-tree topped by $n$'s right child

The following is the code:

```kotlin
typealias Visit = (node: Node<K, V>) -> Void
fun <K, V> traverse(node: Node<K, V>?, visit: (node: Visit) {
    if (node == null) return
    
    traverse(node.left, visit)
    visit(node)
    traverse(node.left, visit)
}
```

Interestingly, the result of in-order traversal on a binary search tree is a sequence of __increasing orders__.

### Post-order traversal

To implement a post-order traversal on a binary tree, we need:

1. visit all of the nodes in the sub-tree topped by $n$'s left child first
2. visit all of the nodes in the sub-tree topped by $n$'s right child
3. visit $n$ itself

The following is the code:

```kotlin
typealias Visit = (node: Node<K, V>) -> Void
fun <K, V> traverse(node: Node<K, V>?, visit: (node: Visit) {
    if (node == null) return
    
    traverse(node.left, visit)
    traverse(node.left, visit)
    visit(node)
}
```

### Pre-order traversal

To implement a pre-order traversal on a binary tree, we need:

1. visit $n$ itself
2. visit all of the nodes in the sub-tree topped by $n$'s left child first
3. visit all of the nodes in the sub-tree topped by $n$'s right child

The following is the code:

```kotlin
typealias Visit = (node: Node<K, V>) -> Void
fun <K, V> traverse(node: Node<K, V>?, visit: (node: Visit) {
    if (node == null) return
    
    visit(node)
    traverse(node.left, visit)
    traverse(node.left, visit)
}
```

## Rank operations

According to the discussion above, it's easy to know the smallest key in the tree is the most left node of the tree and the largest key is the most right. But how to get the 10th node? Or, suppose we use the binary search tree to hold the runners' names and use the time of the runners in a race to be the key. Can we find the _rank_ associated with a given time scope?

Let's consider this scenario the minimum key has rank 0, the next smallest has rank 1, and so on. In doing so, we can infer the _rank_ of any key is equal to the number of keys in the tree __less__ than that key. Thus, we can implement a function to find the rank of any given key:

```kotlin
fun rank(node: Node<K, V>, key: K): Int {
    if (node == null) return 0
    
    val gap: Int = key.compareTo(node.key)
    return if (gap > 0) {
        1 + size(node.left) + rank(node.right, key)
    } else if (gap < 0) {
        rank(node.left, key)
    } else {
        size(node.left)
    }
}
```

The `size` procedure will return the number of nodes in the sub-tree of a given node.

Of course, following the logic, we can implement the opposite procedure, which is to find the key of a given rank.

```kotlin
fun key(node: Node<K, V>, rank: Int): K {
    if (node == null) return null
    
    val numOfLeftTree: Int = size(n.size)
    return if (numOfLeftTree > rank) {
        // current node's rank is larger than the given rank
        // thus we nned to choose the left sub-tree
        key(node.left, rank)
    } else if (numOfLeftTree < rank) {
        // Jump to right sub-tree, we don't num of left tree and current tree
        // Suppose the given rank is 12, and current node's rank is 10
        // Note that 12th is also the 2ed after 10th
        key(node.right, rank - numOfLeftTree - 1)
    } else {
        // Here it is!
        return node
    }
}
```

## Get & put methods

As one kind of implementation of the symbol table, the binary search tree must be able to store key-value pairs. To implement those, we need to implement these methods in the interface:

```kotlin
interface SymbolTable(K, V)<K: Comparable<K>, V> {
    fun get(k: K): V?
    fun put(k: K, v: V)
    
    // ...
}
```

As you can see in the definition of the interface, the _upper bound_ of the generic key `Key` is the `Comparable<T>`. This, of course, allows us to compare the keys in the binary search tree with any key for which we might be searching. Based on this design, we can take advantage of the properties of the binary search tree to implement the `get` method. Consider the following example:

![](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/blog/202208270945218.png)

Suppose we seek the node with the key _R_, the green node. We know the entire binary search tree has only one reference to the node _S_ identified as _root_. To seek _R_, we need to start from the root node. Thus, we create a pointer and point it to the root node S.

Compare the node's key pointed by the pointer with what we want, noting that $R < S$. Since in the binary search tree, the nodes' key in the left sub-tree is smaller than the current topped node's key, we can infer that _R_ is never in the right sub-tree. Thus we make the pointer point to the _E_. Continue the above logic; the pointer will point to the right sub-tree of `E`. We find, at that moment, it is equal to our target. We're done.

But at this point, we immediately think, if the key we are searching for is not in the binary search tree, how to know that? Well, it's pretty easy. Suppose we seek the node with the key _F_; after going through similar steps as above, the pointer points to node _R_. We find the _R_ is a leaf node, which means it has no sub-tree, and the value `left` and `right` are both `null`. At that moment, we can say, _F_ is not in the current binary search tree. By the way, this is the worst case of `get` methods.

According to the discussion above, we can implement the `get`:

```kotlin
fun get(node: Node<K, V>?, key: K): V? {
    if (node == null) return null
    
    val gap: Int = key.compareTo(node.key)
    return if (gap > 0) {
        get(node.right, key)
    } else if (gap < 0) {
        get(node.left, key)
    } else {
        node.value
    }
}
```

It's easy to know that the `get` method follows one __path__ of the binary search tree when it seeks the given key. Thus the comparisons' number is one more than the depth of the given node if it exists in the binary search tree, and the worst-case number of comparison s is one more than the tree's height. For a __perfectly balanced__ binary search tree of $n$ nodes, the comparison number will be $\sim lg{n}$.

Similar to the `get` method, we must find the location for the insertion by comparing each node's key with the given key; thus, most codes of `put` are the same as `get`. But the `get` method has two __base cases__. The first is that when the position we seek already has a node, we need to update the value of that node. This logic also follows the property of the symbol table: uniquid key. The second is that when the pointer reaches the leaf node but still hasn't found the position, we need to create a _new_ node, put it under the current leaf node, and make it follow the property of the binary search tree. The following is the code:

```kotlin
fun put(node: Node<K, V>?, key: K, value: V): Node<K, V> {
    if (node == null) {
        size++
        return Node(key, value)
    }
    
    val gap: Int = key.compareTo(node.key)
    if (gap > 0) {
        // link the tree's ndoes
        node.right = put(node.right, key, value)
    } else if (gap < 0) {
        node.left = put(node.left, key, value)
    } else {
        node.value = value
    }
    
    return node
}
```

Similar to the `put` method, the comparison cost $\sim \lg{n}$ for a perfectly balanced tree of $n$ nodes.

Finally, we noticed that binary search trees' `get` and `put` speed is extremely fast. :tada:

## Hibbard deletion

We already implemented the `put` to insert new elements into the binary search tree, but how do we delete them? Like the _heap_, after deleting, we must keep the new tree as a binary search tree. One efficient way to do this was implemented by [Thomas Hibbard](https://en.wikipedia.org/wiki/Thomas_N._Hibbard) in 1962. The idea is to swap the node to be deleted with its __successor__. The successor is the _following_ largest key in the tree; in other words, it's the minimum key in the right sub-tree of the node to be deleted.

To implement this procedure, we need to implement `delMin` first. This function will delete the minimum key in the right sub-tree of a given node. Since the elementary property of the binary search tree is for any given node, the nodes larger than the given node are in the right sub-tree, and the nodes smaller than the given node are in the left sub-tree. Thus we can choose the left sub-tree recursively until the value of the left pointer is `null`. If the current node has a right sub-tree, it should be the left sub-tree of the previous node since all nodes are smaller than the previous node.

![](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/blog/202208281601191.png)

Suppose we want to use the procedure `delMin` for node __E__. The minimum node of E is __H__ (Since it doesn't have a left sub-tree). Thus we can delete it, but after that, we need to process __M__, which is the right sub-tree of __H__. Note that since __M__ is in the right sub-tree, it's bigger than __H__. But since __H__ is in the left sub-tree of __R__, all node in this left sub-tree is smaller than __R__. In summary, __M__ will be the left tree of __R__. The following is the code:

```kotlin
fun delMin(n: Node<K, V>) {
    if (n.left == null) return n.right
    
    n.left = delMin(n.left)
    n.count = 1 + size(n.left) + size(n.right)
    
    return n
}
```

With this procedure, we can understand the Hibbard deletion easily.

The first step of the deletion is to find the node we want to delete. It's easy since we have implemented it in the previous methods. The second step is to find the _successor_ of the given node, which is in the right sub-tree. Note that the _successor_ is the minimum node in the right sub-tree; in other words, all node in the right sub-tree is __larger__ than the _successor_. Thus we can put it in the same position as the given node. After this step, we will have two successor nodes, as shown in the following diagram (H is the successor of E).

![](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/blog/202208281620153.png)

So we can invoke `delMin` on the given node and delete that original _successor_. And then delete the given node.

The following is the code:

```kotlin
fun delete(node: Node<K, V>, key: K) {
    if (node == null) return null
    
    val gap: Int = key.compareTo(node.key)
    if (gap > 0) {
        n.right = delete(n.right, key)
    } else if (gap < 0) {
        n.left = delete(n.left, key)
    } else {
        // Since the given node doesn't have successor
        // Return the left sub-tree and this does NOT destroy the BST
        if (node.right == null) return n.left
        
        val temp: Node<K, V> = node
        // Find the successor and put it in the given key's position
        node = min(temp.right)
        node.right = deleteMin(t.right)
        node.left = t.left
    }
    
    node.count = size(node.left) + size(node.right) + 1
    
    return node
}
```

# The connection between BST and quick sort

After we understand the mechanism of the binary search tree, for a perfectly balanced binary tree, the inserting procedure needs $\lfloor \lg{n} \rfloor$ times comparison to insert a new node. But worst case, if we insert a series of ordered numbers, each number must compare with all previous numbers. In general, we have:
$$
1 + 2 + 3 + 4 + \dots + (n + 1) = \frac{n(n-1)}{2}
$$
Thus we can say the comparison required to insert $n$ elements in order is $O(n^2)$. To prevent this scenario, we can shuffle the order of elements _randomly_. You may notice it now at this point. Yep, same situation we encountered when we discussed the __quick sorting__!

We have an array with the same number of comparisons when we insert them into an empty binary search tree as the number of comparisons of another array when we invoke a quick sorting algorithm. Of course, another array has the same elements. One example is _C, B, A, G, F, D, E_ and _C, A, G, E, D, B, F_.

# Reference

- [Data Structures - Lists, Dictionaries](https://vt.instructure.com/courses/27918/pages/book-4-dot-2-data-structures-lists-dictionaries#dictionaries)
- [The Department of Mathematics and Computer Science - Data Structures - Binary Search Tree](http://math.oxford.emory.edu/site/cs171/binarySearchTrees/)
