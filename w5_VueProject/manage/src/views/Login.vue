<template>
    <div class="login-page">
        <h1>电商管理系统</h1>
        <el-form ref="form" :model="form" label-width="80px" :rules="rules">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="form.password" show-password></el-input>
            </el-form-item>
             <el-form-item>
                <el-button type="primary" @click="onSubmit" native-type="submit">登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    name:'Login',
    data(){
        return {
            form:{
                username:'',
                password:''
            },
            rules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                ]
            }
        }
    },
    methods:{
        onSubmit(){
            this.$refs.form.validate(async (valid)=>{
                // console.log('valid',valid)
                if(valid){
                    // const {data} = await this.$request.post('/login',this.form)
                    // console.log('data',data)
                    // if(data.code === 200){
                    //     this.$store.commit('/login',data.data)
                    // }else{

                    // }

                    const data = await this.$store.dispatch('login',this.form)
                    if(data.code === 200){
                        console.log('登录成功')
                        // 动态添加路由
                        // this.$store.commit('addRoute')
                        const {targetUrl='/manage'} = this.$route.query;
                        this.$router.push(targetUrl)
                    }else{
                        console.log('登录失败')

                    }
                }
            })
        }
    }
}
</script>

<style lang="scss">
.login-page{
    position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:400px;height:300px;border:5px solid #ddd;padding:15px 30px;
    h1{font-weight: normal;text-align:center;}
}
</style>
