---
date: 2018-06-10
title: "Running GUI Applications in LXD Containers"
template: post
thumbnail: ../thumbnails/lxd.png
categories:
  - LXD
  - Ansible
  - Linux

tags:
  - LXC
  - LXD
  - Ansible
  - Linux
---

In this post we are going to see how to use [LXC (Linux Containers)](https://linuxcontainers.org/) to run GUI applications within a container. The example shows how to run [**`Firefox`**](https://www.mozilla.org/en-US/firefox/) with X11 and GPU-accelerated.

&nbsp;

Getting Started
--

##### Clone the following github repo:
```
git clone https://github.com/sayems/lxc.resources.git
```

&nbsp;


##### Launch GUI container in LXD

Navigate to ```lxc.resources``` directory and then run the following command:

```bash
$ ansible-playbook ubuntu.yml
```
Now, wait for LXD container to be ready. This might take a while to complete.


&nbsp;


#### Login to ```ubuntu``` container
You can now login to the **```ubuntu```** container by running the following command:
```
$ lxc exec ubuntu -- sudo --user ubuntu --login 
```

You can run ```glxgears``` to verify graphics hardware acceleration is working. 
```
glxgears
```

&nbsp;


### Launch apps from LXD container

If you want to run ```Firefox``` from the container, run the following command:
```
$ lxc exec ubuntu -- sudo --login --user ubuntu firefox
```

&nbsp;
