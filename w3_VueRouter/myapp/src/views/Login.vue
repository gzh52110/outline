<template>
    <div>
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                :rules="[
                    { required: true, message: '请填写用户名' }
                ]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                :rules="[
                    { required: true, message: '请填写密码' }
                ]"
            />
            <div style="margin: 16px;">
                <van-button block type="info" native-type="submit">登录</van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
import { Notify } from 'vant';
import axios from 'axios';
export default {
  name: "Login",
  data(){
      return {
          username:'',
          password:''
      }
  },
  methods:{
      onSubmit(values){
          console.log('values',values)

          // ajax
        //   const xhr = new XMLHttpRequest();
        //   xhr.onload = function(){

        //   }
        //   xhr.responseType='json'
        //   xhr.open('post','http://120.76.247.5:2003/api/login')
        //   xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        //   xhr.send(`username=${values.username}&password=${values.password}`)
        //   xhr.setRequestHeader('Content-Type','application/json')
        //   xhr.send(JSON.stringify(values))

        // axios
        // axios({
        //     url:'http://120.76.247.5:2003/api/login',
        //     method:'post',
        //     data:values
        // })
        axios.post('http://120.76.247.5:2003/api/login',values).then(({data})=>{
            console.log('data',data);

            if(data.code === 200){
                this.$router.push({
                    path:'/mine'
                })
                // 把用户信息存入本地
                localStorage.setItem('userInfo',JSON.stringify(data.data))
            }else if(data.code === 401){
                Notify({ type: 'danger', message: '用户名或密码错误' });
            }

        })
      }
  }
};
</script>
<style>
</style>

