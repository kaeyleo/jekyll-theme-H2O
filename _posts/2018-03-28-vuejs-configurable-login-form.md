---
layout: post
title: 'Vue.js实现可配置的登录表单'
date: 2018-03-28
categories: 技术
tags: 前端开发 vue
---

表单是后台项目业务中的常用组件，这次重构了登录功能以满足登录方式可配置的需求，在此记录和分享一下。

## 业务场景

在之前，项目只支持手机号+密码登录，前端是直接把表单写死的，后来有客户希望能支持验证码登录，有的客户还希望能有手机号+验证码+密码的登录方式...所以登录方式的灵活性需要可配置的表单支持，于是我把登录组件做了拆分。

![](http://on2171g4d.bkt.clouddn.com/2018-03-28-vuejs-configurable-login-form.png)

以表单元素为粒度，分离出了手机号、密码、短信验证码这几个组件，它们内部都有自己的表单验证方法，通过组合可以快速完成登录、注册、找回密码等表单组件。高内聚低耦合、高内聚低耦合...跟着念十遍~

``` bash
.
├ common
|   ├ captcha.vue
|   ├ password.vue
|   └ phone.vue
├ login
|   └ index.vue
├ register
|   └ index.vue
└ resetPassword
    └ index.vue
```

这里我们将login作为父组件，读取服务端返回的登录配置并在模板做条件渲染，登录时调用子组件内部的表单验证，最后通过Vuex拿到数据调用接口。整个可配置登录表单的逻辑就是酱子，接下来上代码。

## 代码

请求服务端配置数据：

``` javascript
/* 参数说明：
 * 'password': 密码登录 
 * 'captcha': 短信验证码登录
 * 'password_or_captcha': 密码或短信登录 
 * 'password_with_captcha': 密码+短信登录
 */
config: {
  login_methods: 'password'
}
```

登录组件的核心渲染代码（pug）：

``` html
.login-card
  .login-header
      h3 登录

  .login-content
  	 //- 手机号作为通用的账户名
    phone(ref="phone")
    //- 密码组件
    password(
      v-if="isPasswordMode"
      ref="password"
    )
    //- 短信验证码组件
    captcha(
      v-if="isCaptchaMode"
      ref="captcha"
    )
    
    //- 短信验证码 和 密码
    template(v-if="isPasswordWithCaptchaMode")
      captcha(ref="captcha")
      password(ref="password")
    
    //- 短信验证码 或 密码
    template(v-if="isPasswordOrCaptchaMode")
      ...
    
    el-button(@click="login") 登录
```

登录时需要三个步骤：表单验证、组装数据、调用接口：

``` javascript
async login () {
  if (!this.validate()) return // 表单验证
  const loginData = this.getLoginData() // 组装数据
  await this.postLogin(loginData) // 调用接口(vuex actions)
  ...
}
```

登录的表单验证其实是对当前登录方式中所有组件的 `validate()` 方法进行逻辑判断：

``` javascript
/**
 * @return {Boolean} isPass
 */
validate () {
  const phone = this.$refs.phone.validate()
  let isPass = false
    
  if (this.isPasswordMode) {
    if (this.$refs.password) isPass = this.$refs.password.validate()
  }
    
  if (this.isCaptchaMode) {
    if (this.$refs.captcha) isPass = this.$refs.captcha.validate()
  }
    
  if (this.isPasswordWithCaptchaMode) ...
    
  if (this.isPasswordOrCaptchaMode) ...
    
  isPass = phone && isPass
  return isPass
}
```

由于使用了element-ui，这里子组件的 `validate()` 方法是由 `el-form` 组件所提供的。

可以从下面的password组件模板看到，我们将每个子组件看成一个完整的表单（当时这样做是为了应对部分子组件内部又有多个表单元素，它们之间的交互和验证逻辑比较复杂）：

``` html
.login-password
  el-form(
    :model="form"
    :rules="rules"
    ref="form"
    @submit.native.prevent=""
  )
    el-form-item(prop="password")
      el-input(
        v-model="form.password"
        type="password"
        name="password"
      )
```

> W3C: When there is only one single-line text input field in a form, the user agent should accept Enter in that field as a request to submit the form.

需要注意，根据[W3C标准](https://www.w3.org/MarkUp/html-spec/html-spec_8.html#SEC8.2)， 当一个form元素中只有一个输入框时，在该输入框中按下回车会自动提交表单。通过在 `<el-form>` 添加 `@submit.native.prevent` 可以阻止这一默认行为。

password组件的表单验证（使用element-ui表单）：

``` javascript
/**
 * @return {Boolean} res
 */
validate () {
  let res = false
  this.$refs.form.validate((valid) => {
    res = valid
  })
  return res
}
```

最后从Vuex里拿到所有表单数据，进行组装：

``` javascript
computed: {
  ...mapState('login', {
    phone: state => state.phone,
    password: state => state.password,
    captcha: state => state.captcha
  }),  
},
methods: {
  ...
  
  /**
   * @return {Object} data
   */
  getLoginData () {
    let mode = ''
    const phone = this.phone
    ...
    const data = { phone }
    
    if (this.isPasswordMode) {
      mode = 'password'
      data.password = password
    }
    
    if (this.isCaptchaMode) {
      mode = 'captcha'
      data.captcha = captcha
    }
    
    if (this.isPasswordWithCaptchaMode) ...
    
    if (this.isPasswordOrCaptchaMode) ...
    
    data.mode = mode
    return data
  }
}
```
调用接口：

``` javascript
const loginData = this.getLoginData()
await this.postLogin(loginData)
...
```
