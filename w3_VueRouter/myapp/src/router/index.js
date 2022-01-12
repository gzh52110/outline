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
      component:Mine,

      meta:{
        requiresAuth:true
      }
    },
    {
      path:'/discover',
      component:Discover
    },
    {
      path:'/cart',
      component:Cart,

      // 路由元信息：给路由添加一些额外的信息，用于进行相应的业务逻辑
      meta:{
        requiresAuth:true
      }
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
  if(to.meta.requiresAuth){
    let userInfo = JSON.parse(localStorage.getItem('userInfo'))
    console.log('userInfo',userInfo)
    // 判断是否登录
    // 登录:放行
    if(userInfo.authorization){
      next();

      router.app.$request.get('/user/verify',{
        headers:{
          Authorization:userInfo.authorization
        }
      }).then(({data})=>{
        if(data.code === 401){
          // token已失效或被篡改
          router.push({
            path:'/login',
            query:{
              targetUrl:to.fullPath
            }
          })
        }
      })
    }else{
      // 没有登录：跳到登录页面
      router.push({
        path:'/login',
        query:{
          targetUrl:to.fullPath
        }
      })
    }
  }else{
    next();
  }
})
router.beforeResolve(function(to,from,next){
  console.log('beforeResolve')
  next();
})
router.afterEach(function(to,from){
  console.log('afterEach')
})

export default router;