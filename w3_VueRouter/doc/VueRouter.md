
# Vue-Router

[TOC]

Vue-Router允许我们通过不同的 URL 访问不同的内容。实现多视图的单页Web应用（SPA）

## 安装和引入

* script标签引入
    > 在 Vue 后面加载 vue-router，它会自动实现安装

```html
    <script src="./lib/vue.js"></script>
    <script src="./lib/vue-router.js"></script>
```

* npm方式（推荐）
Vue-Router是通过插件的形式来扩展Vue的功能，所以要使用它，必须要通过 Vue.use() 方法安装路由功能

```javascript
    import Vue from 'vue';
    import VueRouter from 'vue-router';

    // 调用Vue.use手动安装，之后才能在实例中通过this.$route访问
    Vue.use(VueRouter);
```

## 使用Vue Router

### 步骤

1. 安装并引入vue-router
2. 安装vue-router插件
3. 实例化router并配置参数
4. 把router实例注入到vue实例中
5. 在组件中使用

### 参数配置

* mode：路由模式
  * hash（默认）
  * history
    > 需要后端配置，任意请求返回index.html（IE9中会自动降级到hash模式）
* routes：路由配置
    * path：访问这个页面的路径
        * 动态路由： path为变量的路由
    * component：指定路由组件
        > 显示到`<router-view/>`中的组件
    * components：在多视图组件中，给每个命名视图指定路由组件
        > 一般用于多个`<view-router/>`的场景
    * name：命名路由，方便执行路由跳转
    * props（Boolean|Object|Function）：路由组件传参（[详情](#路由传参)） 
    * redirect（String|Object|Function）：重定向
    * children（Array）：嵌套路由配置
        >子路由一般使用相对路径的path
    

### 显示路由组件`<router-view/>`
> 动态路由，用于显示路由配置中的component路由组件内容

* name: 命名视图（默认：default）

### 导航
> 如何实现路由跳转

#### 声明式导航

> 利用内置组件标签来实现路由跳转

* `<router-link>`
    * to（Sting|Object）：设置目标路由的链接。 点击后，跳到目标路由
    * tag：让`<router-link>` 渲染成某种标签（默认：a）
    * active-class：匹配路由时`<router-link>`使用的类名
    * exact-active-class：精确匹配路由时`<router-link>`使用的类名
    * replace： 跳转到目标路由且不留下 history 记录
    * event: 触发路由的事件（默认：click）

#### 编程式导航
> 利用Router实例（`$router`）的方法实现路由跳转

* `$router.push()`
    ```javascript
        this.$router.push('/home');//等同于：<router-link to="/home"></router>

        // 对象
        this.$router.push({ path: '/home' })
        this.$router.push({name:'Home'});//等同于：<router-link :to="{name:'Home'}"></router>
    ```

* `$router.replace()`
  >类似于`$router.push()`，但不会向浏览器添加浏览记录
* `$router.go(n)`/`$router.back()`/`$router.forward()`
  > 在history 记录中向前或者后退多少步，类似 window.history.go(n)

### 路由传参

> 在组件中通过`this.$route`获取当前路由信息，包含传入的参数（params/query等）

#### 跳转时传参
* query传参
    > 通过`$route.query`获取，刷新后参数依然存在

    ```js
        // 以下3种方式等效
        this.$router.push('/goods?id=123')
        this.$router.push({name:'Goods',query:{id:123}})
        this.$router.push({path:'/goods',query:{id:123}})
    ```
* params
    > 通过`$route.params`获取，params参数在页面刷新后参数消失(动态路由除外)

    ```js
        // 定义
        {
            // ...
            routes:[{
                path:'/goods/:id',
                name:'Goods',
                component:Goods
            }]
        }

        // 以下两种跳转方式等效
        this.$router.push('/goods/123')

        // params方式给动态路由传参，只支持name方式跳转
        this.$router.push({name:'Goods',params:{id:123}}) 
    ```
    * 动态路由
        > 注意：当路由从 `/goods/1` 导航到 `/goods/2`，组件实例会被复用（因为两个路由都渲染同个组件`Goods`，比起销毁再创建，复用更加高效）因此不会执行组件的生命周期钩子函数。解决方案：
        * 利用watch 监测 $route 对象变化
        * beforeRouteUpdate路由守卫（2.2+）
    
        ```js
            const User = {
                watch: {
                    '$route' (to, from) {
                        // 对路由变化作出响应...
                    }
                },
                beforeRouteUpdate (to, from, next) {
                    //to:目标路由
                    //from:当前路由
                    //一定要调用next()方法才可进入目标路由
                }
            }
        ```


#### 定义时传参: props
* Object模式
    > 如果 props 是一个对象，则把对象的属作为组件的属性

    ```javascript
        // 组件配置
        routes:[
            {
                path:'/user/:id',
                component:User,
                //等效于：<User v-bind="{myname:'laoxie'}"/>
                props:{myname:'laoxie'} 
            }
        ]
        // 组件代码
        const User = {
            props:['myname'],
            template:`<div>{{myname}}</div>`
        }
    ```
* Function模式
    > 与Object模式一致，把函数返回值作为组件的属性，实现更灵活的参数传递，函数的参数为`route`

    ```javascript
        // 路由配置
        routes:[
            {
                path:'/settings',
                component:Settings,
                props:(route) => ({ query: route.query.q }) 
            }
        ]
        // 组件代码
        const Settings = {
            props:['query'],
            template:`<div>{{query}}</div>`
        }
    ```
* Boolean模式
    > 如果 props 被设置为 true，内部会自动把`route.params`设置为组件属性

    ```javascript
        // 路由配置
        {
            routes:[{
                path:'/user/:id',
                component:User,
                //等效于：<User v-bind="route.params"/>
                props:true, 
            }]
        }
        // 组件
        const User = {
            props:['id'],
            template:`<div>{{id}}</div>`
        }
    ```


## 路由守卫（路由钩子函数）
> 路由导航过程中分别执行的函数，**完整的导航解析流程**如下：

1. 导航被触发。
2. 在失活的组件里调用beforeRouteLeave离开守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。

### 全局守卫
> 所有的路由切换都会执行，一般写在路由配置文件中

* `router.beforeEach(fn)`
    - to
    - from
    - next()
* `router.afterEach(fn)`
    - to
    - from
* `router.beforeResolve(fn)`
    * to
    * from
    * next

### 路由独享的守卫
>写在路由配置中

* `beforeEnter(fn)`
    - to
    - from
    - next()

### 组件内的守卫
* `beforeRouteEnter(fn)` : 此时组件实例还没被创建，因此无法访问this
    - to
    - from
    - next()
* `beforeRouteUpdate(fn)`
    - to
    - from
    - next()
* `beforeRouteLeave(fn)`
    - to
    - from
    - next()
---

### 利用路由守卫实现页面权限控制
```js
    router.beforeEach(function(to,from,next){
        if(to.matched.some(item=>item.meta.requiresAuth)){
            // 获取本地存储数据
            let userInfo = localStorage.getItem('userInfo') || {};
            try{
                userInfo = JSON.parse(userInfo)
            }catch(err){
                userInfo = {};
            }
            // 判断当前用户信息是否包含token
            if(userInfo.authorization){
                // 发起请求校验token的有效性
                request.get('/jwtverify',{
                    params:{
                        authorization:userInfo.authorization
                    }
                }).then(({data})=>{
                    if(data.code === 0){
                        next({
                            path:'/login',
                            query:{
                                // 跳转到登录页面，并传递目标页面路径
                                redirectTo:to.fullPath
                            }
                        });
                    }
                })
                next();
            }else{
                next({
                    path:'/login',
                    query:{
                        // 跳转到登录页面，并传递目标页面路径
                        redirectTo:to.fullPath
                    }
                });
            }
        }else{
            next();
        }
    });
```

### 子路由（嵌套路由）
* 配置路由时使用`children`定义子路由
    > path使用相对路径
* 在组件中使用`<router-view/>`显示子路由中的组件

```js
    new VueRouter({
        path:'/category',
        component:Category,
        children:[
            {path:'phone',component:Phone},
            {path:'computer',component:Computer},
            {path:'pad',component:Pad},
        ]
    })

    // Category.vue
    <div>
        <router-view></router-view>
    </div>
```

### 保持页面状态
* 保持页面输入、切换等状态
    ```js
        <keep-alive>
            <router-view></router-view>
        </kepp-alive>
    ```
* 保持滚动条位置滚动行为
    > 路由切换出去时会保留当前滚动条位置信息，当返回该路由时自动执行scrollBehavior，并传入保存的位置信息savePosition，通过return设置滚动条位置
    ```js
        {
            scrollBehavior(to, from, savePosition) {
                return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        resolve(
                            savePosition ? 
                                { behavior: 'smooth', ...savePosition } 
                            : 
                                { x: 0, y: 0 }
                            )
                    }, 500)
                })
            }
        }
    ```

### 过渡效果
> 当路由跳转时实现页面的转场动画

```js
    <transition name="slide-left">
        <router-view></router-view>
    </transition>
```
配合以下样式实现左入和右入进场动画

```css
    /*  左入动画*/
    .slide-right-enter {
        transform: translate(-100%, 0);
    }
    .slide-right-enter-active{
        position: absolute;left:0;top:0;right:0;bottom:0;
        transition: transform 0.3s ease-in-out;
    }
    .slide-right-enter-to {
        transform: translate(0, 0);
    }
    /* 右入动画 */
    .slide-left-enter {
        transform: translate(100%, 0);
    }
    .slide-left-enter-active{
        position: absolute;left:0;top:0;right:0;bottom:0;
        transition: transform 0.3s ease-in-out;
    }
    .slide-left-enter-to {
        transform: translate(0, 0);
    }
    
```

> 注意：`<transition/>`与`<keep-alive/>`一起使用时必须放在`<keep-alive/>`的外面

**【案例】**

* 利用重定向实现404页面
* 后台管理系统登录验证
    - 必须登录系统才能查看其他页面
    - 不登陆直接访问自动跳到登录界面
