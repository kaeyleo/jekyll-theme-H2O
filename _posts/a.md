---
layout: post
title: MathJax Test
date: 2019-02-29
categories: test
tags: mathjax 
---


<h4>看到buf,应该是栈上的变量，可知偏移量：(0x88+4),之后再填返回地址，由于可填充的字节较长，且没有任何保护，加之ida中没看到system('/bin/sh'),所以用shellcode进行攻击，即在栈区填充shellcode的代码，之后再执行，所以需要执行代码的起始地址，即buf的首地址</h4>