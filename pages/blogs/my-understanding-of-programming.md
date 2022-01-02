---
title: 'My understanding of programming'
date: '2021-07-31'
lastmod: '2021-07-31'
tags: ['programming', 'thinking']
draft: false
summary: 'The most fantastic thing in programming is finding the connection between pieces of knowledge'
authors: ['default']
---

> The third is separating them from all other ideas that accompany them in their real existence: this is called abstraction, and thus all its general ideas are made.<br /> <br />
> John Locke, _An Essay Concerning Human Understanding_ (1690)

Three years ago, I graduated from university, and I switched to programming. From that time, I learned many things.
Even though the knowledge I learned in high school was no longer available, I still benefited from some of the abilities I had trained at that time. And the most crucial capability is abstraction.

My learning experience was not smooth. I still remember the first framework I used is [Vue.js](https://vuejs.org/).
It's a great framework, helping dev to build fantastic UI simply.

At that time, I knew a few things about programming, especially _JavaScript_. I know I need to put the data in `data`, and write some functions in `methods`. All of them will support the `template` to work correctly. I wrote a lot of bad code.

One time, my leader assigned me a task: developing an interactable modal to help users config their vending machines.
I finished that work in 2 days. It seems correct, but when I start to test it, shit happened.
I found the data constantly change, out of control. I take much time to figure out what happened. Maybe you already know that: yep, it's the reference.

I realized to understand the mechanism of things is very important.
So I started to re-think the coding deeply, but it's not easy to work. I know too little. The only contact I found is, every programming language has the essential mechanism, like loop, conditional judgment.
But it's just a perceptual understanding, and I want to know the real principle behind the magic.

For now, I have some ideas. They are just personal ideas, maybe wrong. But I think it still deserves to be recorded.

## Minimum abstraction

Let's discuss what the molecule of the system is. In different programming languages, this question has different answers.
Take **Java** as an example, any function needs to depend on the class to exist.

```java
public class Person {
	String name;
	Int age;

	public Person() {}
	public Person(String name) {
		this.name = name;
	}

	void public hello() {
		System.out.println("Hello friend.");
	}
}
```

But in **TypeScript**, you can declare function separately.

```ts
const hello = (): string {
	console.log("Hello friend")
}
```

All of this is just the appearance. The core idea is, whether it's a class or function, the programming language must give dev a way to implement a minimum abstraction.
The minimum abstraction is a box; it accepts information and returns the result to _outside_. Sometimes it has a **state**, but it depends on the design of a specific programming language.

![Miminum abstraction](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/uPic/2021-07-31-sJW24B.png)

And minimum abstraction is also like blocks in Minicraft if you have played the game. There are many different blocks in the world of Minicraft; you can't break the block into a smaller object. The whole world is built out of these blocks.

Consider this idea in a large software system, and you will know that we can build a large system based on these minimum abstractions only when we can implement it.

So, if you want to build a robust, scalable system, you need to pay attention to the minimum abstraction.
Every minimum abstraction should have clear input & output. I'm sure you've heard that many times, but I still want to repeat this idea. If you've built a large system with other programmers before, you will know what I'm saying.

An apparent, precise minimum abstraction will make the mental model very easy. That means you or other programmers only have to think about one thing at a time.

What will happen when we break this rule? Consider the following code:

```ts
const hello = (name: string): string {
	if (Math.random() > 0.5) {
		return 'Hello world';
	} else {
		return 'My age is 24';
	}
}
```

If our system is filled with such minimum abstraction, I believe that no team in the world can maintain this system for a long time.
Whenever you want to fix a bug or develop a new feature, you will find your work will affect a big part of the system. Even though you just want to fix a data calculate error

## Mode of combination

Every programming language will give dev a way to combine the minimum abstractions. These primitive procedures exist in most programming languages. `if`, `switch`, `for`, these guys are our old friends.

And another class of procedure that can combine our minimum abstractions is related to the `state` of minimum abstractions.
In other words, we distinguish between object-oriented programming and functional programming based on whether there is a state in the minimum abstractions.
Most of the time, we don't strictly distinguish between them. Mainly, we usually use object-oriented programming ideas to organize our system and use functional programming to process the data stream.

Like we did in implementing minimum abstractions, we should keep the _procedure_ has clear input & output.
In an ideal situation, each procedure should only do one thing at a time. But this requirement is a bit harsh. We should decide it based on our experience.

Sometimes, if the range related to the procedure is not large and complicated, we can write them most straightforwardly.
And in most cases, we can pass our minimum abstractions. So if we think the current code has too much functionality, we can abstract out the reusable part and pass it into previously minimum abstraction.
Maybe you already know what I'm saying. Yep, it's the high-level function:

```ts
const array = [1, 2, 3, 4];
const res = array.map(x => x * 2);
```

In this case, `x => x * 2` is our logic; we want to focus on it. We don't care about the `map`; or in other words, it's a reusable procedure. If we don't do that, the code will be messy:

```ts
const handleArray = (array: number[]): number[] => {
	for (let i = 0; i < array.length; i++) {
		array[i] = array[i] * 2;
	}

	return array;
}
```

This function can work properly, but the real important logic is `array[i] = array[i] * 2`. We should only focus on this logic.

## Layering

The most significant idea in software engineering is layering.
Human beings can't comprehend complex systems. If we don't use layering ideas in software development, the codebase will be out of control quickly.
You must have learned the [OSI model](https://en.wikipedia.org/wiki/OSI_model), which is the key that lets us build such a huge network system.
Thank layering idea, we can implement a colossal system step by step.

We have talked about _clear input & output_ many times, but what is the _clear_? In terms of layering, each abstraction should be in the correct layer of the system, or other words should describe a specific layer of the system.

It must be mentioned is, the layer is not always a macro layer. Each minimum abstraction is a mini-system. It also has a multi-layer sometimes.
So, abstract out the appropriate layer is a work that depended on the dev's experience. It would be best if you had a good understanding of the system (also the mini-system) itself and its sphere of influence first so that you can make decisions correctly.

If you have used the `Spring` framework, you must have seen this pic:

![IoC](https://bebopfzj.oss-cn-hangzhou.aliyuncs.com/uPic/2021-08-01-NnXO6E.png)

But why does this abstraction is useful?

As we all know, in a colossal system, each minimum abstraction has complex dependencies. So the dependencies themselves are a reusable procedure. And another reason is, the dev should focus on the business logic. They shouldn't expend energy on complex dependencies. This abstraction way makes this vision come true.

Once we think about it this way, we will know how to make a good abstraction to divide the layer.

## Environment chain

We have talked about the _minimum abstraction_. But we're just talking about it from a dev's point of view. Or in other words, good abstraction not means these components can work properly in the system. But why? If we write a correct implementation of class or function and ensure it has clear input & output, it should work correctly.

We forget a significant thing: **environment**.

Before we talk about this topic, we should define two concepts:

- Bound variables
- Free variables

What is bound variables? It's a variables which has a pecific scope. The free variables is the opposite.
Here is a code example:

```ts
const hello = (name: string) => {
	return `My name is ${name}, and I'm ${age} years old.`
}
```

`name` is a _bound variable_, since in this function, if you change the `name` to another variable, the functionality will not change. Which means, if we implement this function this way, they're equivalent:

```ts
const hello = (theName: string) => {
	return `My name is ${theName}, and I'm ${age} years old.`
}
```

But `age` is different. If we change the `age` to another variable, we will revise the string that the function returns.

And another thing is, when JavaScript interprets this code, it needs to know the value of age. But we haven't defined it at function inside. So we need a mechanism to let the engine know how to find the value of free variables.

Yep, it's **scope chain**. Or we can call it **environment chain**.

Every minimum abstraction is running in a specific environment. If the computer wants to know a variable's value, it needs to find it in the local environment first. If it can't find anything, it must turn to a high-level environment until the root environment.

All of these environments combine into a chain, and we call it **environment chain**. If you're a JavaScript programmer, you can check this [article](https://dev.to/lydiahallie/javascript-visualized-scope-chain-13pd).

If you think about this idea, you'll find the environment chain is a tree in the system. We have a root environment (or global environment, if you want), and every minimum abstraction also has a private environment. All of these environments are connected by a pointer.

From this, we can draw two conclusions:

1. Free variables and bound variables can be transformed into each other in different _level_ environment
2. We need to keep variables in an appropriate environment; otherwise, the minimum abstractions will be break

But how do we control the variables and the environment they belong to? The answer is **assignment**.

The assignment is not just a behavior that can store the data, and the most significant functionality is to change the environment. Or we can say, assignment is a moment; the programming world will change after this behavior.

Let's see this example:

```ts
const age = 24;

const hello = () => {
	return `My age is ${age}`;
}
```

If we change the age, the result of the `hello` function will also change. Or we can say, the `hello` function depends on the `age` variable.

Another thing is, if we introduce the `age` variable in the global environment, the function will no longer be pure. We can't determine the result of this function running unless we know the environment clearly. But if the implementation details are lacking, we will break the abstraction, and the system becomes chaotic.

To summarize, we need to pay attention to the environment chain and know our variable's scope. Only then can we write proper, modular programs.

## Summary

- Programming language consists of two parts: ways to do abstract and ways to do combine
- Layering idea help program become modular
- Pay attention to the environment chain can help you organize the minimum abstractions correctly
