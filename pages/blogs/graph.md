---
title: 'Algorithm Connect! Re: Dive - Graph'
date: '2022-12-10'
lastmod: '2022-12-11'
tags: ['algorithm', 'tree']
draft: false
summary: 'A Graph data structure consists of a set of vertices (or nodes) and a set of edges that connect these vertices.'
authors: ['default']
---

[[toc]]

# Overview

The graph is a widely used data structure. It aims to describe the complex relationship between multiple objects. For example, we can use the graph to describe the relationship of my social media account. I followed person A, and we can imagine a line from my end to his/her end. If A followed another B, that means I can get to know person B, as long as person A is willing to introduce each other to us. Suppose there I have a friend C, who also knows person B. Based on this relationship, I have another _path_ to make friends with person B. Actually, my friend C also can be the friend of person A. If you draw all these relationships on paper, it looks like a __net__. Of course, we can use one data structure to describe it: the __graph__.

Consider the graph from the data structure aspect; it looks like a _tree pro max_. If you recall the trees we discussed earlier, you will find we can only start from the root node and end at a leaf node when we traverse a tree. Although we have multiple paths, both have only one starting point: the root node. And the situation even can be easier on a _linked list_. The linked list has only one starting and ending point. In other words, we will choose only one path if we want to traverse a linked list.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221210111014.png)

Both trees and the linked list are useful data structures. But we need to extend it to describe more complex relationships, like the paths between multiple cities and the devices connecting to the Internet. Therefore, we need to understand the graph.

The graph has two main types: the *undirected* graph and the *directed* graph. We will start by defining these two different graphs and introducing two ways to implement them in Kotlin. After we understand the mechanism, we will introduce two useful search algorithms for the graph: depth-first search and breadth-first search.

# Basic terms

Before we jump into the details of the graph, we need to understand the related concepts first. Two core concepts are __vertex__ and __edge__. Vertex is the graph node, and we use it to store information. Edge is the relationship between vertices, and we can use it to store additional information like distance.

At the same time, we define `Graph` interface here. It gives a brief overview of real code.

```kotlin
interface Graph {
    var vertices: Int
    var edges: Int
    
    fun addVertex()
    fun addEdge(a: Int, b: Int)
    fun removeEdge(a: Int, b: Int)
}
```

# Undirected graph

As we showed before, the graph is a collection of _vertices_ and _edges_. They describe the information about the relationship between objects. The undirected graph's edges don't have a direction. It means in an undirected graph, if there is an edge connecting vertex A and B, we can visit B from A, or vice versa. Based on this property, you can understand it is a doubly linked list. The following picture shows a classic undirected graph.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221210140519.png)

## Representation

We have two ways to represent an undirected graph: _adjacency-matrix_ and _adjacency-lists_. In order to avoid redundant, we agree that our discussion is based on the following graph.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221210141950.png)

### Adjacency Matrix

The adjacency matrix is a solution using a 2D array of size $V * V$ where $V$ is the number of vertices of the graph. Each point on the row and column represents a vertex. Therefore, there are $V^{2}$ intersections in this matrix. Each intersection represents the relationship between two points on a row and column. Pay attention; these two points can be the same point. The value on those intersections is `false` when we initialize the matrix. If we want to connect two vertices, we will change the value of the corresponding value to `true`. If we describe the above graph in this way, it will be:

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221210143135.png)

This representation is pretty straightforward to implement. We just need to manipulate a 2D array, and the time complexity of each access is $O(1)$. But the cons are also obvious. When we add a new vertex to the graph, we need to increase the space in both landscape and portrait orientation. The time complexity will be $O(V^{2})$, which will cause serious performance issues when the graph has many vertices. The following is the code in Kotlin.

```kotlin
class AdjMatrixUndirectedGraph(override var vertices: Int = 0): Graph {
    override var edges: Int = 0
    // 2D list to store relationship between vertices
    val adjacencyMatrix: MutableList<MutableList<Boolean>> = MutableList(vertices) { MutableList(vertices) { false } }
    
    // Optional helper method, check if given index is in the cope of arrays
    private fun validateVertex(vararg vertices: Int) {
        vertices.forEach {
            if (it < 0 || it >= this.vertices) {
                throw IllegalArgumentException("vertex $it is not between 0 and ${it - 1}")
            }
        }
    }
    
    // Increase points on row and column
    override fun addVertex() {
        vertices += 1
        adjacencyMatrix.map { it.add(false) }
        adjacencyMatrix.add(MutableList(vertices) { false })
    }
    
    // Set the value on intersection to true
    // Cause this is undirected graph, the edges are bidirectional
    override fun addEdge(a: Int, b: Int) {
        validateVertex(a, b)
        if (!adjacencyMatrix[a][b]) {
            edges += 1
        }
        
        adjacencyMatrix[a][b] = true
        adjacencyMatrix[b][a] = true
    }
    
    // Same logic as addEdge
    override fun removeEdge(a: Int, b: Int) {
        validateVertex(a, b)
        if (!adjacencyMatrix[a][b]) {
            edges -= 1
        }
        
        adjacencyMatrix[a][b] = false
        adjacencyMatrix[b][a] = false
    }
}
```

### Adjacency List

Another way is to use the adjacency list. The size of the list is equal to the number of vertices. Each element stores a set of vertices linked to the first vertex in this series of vertices. But whatever you use, the adjacency list is efficient, and we can even use it to represent a weighted graph. The only thing needed is to store the weight of the current edge in the node.

![](https://raw.githubusercontent.com/ShroXd/img-hosting/main/blog/20221210213038.png)

Recalling the difference between the array and the linked list. We know the linked list is an efficient data structure to store a series of data because if we want to insert a new element, we can change the previous node and the new node's pointer `next`. If we use an array, we need to move each node behind the new node one step backward. In this scenario, we can only add a new vertex from the array's end. Therefore we can use an array to store them. But the performance of deletion is still not improved. The following is the code.

```kotlin
class AdjListUndirectedGraph(override var vertices: Int = 0): Graph {
    override var edges: Int = 0
    // Adjacency list storing every vertices linked to current one
    val adjacencyList: MutableList<MutableList<Int>> = MutableList(vertices) { mutableListOf() }
    
    // Optional helper method, check if given index is in the cope of arrays
    private fun validataVertex(vararg vertices: Int) {
        vertices.forEach {
            if (it < 0 || it >= this.vertices) {
                throw IllegalArgumentException("vertex $it is not between 0 and ${it - 1}")
            }
        }
    }
    
    override fun addVertex() {
        vertices += 1
        adjacencyList.add(mutableListOf())
    }
    
    override fun addEdge(a: Int, b: Int) {
        validateVertex(a, b)
        if (!adjacencyList[a].contains[b]) {
            edges += 1
        }
        
        adjacencyList[a].add(b)
        adjacencyList[b].add(a)
    }
    
    override fun removeEdge(a: Int, b: Int) {
        validateVertex(a, b)
        if (adjjacencyList[a].contains(b)) {
            edges -= 1
        }
        
        adjacencyList[a].remove(b)
    }
}
```

## Search

Searching on a graph is an essential function we need to study. As we mentioned, the graph could be considered _tree pro max_, which means if one vertex has multiple neighbors, we need to decide to search child vertices or neighbor first. In other words, it's two different searching strategies: depth-first search & breadth-first search. We will discuss them.

### Depth-first search

In computer science, a depth-first search (DFS) is an algorithm for traversing or searching on a graph. As we mentioned before, DFS will search in a depthward motion. We can use a `stack` to help the procedure, but a wide solution is to use a recursive function. A recursive procedure is a natural depth-first procedure.

It's crucial to understand that the graph may have _cyclic_ vertices. It means an edge connects a vertex with itself. We need to consider this scenario; otherwise, our search algorithm may get stuck in an infinite loop. A simple solution is to record the vertices we have already visited. 

```kotlin
fun depthFirstSearch(graph: AdjListUndirectedGraph, vertex: Int, fn: (v: Int) -> Unit) {
    // We use mutable list to record visited vertices
    // You can also use mutable map, mutable set, or whatever you prefer
    val visited = MutableList(graph.vertices) { false }
    
    // Recursive function
    fun dfs(v: Int) {
        visited[v] = true
        // Do something on the current vertex
        fn(v)
        
        // Check each neighbors connected to current vertex
        for (idx in graph.adjacencyList[v]) {
            // Jump into a neighbor which have not visited
            if (!visited[idx]) dfs(idx)
        }
    }
    
    // Tail recursion
    return dfs(vertex)
}
```

### Breadth-first search

The breadth-first search (BFS) is also an algorithm for traversing or searching on a graph. Unlike DFS, breadth-first search explore each level of the graph first and then go depthward. We always use a `queue` to help with the traversing procedure. For the same reason, we also need to record the visited vertices to prevent an infinite loop.

```kotlin
fun breadthFirstSearch(graph: AdjListUndirectedGraph, vertex: Int, fn: (v: Int) -> Unit) {
    val visited = MutableList(graph.vertices) { false }
    // Use a queue to schedule the traversing procedure
    val queue = LinkedList<Int>()
    
    visited[vertex] = true
    queue.add(vertex)
    fn(v)
    
    while (queue.isNotEmpty()) {
        val curr = queue.poll()
        
        // Visited each neighbor first
        for (adj in graph.adjacencyList[curr]) {
            if (!visited[adj]) {
                visited[adj] = true
                fn(v)
                // Put the neighbors of neighbors in the queue
                // Waiting for the next loop
                queue.add(adj)
            }
        }
    }
}
```

# Directed graph

Like the undirected graph, the directed graph is one kind of graph that can store relationship information. The difference is the edges of the directed graph have a direction. This means that the edges in a directed graph are ordered pairs of vertices.

## Representation

We can also use an adjacency matrix or adjacency list to represent a directed graph, and the implementations are similar to the undirected graph. Therefore we will only introduce how to represent a directed graph using an adjacency list.

We mentioned it's useful to store the distance information in edges since this information can help us to find the shortest way. Thus we will implement two classes which are `Vertex<T>` and `AdjListDirectedGraph<T>`.

```kotlin
class Vertex<T>(val data: T) {
    // Store all neighbors of the vertex
    // Each vertex is a hash table, key is neighbor and the value is the distance information soted on edges
    private val neighbors = mutableMapOf<Vertex<T>, Int>()
    
    // Store the weight information
    // Or we can call it distance information
    fun addNeighbor(vertex: Vertex<T>, weight: Int) {
        neighbors[vertex] = weight
    }
    
    fun removeNeighbor(vertex: Vertex<T>) {
        neighbors.remove(vertex)
    }
    
    fun getNeighbor(): Map<Vertex<T>, Int> {
        return neighbors
    }
}
```

To use the `Vertex<T>` class, we need to implement `AdjListDirectedGraph<T>`.

```kotlin
class AdjListDirectedGraph<T>(val vertices: MutableList<Vertex<T>>) {
    // Add new vertex in the vertices list
    fun addVertex(vertex: Vertex<T>) {
        vertices.add(vertex)
    }
    
    // We can also add only one directed edge
    fun addEdge(v1: Vertex<T>, v2: Vertex<T>, weight: Int) {
        v1.addNeighbor(v2, weight)
        v2.addNeighbor(v1, weight)
    }
    
    fun removeEdge(v1: Vertex<T>, v2: Vertex<T>) {
        v1.removeNeighbor(v2)
        v2.removeNeighbor(v1)
    }
}
```

## Search

We also have two different strategies for the directed graph: depth-first search and breadth-first search. They are pretty similar to those of undirected graphs. The only thing we need to pay attention to is following the direction of edges during traversing. Additionally, we use a new way to implement the graph, so the code of searching algorithms will have a bit of difference. But the core logic doesn't change.

```kotlin
fun <T> depthFirstSearch(vertex: Vertex<T>, fn: (v: Vertex<T>) -> Unit) {
    val visited: MutableSet<Vertex<T>> = mutableSetOf()
    
    fun dfs(v: Vertex<T>) {
        // Prevent the infinite recursive loop
        if (v in visited) return
        
        visited.add(v)
        fn(v)
        
        // Visit the child vertices first
        v.getNeighbor().forEach { dfs(it.key) }
    }
    
    return dfs(vertex)
}
```

And the following is the bread-first search algorithm.

```kotlin
fun <T> breadthFirstSearch(vertex: Vertex<T>, fn: (v: Vertex<T>) -> Unit) {
    val visited: MutableSet<Vertex<T>> = mutableSetOf()
    val queue = LinkedList<Vertex<T>>()
    
    visited.add(vertex)
    queue.add(vertex)
    
    while (queue.isNotEmpty()) {
        val curr = queue.remove()
        fn(curr)
        
        for (neighbor in curr.getNeighbor()) {
            if (!visited.contains(neighbor.key)) {
                // Visite neighbors on the same level first
                visited.add(neighbor.key)
                // Store next level in the queue
                queue.add(neighbor.key)
            }
        }
    }
}
```

# Reference

1. [Graph Data Structure And Algorithms](https://www.geeksforgeeks.org/graph-data-structure-and-algorithms/)
2. [Graph Data Structure](https://www.programiz.com/dsa/graph)
3. [chatGPT, the super-powerful AI](https://chat.openai.com/chat)
