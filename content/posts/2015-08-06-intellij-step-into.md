---
date: 2015-08-06
title: "Ignoring third-party Libraries While Debugging in IntelliJ "
template: post
thumbnail: ../thumbnails/writing.png
slug: intellij-step-into
categories:
  - General

tags:
  - General
---

When I use IntelliJ to debug my code, I’m only interested to debug just my code, not the ones from external libraries. there’s almost no reason for me to ever want to debug external libraries (other than to learn more about them or maybe debug a potential bug in the external libraries). 

Fortunately, IntelliJ IDEA makes it easy to specify which classes to skip. This makes it easier to focus on your own code. You can find [more information](https://www.jetbrains.com/idea/help/debugger-stepping.html) on how to ignore debugging thrid-party library.  

![first-screenshot][1]

[1]: ../images/intellij-stepinto.PNG
