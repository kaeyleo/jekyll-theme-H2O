---
layout: post
title: 'Vue插件开发与实战'
date: 2017-05-16
categories: 技术
tags: 前端开发 vue
---

通常在开发一个项目的时候，会用到类似弹出框、提示框这样的全局组件，我们可以把它们封装起来，以插件的形式进行调用。

### 插件vs组件

> 插件可以封装组件，组件可以暴露数据给插件。

一个Vue插件可以是一堆Vue组件的集合，也可以在Vue的原型上进行扩展，如 vuex、vue-router。

如果一个组件需要在多个页面频繁使用，最好的方式就是封装成插件。

### 插件的分类

1. 添加全局方法或者属性，如: [vue-custom-element](https://github.com/karol-f/vue-custom-element)
2. 添加全局资源：指令/过滤器/过渡等，如 [vue-touch](https://github.com/vuejs/vue-touch)
3. 通过全局 mixin 方法添加一些组件选项，如 [vuex](https://github.com/vuejs/vuex)
4. 添加 Vue 实例方法，通过把它们添加到 Vue.prototype 上实现。
5. 一个库，提供自己的 API，同时提供上面提到的一个或多个功能，如 [vue-router](https://github.com/vuejs/vue-router)

下面要讲的toast插件就是通过添加实例方法实现的。

### 开发

Vue.js 的插件应当有一个公开方法  `install()` ，可以理解为向全局注册插件，第一个参数是 Vue 构造器，第二个参数则是插件的配置对象（可选）。

```javascript
plugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {...}
  // 2. 添加全局资源
  Vue.directive('my-directive', {...})
  // 3. 通过全局mixin方法添加一些组件选项
  Vue.mixin({...})
  // 4. 添加实例方法
  Vue.prototype.$myMethod = function () {...}
}
```

### 使用

通过全局方法 Vue.use() 使用插件：

```javascript
import Plugin from './components/common/plugin'
Vue.use(Plugin)
```

具体使用方法请参考[官方文档](https://cn.vuejs.org/v2/guide/plugins.html#使用插件)，接下来我们从零开始编写一个Vue的插件。

> toast是一种轻量的提示，在页面中间显示，并且会在2秒(默认值，可修改)之后自动消失。

### 步骤：

1. 编写组件
2. 注册插件、添加实例方法
3. 安装插件

**目录结构**

```bash
.
├── build
├── src
│   ├── components
│   │   ├── toast
│   │   │   ├── toast.vue #toast组件
│   │   │   ├── index.js #插件逻辑
│   ├── App.vue
│   ├── main.js
├── index.html
├── package.json
```

创建 `toast.vue` 文件，用于编写toast组件

```html
<template>
  <transition name="fade">
    <div class="toast" v-show="show">{{ message }}</div>
  </transition>
</template>

<script>
  export default {
    data () {
      return {
        show: false,
        message: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
.toast {
  position: fixed;
  top: 40%;
  left: 50%;
  margin-left: -15vw;
  padding: 2vw;
  width: 30vw;
  font-size: 4vw;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 5vw;
  z-index: 999;
}

.fade-enter-active, .fade-leave-active{
  transition: 0.3s ease-out;
}
.fade-enter {
  opacity: 0;
  transform: scale(1.2);
}
.fade-leave-active {
  opacity: 0;
  transform: scale(0.8);
}
</style>

```

toast组件需要的 `message` 数据需要在插件调用时传入，接下来在 `index.js` 中完成插件的注册和业务逻辑

```javascript
import ToastComponent from './toast'

const Toast = {}

/**
 * @method 注册插件
 * @param {Function} Vue构造器
 */
Toast.install = (Vue) => {
  const ToastConstructor = Vue.extend(ToastComponent)
  const instance = new ToastConstructor() // 创建toast子实例
  instance.$mount(document.createElement('div')) // 挂载实例到我们创建的DOM上
  document.body.appendChild(instance.$el)

  /**
   * @method 提示框
   * @param {String} msg 内容
   * @param {Number} duration 显示时间, 默认2000
   */
  // 添加实例方法，以供全局调用
  Vue.prototype.$toast = (msg, duration = 2000) => {
    instance.message = msg
    instance.show = true // 调用$toast()则显示提示
    setTimeout(() => {
      instance.show = false // duration秒后toast隐藏
    }, duration)
  }
}

export default Toast

```

`index.js` 首先使用 `install()` 注册了toast插件，然后通过Vue构造器创建了子实例，使用`$mount()` 将实例挂载到了我们创建的DOM上，最后一步则是添加实例方法。这样等在 `main.js` 安装了插件后，就可以到 `App.vue` 中 `this.$toast(...)` 全局调用toast了。

下一步就是去入口文件 `main.js` 里引入插件了

```javascript
import Vue from 'vue'
import App from './App.vue'
// 引入插件
import Toast from './components/toast'
// 使用插件
Vue.use(Toast)

new Vue({
  el: '#app',
  render: h => h(App)
})

```

最后在组件中全局调用 `$toast()` 即可

```html
<template>
  <div id="app">
    <button @click="toast">Toast</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {}
  },
  methods: {
    toast () {
      // 全局调用toast
      this.$toast('Hello Vue Plugin', 1500)
    }
  }
}
</script>

<style lang="scss">
</style>

```