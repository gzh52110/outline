import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 获取本地存储数据, 实现数据持久化
let cartlist = localStorage.getItem("cartlist");
try {
    cartlist = JSON.parse(cartlist) || [];
} catch (err) {
    cartlist = [];
}
let userInfo = localStorage.getItem("userInfo");
try {
    userInfo = JSON.parse(userInfo) || {};
} catch (err) {
    userInfo = {};
}


const store = new Vuex.Store({
    // 状态：需要共享的数据，类似与组件中的data
    // 获取：store.state.xx
    state:{
        // a:10,
        cartlist,
        userInfo,
    },

    // 类似于组件中的computed，一般用于根据state计算出其他属性
    getters:{
        isLogin(state){
            return !!state.userInfo._id
        }
    },

    // 修改状态的方法: 类似于组件中的methods
    // 调用方式：store.commit('changea',100)
    mutations:{
        // changea(state,payload){
        //     // state: vuex中的state
        //     // payload: 调用当前mutation时传入的参数
        //     console.log('changea',payload)

        //     state.a = payload;
        // },
        addToCart(state,payload){
            state.cartlist.unshift(payload)

            localStorage.setItem('cartlist',JSON.stringify(state.cartlist))
        },
        removeFromCart(state,payload){
            state.cartlist = state.cartlist.filter(item=>item._id!=payload)

            localStorage.setItem('cartlist',JSON.stringify(state.cartlist))
        },
        // store.commit('changeGoodsQty',{id,qty})
        changeGoodsQty(state,payload){
            state.cartlist.forEach(item=>{
                if(item._id === payload.id){
                    item.qty = payload.qty
                }
            })

            localStorage.setItem('cartlist',JSON.stringify(state.cartlist))
        },
        clearCart(){

        },


        // 用户数据
        login(state,payload){
            state.userInfo = payload;
            localStorage.setItem('userInfo',JSON.stringify(state.userInfo))
        },
        logout(state){
            state.userInfo = {}
            localStorage.removeItem('userInfo')
        }
    }
})

console.log('store',store);

export default store;