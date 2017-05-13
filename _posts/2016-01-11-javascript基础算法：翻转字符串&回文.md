---
layout: post
title:  "javascript基础算法：翻转字符串&回文"
date:   2016-01-11
categories: 技术
tags: javascript 前端开发
---

这几天在[FCC](https://www.freecodecamp.cn)上做题，到了基础算法这一章节，让我对js内置对象方法的掌握还有思维逻辑都得到了提升，借此机会来写一写学习心得和总结。

### 翻转字符串
翻转字符串(Reverse a String)，就是把字符串倒序处理的意思，比如给定一个字符串"hello"，翻转后应该返回"olleh"。

#### 测试用例
- ```reverseString("hello")``` 应该返回 "olleh"
- ```reverseString("Greetings from Earth")``` 应该返回 "htraE morf sgniteerG"

#### 实现思路
这里说最方便的方法就是将字符串转成数组，再颠倒数组并转成字符串返回。需要用到字符串对象和数组对象的内置方法：

- String.split()
- Array.reverse()
- Array.join()

具体可以去看w3school的[JavaScript参考手册](http://www.w3school.com.cn/jsref/index.asp)

{% highlight javascript %}

function reverseString(str) {
  return str.split('').reverse().join('');
}

reverseString("hello");

{% endhighlight %}

一句return搞定，很简单有木有？！

在此基础上来看看回文是怎么玩的⬇️
### 回文

“Madam,I'mAdam.” 这是亚当在伊甸园里碰上夏娃说的第一句话，这句话正着读和反着读一模一样，这样的句子就是回文，英文里叫Palindrome。

举个栗子——“上海自来水来自海上”，这句话顺着读和反着读都是相同的，还有很多英语单词也是：Level、Madam、Radar、LOL(哈哈哈)...

#### 测试用例
- ```palindrome("Race Car")``` 应该返回 ```true```
- ```palindrome("not a palindrome")``` 应该返回 ```false```
- ```palindrome("0_0 (: /-\ :) 0-0")``` 应该返回 ```true```

#### 实现思路

我们需要写一个叫palindrome()的方法，传入一个叫str的参数，如果str是一个Palindromes将返回```true```，反之为```false```。

需要注意将标点符号和空格去掉并toUpperCase or toLowerCase后再进行判断。

需要用到以下知识点：

- [正则表达式](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions) (regular expression)，用来过滤符号和空格
- String.replace() 替换与正则表达式匹配的子串
- String.toLowerCase() 把字符串转换为小写

##### 关于正则表达式
这里要求匹配大小写英文字母和整数，任何标点符合和空格将被过滤掉。所以可以使用 ```/[^A-Za-z0–9]/g``` 或者 ```/[\W_]/g```

- ```[^A-Z]``` 匹配非26个大写字母中的任意一个
- ```[^a-z]``` 匹配非26个小写字母中的任意一个
- ```[^0-9]``` 匹配非0到9中的任意一个数字
- ```[^_]``` 匹配非下划线
- ```^``` 匹配字符串的开始

- ```\w``` 注意是小写，匹配字母或数字或下划线或汉字
- ```\W``` 注意是大写，匹配任意不是字母、数字、下划线、汉字的字符，等价于[^A-Za-z0-9_]
- ```g``` 表示全局搜索

这是我的方法：
{% highlight javascript %}

function palindrome(str) {
  str = str.replace(/[\W_]/g,'').toLowerCase();
  var reverseStr = str.split('').reverse().join('');
  return str===reverseStr;
}

palindrome("eye");

{% endhighlight %}

我在网上看到还可以用For循环来实现：

{% highlight javascript %}

function palindrome (str) {
    var reg = /[\W_]/g,
    	regStr = str.toLowerCase().replace(reg, ''),
    	len = regStr.length;

    for (var i = 0, halfLen = len / 2; i < halfLen; i++){
        if (regStr[i] !== regStr[len - 1 - i]) {
            return false;
        }
    }
    return true;
}

{% endhighlight %}

这个思路很巧妙的运用了回文的特点，把整个字符串切成一半，循环遍历并依次判断首尾字符是否相等。

还有个运用了递归的实现：
{% highlight javascript %}

function palindrome (str) {
    // 删除字符串中不必要的字符
    var re = /[\W_]/g;
    // 将字符串变成小写字符
    var lowRegStr = str.toLowerCase().replace(re, '');
    // 如果字符串lowRegStr的length长度为0时，字符串即是palindrome
    if (lowRegStr.length === 0) {
        return true;
    }

    // 如果字符串的第一个和最后一个字符不相同，那么字符串就不是palindrome
    if (lowRegStr[0] !== lowRegStr[lowRegStr.length - 1]) {
        return false;
    } else {
        return palindrome(lowRegStr.slice(1, lowRegStr.length - 1));
    }
}

{% endhighlight %}

感觉另外两个实现思路比我屌多了，自己在编程的路上才走没多远，一步一步来吧。

对了，别纠结翻转字符串和回文的区别了！翻转字符串仅仅是将倒序后的字符串返回；而回文面对的则是更长更复杂的句子，需要将过滤掉空格和标点符号的句子和倒序后的句子比较是否相等。这是我这个笨蛋纠结了二十多分钟突然想通后的结论。ಥ_ಥ

![](http://liaokeyu.com/../assets/images/postImg/2016-11-03-zark.jpg)
