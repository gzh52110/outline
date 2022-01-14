<template>
    <div>
        <div v-if="isLogin">
            <h4>{{userInfo.username}}</h4>
            <van-button block type="danger" size="small" @click="logout">退出</van-button>
        </div>
        <div v-else>
            <van-button type="info" size="small" to="/login">登录</van-button>
            <van-button type="primary" size="small" to="/reg">注册</van-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'Mine',
    computed:{
        userInfo(){
            // return this.$store.state.userInfo

            // 模块化后获取state的变化
            return this.$store.state.user.userInfo
        },
        isLogin(){
            return this.$store.getters.isLogin
        }
    },
    methods:{
        logout(){
            this.$store.commit('logout')
        }
    },
    created(){
        console.log('Mine',this)
    }
}
</script>
<style>

</style>

