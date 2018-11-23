---
layout: post
title:  "Gulp和Webpack是一回事吗"
date:   2017-03-20
categories: 技术
tags: 前端开发 gulp webpack

---

在我刚接触前端开发的时候，已经开始流行各种构建工具了；而当我上手gulp以后，webpack又大行其道了。所以，对前端工程化了解不多的我，有了“What’s the difference between using Gulp and Webpack?”的迷思(˶‾᷄ ⁻̫ ‾᷅˵)。

## Gulp和Webpack是什么

首先可以从gulp和webpack的官网找到对它们的描述：

gulp: 用**自动化构建工具**增强你的工作流程

Webpack: 当下最热门的**前端资源模块化管理和打包工具**

它们都属于前端构建工具，但gulp是任务管理工具（task runner），webpack是模块化打包工具（module bundler）。

## 任务管理工具

任务管理工具中我们可以声明若干任务，比如合并、压缩、测试等等。任务间可互相依赖，可以是同步，也可以是异步的。然后我们可以自由地选择运行哪个任务，任务管理工具会帮我们运行它（以及它的依赖）。

使用gulp可以配置各种插件来做css或js文件的合并压缩、编译sass或less、添加兼容性前缀（-webkit-, -moz- ...）、自动刷新浏览器等等，它能替代手工实现自动化工作、优化前端工作流程。

## 模块化打包工具

javascript本身并不支持模块化，但对于浏览器中的js和服务端的nodejs，它们运行环境是不同的，并且各自遵循某种规范，那么该如何实现js的模块化呢？

目前有两种主流方案：

1. 在线编译模块化
	
	如seajs和requirejs模块框架，相当于在页面上加载一个CMD/AMD解释器，这样浏览器就认识了define、exports、module这些东西，也就实现了模块化。

2. 预编译模块化

	webpack和browserify它们是一个**预编译模块**的方案，它们遵循了不需要在浏览器中加载解释器。在本地直接写js，不管是AMD/CMD/ES6风格的模块化，它都能识别并编译成浏览器认识的js。

最初Webpack就是为前端js代码打包而设计的，后来被扩展到其他资源（图片、css文件等）的打包处理。Webpack具有grunt、gulp对于静态资源自动化构建的能力，更重要的是，webpack弥补了requirejs在模块化方面的缺陷，同时兼容AMD与CMD的模块加载规范，具有更强大的js模块化的功能。

![](http://on2171g4d.bkt.clouddn.com/fetoolsabc.jpg)

> webpack is a module bundler. webpack takes modules with dependencies and generates static assets representing those modules.

对了，你完全可以gulp搭配webpack来使用，gulp相对来说更灵活，可以做更多的定制化任务，而Webpack更侧重于模块打包。

## 整合Gulp&Webpack

可以在Gulp中使用webpack-stream，首先需要安装一下需要的模块：

``` npm install gulp webpack-stream vinyl-named --save-dev ```

然后在 `gulpfile.js` 中进行配置：


```javascript
var gulp = require('gulp');
var webpack = require('webpack-stream');
var named = require('vinyl-named');
var webpackConfig = require("./webpack.config.js");

gulp.task('webpack', function() {
  return gulp.src('./src/app.js')
    .pipe(named())
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('./dist/'));
});
```

使用 `vinyl-named` 保持输入和输出的文件名一致, 否则文件名会由webpack打包后自动生成一个hash。

不过这个方案貌似有弊端：

> 使用webpack-stream虽然可以很方便的将webpack整合到gulp中，但是有致命的问题存在：如果关闭webpack的监听模式，那么每次文件变动就会全量编译JS/CSS文件，非常耗时。
如果打开webpack的监听模式，那么会阻塞其他gulp任务，导致其他gulp任务的监听失效。
所以这种方案几乎不可用！——[《gulp & webpack整合，鱼与熊掌我都要！》](http://www.jianshu.com/p/9724c47b406c)

所以还是建议用webpack原生方案。

## 总结

现在的前端开发领域融合了很多后端工程化的思想，很多产品从网页进化成了Web app，它通常是一个单页应用(SPA)，每个页面都通过异步的方式加载，这就会导致大量的代码存在于 `client side` ，并且前端开发是多语言、多层次的开发工作，各种资源以增量更新的方式加载到浏览器，为了更好的组织这些代码和资源，并且保证它们在浏览器端快速、优雅的加载和更新，便出现了任务管理工具和模块化打包工具。

从此刀耕火种的日子一去不复返了，前端开发正式进入工业化时代！！顿时，心中吹响了新时代的号角，我的脸上洋溢着三胖般的笑容。



