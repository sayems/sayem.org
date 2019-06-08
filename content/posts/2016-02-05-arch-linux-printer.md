---
date: 2016-02-05
title: "Setup printer in Arch Linux"
template: post
thumbnail: ../thumbnails/writing.png
categories:
  - Linux

tags:
  - Linux
---

Recently I wrote a guide on [how to setup Arch Linux][1] on your PC. Today I am going to show you how to setup printer in Arch Linux.

In order to get printing working in Arch Linux, you have to install the following libraries:

```bash

$ yaourt -S libcups
$ pacman -S cups cups-filters ghostscript gsfonts

```

Now, Install printer driver

I have a Brother HL-2270DW series. So, I am going to install Brother HL-2270DW driver. You can search for printer driver in [Aur Package][2]

```bash

$ yaourt -S brother-hl2270dw

```


Enable cups so it starts with system boot

```bash

$ systemctl enable org.cups.cupsd.service
$ systemctl daemon-reload

```

Start CUPS

```bash

$ systemctl start org.cups.cupsd.service

```

Open the CUPS interface from this URL (http://localhost:631/admin) and log in as root. Here you can add and configure your printer.


[1]: https://github.com/sayems/arch.linux.tutorial
[2]: https://aur.archlinux.org/packages/

