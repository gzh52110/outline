import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Reg from '../views/Reg.vue'
import Mine from '../views/Mine.vue'
import Discover from '../views/Discover.vue'
import Cart from '../views/Cart.vue'
import Search from '../views/Search.vue'
import Goods from '../views/Goods.vue'
import Category from '../views/Category.vue'

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
    {
      path:'/search',
      component:Search
    },

    // /goods,/goods/123
    // 建议给复杂路径路由命名
    {
      name:'Goods',
      path:'/goods/:id',
      component:Goods,

      // 路由独享守卫
      beforeEnter(to,from,next){
        console.log('Goods.beforeEnter')
        next();
      }
    },
    {
      name:'Category',
      path:'/list',
      component:Category
    },
  ]
})


// 全局路由守卫
router.beforeEach(function(to,from,next){
  console.log('beforeEach')
  next();
})
router.beforeResolve(function(to,from,next){
  console.log('beforeResolve')
  next();
})
router.afterEach(function(to,from){
  console.log('afterEach')
})
export default router;