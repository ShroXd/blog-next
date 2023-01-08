---
title: "System's Bizarre Adventure - Reliable, Scalable, and Maintainable Applications"
date: '2023-1-3'
lastmod: '2023-1-3'
tags: ['system architecture']
draft: false
summary: 'We hear these words a lot, what exactly do they mean?'
authors: ['default']
---

[[toc]]

_This is a reading note for [Designing Data-Intensive Applications](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/)_

# Overview

For a developer working in a commercial company, the most frequently encountered systems are __data-intensive systems__. Different companies have different businesses, but behind the different business models is a set of general abilities. For example, application code, in-memory cache, primary database, message queue, e.g., The commercial company doesn't have enough resources to allow developers to implement all of them; therefore, we make architecture decisions according to the problem scales. A website with only 2,000 visits per day doesn't need to consider caching, but things become entirely different for a website with 2,000 visits per second.

Before jumping into the details of data-intensive systems, we need to know how to evaluate a system. Or in other words, when we say a _good_ system, what exactly are we talking about? Generally, we will evaluate a system from three aspects: reliability, scalability, and maintainability. We will discuss some techniques, architectures, or algorithms to achieve these goals. But before it, we need to understand these terms clearly. Consistent and clear terms understanding is the first step in discussing system design.

# Reliability

We often refer to this term when discussing system architecture, but people often misunderstand it. It's worth noticing that _reliability_ is not describing the system returning the right value that the user expected or tolerating mistakes made by users; it means __continuing to work correctly, even when things go wrong__. Therefore, when we talk about reliability, we are actually talking about __fault-tolerant__. A good paper called _[A Conceptual Framework for System Fault Tolerance](https://resources.sei.cmu.edu/library/asset-view.cfm?assetid=11747)_ expounds on this topic. Thus, we will focus on this paper in this section.

## Faults and failures

A precise understanding of these two terms is the first step in understanding system reliability.

A __fault__ is usually defined as one component of the system deviating from its specification, whereas a __failure__ is when the system as a whole stops providing the required service to the user. A system may continue to provide its service even when encountering a fault. Such a system is called __fault tolerant__.

It's impossible to reduce the probability of a fault to zero. Therefore it is usually best to design fault-tolerance mechanisms that prevent faults from causing failures.

## Dependencies and failure regions

If a component's behavior's correctness requires the second component's correct behavior, we say the first component depends on the second component. An actual system may have a set of possible dependencies forming a graph. The graph is _acyclic_ if it forms part of a tree, while it is _cyclic_ if part of the dependencies connects to themselves. It is better to describe the second situation as a directed cyclic graph.

When we design a fault-tolerant system, it is essential to identify the dependencies between components of the system. Dependencies may be static, or they may change. 

A fault that occurs on a component may transmit in the dependencies graph. Thus it is essential to understand the failure regions. We define the failure region as a limitation of considering faults and failures to a portion of a system and its environment.

## Fault tolerance mechanisms

Based on the discussion above, we introduce three fault tolerance mechanisms.

The first is __redundancy management__. It provides redundant resources for the system and automatically replaces a component when it fails so that it can continue providing service for the users. The second is __acceptance test techniques__. The components of the system execute the testing for the information from other components before using it. This mechanism can work in the non-redundant system. The third is __comparison techniques__. Multiple processors are used to execute the same program and compare the results across processors.

## Achieve reliability

Based on the discussion of reliability and fault-tolerant system, it's easy to understand the first step in implementing a reliable system is to understand your system precisely. You need to know the system's requirements so that you will have enough information to identify the portions that may go wrong. Determine the appropriate fault containment regions to deal with fault and make the time/space trade-offs.

# Scalability

Reliability describes if a system can work reliably at that moment, but it does not mean a reliable system can still provide reliable service in the future. The number of users may increase, which puts the system under more pressure. Therefore, we use __scalability__ to describe a system's ability to cope with increased load.

We will discuss the load and performance first. A good understanding of these two concepts can give us enough information to make trade-offs when developing the system's solution. After that, we will briefly talk about some approaches. It's hard to talk about all details of these approaches in an article; thus, we only talk about some conceptual stuff.

## Describing load

Succinctly describing the load is the first step in improving the performance of our system. We always use a few numbers called __load parameters__ for this requirement.

The choice of load parameters depends on the architecture of your system. If the core function requires intensive reading and writing to the database, the ratio of that behavior is a good candidate. There is no universal parameter measure of system load; you need to understand your system or the function you're interested in before choosing them. The book takes Twitter as an example; you can read it for inspiration.

## Describing performance

Generally, we want the best performance with the least amount of resources. Therefore, we have two ways to investigate the performance of our system when loading increases.

1. Keep the resource unchanged when you increase the load parameter and observe how the performance is affected.
2. Increase the resource to keep the performance unchanged. Observe how many resources you need to increase.

Like the load, we need to use a few numbers to describe the performance of our system. We always use response time for the online system to describe the performance. It describes the time between a client sending a request and receiving a response.

It is vital to recognize that response time is not a single number but a _distribution_ of values. Therefore, looking at the average becomes meaningless from a statistical point of view. A system with an unstable response time may have the same average value as a stable system. But the resulting user experience is completely different.

We always use __percentiles__ to bypass the fundamental issue with averages. The idea is to take the data during a period of time and sort it, then discard the worst 1% and observe the remaining value. For example, we can find the largest value that occurs at 99% of the response time. In practice, we often choose the 99.9%, 99%, 95%, and 90%.

Why can't we use the 99%? Let's suppose that the largest value that occurs at 99% of the response is 400ms. It means 99% response time during this time is better than 400ms, but we don't know the distribution of these _better values_. Maybe we have 100 response time records; 80 of them are 398ms. Therefore we need to review the percentiles of the response time to recognize the distribution.

At the same time, it is necessary to know what we talked about above is only researching a single request. In modern websites, a web page may need to send hundreds of requests. Therefore, although you may have put a lot of effort into improving the performance data, the users still experience the worst situation with a high probability.

If you want more information about this topic, I suggest you read [Why Percentiles Don’t Work the Way You Think](https://orangematter.solarwinds.com/2016/11/18/why-percentiles-dont-work-the-way-you-think/) and [Everything You Know About Latency Is Wrong](https://bravenewgeek.com/everything-you-know-about-latency-is-wrong/).

## Approaches for coping with load	

Based on the discussion of load and performance, we can say when we talk about the scalability of a system, we are talking about how to maintain good performance under increasing load parameters.

 We already have some common methods for addressing this requirement in modern software development. Like auto-scaling, load balancing, caching (including CDN), and distributed systems. We will talk about them in the future because each topic needs much discussion and has tons of details.

Another thing is the trade-off during the architectural design. Although we have many ways to improve the performance, we can't implement all of them because of the limited resources. Therefore. a smart way is to use the simplest way and refactor it until the current strategy or high-performance requirements force you to change it. But with the improvement of cloud service infrastructure, some approaches like distributed databases may be the default in the future.

# Maintainability

The majority cost of software development is in its ongoing maintenance instead of the initial development. Although we can not eliminate the pain of maintaining an old project, we should use some ways to reduce it. To achieve this, we should pay attention to three design principles: operability, simplicity, and evolvability.

## Operability

Developing software is not only include writing code; it also includes running it smoothly. 

For example, we need to monitor the system's health by collecting logs and data; we need to use CI/CD to release the new version smoothly; we need to keep the software up to date; we need to share knowledge about the software with team members who doesn't participate in; we need to establish the good practices for development. Most of these requirements can be addressed by using some automatic tools.

Good operability makes the team's life easier. The team can focus on more valuable things.

## Simplicity

Managing the complexity of the software is the core topic of development. As time goes by, more and more functions are added to the system, and the system may also accumulate a lot of technical debt. These factors make the system becoming complex and difficult to understand.

Two effective methods are abstraction and delamination. It can hide the complexity behind a clean facade. This book will introduce some approaches to dividing the huge system into well-defined, reusable components. If you want to know how to do the same thing for the code, a book worth reading is [Structure and Interpretation of Computer Programs](https://mitp-content-server.mit.edu/books/content/sectbyfn/books_pres_0/6515/sicp.zip/index.html).

## Evolvability

As we mentioned before, the system is not static stuff. We don't only refactor the code and architecture to support more users but also add new features and change the existing functions. Therefore, evolvability is an important measuring aspect of the system.

The __agile__ working patterns provide a good framework to deal with this problem. Some technical tools and patterns from the agile community are useful for the system. Test-driving development and refactoring are probably the most well-known methodologies. 

# Summary

This article talked about some fundamental principles of measuring data-intensive applications. A good understanding of these principles is the first step to jumping into deep technical details. Although we will introduce more technologies to make the applications reliable, scalable, and maintainable, we will never have a one-size-fits-all solution. Succinctly understanding your system is always the first step to addressing the problems and making the application better.

# Reference

- [Designing Data-Intensive Applications](https://www.oreilly.com/library/view/designing-data-intensive-applications/9781491903063/)
- [A Conceptual Framework for System Fault Tolerance](https://resources.sei.cmu.edu/library/asset-view.cfm?assetid=11747)
- [Why Percentiles Don’t Work the Way You Think](https://orangematter.solarwinds.com/2016/11/18/why-percentiles-dont-work-the-way-you-think/)
- [Everything You Know About Latency Is Wrong](https://bravenewgeek.com/everything-you-know-about-latency-is-wrong/)