---
layout: post
title:  "Javascript Hoisting 变量提升"
date:   2016-10-18
categories: 技术
tags: javascript 前端开发

---

函数和变量的声明总是会被解析器悄悄地被“提升”到方法体的最顶部

上面是javascript变量提升的概念。为了更好地理解“变量提升”，我们先来看一段代码：

{% highlight javascript %}

(function (){
    console.log(foo);
    var foo = "Javascript";
})();

{% endhighlight %}

控制台输出：undefined 为什么输出了undefined，而没有报错呢？

原来javascript是函数作用域，解析器会在函数开头处自动去声明局部变量，局部变量都会被放在函数的入口处定义，所以上面的代码实际会被解释成：

{% highlight javascript %}

(function (){
 	var foo;
    console.log(foo);
    foo = "Javascript";
})();

{% endhighlight %}

另外，需要注意Javascript中函数的两种声明方式存在的坑：

* function fn(){} //函数声明式
* var fn = function(){}; //函数表达式

对于函数声明式，解析器会确保在所有代码执行之前声明已经被解析。而对于函数表达式，与定义其它基本类型变量一样，逐句执行并解析。

我们再来举个栗子：

{% highlight javascript %}

/* 函数声明式 */
(function(){
	fn();
	function fn() {
		console.log('来自函数声明式fn');
	}
})();

/* 函数表达式 */
(function(){
	fn();
	var fn = function() {
		console.log('来自函数表达式fn');
	}
})();

{% endhighlight %}

控制台依次输出：

	来自函数声明式fn
	fn is not a function

可以看到，当使用函数声明的形式来定义函数时，可将调用语句写在函数声明之前，而后者，则会报错。

所以在Javascript中，变量的声明会被提升，而变量的赋值则不会。而函数的声明与变量的声明是不一样的，函数的函数体也会被一起提升，但请使用函数声明的形式才能提升。