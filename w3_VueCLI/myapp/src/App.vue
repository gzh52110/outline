<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <!-- <TodoList></TodoList> -->
    <!-- 
      TodoList组件在Webpack的环境下会自动编译成<todo-list/>  <todo-list></todo-list>
    -->

    <Lifecycle v-if="show"/>
    <button @click="show=!show">创建/销毁组件</button>
  </div>
</template>

<script>
import Vue from 'vue';
// import HelloWorld from './components/HelloWorld.vue'
import TodoList from './components/TodoList/TodoList.vue'
import Button from './components/Button.vue';
import Lifecycle from './components/Lifecycle.vue';

// 注册全局组件
Vue.component(Button.name,Button)

export default {
  name: 'App',
  data(){
    return {
      show:true
    }
  },
  // 完整版Vue：利用内置编译器把template选项 编译成 render函数
  // template:'#box',
  // render(){},

  // 单文件组件（使用runtime版本的Vue）：利用webpack把template标签中的内容渲染成render函数
  // render(){},
  components: {
    TodoList,
    Lifecycle
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
</style>
