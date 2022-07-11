---
title: 'Go, Golang!'
date: '2021-11-6'
lastmod: '2021-11-06'
tags: ['programming', 'language']
draft: false
summary: 'Golang always is a good programming language, except error handling and generics'
authors: ['default']
---

[[toc]]

# Overview

Basicaly, this is an article that records my learning process for Golang.

Golang, as a programming language, the ideas of it has more values that the syntax. How to write a `if` statement is not important at all, we can ask Google at any time and learn it in 10 second. Writing the `if` statement 10 thounds times doesn't increase our understanding of Golang. But when we understand the ideas behind the characters, everything will make sense.

And how do we understand a programming language? According to the idea from SICP, there are three significant concept:

1. the way to express basic element
2. the way to combine
3. the way to abstract

Of course, for some modern programming language like Golang, it not only re-invent the old idea of language, it also introduce some great feature like handle concurrency. These feature sometime will be the major reason that make a developer choose this language.

# Data structure

On the whole, in each programming language, we can express simple data structures like string, number, boolean, and we can also express composite data structures, like array, struct, or map.

## Simple data structure

Simple data structure is very simple, it's just a way to express _information itself_, don't have any _logic information_.

```go
name := "Spike"
age := 26
isDogPerson := false
```

As you can see, the simple data structure only express single concept, and these concepts are unrelated. Data is data itself, that's all.

## Composite data structure

Compared with the simple data structure, composite data expresses the data and the inner logic of data. In other words, if we want to use the composite data, we are more focusing on the logic of the data.

In Golang, we have many composite data, but the name or usage of data is not essential. It's the detail of programming language design. We should focus on what these composite data structures do.

### The way to express a series of data

Sometime, we have a series of data, and each element are at same level, which means if we consider these data at a high level, we will find they have same context, the only difference between them is the detail.

Take the roles of a cartoon, 'Space Bebop' as the example, it has the following roles:

- Spike Spiegel
- Jet Black
- Faye Valentine
- Ed
- Ein

They are both member of Bebop shuttle. If we want to express these information in Golang, how do we do? The answer is, **Array**.

We can define a Array in the following syntax:

```go
var variableName [size]type  // general syntax

bebop := [5]string{
	"Spike Spiegel",
	"Jet Black",
	"Faye Valentine",
	"Ed",
	"Ein",
}
```

As you can see, names of roles express same concept, each element of array are equal.

Another important thing about array is, the position of element is also a way to express information. If you have used Python, you will know what I mean.

In Python, we have a data structure called **Tuples**. Simple to say it, it introduce a array which can't change. _Can't change_ has two level concept, you can't change the value of element, and also can't change the position of elements. Based on the second design, Python has a data structure called **named tuple**. The following code is a basic example:

```python
Point = namedtuple('Point', ['x', 'y'])
p = Point(11, 22)

p[0] + p[1]		# 33
p.x + p.y		# 33

x, y = p		# unpack
```

As you can see, we using the positon of elements to record the information. We can access the information by using these position.

In Golang, we don't have immutable array. But understand the concept is also important, it will give you a better understanding of what the data structure means.

#### Array and Slice

This section is about some detail of Golang, but important enough, so we need to talk about it.

If we ignore the detail of the way to store data in memory, we can think of the way the data is stored like the following diagram:

![](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/uPic/2021-11-06-04ABvh.png)

This diagram has two layers of meaming about the Array:

- You need to apply for a static room in memory
- Elements of this Array has its position in the room

It leads to some behaviour:

- When you wanna insert a number `4` between `3` and `5`, you need to move the following numbers back one step and put the number at the correct position
- When the room can't accommodate the numbers, you need to apply for a new bigger room

Give developer a ability to control these behaviour maybe a good idea, but it just increase the work of devs at most time. So Golang implement a new inner data structure named **Slice** to control a series of data easily.

Simple to introduce it: It just like the array in JavaScript ;D

```go
natureNumber := []int{1, 2, 3, 4, 5}

append(natureNumber, 6)
```

You can read this [article](https://go.dev/blog/slices-intro) to get more information about usage of _Slice_

### The way to express structured data

In some cases, we need a way to originze some data, these data are correlated, and together they describe a concept.

For example, if we wanna know some information about a role of 'Space Bebop', we can search it in Google, and we will get some information like: name, age, height, weight and so on. So, how do we sotre some data like this? The answer is **struct**, at least in Golang.

**Struct** in Golang is a collection of named fields and properties, the following code is a simple example:

```go
type person struct {
	name	string
	age		int
}

var p = person{
	name: "Spike",
	age: 26,
}
```

You can think of **struct** as a templates to store data. The data in this struct is related, describes a concept together.

### The way to express mapping relationship

In computer science, you must have heard about a power data structure which can store the mapping relationship information. Yes, it's _hash table_, you can read this [wiki](https://en.wikipedia.org/wiki/Hash_table) to get more information about hash table. In Golang, it provides a built-in map type that implements a hash table, which is _Map_.

**Map** hold collection of values as key-value pairs. The major information that the Map store is the _mapping relationship_.

Here is the basic syntax of **Map**:

```go
map[KeyType]ValueType
```

You can introduce the key type or value type as a basic type or custom type, and here is an example:

```go
colors := map[string]string{
	"red":		"#ff0000",
	"green":	"#00ff00",
}
```

# Type system

Type system is a huge topic, and also the key part of understanding the programming language design. So before we talk about Golang's type system, we should have a good understanding about the type system itself. You can read more detail about the type system on [Wikipedia](https://en.wikipedia.org/wiki/Type_system), we just give a brief summary about it.

Simply put, there are two level understanding about the type system:

- Type, it's just a set of rules to describe a concept
- The relationship between types, we can think of it as the [Set](<https://en.wikipedia.org/wiki/Set_(mathematics)>)

We assign the type to the various constructs of a computer program, such as variables, expressions, functions or modules. This increases the readability of the code and help us organize our code better. It just like we write the document to describe each constructs of the program.

## Static/Dynamic type checking

As we mentioned, we can think of the types as the Set. What's the Set? Set is a collection of elements. At here, the elements are a set of rules. We use these rules to describe the functionality and possibility of the construct in computer program.

But, what we we say is one thing, and what we really do is another thing. The compiler or interpreter will do some chekcing work to make sure there are no issues _before_ running the program. By the way, when we say 'before', it's not accurate, we will see why.

There are two ways to do type checking: **Static** type checking or **Dynamic** type checking.

For static type checking, it's the process of verifying the type of a program based on analysis of the code text. For the dynamic type checking, the type checking process is deferred to runtime. We can't say which way is right, it's just two design styles. Static type checking avoides minor errors, it can force devs to think about their actions, but this can also make the code verbose. Dynamic type checking make the code more flexible, but this comes at the cost of making run-time errors more likely.

![](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/uPic/2021-11-07-16fMdS.png)

For some languages, they allow both static and dynamic type checking. So, as you can see, there is no silver bullet in software development.

By the way, Golang uses the _static type checking_.

## Nominal/Structural type system

When we introduce the type system into our program, we need a way to determind if two constructs are type-compatible. The way is decided by design of type system, which has two forms:

- Nominal type system
- Structural type system

Nominal type system means that the relationship between types is determined by their declarations name. In contrast, the structural type system only care about the type's actual structure or definition, which means if two types has same fields, we assume that they are compatible.

## Duck typing and 'favor object composition over class inheritance'

Duck typing is a more flexible type system. In a nutshell, an object's suitability is determined by the presence of certain methods and properties, rather than the type of the object itself. Because of this, you can combine many abstraction easily.

![](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/uPic/2021-11-08-5FPIoi.jpg)

Duck typing is not just a toy, it has a very deep connotation. But before we talk about it, we need to discuss a more generic topic: Why favor object composition over class inheritance.

In Object-Oriented Programming, we have two way to originze the code: inheritance and composition. They can do same thing at most of the time, but they still have some difference:

- For inheritance, it's a white-box reuse. When you want to implement a child class which is inherit from a parent class, you need to read the source code in the parent class and determine if the methods needs to be overriden.
- For composition, it's a black-box reuse. You just need to follow the convention of the abstraction.

Inheritance is easy to understand, get everything from parent class and adjust part of them. In other word, the inheritance relationship is static, you can't change it during the runtime. And the another problem is, inheritance means we bind the parent class with child class, in the huge system, we will get a huge inheritance tree:

![](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/uPic/2021-11-08-VDoo3V.png)

When we want to change the code in A class, we have an opportunity to break downstream code. It will increase our mental burden significantly.

Composition don't have disadvantages like inheritance, when we talk about composition, we only talk about the input and the output of a abstraction. That means each abstraction is a black-box, we don't care about the detail, we only care about the bahaviour of it. In other words, we only care about the input and the output.

## Type system in Golang

We mentioned _Struct_ in data structure section. Basically, struct is a way to introduce a template about _data_, and the **Interface** is a way to introduce a template about _functions_. In other words, _interface_ includes a bunch of **rules**, or we can say, a bunch of _functionality_ about the struct. So, you can even call the _interface_ as _abstracted struct_. If a struct implement the functions in the interface, we can say this struct belongs this interface.

The following code is an example:

```go
type Person interface {
	greet() string
}

type Human struct {
	Name string
}

// introcude a method
// the greet method is belongs to Human type
// We call (h Human) receiver
func (h Human) greet() string {
	return "Hi, I am " + h.Name
}
```

In the object-oriented programming, the interface define the behavior of the object. In other words, the interface describe the methods that type should have, and type can decide how to implement these methods.

It's a very nice idea. If we think of the behavior as a black box with defined inputs and outputs, we can the say the interface decoupled the description of the _black box_ from the real implementation in the _black box_.

## What kind of problems are we solving

We always say some design make the system more robust and ez to maintain, but these statements can't help you build your own mental models. So I want to give my understanding about the type system design in Golang.

Suppose we are the designers of a new language, and we decide implement the 'traditional' Object-Oriented programming, which means we only have inheritance in our programming language. Programmer will write the following code in our language:

```ts
class TheFirstClass {
  private fieldA: string
  public fieldB: CustomType

  constructor(paramA: string, paramB: CustomType) {
    this.fieldA = paramA
    this.fieldB = paramB
  }

  // The program will call this function
  // when we call `print` function with the instance of this class
  toString(): void {
    print('This is a example class')
    print('The first field is: ', fieldA)
    print('The second field is: ', fieldB)
  }

  // operator overload
  // when we plus two instance with +
  // the program will call this function
  __plus__(left: TheFirstClass, right: TheFirstClass): number {
    return len(left.fieldA) + right.value + 100
  }

  functionalityA(): void {
    // some business code...
  }

  functionalityB(): void {
    // some business code...
  }
}
```

Here is a typical class in our language. If we analyze this class from the prespective of language design, we will find that we are coupled with a lot of things:

1. **The information/data stored in the class**: the field names and the way to initialize thim
2. **Override inner functionality**: Change the behavior about the language itself, it's the meta-programming
3. **Some business code**: The real business code

We can see such class in systems implemented in many languages, it seems don't have any problem. But let's see the next class:

```ts
class TheSecondClass {
  private fieldA: string
  private fieldB: string
  private fieldC: string

  constructor(param: string) {
    this.fieldA = param
    this.fieldB = param + param
    this.fieldC = 'Fus Ro Dah!!'
  }

  toString(): void {
    print('Dovahkiin!')
  }
}
```

As you can see, in this class, we only have one method which is `toString`. For now, the programmer want to implement a function call `printTheClass` to print the information about the class, he/she may write the following code:

```ts
function printTheClass(c: TheFirstClass | TheSecondClass): string {
  print('----- The following is the information about this class -----')
  print(c)
  print('-------------------------------------------------------------')
}
```

The type of the params `c` means if I want to print a instance, this instance should belong to `TheFirstClass` or `TheSecondClass`. It will leads to two problems,

1. Whenever we want to print a new class, we need to change the type declaration on the param of the `printTheClass` function
2. Type declaration is not precise enough

The first problem is easy to understand, so let's talk about the second one.

The type declaration of the param is `TheFirstClass | TheSecondClass`, but when we pass the instance of `TheFirstClass`, the instance should have `__plus__`, `functionalityA` and `functionalityB`. Do we need them? Or in other word, the param of `printTheClass` should be a instance which has `toString` method, as for whether it has other capabilities, we don't care.

As you can see in the picture below, we need the green area, but our declaration is blue area.

![](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/uPic/2021-11-12-Yxfz6F.png)

But what if we have **interface** in our programming language? I means, what if we have a way to express the capacity that allow programmer call the `printTheClass` with it?

```ts
interface ToString {
  toString: () => string
}
```

We also can introduce a _interface_ to describe some business capacity:

```ts
interface CustomBusinessType {
  functionalityA: () => void
  functionalityB: () => void
}
```

And most important thing is, if we use duck typing system in our programming language design, we can say, if some class implement the `toString` methods, we can say this class belongs to `ToString` type, and that means we can implement the `printTheClass` in a simple way:

```ts
function printTheClass(c: ToString): string {
  print('----- The following is the information about this class -----')
  print(c)
  print('-------------------------------------------------------------')
}
```

Duck typing system is also the non-invasive design. In a inherited system, we always implement some class like the following code:

```ts
class TheThirdClass extends TheSecondClass {
	private fieldA: string

	constructor(param: string) {
		this.fieldA = param
	}

	override toString(): void {
		super.toString()
		print('Re-use!')
	}
}
```

In `TheThirdClass`, we inherit `TheSecondClass`, and rewrite the `toString` function. That means our functionality of `toString` depends on the upstream class. The inherience may decrease our type declaration code, but we actually bind these classes together. When the system grow up, the inheritance relationship will become super complicated.

But in duck typing system, we don't have such problem. If some class implement `toString` method, we can think it as the `ToString` type.

So, the **interface** actually break the traditional class into different piece, each piece is independent, is a type.

# Reference

- Duck Typing: https://devopedia.org/duck-typing
- Answer in Zhihu: https://www.zhihu.com/question/21862257/answer/181179184
