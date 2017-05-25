---
layout: post
title: 'H2O theme for Jekyll'
subtitle: '或许是最漂亮的Jekyll主题'
date: 2017-04-18
categories: 技术
cover: 'http://on2171g4d.bkt.clouddn.com/jekyll-theme-h2o-postcover.jpg'
tags: jekyll 前端开发 设计
---

正如我在[微博](http://weibo.com/1374146504/profile?topnav=1&wvr=6)上所说的，使用[Jekyll](http://jekyll.com.cn/)半年以来一直没有令我满意的主题模板，所以开始计划自己写一套好看又好用的主题模板。设计之初就明确了极简主义，风格采用扁平化了，通过卡片式设计来进行区块分明的布局，参考了Medium的ui样式和知乎专栏的视觉风格。

## H2O

[源码及使用文档 →](https://github.com/kaeyleo/jekyll-theme-H2O)

![](http://on2171g4d.bkt.clouddn.com/jekyll-theme-h2o-realhome.jpg)

新主题名叫"H2O"，基于Jekyll 3.0.x（使用```gem update jekyll```升级Jekyll），Markdown的代码高亮不再支持pygments转而使用rouge，咱已经默认配置了 ```highlighter: rouge``` 。用到的技术栈也很简单：引入jQuery类库，使用Sass编写样式，使用Gulp来编译Sass、合并压缩css、js，开源在[Github](https://github.com/kaeyleo/jekyll-theme-H2O)上，稍作配置即可用于你的Jekyll博客上。

![Design with Sketch](http://on2171g4d.bkt.clouddn.com/jekyll-theme-h2o-sketchdesign.png)

使用Sketch完成H2O主题的原型设计

![My Jekyll themes](http://on2171g4d.bkt.clouddn.com/jekyll-theme-vs.jpg)

比之前漂亮不少吧，下面聊聊H2O的新特性。

## 新特性

### 主题配色

支持两种主题配色——蓝色和粉色。

![](https://github.com/kaeyleo/jekyll-theme-H2O/blob/master/assets/img/jekyll-theme-h2o-themecolor.jpg?raw=true)

### 侧边栏

相比自己上一个版本的博客主题，首页增加了侧边栏，方便展示博主的个人信息和文章标签。

### 社交图标

使用阿里的图标管理平台[Iconfont](http://iconfont.cn/)整理了一套<strike>墙内外</strike>常用的社交图标，包括微博、知乎、掘金、简书、Github等十多个网站，鼠标悬停会显示该站的主题色。

![social iconfont](http://on2171g4d.bkt.clouddn.com/jekyll-theme-h2o-snstext.jpg)

### 前后文导航

![Next post navigator](http://on2171g4d.bkt.clouddn.com/jekyll-theme-h2o-nextpostnav.png)

### 自定义文章封面

在Markdown的[文章头信息](http://jekyll.com.cn/docs/frontmatter/)里添加cover参数来配置文章的封面图片，如果没有配置封面，则默认【主题色+底纹】的组合作为文章封面。值得一提的是，H2O有两种（粉、蓝）主题色和六种底纹（电路板、食物、云海、钻石等等）供你选择。

### 头图个性化底纹

在没有图片的情况下单纯显示颜色会不会太无趣了点？于是想到了加入底纹元素，底纹素材是SVG格式的（保存在css样式里），加载比图片快很多。

![](http://on2171g4d.bkt.clouddn.com/jekyll-theme-h2o-headerpatterns.jpg)

### 代码高亮

模板引入了[Prism.js](http://prismjs.com)，一款轻量、可扩展的代码语法高亮库。

很多知名网站如[MDN](https://developer.mozilla.org/)、[css-tricks](https://css-tricks.com/)也在用它，JavaScript 之父 [Brendan Eich](https://brendaneich.com/) 也在个人博客上使用。

![代码高亮](http://on2171g4d.bkt.clouddn.com/jekyll-theme-h2o-highlight.png)

遵循 [HTML5](https://www.w3.org/TR/html5/grouping-content.html#the-pre-element) 标准，Prism 使用语义化的 `<pre>` 元素和 `<code>` 元素来标记代码区块：

```
<pre><code class="language-css">p { color: red }</code></pre>
```

在Markdown中你可以这样写：

```
 ```css
	p { color: red }
 ```
```

支持语言：

- HTML
- CSS
- Sass
- JavaScript
- CoffeeScript
- Java
- C-like
- Swift
- PHP
- Go
- Python

### 第三方评论

由于多说关闭，又对国内其他第三方评论插件无感，所以将[Disqus](https://disqus.com/)列为首选（目前模板也只提供了这个），请自备梯子。

### 移动端优化

响应式设计，对手机和平板等移动设备做了优化。

![](http://on2171g4d.bkt.clouddn.com/jekyll-theme-h2o-realm.png)

### 关于阅读体验

我认为在内容质量相同的情况下，出色的沉浸式阅读体验是博客的核心。

H2O在这方面还有很多需要完善的地方，比如：<strike>代码高亮</strike>、夜间模式、查看大图...

### 其他特性：

- 网页标题SEO优化
- 标签索引，点击标签跳转到标签目录，即可查看对应的全部文章
- 漂亮
- 好看
- 美

## 最后

本想趁这次机会将整站https化的，但折腾了半天发现弹性web托管并不支持，所以暂时搁置https的想法。另外，博客统计工具一直使用的是[百度统计](https://tongji.baidu.com)，这次新增了Google Analytics。

这次从0到1，独自设计、开发再到发布大约用了一周时间，也算完成一个小小的开源项目了，后续也将持续完善和更新，欢迎[Star](https://github.com/kaeyleo/jekyll-theme-H2O)。
