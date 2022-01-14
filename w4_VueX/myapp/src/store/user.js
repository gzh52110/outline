import request from '../utils/request'

// 获取本地存储数据, 实现数据持久化
let userInfo = localStorage.getItem("userInfo");
try {
    userInfo = JSON.parse(userInfo) || {};
} catch (err) {
    userInfo = {};
}

export default {
    state:{
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
        }
    },
    actions:{
        async login(ctx,payload){
            // ctx: 一个类似与store的对象
            // payload: 调用当前action时传入的参数
            const { data } = await request.post("/login", payload);
            if(data.code === 200){
                ctx.commit('login',data.data)
            }

            return data;
        }
    }
}