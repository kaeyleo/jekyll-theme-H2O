---
layout: post
title:  "【译】CSS五种方式实现Footer置底"
date:   2017-01-06
categories: 技术
tags: css 前端开发

---

页脚置底（Sticky footer）就是让网页的footer部分始终在浏览器窗口的底部。

当网页内容足够长以至超出浏览器可视高度时，页脚会随着内容被推到网页底部；但如果网页内容不够长，置底的页脚就会保持在浏览器窗口底部。

![sticky-footer-1.png](https://ooo.0o0.ooo/2017/02/14/58a2c2620e8e8.png)

### 实现方法

#### 1. 将内容部分的底部外边距设为负数
这是个比较主流的用法，把内容部分最小高度设为100%，再利用内容部分的负底部外边距值来达到当高度不满时，页脚保持在窗口底部，当高度超出则随之推出的效果。

{% highlight html %}
  
<body>
  <div class="wrapper">
  
      content
      
    <div class="push"></div>
  </div>
  <footer class="footer"></footer>
</body>

{% endhighlight %}

{% highlight css %}

html, body {
  height: 100%;
  margin: 0;
}
.wrapper {
  min-height: 100%;

  /* 等于footer的高度 */
  margin-bottom: -50px;
}
.footer,
.push {
  height: 50px;
}

{% endhighlight %}

<p data-height="265" data-theme-id="0" data-slug-hash="VjZmGj" data-default-tab="js,result" data-user="chriscoyier" data-embed-version="2" data-pen-title="Sticky Footer with Negative Margin 1" class="codepen">See the Pen <a href="http://codepen.io/chriscoyier/pen/VjZmGj/">Sticky Footer with Negative Margin 1</a> by Chris Coyier  (<a href="http://codepen.io/chriscoyier">@chriscoyier</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

这个方法需要容器里有额外的占位元素（如```.push```）

需要注意的是```.wrapper```的margin-bottom值需要和```.footer```的负的height值保持一致，这一点不太友好。

#### 2. 将页脚的顶部外边距设为负数
既然能在容器上使用负的margin bottom，那能否使用负margin top吗？当然可以。

给内容外增加父元素，并让内容部分的底部内边距与页脚高度的值**相等**。

{% highlight html %}

<body>
  <div class="content">
    <div class="content-inside">
      content
    </div>
  </div>
  <footer class="footer"></footer>
</body>

{% endhighlight %}

{% highlight css %}

html, body {
  height: 100%;
  margin: 0;
}
.content {
  min-height: 100%;
}
.content-inside {
  padding: 20px;
  padding-bottom: 50px;
}
.footer {
  height: 50px;
  margin-top: -50px;
}

{% endhighlight %}

<p data-height="265" data-theme-id="0" data-slug-hash="aZoBMb" data-default-tab="js,result" data-user="chriscoyier" data-embed-version="2" data-pen-title="Sticky Footer with Negative Margins 2" class="codepen">See the Pen <a href="http://codepen.io/chriscoyier/pen/aZoBMb/">Sticky Footer with Negative Margins 2</a> by Chris Coyier  (<a href="http://codepen.io/chriscoyier">@chriscoyier</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

不过这种方法和上一种一样，都需要额外添加不必要的html元素。

#### 3. 使用calc()设置内容高度

有一种方法不需要任何多余元素——使用CSS3新增的计算函数calc()

这样元素间就不会有重叠发生，也不需要控制内外边距了～

{% highlight html %}

<body>
  <div class="content">
    content
  </div>
  <footer class="footer"></footer>
</body>

{% endhighlight %}

{% highlight css %}

.content {
  min-height: calc(100vh - 70px);
}
.footer {
  height: 50px;
}

{% endhighlight %}

<p data-height="265" data-theme-id="0" data-slug-hash="jqRXBz" data-default-tab="js,result" data-user="chriscoyier" data-embed-version="2" data-pen-title="Sticky Footer with calc();" class="codepen">See the Pen <a href="http://codepen.io/chriscoyier/pen/jqRXBz/">Sticky Footer with calc();</a> by Chris Coyier  (<a href="http://codepen.io/chriscoyier">@chriscoyier</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

可能你会疑惑内容高度calc()中为什么减去70px，而不是footer的高度50px，因为假设俩元素有20px的间距，所以70px=50px+20px 

不过，你不必在意这些~

#### 4. 使用flexbox弹性盒布局

以上三种方法的footer高度都是固定的，通常来说这不利于网页布局：内容会改变，它们都是弹性的，一旦内容超出固定高度就会破坏布局。所以给footer使用flexbox吧，让它的高度可以变大变小变漂亮~（≧∇≦）

{% highlight html %}

<body>
  <div class="content">
    content
  </div>
  <footer class="footer"></footer>
</body>

{% endhighlight %}

{% highlight css %}

html {
  height: 100%;
}
body {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
}

{% endhighlight %}

<p data-height="265" data-theme-id="0" data-slug-hash="RRbKrL" data-default-tab="js,result" data-user="chriscoyier" data-embed-version="2" data-pen-title="Sticky Footer with Flexbox" class="codepen">See the Pen <a href="http://codepen.io/chriscoyier/pen/RRbKrL/">Sticky Footer with Flexbox</a> by Chris Coyier  (<a href="http://codepen.io/chriscoyier">@chriscoyier</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

你还可以在上面添加header或在下面添加更多元素。可从以下技巧选择其一：

- ```flex: 1``` 使内容（如：```.content```）高度可以自由伸缩
- ```margin-top: auto``` 

请记住，我们有[《Flexbox完整指南（英）》](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)呢～

#### 5. 使用Grid网格布局

grid比flexbox还要新很多，并且更佳很简洁，我们同样有[《Grid完整指南（英）》](https://css-tricks.com/snippets/css/complete-guide-grid/)奉上～

{% highlight html %}

<body>
  <div class="content">
    content
  </div>
  <footer class="footer"></footer>
</body>

{% endhighlight %}

{% highlight css %}

html {
  height: 100%;
}
body {
  min-height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
}
.footer {
  grid-row-start: 2;
  grid-row-end: 3;
}

{% endhighlight %}

<p data-height="265" data-theme-id="0" data-slug-hash="YWKNrE" data-default-tab="js,result" data-user="chriscoyier" data-embed-version="2" data-pen-title="Sticky Footer with Grid" class="codepen">See the Pen <a href="http://codepen.io/chriscoyier/pen/YWKNrE/">Sticky Footer with Grid</a> by Chris Coyier  (<a href="http://codepen.io/chriscoyier">@chriscoyier</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

遗憾的是，网格布局（Grid layout）目前仅支持Chrome Canary和Firefox Developer Edition版本。

### 总结

其实页脚置底的布局随处可见，很多人也和我一样觉得比较简单，但可能只知其然罢了，偶然看到[CSS-TRICKS](https://css-tricks.com)上介绍页脚置底的文章觉得不错，遂译之。

这是我的处女译文，不足之处请多指教。

> - 原文链接：[Sticky Footer, Five Ways](https://css-tricks.com/couple-takes-sticky-footer/)
- 原文作者：[Chris Coyier](https://twitter.com/chriscoyier)
- 译者：[廖柯宇](http://liaokeyu.com/)

