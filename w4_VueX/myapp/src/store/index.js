import Vue from 'vue'
import Vuex from 'vuex'

import cart from './cart'
import user from './user'

Vue.use(Vuex)

const store = new Vuex.Store({
    // @全局状态：
    // 状态：需要共享的数据，类似与组件中的data
    // 获取：store.state.xx
    state: {
        a: 10,
        b: 20
    },

    // 类似于组件中的computed，一般用于根据state计算出其他属性
    getters: {
        globalData(state) {
            return state.a + state.b;
        }
    },

    // 修改状态的方法: 类似于组件中的methods
    // 调用方式：store.commit('changea',100)
    mutations: {
        changea(state, payload) {
            // state: vuex中的state
            // payload: 调用当前mutation时传入的参数
            console.log('changea', payload)

            state.a = payload;
        },
        addToCart(state, payload){

        }
    },

    // 异步操作：类似于组件中的methods
    // 调用方式：
    // store.dispatch(action,payload)
    // store.dispatch({type:action,payload:payload})
    actions: {

    },

    // 模块化
    modules: {
        // cart:{state,mutations,actions,getters}
        cart,
        user
    }
})

console.log('store', store);

export default store;