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

// TODO

## Dependencies and fault transaction

// TODO

## Fault tolerance mechanisms

__Redundancy management__

__Acceptance test techniques__

__Comparison Techniques__

// TODO











