import Goods from '@/views/manage/Goods.vue'
import List from '@/views/manage/goods/List.vue'
import Add from '@/views/manage/goods/Add.vue'
import Edit from '@/views/manage/goods/Edit.vue'

export default {
    path:'goods',
    component:Goods,
    children:[
        {
            path:'',
            redirect:'list',
        },
        {
            path:'list',
            component:List
        },
        {
            path:'add',
            component:Add
        },
        {
            path:'edit/:id',
            component:Edit
        },
    ]
}