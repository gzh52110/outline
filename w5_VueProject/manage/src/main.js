import Vue from 'vue'
import App from './App.vue'

import router from './router'
import store from './store'
import request from './utils/request'

// 全局引入
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// 按需引入（手动）
// import Button from 'element-ui/lib/button'
// import 'element-ui/lib/theme-chalk/button.css'
// Vue.component(Button.name,Button)
// Vue.use(Button)

// 按需引入（ babel-plugin-component工具，需要babel配置）
import {
  Form,
  FormItem,
  Input,
  Button,
  Tabs,
  Icon,
  Row,
  Col,
  Upload,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Image,
  Loading,
  MessageBox,
  Message,
  Notification,
  Menu,
  MenuItem,
  Submenu
} from 'element-ui';


Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Tabs);
Vue.use(Icon);
Vue.use(Row);
Vue.use(Col);
Vue.use(Upload);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Image);
Vue.use(Submenu);
Vue.use(Menu);
Vue.use(MenuItem);
  

Vue.use(Loading.directive);
Vue.prototype.$loading = Loading.service;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$prompt = MessageBox.prompt;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

Vue.prototype.$request = request;

// Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')


// 路由守卫
router.beforeEach(function (to, from, next) {
  console.log('to',to);
  // if (to.meta.requiresAuth) {
  if(to.matched.some(item=>item.meta.requiresAuth)){
    // 判断是否登录
    // 登录:放行
    if (store.getters.isLogin) {
      next();

      router.app.$request.get('/user/verify', {
        headers: {
          Authorization: store.state.userInfo.authorization
        }
      }).then(({ data }) => {
        if (data.code === 401) {
          // token已失效或被篡改
          router.push({
            path: '/login',
            query: {
              targetUrl: to.fullPath
            }
          })
        }
      })
    } else {
      // 没有登录：跳到登录页面
      router.push({
        path: '/login',
        query: {
          targetUrl: to.fullPath
        }
      })
    }
  } else {
    next();
  }
})