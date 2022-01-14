
let cartlist = localStorage.getItem("cartlist");
try {
    cartlist = JSON.parse(cartlist) || [];
} catch (err) {
    cartlist = [];
}

export default {
    // 给模块设置命名空间
    namespaced:true,
    state:{
        cartlist,
    },
    getters:{
        cartLen(state,getters,rootState,rootGetters){
            // state: 当前模块的state={cartlist}
            // rootState: 所有state={a,b,cart:{cartlist},user:{userInfo}}
            // getters: 当前getters
            // rootGetters: 所有的getters
            console.log('cartLen',state,getters,rootState,rootGetters)
            return state.cartlist.length;
        }
    },
    mutations:{
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
    },
    actions:{

    }
}