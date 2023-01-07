---
title: "System's Bizarre Adventure - Reliable, Scalable, and Maintainable Applications"
date: '2023-1-3'
lastmod: '2023-1-3'
tags: ['system architecture']
draft: true
summary: ''
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



## Describing load



## Describing performance



## Approaches for coping with load













