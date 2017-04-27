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

### H2O

![New Theme -- H2O](http://on2171g4d.bkt.clouddn.com/jekyll-theme-h2o-ad.png)

新主题名叫"H2O"，基于Jekyll 3.0.x（使用```gem update jekyll```升级Jekyll），Markdown的代码高亮不再支持pygments转而使用rouge，咱已经默认配置了 ```highlighter: rouge``` 。用到的技术栈也很简单：引入jQuery类库，使用Sass编写样式，使用Gulp来编译Sass、合并压缩css、js，开源在[Github](https://github.com/kaeyleo/jekyll-theme-H2O)上，稍作配置即可用于你的Jekyll博客上。

![Design with Sketch](http://on2171g4d.bkt.clouddn.com/jekyll-theme-h2o-sketchdesign.png)

使用Sketch完成H2O主题的原型设计

![My Jekyll themes](http://on2171g4d.bkt.clouddn.com/jekyll-theme-vs.jpg)

比之前漂亮不少吧，下面聊聊H2O的新特性。

### 新特性

#### 侧边栏

相比自己上一个版本的博客主题，首页增加侧边栏，可以展示博主简介和推荐标签（默认12个，可以在 ```_config.yml``` 文件里的 ```recommend-condition-size``` 处修改显示标签的最大个数）。

#### 社交图标

使用阿里的图标管理平台[Iconfont](http://iconfont.cn/)整理了一套<strike>墙内外</strike>常用的社交图标，包括微博、知乎、掘金、简书、Github等十二个网站，在 ```_config.yml``` 文件的 ```sns``` 处根据注释来选择配置。

![social iconfont](http://on2171g4d.bkt.clouddn.com/jekyll-theme-h2o-snstext.jpg)

#### 前后文导航

![Next post navigator](http://on2171g4d.bkt.clouddn.com/jekyll-theme-h2o-nextpostnav.png)

#### 自定义文章封面

在Markdown的[文章头信息](http://jekyll.com.cn/docs/frontmatter/)里添加cover参数来配置文章的封面图片，如果没有配置封面，则默认【主题色+底纹】的组合作为文章封面。值得一提的是，H2O有两种（粉、蓝）主题色和六种底纹（电路板、食物、云海、钻石等等）供你选择。

#### 头图个性化底纹

在没有图片的情况下单纯显示颜色会不会太无趣了点？于是想到了加入底纹元素，底纹素材是SVG格式的（保存在css样式里），加载比图片快很多。

请在 ```config.yml``` 里 ```postPatterns``` 处根据注释所提示的参数选择配置。

![](http://on2171g4d.bkt.clouddn.com/jekyll-theme-h2o-headerpatterns.jpg)

#### 移动端优化

对手机和平板等移动设备做了像素级优化，首页文章列表更加紧凑，文章页面根据设备分辨率对字体大小、间距和行高做了相应调整。

![h2o theme responsive design](http://on2171g4d.bkt.clouddn.com/jekyll-theme-h2o-mpage.png)

#### 关于阅读体验

我认为在内容质量相同的情况下，出色的沉浸式阅读体验是博客的核心。

H2O在这方面还有很多需要完善的地方，比如：代码高亮、夜间模式、可调整字体大小、查看图片、批注...

#### 关于评论功能

我的博客主要分享技术类和生活类的内容，目前我的技术水平有限，文章质量也不算高，所以评论功能也没什么交流的意义，我会不定期在[掘金](https://juejin.im/user/57a6f434165abd006159b4cc)分享一些自认为不错的文章，可以去那里给我留言。

如果你打算使用H2O主题，自己搞不定Jekyll扩展评论功能的话，可以私信[我微博](http://weibo.com/1374146504/profile?topnav=1&wvr=6)，或者上[Github提issue](https://github.com/kaeyleo/jekyll-theme-H2O/issues/new)。

#### 其他特性：

- 增加了网页标题SEO优化

- 支持两种主题颜色蓝色（默认）和粉色，可以在 ```_config.yml``` 文件里的 ```theme-color``` 处根据注释选择配置。主要效果体现在顶部导航栏的logo和鼠标悬停时文字显示的颜色效果。

- 文章列表增加封面展示

- 标签索引，点击标签跳转到标签目录，即可查看对应的全部文章

### 最后

本想趁这次机会将整站https化的，但折腾了半天发现弹性web托管并不支持，所以暂时搁置https的想法。H2O主题从0到1，独自设计、开发再到发布大约用了一周时间，也算完成一个小小的开源项目了，后续也将持续完善和更新，拜了个拜～
