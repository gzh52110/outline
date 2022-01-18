<template>
    <el-container style="height:100vh">
        <el-header class="header">
            <el-row :gutter="20">
                <el-col :span="12">
                    <i class="el-icon-bicycle logo"/>
                    <span>电商后台管理系统</span>
                </el-col>
                <el-col :span="12" style="text-align:right">
                    {{userInfo.username}} <el-button type="text" @click="logout">退出</el-button>
                </el-col>
            </el-row>
        </el-header>
        <el-container>
            <el-aside width="200px">
                <el-menu
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                style="height:100%"
                router
                :default-active="active"
                :default-openeds="opens"
                >
                    <template v-for="item in menu">
                    <el-submenu :index="baseUrl + item.path" v-if="item.children" :key="item.path">
                        <template v-slot:title>
                            <i :class="item.icon"></i>
                            {{item.text}}
                        </template>
                        <el-menu-item :index="baseUrl + item.path + it.path" v-for="it in item.children" :key="it.path">{{it.text}}</el-menu-item>
                        
                    </el-submenu>
                    <el-menu-item :index="baseUrl + item.path" v-else :key="item.path">
                        <i :class="item.icon"></i>
                        {{item.text}}
                    </el-menu-item>
                    </template>
                </el-menu>
            </el-aside>
            <el-main>
              <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
<script>
import {mapState} from 'vuex'
export default {
  name: "Manage",
  data() {
    return {
      active:'/manage/home',
      opens:['/manage/goods'],
        baseUrl:'/manage',
      menu: [
        {
          text: "首页",
          path: "/home",
          icon: "el-icon-s-home"
        },
        {
          text: "用户管理",
          path: "/user",
          icon: "el-icon-user",
          children: [
            {
              text: "添加用户",
              path: "/add", // /user/add
            },
            {
              text: "用户列表",
              path: "/list"
            }
          ]
        },
        {
          text: "商品管理",
          path: "/goods",
          icon: "el-icon-shopping-bag-1",
          children: [
            {
              text: "添加商品",
              path: "/add"
            },
            {
              text: "商品列表",
              path: "/list"
            }
          ]
        },
        {
          text: "订单管理",
          path: "/order",
          icon: "el-icon-s-order"
        },
        {
          text: "广告管理",
          path: "/ad",
          icon: "el-icon-data-board",
          children: [
            {
              text: "添加广告",
              path: "/ad"
            },
            {
              text: "广告列表",
              path: "/list"
            }
          ]
        },
        {
          text: "角色权限",
          path: "/access",
          icon: "el-icon-key",
          children: [
            {
              text: "添加角色",
              path: "/add"
            },
            {
              text: "角色列表",
              path: "/list"
            },
            {
              text: "权限指派",
              path: "/set"
            }
          ]
        }
      ],
      currentIndex: 0
    };
  },
  computed:{
    // userInfo(){
    //   return this.$store.state.userInfo;
    // },
    ...mapState(['userInfo'])
  },
  methods:{
    logout(){
      this.$store.commit('logout');
      this.$router.push('/login')
    }
  }
};
</script>
<style>
.header {
  line-height: 60px;
  color: #fff;
  background-color: rgb(67, 74, 80);
}
.logo {
  font-size: 36px;
  color: #fc0;
  margin-right: 5px;
  vertical-align: middle;
}
</style>
