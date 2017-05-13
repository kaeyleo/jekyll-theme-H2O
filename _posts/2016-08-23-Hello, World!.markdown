---
layout: post
title:  "Hello, Jekyll!"
date:   2016-08-23
categories: 随笔
tags: jekyll

---

使用Jekyll搭建了这个博客，无论是生活还是技术都将在此分享。

## Hello
> 少喝鸡汤，少yy，脚踏实地，务实做事。

上个博客用的worldpress，当初觉得有自己独立网站是个很酷的事情，便心血来潮买了虚拟主机和域名要大干一场，然后就没有然后了。

今年年初的时候定下目标立志要成为一名前端工程师，去W3School看了html及css的文档，在记录和总结学习心得的同时也爱上了Markdwon（简洁优雅好用），Mac下Markdwon编辑器我用的是[Mou](http://25.io/mou/)，而Worldpress对Markdwon支持不好且框架较为沉重，经过一番对博客框架的了解后投入了[Jekyll](http://jekyll.com.cn)的怀抱～ ʕ•ᴥ•ʔ

类似的还有 Octopress、Hexo...给几个参考：

- [用 Jekyll 和 Octopress 搭建博客，哪个更合适？](https://www.zhihu.com/question/- 19996679)
- [静态博客框架之Hexo & Jekyll](http://www.jianshu.com/p/ce1619874d34)

## Jekyll
> jekyll是一个简单的免费的Blog生成工具

Jekyll (/'dʒiːk əl/) 是一个简单的免费的静态站点生成器，它会根据网页源码生成静态文件。它提供了模板、变量、插件等功能，所以实际上可以用来编写整个网站。

先在本地使用Markdown（或 Textile）、Liquid、HTML & CSS编写网站源码，然后使用Jekyll命令自动生成静态文件，上传到服务器（或 github）就行了。

ps: 2012美国大选的奥巴马官网使用了Jekyll -> 戳：[奥巴马筹款网站的制作过程](http://www.ruanyifeng.com/blog/2012/12/obama_fundraising_website.html)

### 特点

- 静态轻量化，访问轻量、快速
- 支持Markdown
- 可在Github pages上部署博客

太适合前端了有木有？！

### 安装

网上有很多安装和配置教程，我在Mac环境下也踩了很多“坑”，并将整个过程记录了下来。另奉上
[Jekyll官方文档](http://jekyll.com.cn/docs/installation/)以供查阅。

#### 事先准备

由于Jekyll是ruby开发的，需要准备以下配置：

- [Ruby](http://www.ruby-lang.org/en/downloads/) 
- [RubyGems](http://rubygems.org/pages/download)
- Linux, Unix, or Mac OS X

安装前Ruby环境请参考：[如何在Mac OS X上安装 Ruby运行环境](http://www.cnblogs.com/daguo/p/4097263.html) (但注意淘宝镜像链接已经不维护了，替换方案请继续往下看⬇️)

#### 安装bundle
** 由于后期创建完Jekyll项目需要bundle来开启服务 **

在Stack Overflow找到了安装bundle的命令
use -n parameter to install like for bundle:
```
sudo gem install bundle -n /usr/local/bin
```

对了，有人肯定会疑惑gem,rvm,bundle的区别和关系，我搜索并整理了他们的关系。不用过于纠结，了解就好。

** 手动安装各种库用gem(rubygems)，rvm/rbenv是装各种版本ruby的，是个ruby版本管理器，bundle是rails框架里面安装Gemfile指定的各种库的工具。 **

#### 安装Jekyll

安装 Jekyll 的最好方式就是使用 RubyGems. 你只需要打开终端输入以下命令就可以安装了：
```
sudo gem install jekyll
```

按照官方在终端输入命令，显示错误：

```
ERROR:  While executing gem ... (Errno::EPERM)
    Operation not permitted - /usr/bin/jekyll
    
```
应该是系统权限问题，于是设置文件权限: ```sudo chmod go-w /usr/local/mysql/bin```

```
MacBook-Pro:~ liaokeyu$ sudo chmod go-w /usr/local/mysql/bin
MacBook-Pro:~ liaokeyu$ sudo gem install jekyll
ERROR:  While executing gem ... (Errno::EPERM)
    Operation not permitted - /usr/bin/jekyll
```

又冒出error提示文件路径系统不允许，于是直接指定安装路径: ``` sudo gem install -n /usr/local/bin/ jekyll```

```
MacBook-Pro:~ liaokeyu$ sudo gem install -n /usr/local/bin/ jekyll
Successfully installed jekyll-3.2.1
Parsing documentation for jekyll-3.2.1
Installing ri documentation for jekyll-3.2.1
WARNING:  Unable to pull data from 'http://ruby.taobao.org/': bad response Not Found 404 (http://ruby.taobao.org/specs.4.8.gz)
1 gem installed
```

系统权限和路径问题解决了，又来个WARNING!! 

![remove taobao](http://liaokeyu.com/../assets/images/postImg/2016-08-23-hehe.jpeg)


我抑制住心中准备奔腾的万只草泥马，喝了口咖啡。

仔细看提示，大概意思是'http://ruby.taobao.org/'地址无响应无法正常提供信息，赶紧百度一下得知之前配置的** 淘宝镜像链接已经不维护了 **，所以需要切换source源。遂选择ruby china提供的RubyGems镜像 https://gems.ruby-china.org 参考: [《Ruby China 的 RubyGems 镜像上线》 ](https://ruby-china.org/topics/29250) 

先把之前淘宝失效的remove掉 

![remove taobao](http://liaokeyu.com/../assets/images/postImg/2016-08-23-removetaobao.jpg)

然后添加ruby china

![add ruby-china](http://liaokeyu.com/../assets/images/postImg/2016-08-23-addrubychina.jpg)

试了几次，访问较慢，等了近1分钟才显示成功添加，接下来启动安装jekyll命令

![jekyll installed](http://liaokeyu.com/../assets/images/postImg/2016-08-23-jekyllinstalled.jpg)


此处应有掌声～～


### 使用
接下来cd到自定的目录中使用new创建Jekyll项目   

```
$ jekyll new test
$ cd test
~/test $ bundle install
```

开启服务

```
~/test $ bundle exec jekyll serve
```

最后，打开浏览器访问http://localhost:4000就OK了

### 模板

可以用html/css/js来写一套模板，还可以去[jekyll themes](http://jekyllthemes.org/)和[html5up](https://html5up.net)下载喜欢的模板。


