---
title:  面试题相关整理
---

1.js的各种位置，比如 clientHeight,scrollHeight,offsetHeight,以及scrollTop,offsetTop,clientTop的区别？
2.js拖拽功能的实现？
3.Ajax解决浏览器缓存问题？
4.eval是做什么的？
5.CommonJs，AMD，CMD？
6.对象深度克隆？
7.js监听对象属性变化？
8.实现一个私有变量，用getName方法可以访问，不能直接访问？
9.Object.is？
  主要区别就是+0 ！= -0 而 NaN == NaN、？？？？？？？？？？？
10.setTimeout、setInterval、requestAnimationFrame 之间的区别？
11.js怎么控制一次加载一张图片，加载完再加载下一张？
12.如何实现cleep的效果？？？？？？（es5或者es6）
13.实现js中所有对象的深度克隆（包装对象，Date对象，正则对象）
14.实现Node的Events模块？
15.js判断类型？
16.事件代理在捕获阶段的实际应用？
17.如何判断一个数组（typeof不对！！！！！）
18.js实现跨域
19.js的全排列
20.跨域原理
21.写深度拷贝
22.什么是虚拟dom
23.ant-design
24.js中继承的几种方式 ======整理一下
25.Vue生命周期
26.介绍 symbol
27.js原型链，原型链的顶端是什么？Object的原型是什么？Object的原型的原型是什么？在数组原型链上实现删除数组重复数据的方法？
28.promise+Generator+Async的使用
29.事件委托和冒泡原理（阻止冒泡阻止捕获）
30.ES6箭头函数的特性
31.setTomeout和promise的执行顺序
32.怎么获得对象上的属性：比如Object.key()？
33.ES6的新特性？
34.知道private和public？？？？？？？？？？？
35.async 和 await 具体怎么用？
```js
  function resolveAfter2Seconds() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('resolved');
    }, 2000);
  });
  async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: "resolved"
}

}
```
async function asyncCall() {
  console.log('calling');
  const result = await resolveAfter2Seconds();
  console.log(result);
  // expected output: "resolved"
}
36.实现一个计算：一年中有多少周？
37.面向对象的继承方式？
38.assign 深拷贝
39.dom的api
40.PWA
41.rem、em 、px、%、vm、vh、vw这些单位区别
42.vm单位换算
43.移动端适配1px问题
44.[移动端性能优化相关：](https://blog.csdn.net/tangxiujiang/article/details/79791545)
45.toB 和 toC项目的区别
46.移动端兼容性
47.2X图和3X图适配
48.图片在安卓上有设备模糊问题
49.固定定位布局键盘挡住输入框内容
50.点击穿透问题
51.phone和ipad下输入框默认内阴影
52.防止手机中页面放大和缩小
53.移动端适配-dpr浅析
54.上下拉滚动条时候慢、卡顿
55.长时间按页面出现闪退
56.ios和android下触摸元素时出现半透明灰色遮罩
57.transition闪屏、圆角bug
58.git工作流
58.rebase和merge的区别
58.git reset、git revert、git checkout、有什么区别？
58.webpack和gulp区别
59.vue监听键盘事件
60.删除数组用detele和Vue.detele有什么区别？
61.axios是什么？怎么使？怎么跨域？
62.怎么在vue项目中引入第三方库比如jq，有哪些方法可以做到？？？
63.vue里面的Proxy API？？？为什么用这个代替 defineProperty API？？？
64.Vue3.0？？？？？？怎么变得更快的？（底层源码）
65.理解proxy？？
66.redux ？？？
67.react性能优化使哪个周期？
68.为什么虚拟dom会提升性能/////已知
69.diff 算法
70.react在哪里发起ajax请求
关于常用的http请求头以及响应头详解




实现Object.create
实现instanceof的作用
实现单例模式 核心要点: 用闭包和Proxy属性拦截
实现数组的flat
用发布订阅模式实现EventEmit
使用ES5实现类的继承效果
