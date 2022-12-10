---
title: 'Algorithm Connect! Re: Dive - Graph'
date: '2022-12-10'
lastmod: '2022-12-10'
tags: ['algorithm', 'tree']
draft: true
summary: 'A Graph data structure consists of a set of vertices (or nodes) and a set of edges that connect these vertices.'
authors: ['default']
---

[[toc]]

# Overview

The graph is a widely used data structure. It aims to describe the complex relationship between multiple objects. For example, we can use the graph to describe the relationship of my social media account. I followed person A, and we can imagine a line from my end to his/her end. If A followed another B, that means I can get to know person B, as long as person A is willing to introduce each other to us. Suppose there I have a friend C, who also knows person B. Based on this relationship, I have another _path_ to make friends with person B. Actually, my friend C also can be the friend of person A. If you draw all these relationships on paper, it looks like a __net__. Of course, we can use one data structure to describe it: the __graph__.

Consider the graph from the data structure aspect; it looks like a _tree pro max_. If you recall the trees we discussed earlier, you will find we can only start from the root node and end at a leaf node when we traverse a tree. Although we have multiple paths, both have only one starting point: the root node. And the situation even can be easier on a _linked list_. The linked list has only one starting and ending point. In other words, if we want to traverse a linked list, we will choose only one path.

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















