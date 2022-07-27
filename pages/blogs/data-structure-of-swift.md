---
title: 'JoJo's Bizarre Programming Language - The elements of Swift'
date: '2022-7-27'
lastmod: '2022-7-27'
tags: ['programming language', 'swift']
draft: true
summary: ''
authors: ['default']
---

[[toc]]

A programming language is not just a collection of key-words, it's a framework that helps us to organize our ideas about processes. Thus, we should pay particular attention to the way that the language provides for combining simple ideas to form more complex ideas. In other words, every powerful language should include three mechanisms:

1. Primitive expressions
2. Means of combination
3. Means of abstraction

And when we write code, we actually deal with two kinds of elements: procedures and data. In this series of articles about Swift, we will talk about these aspects.

# Primitive expressions

Swift provides some elementary data structures to express __single__ concept and __a series of__ concepts. It's important to understand these basic expressions.

## Basic types

Before we talk about each basic type, we will illustrate them in table.

| Type | Description |
| :-: | :-: |
| Int | An integer number |
| Float | 32-bit floating-point number |
| Double | 64-bit floating-point number |
| Bool | Any of two values: true or false |
| Character | 16-bit Unicode character |
| String | Textual data |

This part is easy, just some general data types, and the following is the way to declare them.

```swift
let theInt = 100
let theFloat = 3.14
let theDouble = 2.7182818284
let theBool = true
let theCharacter = "Star Platinum"
```

## Collection types

Swift provides three primary collection types, known as _array_, _sets_ and _dictionaries_ for storing collections of values. These collection types give programmers ability to store a series of data.

If the array, set or dictionary is assigned to a variable, the collection will be __mutable__. If they are assigned to a constant, the collection will be __immutable__.

### Array

The _Array_ store a series of elements of same type, and it can store the same value.
The following is the basic usage of the array:

```swift
let emptyArray: [Int] = [1]
var arr = Array(repeating: 10, count: 3)

var connect = emptyArray + arr      // [1, 10, 10, 10]

arr.count       // size of array
arr.append(20)
arr.insert(100, at: 0)
arr.remove(at: 0)

arr[1...2] = [22, 33]

for item in arr {
    // ...
}

for (index, item) in arr.enumerated() {
    // ...
}
```

### Sets

The _Set_ store values of same type in a collection with __no__ defined ordering, it can __not__ store the same value.

The type of set's value should be _hashable_, so Swift can compute the hash value for it to ensure if there are any same values in the Set. By the way, all of Swift's basic types, such are hashable by default.

The following is the basic usage of the set:

```swift
var theSet: Set<String> = ["Star Platinum", "Crazy Diamond", "Gold Experience"]
var s = Set<Int>()

s.count
s.isEmpty
s.insert(10)
s.contains(10)
s.remove(10)

for item in s {
    // ...
}

for item in s.sorted() {
    // ...
}
```

# Means of combination

## Enumation

## Structure

## Class

## Inheritance

## Extensions

# Means of abstraction

## Protocols

# Reference

- SICP, 1.1 The Elements of Programming
- [Swift Data Types](https://www.programiz.com/swift-programming/data-types)
