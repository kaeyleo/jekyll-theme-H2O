---
layout: post
title: '浅析前端开发中的 MVC/MVP/MVVM 模式'
date: 2017-06-01
categories: 技术
cover: 'http://on2171g4d.bkt.clouddn.com/2017-06-01-js-architectural-patterns-cover.png'
tags: 前端开发
---

MVC，MVP和MVVM都是常见的软件架构设计模式（Architectural Pattern），它通过分离关注点来改进代码的组织方式。不同于设计模式（Design Pattern），只是为了解决一类问题而总结出的抽象方法，一种架构模式往往使用了多种设计模式。

要了解MVC、MVP和MVVM，就要知道它们的相同点和不同点。不同部分是C(Controller)、P(Presenter)、VM(View-Model)，而相同的部分则是MV(Model-View)。

## Model&View

这里有一个可以对数值进行加减操作的组件：上面显示数值，两个按钮可以对数值进行加减操作，操作后的数值会更新显示。

![Example](http://on2171g4d.bkt.clouddn.com/2017-06-01-js-architectural-pattern-example.png)

我们将依照这个“栗子”，尝试用JavaScript实现简单的具有MVC/MVP/MVVM模式的Web应用。

### Model

Model层用于封装和应用程序的业务逻辑相关的数据以及对数据的处理方法。这里我们把需要用到的数值变量封装在Model中，并定义了add、sub、getVal三种操作数值方法。

```javascript
var myapp = {}; // 创建这个应用对象

myapp.Model = function() {
	var val = 0; // 需要操作的数据
	
	/* 操作数据的方法 */
	this.add = function(v) {
		if (val < 100) val += v;
	};
	
	this.sub = function(v) {
		if (val > 0) val -= v;
	};
	
	this.getVal = function() {
		return val;
	};
};
```

### View

View作为视图层，主要负责数据的展示。

```javascript
myapp.View = function() {

	/* 视图元素 */
	var $num = $('#num'),
	    $incBtn = $('#increase'),
	    $decBtn = $('#decrease');

	/* 渲染数据 */
	this.render = function(model) {
	    $num.text(model.getVal() + 'rmb');
	};
};
```

现在通过Model&View完成了数据从模型层到视图层的逻辑。但对于一个应用程序，这远远是不够的，我们还需要响应用户的操作、同步更新View和Model。于是，在MVC中引入了控制器controller，让它来定义用户界面对用户输入的响应方式，它连接模型和视图，用于控制应用程序的流程，处理用户的行为和数据上的改变。

## MVC

> 那时计算机世界天地混沌，浑然一体，然后出现了一个创世者，将现实世界抽象出模型形成model，将人机交互从应用逻辑中分离形成view，然后就有了空气、水、鸡啊、蛋什么的。
> ——《前端MVC变形记》

上个世纪70年代，[美国施乐帕克研究中心](http://baike.baidu.com/link?url=ux_43rkE1Ythy0RI6WZIB6NZpSbJYxOSzVk1W7LItMteveUBPdAgoegLc2j8zA8XRqZPS0tTwMAKtAXhZ9jTClBFGzj4GV2zstDqWP7kFC3)，就是那个发明图形用户界面(GUI)的公司，开发了[Smalltalk](http://baike.baidu.com/item/Smalltalk/1379989)编程语言，并开始用它编写图形界面的应用程序。

到了Smalltalk-80这个版本的时候，一位叫Trygve Reenskaug的工程师为Smalltalk设计了MVC（Model-View-Controller）这种架构模式，极大地降低了GUI应用程序的管理难度，而后被大量用于构建桌面和服务器端应用程序。

![MVC](http://on2171g4d.bkt.clouddn.com/2017-06-01-mvc.png)

如图，实线代表方法调用，虚线代表事件通知。

MVC允许在不改变视图的情况下改变视图对用户输入的响应方式，用户对View的操作交给了Controller处理，在Controller中响应View的事件调用Model的接口对数据进行操作，一旦Model发生变化便通知相关视图进行更新。

### Model

Model层用来存储业务的数据，一旦数据发生变化，模型将通知有关的视图。

```javascript
myapp.Model = function() {
	var val = 0;
	
	this.add = function(v) {
		if (val < 100) val += v;
	};
	
	this.sub = function(v) {
		if (val > 0) val -= v;
	};
	
	this.getVal = function() {
		return val;
	};
	
	／* 观察者模式 *／
	var self = this, 
	    views = [];
	
	this.register = function(view) {
		views.push(view);
	};
	
	this.notify = function() {
		for(var i = 0; i < views.length; i++) {
			views[i].render(self);
		}
	};
};
```

Model和View之间使用了观察者模式，View事先在此Model上注册，进而观察Model，以便更新在Model上发生改变的数据。

### View

view和controller之间使用了策略模式，这里View引入了Controller的实例来实现特定的响应策略，比如这个栗子中按钮的 `click` 事件：

```javascript
myapp.View = function(controller) {
	var $num = $('#num'),
	    $incBtn = $('#increase'),
	    $decBtn = $('#decrease');

	this.render = function(model) {
	    $num.text(model.getVal() + 'rmb');
	};
	
	/*  绑定事件  */
	$incBtn.click(controller.increase);
	$decBtn.click(controller.decrease);
};
```

如果要实现不同的响应的策略只要用不同的Controller实例替换即可。

### Controller

控制器是模型和视图之间的纽带，MVC将响应机制封装在controller对象中，当用户和你的应用产生交互时，控制器中的事件触发器就开始工作了。

```javascript
myapp.Controller = function() {
	var model = null,
	    view = null;
	    
	this.init = function() {
		/* 初始化Model和View */
		model = new myapp.Model();
		view = new myapp.View(this);
		
		/* View向Model注册，当Model更新就会去通知View啦 */
		model.register(view);
		model.notify();
	};
	
	/* 让Model更新数值并通知View更新视图 */
	this.increase = function() {
		model.add(1);
		model.notify();
	};
	
	this.decrease = function() {
		model.sub(1);
		model.notify();
	};
};
```

这里我们实例化View并向对应的Model实例注册，当Model发生变化时就去通知View做更新，这里用到了观察者模式。

当我们执行应用的时候，使用Controller做初始化：

```javascript
(function() {
	var controller = new myapp.Controller();
	controller.init();
})();
```

可以明显感觉到，MVC模式的业务逻辑主要集中在Controller，而前端的View其实已经具备了独立处理用户事件的能力，当每个事件都流经Controller时，这层会变得**十分臃肿**。而且MVC中View和Controller一般是一一对应的，捆绑起来表示一个组件，视图与控制器间的过于紧密的连接让Controller的复用性成了问题，如果想多个View共用一个Controller该怎么办呢？这里有一个解决方案：

![](http://on2171g4d.bkt.clouddn.com/js-architectural-patterns-mvp-1.png)

来把王者荣耀压压惊～其实我想说的是MVP模式...

## MVP

MVP（Model-View-Presenter）是MVC模式的改良，由IBM的子公司Taligent提出。和MVC的相同之处在于：Controller/Presenter负责业务逻辑，Model管理数据，View负责显示。

![MVP](http://on2171g4d.bkt.clouddn.com/2017-06-01-mvp.png)

虽然在MVC里，View是可以直接访问Model的，但MVP中的View并不能直接使用Model，而是通过为Presenter提供接口，让Presenter去更新Model，再通过观察者模式更新View。

与MVC相比，MVP模式通过解耦View和Model，完全分离视图和模型使职责划分更加清晰；由于View不依赖Model，可以将View抽离出来做成组件，它只需要提供一系列接口提供给上层操作。

### Model

```javascript
myapp.Model = function() {
	var val = 0;
	
	this.add = function(v) {
		if (val < 100) val += v;
	};
	
	this.sub = function(v) {
		if (val > 0) val -= v;
	};
	
	this.getVal = function() {
		return val;
	};
};
```

Model层依然是主要与业务相关的数据和对应处理数据的方法。

### View

```javascript
myapp.View = function() {
	var $num = $('#num'),
	    $incBtn = $('#increase'),
	    $decBtn = $('#decrease');

	this.render = function(model) {
	    $num.text(model.getVal() + 'rmb');
	};
	
	this.init = function() {
		var presenter = new myapp.Presenter(this);
		
		$incBtn.click(presenter.increase);
		$decBtn.click(presenter.decrease);
	};
};
```

MVP定义了Presenter和View之间的接口，用户对View的操作都转移到了Presenter。比如可以让View暴露setter接口让Presenter调用，待Presenter通知Model更新后，Presenter调用View提供的接口更新视图。

### Presenter

```javascript
myapp.Presenter = function(view) {
	var _model = new myapp.Model();
	var _view = view;
	
	_view.render(_model);
	
	this.increase = function() {
		_model.add(1);
		_view.render(_model);
	};
	
	this.decrease = function() {
		_model.sub(1);
		_view.render(_model);
	};
};
```

Presenter作为View和Model之间的“中间人”，除了基本的业务逻辑外，还有大量代码需要对从View到Model和从Model到View的数据进行“手动同步”，这样Presenter显得很**重**，维护起来会比较困难。而且由于没有数据绑定，如果Presenter对视图渲染的需求增多，它不得不过多关注特定的视图，一旦视图需求发生改变，Presenter也需要改动。

运行程序时，以View为入口：

```javascript
(function() {
	var view = new myapp.View();
	view.init();
})();
```

## MVVM

MVVM（Model-View-ViewModel）最早由微软提出。ViewModel指 "Model of View"——视图的模型。这个概念曾在一段时间内被前端圈热炒，以至于很多初学者拿jQuery和Vue做对比...

![MVVM](http://on2171g4d.bkt.clouddn.com/2017-06-01-mvvm.png)

MVVM把View和Model的同步逻辑自动化了。以前Presenter负责的View和Model同步不再手动地进行操作，而是交给框架所提供的数据绑定功能进行负责，只需要告诉它View显示的数据对应的是Model哪一部分即可。

这里我们使用Vue来完成这个栗子。

### Model

在MVVM中，我们可以把Model称为数据层，因为它仅仅关注数据本身，不关心任何行为（格式化数据由View的负责），这里可以把它理解为一个类似json的数据对象。

```javascript
var data = {
	val: 0
};
```

### View

和MVC/MVP不同的是，MVVM中的View通过使用模板语法来声明式的将数据渲染进DOM，当ViewModel对Model进行更新的时候，会通过数据绑定更新到View。写法如下：

```html
<div id="myapp">
	<div>
		<span>{{ val }}rmb</span>
	</div>
	<div>
		<button v-on:click="sub(1)">-</button>
		<button v-on:click="add(1)">+</button>
	</div>
</div>
```

### ViewModel

ViewModel大致上就是MVC的Controller和MVP的Presenter了，也是整个模式的重点，业务逻辑也主要集中在这里，其中的一大核心就是数据绑定，后面将会讲到。与MVP不同的是，没有了View为Presente提供的接口，之前由Presenter负责的View和Model之间的数据同步交给了ViewModel中的数据绑定进行处理，当Model发生变化，ViewModel就会自动更新；ViewModel变化，Model也会更新。

```javascript
new Vue({
	el: '#myapp',
	data: data,
	methods: {
		add(v) {
			if(this.val < 100) {
				this.val += v;
			}
		},
		sub(v) {
			if(this.val > 0) {
				this.val -= v;
			}
		}
	}
});
```

整体来看，比MVC/MVP精简了很多，不仅仅简化了业务与界面的依赖，还解决了数据频繁更新（以前用jQuery操作DOM很繁琐）的问题。因为在MVVM中，View不知道Model的存在，ViewModel和Model也察觉不到View，这种低耦合模式可以使开发过程更加容易，提高应用的可重用性。

### 数据绑定

> 双向数据绑定，可以简单而不恰当地理解为一个模版引擎，但是会根据数据变更实时渲染。——《界面之下：还原真实的MV*模式》

![](http://on2171g4d.bkt.clouddn.com/2017-06-01-data-binding.png)

在Vue中，使用了双向绑定技术（Two-Way-Data-Binding），就是View的变化能实时让Model发生变化，而Model的变化也能实时更新到View。

“据说这玩意儿可以申请专利呢”   

![](http://on2171g4d.bkt.clouddn.com/2017-06-01-haoniubi.jpeg)

不同的MVVM框架中，实现双向数据绑定的技术有所不同。目前一些主流的前端框架实现数据绑定的方式大致有以下几种：

- 数据劫持 (Vue)
- 发布-订阅模式 (Knockout、Backbone)
- 脏值检查 (Angular)

我们这里主要讲讲Vue。

Vue采用数据劫持&发布-订阅模式的方式，通过ES5提供的 `Object.defineProperty()` 方法来劫持（监控）各属性的 `getter` 、`setter` ，并在数据（对象）发生变动时通知订阅者，触发相应的监听回调。并且，由于是在不同的数据上触发同步，可以精确的将变更发送给绑定的视图，而不是对所有的数据都执行一次检测。要实现Vue中的双向数据绑定，大致可以划分三个模块：Observer、Compile、Watcher，如图：

![Flowchart of MVVM](http://on2171g4d.bkt.clouddn.com/2017-06-01-flowchart-of-mvvm.png)

- Observer 数据监听器  
	负责对数据对象的所有属性进行监听（数据劫持），监听到数据发生变化后通知订阅者。

- Compiler 指令解析器   
	扫描模板，并对指令进行解析，然后绑定指定事件。

- Watcher 订阅者   
	关联Observer和Compile，能够订阅并收到属性变动的通知，执行指令绑定的相应操作，更新视图。Update()是它自身的一个方法，用于执行Compile中绑定的回调，更新视图。

#### 数据劫持

一般对数据的劫持都是通过Object.defineProperty方法进行的，Vue中对应的函数为 `defineReactive` ，其普通对象的劫持的精简版代码如下：

```javascript
var foo = {
  name: 'vue',
  version: '2.0'
}

function observe(data) {
    if (!data || typeof data !== 'object') {
        return
    }
    // 使用递归劫持对象属性
    Object.keys(data).forEach(function(key) {
        defineReactive(data, key, data[key]);
    })
}

function defineReactive(obj, key, value) {
	 // 监听子属性 比如这里data对象里的 'name' 或者 'version'
	 observe(value)
	 
    Object.defineProperty(obj, key, {
        get: function reactiveGetter() {
            return value
        },
        set: function reactiveSetter(newVal) {
            if (value === newVal) {
                return
            } else {
                value = newVal
                console.log(`监听成功：${value} --> ${newVal}`)
            }
        }
    })
}

observe(foo)
foo.name = 'angular' // “监听成功：vue --> angular”
```

上面完成了对数据对象的监听，接下来还需要在监听到变化后去通知订阅者，这需要实现一个消息订阅器 `Dep` ，Watcher通过 `Dep` 添加订阅者，当数据改变便触发 `Dep.notify()` ，Watcher调用自己的 `update()` 方法完成视图更新。

写着写着发现离主题越来越远了。。。数据劫持就先讲这么多吧～对于想深入vue.js的同学可以参考勾三股四的[Vue.js 源码学习笔记](http://jiongks.name/blog/vue-code-review/)

## 总结

MV\*的目的是把应用程序的数据、业务逻辑和界面这三块解耦，分离关注点，不仅利于团队协作和测试，更有利于<strike>甩锅</strike>维护和管理。业务逻辑不再关心底层数据的读写，而这些数据又以对象的形式呈现给业务逻辑层。从 MVC --> MVP --> MVVM，就像一个打怪升级的过程，它们都是在MVC的基础上随着时代和应用环境的发展衍变而来的。

在我们纠结于使用什么架构模式或框架的时候，不如先了解它们。静下来思考业务场景和开发需求，不同需求下会有最适合的解决方案。我们使用这个框架就代表认同它的思想，相信它能够提升开发效率解决当前的问题，而不仅仅是因为大家都在学。

有人对新技术乐此不疲，有人对新技术不屑一顾。正如狄更斯在《双城记》中写的：

> 这是最好的时代，这是最坏的时代，这是智慧的时代，这是愚蠢的时代；这是信仰的时期，这是怀疑的时期；这是光明的季节，这是黑暗的季节；这是希望之春，这是失望之冬；人们面前应有尽有，人们面前一无所有；人们正在直登天堂；人们正在直下地狱。

请保持一颗拥抱变化的心，在新技术面前不盲目，不守旧。

写了两天，也查阅了很多资料，对于我而言也是一次学习的过程。希望对看完本文后的同学有所帮助。不足之处请多指教。

一些参考资源：   
[GUI Architectures](https://martinfowler.com/eaaDev/uiArchs.html)   
[界面之下：还原真实的MV*模式](https://github.com/livoras/blog/issues/11)   
[前端MVC变形记](http://efe.baidu.com/blog/mvc-deformation/)  
[深入理解JavaScript系列](http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html)    
[250行实现一个简单的MVVM](https://zhuanlan.zhihu.com/p/24475845?refer=mirone)



