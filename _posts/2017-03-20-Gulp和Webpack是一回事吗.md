---
layout: post
title:  "Gulp和Webpack是一回事吗Gulp和Webpack是一回事吗"
date:   2017-03-20
categories: 技术
tags: 前端开发 gulp webpack

---

在我刚接触前端开发的时候，已经开始流行各种构建工具了；而当我上手gulp以后，webpack又大行其道了。所以，对前端工程化了解不多的我，有了“What’s the difference between using Gulp and Webpack?”的迷思(˶‾᷄ ⁻̫ ‾᷅˵)。

### Gulp和Webpack是什么

首先可以从gulp和webpack的官网找到对它们的描述：

gulp
> 用**自动化构建工具**增强你的工作流程

Webpack
> Webpack是当下最热门的**前端资源模块化管理和打包工具**

它们都属于前端构建工具，但gulp是任务管理工具（task runner），webpack是模块化打包工具（module bundler）。


### 任务管理工具

任务管理工具中我们可以声明若干任务，比如合并、压缩、测试等等。任务间可互相依赖，可以是同步，也可以是异步的。然后我们可以自由地选择运行哪个任务，任务管理工具会帮我们运行它（以及它的依赖）。

使用gulp可以配置各种插件来做css或js文件的合并压缩、编译sass或less、添加兼容性前缀（-webkit-, -moz- ...）、自动刷新浏览器等等，它能替代手工实现自动化工作、优化前端工作流程。

### 模块化打包工具

javascript本身并不支持模块化，但对于浏览器中的js和服务端的nodejs，它们运行环境是不同的，并且各自遵循某种规范，那么该如何实现js的模块化呢？

目前有两种主流方案：

1. 在线编译模块化
	
	如seajs和requirejs模块框架，相当于在页面上加载一个CMD/AMD解释器，这样浏览器就认识了define、exports、module这些东西，也就实现了模块化。

2. 预编译模块化

	webpack和browserify它们是一个**预编译模块**的方案，它们遵循了不需要在浏览器中加载解释器。在本地直接写js，不管是AMD/CMD/ES6风格的模块化，它都能识别并编译成浏览器认识的js。
	

Webpack具有grunt、gulp对于静态资源自动化构建的能力，但更重要的是，webpack弥补了requirejs在模块化方面的缺陷，同时兼容AMD与CMD的模块加载规范，具有更强大的js模块化的功能。

> webpack is a module bundler. webpack takes modules with dependencies and generates static assets representing those modules.

对了，你完全可以gulp搭配webpack来使用，gulp相对来说更灵活，可以做更多的定制化任务，而webpack在模块化方面也很优秀。

### 总结

一图解千愁～

![](http://on2171g4d.bkt.clouddn.com/fetoolsabc.jpg)

前端工程化还有太多需要去了解和学习的知识了，本文只是我对其中一个问题而整理的解答。

> - webpack+gulp使用可以参考[webpack with gulp](http://webpack.github.io/docs/usage-with-gulp.html)

> - 关于模块化的好文：[JavaScript模块化七日谈](http://huangxuan.me/2015/07/09/js-module-7day/)、[Writing Modular JavaScript With AMD, CommonJS & ES Harmony](https://addyosmani.com/writing-modular-js/)、[前端工程之模块化](http://fex.baidu.com/blog/2014/03/fis-module/)


