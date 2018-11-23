---
layout: post
title: '【小程序开发实践】王者图鉴'
date: 2017-09-02
categories: 技术
cover: 'http://on2171g4d.bkt.clouddn.com/2017-09-02-cover.png'
tags: 前端开发 小程序
---

灵感源于今年很火的手游——王者荣耀，偶尔用手机上网查找游戏数据并不是很方便，于是有了开发“王者图鉴”小程序的想法。从官网爬取数据，将英雄、装备、铭文等信息整合在微信小程序中，随时随地查询游戏信息。

项目一共9个页面，涉及列表展示、英雄详情、装备分类、铭文条件筛选等功能，后台使用了我之前写的 [王者荣耀官网爬虫](https://github.com/kaeyleo/king-of-glory-spider) 。

![王者图鉴截图](http://on2171g4d.bkt.clouddn.com/2017-09-02-screenshot.png)

微信扫一扫下方的小程序码，立即体验：

![小程序码](http://on2171g4d.bkt.clouddn.com/2017-09-02-qrcode.jpg)

简单来说说微信小程序的开发吧，有段时间在网上炒得沸沸扬扬，然后抽空看了看开发文档，卧槽，这不是Vue.js么？！看下面的示例就知道了。

小程序：

```javascript
Page({
	data: {
		list: []
	},
	onload: function () {
		this.setData({
			list: [1, 2, 3]
		})
	}
})
```

```html
<view wx:for="{{ list }}">{{ item }}</view>
```


Vue.js:

```javascript
new Vue({
	data: {
		list: []
	},
	mounted: function () {
		this.list = [1, 2, 3]
	}
})
```

```html
<view v-for="item in list">{{ item }}</view>
```

虽然api看起来都挺像，但还是有明显区别的：

- 小程序是单向数据绑定，不提供类似vue的v-model指令
- 数据绑定的表达式只支持在双大括号中，如果写成 `wx:for="item in list"` 就会报错
- 操作数据对象需要调用setData方法触发更新，而不是vue那样直接赋
- 绑定事件需要模板指令声明是否冒泡

小程序有两个线程，分别对应View(视图)和AppService(逻辑)两个独立模块。View用来渲染模板、样式，AppService则用来处理业务逻辑、数据请求、API调用等。感兴趣的同学可以参考：[《微信小程序架构解析》](https://zhuanlan.zhihu.com/p/25105936?utm_medium=social&utm_source=weibo)。另外，[小黄人外卖团队](https://juejin.im/user/58a65eafac502e006cc07db2)的小程序文章也不错。

![小程序框架](http://on2171g4d.bkt.clouddn.com/2017-09-02-mina-framework.png)

说回「王者图鉴」，这是我的第一个小程序，对于有经验的前端，跟着官方文档一天就能上手了。相比编码，完成整个产品的原型UI设计对我而言是一个挑战，排版、配色、交互，十多天时间参考了很多产品，也对设计有了更深层次的认识，最终落地的效果我还是比较满意的。



目前上线近一个月，用户量已经突破5k了，很惊喜。虽然我已经不再玩农药了，希望「王者图鉴」能对还在玩王者荣耀的你有帮助吧。
