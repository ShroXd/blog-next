---
title: 'Algorithm Connect! Re: Dive - Binary Search Tree'
date: '2022-8-24'
lastmod: '2022-8-24'
tags: ['algorithm', 'search']
draft: true
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
interface SymbolTable(Key, Value) {
    fun put(k: Key, v: Value)
    fun get(k: Key): Value?
    fun delete(k: Key)
    fun contains(k: Key): Boolean
    fun isEmpty(): Boolean
}
```

Generally, we need the ability to _add_, _get_ and _delete_ elements from the data structure. Also, checking if an element exists and the data structure instance is empty is useful for the client.

## Inefficient implementations

The most straightforward way is using the _unordered linked list_. Each node has three fields: key, value, and the pointer to the next node. The _get_ is straightforward; just traversal the linked list and find the given key. But the problem is, in the worst case of the _get_ method, we need to traverse the entire list, and it requires $\sim n$ comparisons. On average, it requires $\sim n/2$ comparisons. Similarly, we need to check if the given key exists in the linked list when the client adds a new element; that said, the comparisons for this process will be $\sim n$.

Another opposite way is to use the _ordered array_. It's straightforward to search for a given key in an ordered array. Just traverse it! Going further, since it's an ordered array, we can use the __binary search__ to decrease time complexity. It can make both the average and worst-case number of comparison $\sim \lg{n}$. But this is an array after all; in other words, when inserting a new element, we need to move all subsequent elements. Consequently, the insertion cost is still $\sim n$ in the worst case and $\sim n/2$ on average.

# Reference

- [Data Structures - Lists, Dictionaries](https://vt.instructure.com/courses/27918/pages/book-4-dot-2-data-structures-lists-dictionaries#dictionaries)
