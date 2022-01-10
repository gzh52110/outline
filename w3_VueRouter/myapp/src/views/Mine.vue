<template>
    <div>
        Mine
        <div>
            <van-button type="info" size="small" to="/login">登录</van-button>
            <van-button type="primary" size="small" to="/reg">注册</van-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'Mine',
    created(){
        console.log('Mine',this)
    }
}
</script>
<style>

</style>

