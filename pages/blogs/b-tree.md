---
title: 'Algorithm Connect! Re: Dive - B Tree'
date: '2022-12-3'
lastmod: '2022-12-3'
tags: ['algorithm', 'tree']
draft: false
summary: 'A B-tree is a self-balancing tree data structure that maintains sorted data and allows searches, insertions, and deletions in logarithmic time.'
authors: ['default']
---

[[toc]]

# Overview

We have talked about many self-balancing search trees. These kinds of trees aim to prevent the part of the tree from degenerating into a linked list, which will significantly increase the time complexity for searching, insertion, and deletion. Recalling 2-3 trees & red-black trees, these trees are able to keep perfectly balanced during the insertion and deletion process. In other words, they guarantee $O(log n)$ of time complicity during searching, which makes working with vast amounts of data has efficient performance.

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

Different from insertion, deletion can happen in any node of the b tree. We must make sure this procedure doesn't violate the properties of the b tree. In other words, we should guarantee any node except the root has more than the minimum number $t - 1$ of keys. As for the root node, the minimum number of keys is $1$.

The deletion algorithm we're going to introduce guarantees that whenever it calls itself recursively on a node, the number of keys in this node is at least the minimum number $t$. This number is one more than the property we mentioned before. This condition allows us to delete a key from the tree in one downward access without _backup_. As we mentioned, the tree only shrinks from the root node.

### Entry function

The deletion is a recursive procedure, which means we need an entry function to call the recursive function. The recursive function will remove the key, and the entry function aims to handle some edge scenarios. Except for calling the recursive function, in this deletion algorithm, the entry function shrinks the tree from the root if the root node holds no keys.

```kotlin
fun delete(key: K) {
    if (root == null) {
        throw Error("Nothing in the b tree.")
    }
    
    // Call the recursive function
    delete(key, root!!)
    
    // Handle the scenario when root node has nothing
    if (root!!.keys.size == 0) {
        root = if (root!!.isLeaf) {
            null
        } else {
            // Shrink the tree if root node is not a leaf
            root!!.children[0]
        }
    }
}
```

### Recursive deletion

Just like the insertion, to delete a key, we need to find out the node which holds that key first. During the downward process, if any node in the path doesn't have enough keys, we will _fill_ it first and then jump into that node.

```kotlin
private fun delete(key: K, node: Node<K>) {
    
    // Sequential search, better solution is to use binary search
    var idx = 0
    while (idx < node.keys.size && key > node.keys[idx]) {
        idx += 1
    }
    
    // If we find the key in this node
    if (idx < node.keys.size && node.keys[idx] == key) {
        // We can delete a key from a leaf node directly in removeFromLeaf function
        // We convert the problem deleting key from inner node to first situation
        if (node.isLeaf) {
            deleteFromLeaf(idx, node)
        } else {
            deleteFromNonLeaf(idx, node)
        }
    // If we don't find the key, keep searching until reach leaf node
    } else {
        // The node does not exist in this tree
        if (node.isLeaf) {
            throw Error("The key $key does not exist in the tree\n")
        }
        
        val isLast = idx == node.keys.size
        // This allows us delete a key in single downward process
        if (node.children[idx].keys.size < t) {
            fill(idx, node)
        }
        
        // The last child node will be merged with prev one
        // We need to move the index one step forward in this situation
        if (isLast && idx > node.keys.size) {
            delete(key, node.children[idx - 1])
        } else {
            delete(key, node.children[idx])
        }
    }
}
```

### Fill the node

If the current node we're handling during the deletion process doesn't have enough keys, we will call `fill` function to make it fit the b tree's property. The logic of this function is also pretty straightforward. We will try to borrow a key from an adjacent sibling node first. If both two adjacent sibling nodes don't have redundant keys, we will merge the node with one sibling node.

```kotlin
private fun fill(idx: Int, node: Node<K>) {
    // If the child node is not the first one, borrow key from next sibling child node which has redundant keys
    if (idx != 0 && node.children[idx - 1].keys.size >= t) {
        borrowFromPrev(idx, node)
    // Borrow from prev sibling child node
    } else if (idx != node.keys.size && node.children[idx + 1].keys.size >= t) {
        borrowFromNext(idx, node)
    // Merge two child node
    } else {
        // Defautly, merge the child with next sibling node
        // Otherwise, merge it with prev sibling node
        if (idx == node.keys.size) {
            merge(idx - 1, node)
        } else {
            merge(idx, node)
        }
    }
}
```

### Borrow key from sibling node

The `borrowFromPrev` and `borrowFromNext` mirror each other, so we only introduce one. Take the second one as an example. We have mentioned the keys stored in b trees kept in ascending order. It means not only the keys in the list are in ascending order but also those in any child node. Go further, for any keys $A$ and $B$, the keys in the child node between them are in the range $(A, B)$. Therefore, we can't just pick up a key from a sibling node and put it into current node. We need to *pass* the key with the help of the parent node.

```kotlin
private fun borrowFromNext(idx: Int, node: Node<K>) {
    val child = node.children[idx]
    val sibling = node.children[idx + 1]
    
    // Pass the key from parent node
    child.keys.add(node.keys[idx])
    // Handle the child list if current node is not a leaft node
    if (!child.isLeaf) {
        child.children.add(sibling.children.first())
        sibling.children.removeFirst()
    }
    
    // Pass one key from sibling to parent node
    node.keys[idx] = sibling.keys.first()
    sibling.keys.removeFirst()
}
```

### Merge two child node

In the `fill` function, we try to borrow a key from sibling node first. If both two sibling nodes don't have redundant keys, we merge these two nodes. Recalling the property that the number of child nodes is one more than the number of keys. Thus for the merged node, we need to add one more key to keep the property. And this key is from the parent node. The reason why we can do it is that after merging, the parent node lost one child node. So we can move one redundant key from parent to the merged node.

```kotlin
private fun merge(idx: Int, node: Node<K>) {
    val child = node.children[idx]
    val sibling = node.children[idx + 1]
    
    // Move one key from parent node to merged node
    child.keys.add(node.keys[idx])
    
    // Merge two nodes
    child.keys.addAll(sibling.keys)
    child.children.addAll(sibling.children)
    
    // Remove the sibling node which has been merged
    node.keys.removeAt(idx)
    node.children.removeAt(idx + 1)
}
```

### Remove key from leaf node

Once we find the key, we will remove it. But we need to handle two situations here, which are removing it from a leaf node or inner node. The logic is pretty straightforward for removing key from a leaf node. Cause we have checked and filled any scraggy node before jump into it, so the node must have enough keys. Therefore, we can delete it safely.

```kotlin
private fun removeFromLeaf(idx: Int, node: Node<K>) =
    node.keys.removeAt(idx)
```

### Remove key from inner node

The logic for removing key from inner node is a little complex. We can't simply remove a key from inner node because we need to keep it to be self-balanced after deletion. Thus we will use the same strategy with binary search tree. We replace the key to be removed with its predecessor or successor, and then recursively delete the predecessor or successor.

Before jumping into the algorithm, we should introduce the concepts first.

- predecessor: the largest key on the left child of a node is called its inorder predecessor.
- successor: the smallest key on the right child of a node is called its inorder successor.

According to the concept, we can implement the function.

```kotlin
private fun getPredecessor(idx: Int, node: Node<K>): K {
    var curr = node.children[idx]
    while (!curr.isLeaf) {
        curr = curr.children.last()
    }
    
    return curr.keys.last()
}
```

The point is the predecessor of one key is larger than any keys in the left subtree of that key. Thus if we replace the key with its predecessor, we will not break the property of a b tree. If both two child nodes don't have enough keys, we can merge them before continuing.

```kotlin
private fun removeFromNonLeaf(idx: Int, node: Node<K>) {
    val key = node.keys[idx]
    
    // We don't mind the key will be replace by predecessor or successor
    // But we need to check if the child node has enough key before searching it
    if (node.children[idx].keys.size >= t) {
        val predecessor = getPredecessor(idx, node)
        node.keys[idx] = predecessor
        
        remove(predecessor, node.children[idx])
    } else if (node.children[idx + 1].keys.size >= t) {
        val successor = getSuccessor(idx, node)
        node.keys[idx] = successor
        
        remove(successor, node.children[idx + 1])
    } else {
        // After merging, the key at position of idx in current node will be push down to the merged child node
        // Therefore we recursively call the remove function for the key on child node
        merge(idx, node)
        remove(key, node.children[idx])
    }
}
```

# Reference

1. [Tutorial of b-tree on programiz](https://www.programiz.com/dsa/b-tree)
2. [Introduction of b-tree on geeksforgeeks](https://www..org/introduction-of-b-tree-2/)
3. [B-tree visualization](https://www.cs.usfca.edu/~galles/visualization/BTree.html)
