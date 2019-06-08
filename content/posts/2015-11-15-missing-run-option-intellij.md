---
date: 2015-11-15
title: "Missing Run/Debug option in IntelliJ IDEA"
template: post
thumbnail: ../thumbnails/java.png
categories:
  - General

tags:
  - General
---

After updating my IntelliJ IDEA (from 15.0.0 to 15.0.1) the Run/Debug option is gone. The corresponding menu entries in View | Tool Windows are deactivated.

![first-screenshot][1]

[1]: ../images/intellij-run-option.png

I reinstall IntelliJ IDEA and removed IntelliJ IDEA setting directories to see if the problem goes away but It didn't do any good. So I start googling to see if anyone else have the simmilar problem and I found few useful information and one of them is to check log.

To check log from IntelliJ IDEA,
```bash
Help > Show Log in finder 
```

After looking at the idea logs, I found the idea.log riddled with exceptions from the plugin Jbehave. I probably had an old version of this plugin. To resolve the issue I just uninstalled the plugin using the IDEA plugin uninstall feature. After restarting IDEA 15.0.1 the IDE is working just fine.
