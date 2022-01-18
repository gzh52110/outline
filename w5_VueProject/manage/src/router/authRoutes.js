
// 权限路由：以下路由需要登录后才能访问
import Manage from '@/views/manage/Manage.vue'
import Home from '@/views/manage/Home.vue'

import goodsRoute from './goodsRoute'
export default {
    path:'/manage',
    name:'Mange',
    component:Manage,
    meta:{
        requiresAuth:true
    },
    children:[
        {
            path:'home',
            component:Home,
        },
        goodsRoute
    ]
}

// router.addRoute('Manage',{path:'user',component:User})