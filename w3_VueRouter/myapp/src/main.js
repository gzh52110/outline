import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Vant from 'vant'
import 'vant/lib/index.css';

// 安装Vant插件：注册了50+组件
Vue.use(Vant);

Vue.config.productionTip = false

new Vue({
  // 5. 把router实例注入到vue实例中
  router,
  render: h => h(App),
}).$mount('#app')
