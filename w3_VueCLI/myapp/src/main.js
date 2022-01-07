import Vue from 'vue'
import App from './App.vue'


// console.log('App',App)

// const path = require('path');
// import path from 'path';
// console.log('path',path);

// ES Module 测试代码
// 导入a.js模块中的所有属性，并赋值给a变量
// import * as a from './module/a.js'
// console.log('a', a);

// // 导入a.js模块中的username属性
// // import { username} from './module/a.js'

// // 导入a.js模块中的username属性并赋值给name变量
// import { username as name } from './module/a.js'
// console.log('name', name);

// // 导入a.js模块中的default属性
// import obj from './module/a.js'
// console.log('obj', obj);

// // const username = 'tiantian'

// // 到出a.js模块中的多个属性
// // import {a as api,banana,age} from './module/a.js'
// import my,{a as api,banana,age} from './module/a.js'

// import idx from './module'
// console.log('idx',idx)

// 错误写法
// 只能写在最外层作用域
// if(a>0){
//   import xx from 'xxx'
// }
// 只能静态导入
// const apath = 'module/a.js'
// import all from apath;
// 只支持相对路径或绝对路径
// import all from 'moudle/a.js'
// 只支持引入js文件
// import all from './moudle'
// 必须使用后缀名
// import all from 'moudle/a'


Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  // render:function(createElement){
  //   return createElement(App)
  // }
}).$mount('#app')
