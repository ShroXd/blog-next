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

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221110205438.png)

We mentioned the tree is not only perfectly balanced but also in symmetric order by key. Thus as you can see, for every node, the keys in the left child nodes are both smaller than the current node's key, and those in the right are both larger than the current node's key. Of course, the child nodes' keys in the middle path of the 3-node are between those two keys.

## Searching

Cause the 2-3 tree is in symmetric order by key, as same as the binary search tree. So we don't need to rewrite the algorithm for searching a lot; we need to handle the 3-node carefully. This means when we meet the 3-nodes, we need to compare the target key with two keys in this node to see to which range the target key belongs. The result will decide the path of the current search process.

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

The first step of deletion is to find the target in the 2-3 tree; as we discussed, it's pretty straightforward. There are two scenarios for the target key, it can be in 2-node or 3-node. When it's in the 2-node, the deletion algorithm will be as same as it of the binary search tree. In that case, we need to swap it with the in-order successor and delete it. By the way, the key to understanding that algorithm is the in-order successor is the smallest key in the right subtree. Thus if you swap it with the target, the values in the right subtree are all larger than it. Another scenario is when the target key is in a 3-node. In that case, deletion leaves a hole in the 3-node.

### Base case

We discussed two scenarios above, but both scenarios can be reduced to a single scenario, which is, in any case, deletion leaves a **hole** in that node.

Handling the removal of a hole from a 3-node is easy; turn it into a 2-node.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221110205300.png)

To handle the removal of a hole from a 2-node, we consider it a special hold node with a single subtree. Such a hold node does contribute to the height of the tree. Thus we preserve the path-length invariant in trees.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221110205324.png)

### Upward phase

The goal of this phase is to eliminate the hole node. We'll discuss each scenario in detail later, but the principle is pretty straightforward:

1. Kick upstairs the hole
2. Merge it into another node

If a hole kicked up to the root, it should be removed, and the tree's height will decrease by one. This is the only way that the height of a 2-3 node can decrease. Next, we will discuss each scenario.

**Scenario 1**: The hold has a 2-node as a parent and a 2-node as a sibling.

In this case, the hole will be kicked upstairs, and the parent node will be merged into the sibling node, becomes to a 3-node. The heights of the subtrees are the same.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221110102714.png)

**Scenario 2**: The hold has a 2-node as a parent and a 3-node as a sibling.

In this case, the sibling node will be split into 2 2-nodes. We merge the hole into one of the 2-nodes. But to keep the rules of the 2-3 tree, We actually rotate the node instead of simply splitting the 3-node. You can check the diagram below to know what happened.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221110205200.png)

**Scenario 3**: The hold has a 3-node as a parent and a 2-node as a sibling.

It is almost as same as scenario 2. We'll merge the hole into the sibling node, but to keep the rule of the tree, we'll rotate the key instead of simply merging. To understand this, you can recall the left subtree is smaller than the left key of 3-node, and the middle subtree is between those 2 keys.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221110205132.png)

**Scenario 4**: The hold has a 3-node as a parent and a 3-node as a sibling.

The solution for this case is to merge the hold into another 2-node. Thus we'll rotate the key and generate a new 2-node to hold the subtrees of the hole.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221110201209.png)

# Red black tree

We have already discussed the algorithm of 2-3 trees; the natural question to ask next is, "How to implement it?". The short answer is we can, but it's too much complexity. Thus, we usually don't implement the nature 2-3 tree.

You may already notice in the 2-3 tree there are both 2-nodes, 3-nodes, and even temporary 4-nodes. It makes the insert/search methods different from the binary search tree. We do not only handle 3 types of nodes but also split the nodes during backing to the root node when inserting a new element. Sometimes it involves passing value to the parent nodes.

The red-black tree is a good way to simplify 2-3 trees. The idea is not to treat the 3-nodes or 4-nodes as a new type of node; we organize the tree as a simple binary tree and add red color for some nodes which are 3-nodes before. Like the following picture.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221118144000.png)

It's pretty clear. We can manipulate it like a normal binary search tree.

A detail worth mentioning is that for a 3-node, there is a child node at the middle position of it. When we turn it into a red-black tree, we can put it under the left or right node. If we take the picture above as an example, it says we can put the *H* under *M* or *J*. There will be no difference between different options, but we need to keep the same style in the entire red-black tree. In this article, we put it under the left node *M*, which we call the tree a right-leaning red-black tree.

Another point is the red line between nodes is the only glue that binds two keys together into a 3-node. It won't add anything to the path length. That means when we draw any path from the root to a leaf; we only count the black links on the path. If the results are the same, we refer to this as a perfect black balance.

By the way, because we introduced different kinds of lines to connected nodes, 

## Red links

After discussing the red-black trees' principle, it's vital to think about the implementation of the red links we mentioned above. The first thing coming to mind is to use a separate class like `Link`. But the problem is it means we need two instances of `Link` to represent *red* and *black* nodes, and it will increase the complexity of the code significantly. However, we can think of a link as belonging to a node. Thus we can introduce a field in the `Node` to store the information about the link's color.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221120095142.png)

To do this, we can implement an inner class `Node` used by the red-black tree and a helper method to cover the underlying details.

```kotlin
enum class Color {
    RED, BLACK
}

class Node<K, V>(
    var key: K,
    var value: V,
    var color: Color = Color.Black,
    var size: Int = 0
) {
    var left: Node<K, V>? = null
    var right: Node<K, V>? = null
}

private fun isRed(n: Node<K, V>?): Boolean =
	if (n == null) false else n.color == Color.RED
```

One thing worth noting is that the root node's color must be **black** because the red links hint there is a parent node over the current node. But the root node doesn't have any parent nodes.





















