import Vue from 'vue'
import Router from 'vue-router'
// import Component from 'vue-class-component'  // 装饰器
import HelloWorld from '@/components/HelloWorld'
import Example from '@/components/Example'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/emample',
      name: 'emample',
      component: Example
    }
  ]
})
