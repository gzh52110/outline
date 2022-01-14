import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant,{Lazyload} from 'vant'
import 'vant/lib/index.css';

import request,{host} from './utils/request'

// 利用Vue的原型实现方法共享
// 所有组件都是Vue的实例
Vue.prototype.$request = request;
Vue.prototype.$host = host

// 安装Vant插件：注册了50+组件
// 给Vue的原型添加$dialog(),$notify(),$toast()
Vue.use(Vant);
Vue.use(Lazyload);

Vue.config.productionTip = false

new Vue({
  // 5. 把router实例注入到vue实例中
  router,
  store,
  render: h => h(App),
}).$mount('#app')
