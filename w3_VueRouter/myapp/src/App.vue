<template>
  <div id="app">
    App

    <router-view></router-view>
    <nav>
      <router-link to="/home" tag="span" active-class="active" replace>首页</router-link>
      <router-link to="/login">登录</router-link>
      <router-link to="/reg">注册</router-link>
      <router-link to="/mine" tag="span">我的</router-link>
    </nav>

    <button @click="goto('/mine')">我的</button>
    <button @click="goto('/login')">登录</button>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  created(){
    console.log('App',this);
  },
  methods:{
    goto(path){
      this.$router.push(path)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
nav a{
  margin:0 5px;
}
nav .router-link-active{color:#f00}
nav .active{color:#00f}
</style>
