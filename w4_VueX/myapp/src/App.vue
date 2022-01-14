<template>
  <div id="app" style="padding-bottom:50px;">
    <!-- <keep-alive include="Search,Goods"> -->
    <keep-alive :include="/Search|Goods/">
      <router-view></router-view>
    </keep-alive>
    <!-- <nav>
      <router-link to="/home" tag="span" active-class="active" replace>首页</router-link>
      <router-link to="/login">登录</router-link>
      <router-link to="/reg">注册</router-link>
      <router-link to="/mine" tag="span">我的</router-link>
    </nav>

    <button @click="goto('/mine')">我的</button>
    <button @click="goto('/login')">登录</button> -->
    <!-- <van-tabbar v-model="active" active-color="#58bc58" @change="changeMenu"> -->
    
    <van-tabbar v-model="active" active-color="#f00" route v-if="showMenu">
      <van-tabbar-item :icon="item.icon" v-for="item in menu" :key="item.path" :to="item.path" :badge="item.path==='/cart' ?  cartlist.length : null">
      {{item.path==='/mine'&& isLogin ? userInfo.username :item.text}}
      </van-tabbar-item>
  </van-tabbar>
    
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  data() {
    return {
      // num:10,
      showMenu: true,
      active: 0,
      menu: [
        {
          path: "/home",
          text: "首页",
          icon: "wap-home-o"
        },
        {
          path: "/discover",
          text: "发现",
          icon: "eye-o"
        },
        {
          path: "/cart",
          text: "购物车",
          icon: "cart-o"
        },
        {
          path: "/mine",
          text: "我的",
          icon: "manager-o"
        }
      ]
    };
  },
  name: "App",
  computed: {
    cartlist() {
      return this.$store.state.cartlist;
    },
    userInfo() {
      return this.$store.state.userInfo;
    },
    isLogin(){
      return this.$store.getters.isLogin;
    }
  },
  created() {
    // let cartlist = localStorage.getItem("cartlist");
    // try {
    //   cartlist = JSON.parse(cartlist) || [];
    // } catch (err) {
    //   cartlist = [];
    // }
    // this.cartlist = cartlist;
  },
  methods: {
    goto(path) {
      this.$router.push(path);
    },
    changeMenu(active) {
      console.log("active", active);
      const { path } = this.menu[active];

      this.$router.push(path);
    }
  }
  // changeNum(newNum){
  //   this.num = newNum
  // }
};
</script>

<style lang="scss">
nav a {
  margin: 0 5px;
}
nav .router-link-active {
  color: #f00;
}
nav .active {
  color: #00f;
}
.price {
  del {
    color: #666;
    margin-right: 5px;
    &::before {
      content: "￥";
    }
  }
  span {
    @extend del;
    color: #f00;
  }
}
main {
  padding: 15px;
}
.has-navbar {
  padding-top: 46px;
}
</style>
