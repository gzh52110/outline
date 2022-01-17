import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
// import Manage from '../views/manage/Manage.vue'


// 3.安装vue-router插件
Vue.use(VueRouter)

// 4. 实例化路由
const router = new VueRouter({
  // 路由类型
  // mode:'history',

  // 并配置参数
  routes: [
    // 基础路由
    {
      path: '/login',
      component: Login
    },

    // 权限路由
    // {
    //   path:'/manage',
    //   component:Manage,
    // }
  ],
});

// if(已登录){
//   router.addRoute({
//       path:'/manage',
//       component:Manage,
//   })
// }



export default router;