import request from '@/utils/request'
export default {
    install(Vue){
        // 注册50+组件
        [].forEach(item=>{
            Vue.component(item.name,item);
        })

        // 给Vue原型添加内容
        Vue.prototype.$request = request;

        // 添加全局方法
        Vue.request = request;

        // 定义指令
        Vue.directive('xx',{})
        // Vue.mixin()
    }
}

// Vue.use(plugin)

// export default function(Vue){

// }