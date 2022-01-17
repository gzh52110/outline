import Vue from 'vue'
import Vuex from 'vuex'
import request from '@/utils/request'
import router from '@/router'
import authRoutes from '@/router/authRoutes'

Vue.use(Vuex)

let userInfo = localStorage.getItem("userInfo");
try {
    userInfo = JSON.parse(userInfo) || {};
} catch (err) {
    userInfo = {};
}

const store = new Vuex.Store({
    // @全局状态：
    state: {
        userInfo,
    },

    getters:{
        isLogin(state){
            return !!state.userInfo._id
        }
    },
    mutations:{
        login(state,payload){
            state.userInfo = payload;
            localStorage.setItem('userInfo',JSON.stringify(state.userInfo))
        },
        logout(state){
            state.userInfo = {}
            localStorage.removeItem('userInfo')
        },
        addRoute(){
            // {path,component}
            router.addRoute(authRoutes);
        }
    },
    actions:{
        async login(ctx,payload){
            const { data } = await request.post("/login", payload);
            if(data.code === 200){
                ctx.commit('login',data.data)
                ctx.commit('addRoute')
            }

            return data;
        }
    },

    // 模块化
    modules: {
       
    }
})

console.log('store', store);

// 刷新时动态添加权限路由
if(store.getters.isLogin){
    store.commit('addRoute')
}


export default store;