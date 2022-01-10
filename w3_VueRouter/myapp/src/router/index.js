import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Reg from '../views/Reg.vue'
import Mine from '../views/Mine.vue'
import Discover from '../views/Discover.vue'
import Cart from '../views/Cart.vue'

// 3.安装vue-router插件
Vue.use(VueRouter)

// 4. 实例化路由
const router = new VueRouter({
  // 路由类型
  // mode:'history',

  // 并配置参数
  routes:[
    // 当浏览器地址为/home时，渲染Home组件内容
    {
      path:'/home',
      component:Home
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/reg',
      component:Reg
    },
    {
      path:'/mine',
      component:Mine
    },
    {
      path:'/discover',
      component:Discover
    },
    {
      path:'/cart',
      component:Cart
    },
  ]
})

export default router;