<template>
    <div>
        <h1>用户注册</h1>
        <van-form @submit="onSubmit">
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                :rules="[
                    { required: true, message: '请填写用户名' },
                    {
                        validator:checkUser,message:'用户名已存在'
                    }
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
                <van-button block type="info" native-type="submit">注册</van-button>
            </div>
        </van-form>
         <p>已有账号？<router-link to="/login">去登录</router-link></p>
    </div>
</template>
<script>
// import request from '../utils/request'
// import axios from "axios";
export default {
  name: "Reg",
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    async onSubmit(values) {
      console.log("values", values);
      //   axios
      //     .post("http://120.76.247.5:2003/api/reg", values)
      //     .then(({ data }) => {
      //       console.log("data", data);

      //       if (data.code === 200) {
      //         this.$router.push({
      //           //   path: "/login?username="+values.username
      //           path: "/login",
      //           query: { username: values.username }
      //         });
      //       }
      //     });
      const { data } = await this.$request.post("/reg", values);
      if (data.code === 200) {
        this.$router.push({
          path: "/login",
          query: { username: values.username }
        });
      }
    },
    async checkUser(value, rule) {
      //   const { data } = await axios.get(
      //     "http://120.76.247.5:2003/api/user/check",
      //     {
      //       params: {
      //         username: value
      //       }
      //     }
      //   );
      //   if(data.code === 400){
      //       return false;
      //   }else{
      //       return true;
      //   }

      const { data } = await this.$request.get("/user/check", {
        params: {
          username: value
        }
      });
      return data.code !== 400;
    }
  }
};
</script>
<style>
</style>

