# 三阶段课程

## day1-1

### 面试题
* 乱码的根源

### 知识点
* nvm   Nodejs Version Management
    * nvm list  查看已安装nodejs列表
    * nvm install  [version]    安装nodejs版本
    * nvm uninstall [version]   卸载nodejs版本
    * nvm use [version]         切换nodejs版本

* 查文档
    * 技术文档
    * 需求文档

* express
    * 静态资源服务器
        ```js
            const express = require('express')
            const app = express()

            // 静态资源服务器
            app.use(express.static(''))

            app.listen(2110,()=>{
                console.log('hello 2110')
            })
        ```
* 路径
    * 相对路径
        * ./
        * ../
    * 绝对路径
        * web: /
        * 本地：盘符开头
    * __dirname     当前文件所在目录
    * __filename    当前文件路径
* 模块化
    * 优势
        * 分工
        * 维护
        * 复用
    * 规范
        * commonJS
            * 导入：require()
            * 导出:
                * module.exports
                * exports
        * ESModule
            * 导入：import
            * 导出：export
        * AMD   require.js
        * CMD   sea.js
    * 分类
        * 内置模块
            * path
            * fs
        * 第三方模块
            > 需要安装
            * express
        * 自定义模块
* 课件代码地址：
    * git@github.com:gzh52110/outline.git
    * https://github.com/gzh52110/outline.git

    * 第一次：git clone
    * 以后每一天：git pull origin master

* 原生模块实现静态资源服务器
    * 请求Request
        * 从客户端发起
        * 请求头
    * 响应Response
        * 从服务器被动响应
        * 响应头
    * http请求特点
        * 从客户端主动发起请求
        * 服务器被动响应
        * 请求并响应后与服务器断开连接
    * Buffer
        * 二进制数据
        * 编码
    * mime类型
        * Content-Type 响应头，用于告诉客户端响应的内容

## day1-2

### 知识点
* require引入文件策略
    * 引入内置模块
    * 引入的是文件模块
        > 查找流程：如果路径为一个目录，则查找改目录下的package.json文件下的main属性并引入文件，如果没有main属性，则引入index.js
        * 自定义模块
            > 使用相对路径
        * 第三方模块
            > 去到node_modules目录查找

* express
    * 中间件middleware: 中间件是一个函数
        > 使用express就是在调用各种各样的中间件
        * 使用中间件格式：`app.use([path],...middlewares)`
            ```js
                app.use(middleware)
                app.use('/api',middleware)
                app.use('/api',middleware1,middelware2,...)
            ```
        * 分类
            * 内置中间
                * express.static()
                * express.urlencoded()
                * express.json()
                * express.Router()
            * 自定义中间
                ```js
                    function(request,response,next){
                        // request: express请求对象
                        // response: express响应对象
                        // next(): 是否进入下一个中间件
                    }
                ```
            * 第三方中间s
        * 中间件执行过程
* 请求类型
    > 接口规范：RESTful，根据请求类型与请求路径实现不同的接口
    * get           查
    * post          增
    * put/patch     改
    * delete        删
* 传参
    * 通过url参数传递
        > 通过请求地址问号后的参数进行传递数据的方式：?key=value&key=value
        * 接收：req.query
    * 请求体传参
        > 通过请提体传递数据的方式，可以传递**各种类型**的数据
        * 接收：req.body
            > 需要相应的中间件格式化每种类型的数据，才能通过req.body获取
            * x-www-form-urlecoded: express.urlencoded()
            * json: express.json()
    * 请求头传参
        > 通过请求头传递数据的方式，浏览器在每个请求中默认传递一些客户端数据
        * 接收：req.get()
    * 动态路由传参
        > 给路径添加变量实现传递数据的方式
        * 接收：req.params
        ```js
            app.get('/goods/:id')

            // 可选参数
            app.get('/goods/:id/:type?')
        ```
* 模块化路由
    > 把一类路由统一放到一个模块中方便管理与维护
    * 使用express.Router()中间件连接多个文件

### 练习
* 使用模块化路由编写符合RESTful规范的数据接口，包含以下模块
    * 商品模块
    * 用户模块
    * 订单模块


## day1-3

### 知识点
* js数据类型
    * Number
    * String
    * Boolean
    * Null
    * Undefined
    * Symbol
    * BigInt
    * Object
    ```js
        let a = 10;
        let b = a;

        let c = {id:1}; // #a123
        let d = c;

        let e = Symbol()
        let f = Symbol()
    ```
* 图片上传
    > 使用multer第三方中间件
    * 后端
        * 简单上传
            * dest
        * 控制细节上传
            * storage
            * limits
            * fileFilter
    * 前端
        * 表单上传
        * ajax
            * FormData
                > formData可以添加字符类数据，也可以添加非字符类数据（如：文件）
                * set(name,value)          添加
                * append(name,value)       追加
                * delete(name)
                * get(name)
                * getAll(name)
            * File
                * 通过表单`input[type=file]`获取
                    * input.files
* 跨域
    * 什么是跨域
        > 当前页面地址与请求地址在协议、域名、端口三者只要有一个不一致则视为跨域
    * 为什么存在跨域限制
    * 解决方案
        * JSONP         少用
            * 目的：跨域获取数据
            * 原理：利用script标签没有跨域限制的特点来发起请求
            * 传参：随着script请求传递<全局函数名>
            * 缺点：
                * 只能发起get请求
                * 并不是真正的ajax
        * CORS
            * 设置响应头
                * Access-Control-Allow-Origin
        * 服务器代理    
        

## day1-4

### 面试题
* 深拷贝与浅拷贝
    * 基本数据类型
    * 引用数据类型
    ```js
        let a = 'hello'
        let b = a;

        // 引用数据类型
        let c = {username:'力宏',age:40}
        let d = c;

        c.age = 42;
        d.age;// 42

        // 浅拷贝：在内存中创建另外一个一摸一样的对象
        let e = {};//{username:'力宏',age:40}
        for(let key in c){
            e[key] = c[key]
        }

        // 深拷贝：嵌套循环，递归（在函数中调用自己）
        let user = {
            username:'云迪',
            age:39,
            // nickname:'#abc'
            nickname:['钢琴家','力宏基友']
        }
        let newUser = {};// {username:'云迪',age:39,nickname:['钢琴家','力宏基友']}
        for(let key in user){
            // 1. newUser['username'] = user['username']
            // 2. newUser['age'] = user['age']
            // 3. newUser['nickname'] = user['nickname'];//#abc
                // newUser.nickname = '#abc'
            if(Array.isArray(user[key])){
                //newUser[key] = user[key].map(function(item){
                //    return item;
                //})
                newUser[key] = user[key].map(item=>item)
                
            }else if(typeof user[key]==='object'){
                const mewItem = {}
                const oldItem = user[key]
                for(let k in oldItem){
                    mewItem[k] = oldItem[k]
                }
                newUser[key] = mewItem
            }else{
                newUser[key] = user[key]

            }
        }

    ```
* 递归
    ```js
        function deepCopy(old){
            // old旧数据
        }

        const res = deepCopy({a:10,b:20})
    ```
* git
    * 回退： git reset

* 查看文档的能力
    * 技术文档
    * 需求文档
* jquery方法链式调用的原理
    > 在每个方法执行完成后返回jquery实例(return this)
    ```js
        $('div')
        .attr('a','10') => $('div')
        .addClass('box') => $('div')
        .on('click',()=>{}) => $('div')
    ```
* let与var的区别
    * var声明的变量会自动成为window对象的属性，而let不会

### 知识点
* CORS（Cross Origin Resource Sharing）跨域资源共享
* CORS复杂跨域
    > 浏览器会自动发起一个OPTIONS请求（预检请求），只有正确地响应OPTIONS请求才能实现复杂跨域
    * Access-Control-Allow-Origin
        * 单个域名
        * `*`
        * 支持多个域名：白名单
    * Access-Control-Allow-Methods: 允许请求类型
        > 'GET,POST,PUT,DELETE'
    * Access-Control-Allow-Headers: 允许请求头
* 服务器代理
    * http-proxy-middleware
    ```js
        const {createProxyMiddleware} = require('http-proxy-middleware')

        createProxyMiddleware({
            target,
            changeOrigin,
            pathRewrite:{

            }
        });// createProxyMiddleWare is not a function
    ```


### 练习
* 组队（2人一个团队）
* 找一个项目，代理它的数据


## day1-5

### 面试题
* 扩展运算符：...
    * 展开
        * 函数实参
        * 复制
    * 剩余
        * 函数形参
        * 解构
```js
    function sum(...num){
        // num: [10,20]
        // reduce(callback,initValue)
        // [10,20,30,40]
        num.reduce(function(prev,item){
            // 1. prev=0,item=10 => 0+10
            // 2. prev=10,item=20 =>10+20
            // 3. prev=30,item=30 =>30+30
            // 4. prev=60,item=40 =>60+40
            return prev+item
        },0)
        return num.reduce((prev,item,idx,arr)=>prev+item,0)
    }
    sum(10,20);//30
    sum(10,20,30);//60
    sum(10,20,30,40);//100
```

### 知识点
* 页面渲染模式
    * 客户端渲染：BSR(Browser Side Rendering)
        > html结构在客户端（浏览器）生成并渲染
        * 优点
            * 前后端分离
            * 局部刷新
            * 良好的用户体验
        * 缺点
            * 请求数量过多，影响渲染速度
    * 服务端渲染：SSR（Server Side Rendering）
        > html结构在服务端生成，并一次性返回给客户端渲染
        * 模板引擎
            * ejs
            * jade/pug
        * SEO: 搜索引擎优化


* mysql数据库
    > 在NodeJS中使用mysql
    * 安装驱动
        ```bash
            npm i mysql
        ```
    * 连接
        * 使用连接对象方式
            ```js
                //创建连接对象，并配置参数
                var connection = mysql.createConnection({
                    host     : 'localhost',
                    user     : 'root',
                    password : '',
                    database : 'jiaoxue'
                });
                connection.connect();
                connnection.query()
                connection.end();
            ```
        * 使用连接池方式（官方是推荐）
            > 使用连接池，默认会在连接池中创建10个连接对象（connectionLimit），使用完成自动放回连接池，不需要手动关闭
            ```js
                var pool  = mysql.createPool({
                    host     : 'localhost',
                    user     : 'root',
                    password : '',
                    //port: 3306,
                    database: 'jiaoxue',
                    //multipleStatements: true
                });

                pool.query('select * from student', function(error, rows){
                    console.log(rows);
                });
            ```
        * 学会拼接sql
* try...catch
    ```js
        try{
            // 尝试执行这里的代码，
            // 如果顺利执行完这里的代码，则忽略catch
            // 如果有错误或promise对象的状态为reject，则执行catch中的代码
        }catch(err){

        }
    ```

* 爬取数据

### 练习
* 爬取目标网站数据，并写入数据库
* 编写接口
    

## day2-1

### 知识点
* 爬取数据
    * 步骤
        * 分析html结构
        * 提取需要的数据
            1. 请求页面所有html结构
            2. 筛选需要的html结构
            3. 提取数据，并写入数据库
            4. 下载图片
                > 把图片写入本地
                * fs.writeFile()
                * fs.createWriteStream()    推荐
    * 使用工具
        * superagent
    * 反爬机制
* 数据库
    * 关系型数据库
        * Oracle
        * MySQL/MariaDB
        * SQLServer
    * 非关系型数据库
        * MongoDB

    * mySQL与MongoDB对比
                    数据库         表/集合           数据
        * mySQL     database       table            row
        * mongo     database       collection       document
    * 安装
        > 不要出现中文路径
    * 使用
        * 命令行
            > 环境变量
        * 可视化工具
            * compass
            * robo3T
## day2-2

### 面试题
* 动态路由
    > request.params
* getElementsByTagName()与querySelectorAll()
    * HTMLCollection(动态)与NodeList
    * 伪数组
    * 原型
        * forEach()

### 知识点
* 在NodeJS中使用mongodb
    * 安装驱动
        * mongodb（官方）
        * mongoose
* CRUD封装
    * insert
    * del
    * update
    * query

* ObjectId
    > string -> Object
* 限制数量筛选排序
    * limit(qty)
    * skip(qty)
    * sort({key:-1})

* 过滤字段
    * mysql: `select * from user`
    * mongo: db.user.find({},{projection})

* 统一前后端数据格式
    * 后端响应一个json数据，格式为：{code:200,msg:'success'}

* 表单事件
    * blur      失去焦点触发
    * change    内容有修改且失去焦点时触发
    * input     内容修改时触发
* UI框架
    * Bootstrap

* URL与URLSearchParams


## day2-3

### 面试题
* js文件加载时间较长（10s），如何优化
    > js的加载与执行会**阻塞**页面的渲染
    ```js
        <title>
        <link>
        <script src="xxx.js"></script>
        <body>
            <div>hello</div>
        </body>
    ```
    * script标签属性
        * src
        * type
            > 默认值：text/javascript
        * defer 推迟
        * async 异步
    * 解决方案
        * 把script放最后
        * defer
            > 推迟执行，页面渲染与js加载同时进行，互不影响，待html页面内容渲染完成后才执行js代码
        * async
            > 异步加载，页面渲染与js加载同时进行，互不影响，但js加载完成后会立即执行（js的执行会阻塞html渲染）

* 令牌token
    > 一个加密后且具有有效期的字符串
    * 在服务器生成并返回给**前端保存**
    * 前端每次请求发送token到服务器校验
        > 通过校验token的有效性判断用户是否登录
    * 操作
        * 生成：加密
            1. 用户使用用户名和密码登录
            2. 登录成功且选择7天免登录，则生成一个有效期为7天的token
            3. 把token返回前端保存
        * 校验：解密
            > 如果被篡改或超过有效期，则无法校验通过
            1. 发送token到服务器校验，并返回校验结果
                > 请求头发送
            2. 前端根据校验结果显示页面状态
    * 第三方模块：jsonwebtoken

## day2-4

### 知识点
* 加密解密
    * 了解加密的重要性
    * 明文与密文
    * 加密类型
        * 单向加密
            > 加密后不可解密（不可逆）
        * 双向加密
            > 加密后可解密
            * 对称加密
                > 加密与解密公用一把钥匙
            * 非对称加密
                > 公钥与私钥

* 批量操作
    * $in/$nin


* Vue
    * 前端框架
        * jquery工具库(2006)
        * angular(2009)
            > angularJS -> angular(typescript)
        * backbone(2010)
        * React（2013）
            > Virtual DOM
        * Vue(2014)
            > 综合angular与react的优点，MVVM模式，是一款高性能高效率的框架
    * 使用
        * 下载
            * 版本
                * 按环境分
                    * 开发版(development)：vue.js
                    * 生产版(production)：vue.min.js
                * 按构建版本分
                    * 完整版: vue.js
                        > 完整版 = 运行时版 + 编译器
                    * 运行时版：vue.runtime.js
                        > 运行Vue应用所需要的最小代码
                * 按模块分
                    * commonJS: vue.common.js
                    * ESModule: vue.esm.js
                    * UMD: vue.js
                        > 通用模块化规范，支持commonJS+AMD/CMD+全局引用（script引入）

        * 实例化
        * 数据绑定
            * 单向绑定
                * 双花括号：{{}}
                    > 绑定数据到标签内
                * 绑定到标签属性：v-bind
            * 双向绑定：v-model

        * 事件绑定
            > 指令：一种特殊的html属性，这些属性被Vue所识别
            * v-on
        * 架构分层
            * MVC
                * M(Model):     数据
                * V(View):      视图
                * C(Controller) 控制器
            * MVP
                * M(Model):     数据
                * V(View):      视图
                * Presenter     控制器（优化后的Controller）
            * MVVM
                * M(Model):     数据
                * V(View):      视图
                * VM(ViewModel) 控制器

## day2-5

### 知识点
* 模板语法
    * 数据绑定
        * 单向绑定：
            * {{}}
            * v-bind
                * 简写：`:`
        * 双向绑定
            * v-model
                > v-model只是一个语法糖，替代方案为：v-model = v-bind:value + v-on:input
    * 事件绑定: v-on
        * 事件处理函数：在methods中定义
        * 传参
        * 修饰符：过滤
        * 简写：@
        * event
            * 默认为事件处理函数的第一个参数（无传参的情况下）
                ```js
                    <button @click="handle"></button>
                ```
            * 如传参则需要手动传递event
                > 事件触发时event对象赋值给实例的$event属性，事件完成后会移除
                ```js
                    <button @click="handle(item.id,$event)"></button>
                ```

    * 列表渲染：v-for
        > v-for可以遍历的数据为：Array | Object | number | string | Iterable(可迭代数据)
        * `v-for="item in data"`
        * `v-for="item of data"`
    * 条件渲染
        * v-show: 是否显示
        * 三元运算
        * v-if/v-else/v-else-if
    * ref对象
        > 通过实例的$refs对象获取
        * ref对象用在元素上，得到该元素对应的节点引用
* 双向数据绑定的原理
    > v-model的替代方案
    * Model -> View
        > 修改数据层，视图层会自动更新
        * 原理：监听数据变化（getter&setter），并刷新视图，即**响应式属性**（数据层中的属性发生变化会影响视图层）
    * View -> Model
        > 修改视图层，数据层会自动更新
        * 原理：监听表单变化（事件），并修改数据

* 案例：04-tab标签切换
    * 什么是响应式属性
        > 数据的改变会影响视图的更新
    * 编程思维的改变：
        * 节点操作思维 -> **数据驱动**思维
* Vue实例化过程
    * 把data中的属性变成getter&setter并写入vm实例
        > 如果属性为数组，则修改数组的原型，从而达到监听修改的效果
    * 把methods中的方法写入vm实例
* 响应式属性
    * 什么是响应式属性
        * 特点：数据层中的属性发生变化会刷新视图层
    * 对象响应式元素
        * 原理：getter & setter
    * 数组响应式原理
        * 通过重写数组原型实现响应式属性
    * 如何设置响应式属性
        * 在data中设置初始值
            > 在Vue实例化时会递归遍历data中所有的属性，并通过`Object.defineProperty()`把它们改成getter&setter，并写入vm实例属性
            * Object.defineProperty(target,prop,descriptor)
                * target: 目标对象
                * props: target下的属性
                * descriptor: 属性特性
                    > 传统方式**添加**的属性，所有属性特性默认为true，通过`Object.defineProperty()`**添加**的属性，所有属性特性默认为false
                    * 存储器属性：没有自己的值，一般用于监听或代理别的数据
                        * configurable  可配置性（属性特性总开关）
                        * enumerable    可枚举性
                        * get
                        * set
                    * 值属性：有自己的值的属性
                        * configurable  可配置性
                        * enumerable    可枚举性
                        * writable      可写性
                        * value         值
            * Object.getOwnPropertyDescriptor() 获取属性特性
        * `Vue.set(target,key,val)`
            * target可以是数组或对象，但不能是 Vue 实例，或者 Vue的根数据对象


## day3-1

### 面试题
* computed属性与methods的区别
    > 如computed与methods都能达到同样的效果，优先使用computed
* computed属性与data的区别
    > data为初始数据，computed一般用户根据data值计算/映射出其他的值

### 知识点
* computed: 计算属性
    * 原理：getter & setter
    * 特点：缓存（当依赖的数据发生变化时重新计算，否则获取上一次的值,即缓存值）
    * 应用场景：一般用于优化
* watch: 监听属性（监听实例属性）
    * deep:true
        > 可进行深度监听（监听子属性）
    * immediate:true
        > 初始化监听

* 知识点总接
    ```js
        const vm = new Vue(options)
    ```
    * 类：Vue
        * 类属性（静态属性）
            * Vue.config: 
                * keyCodes
        * 类方法（静态方法/全局方法）
            * Vue.set()
            * Vue.delete()
    * 实例
        > 只有实例中的属性/方法才能在视图中使用
        * 属性
            * 内置属性
                > 以$开头
            * 私有属性
                > 以_开头
            * 自定义属性
                Vue实例化时，会遍历data/computed/methods等中所有属性/方法，并写入Vue的实例
        * 方法
            * $set()    Vue.set()的别名
            * $delete() Vue.delete()的别名
            * $watch()  等效于watch选项
                ```js
                    watch:{
                        datalist(){}
                    }

                    this.$watch('datalist',function(n,o){})
                ```


    * options配置选项
        * el
        * data
        * methods
            > 方法中的this指向实例
        * computed
            > 缓存特性
            * Function: getter
            * Object: getter+setter
        * watch 监听实例属性
            > 默认为浅监听，可实现深层监听
            ```js
                watch:{
                    datalist(n,o){},
                    'datalist.0':function(n,o){},
                    datalist:{
                        handler:function(n,o){}
                        deep:true,
                        immediate:true
                    }
                }
            ```
    * 指令
        * v-bind
            * 对class与style增强
            ```js
                v-bind:title=""
                v-bind:class="[]"
                v-bind:style="{}"
            ```
            * 无参数绑定对象
                ```js
                    <div v-bind="{a:10,b:20,c:30}"></div>
                ```
            * 动态参数
                ```js
                    data:{
                        data:{
                            dir:'left'
                        }
                    }
                    <div v-bind:[dir]="10"> -> <div v-bind:left="10">

                    this.dir = 'top' -> <div v-bind:top="10">
                ```
        * v-on
        * v-model
        * v-for
        * v-if/v-else/v-else-if
        * v-show
        * v-text 等效于 {{}}
            ```js
                <div>
            ```
        * v-html
            > 必须保证内容安全才能使用v-html，避免xss攻击（跨域脚本攻击）
            * 如何避免xss攻击
                * 不要直接把用户输入的内容显示到页面，应过滤有破坏性的标签内容：script,style,link,iframe等
        * v-pre
        * v-once    只编译一次，后期不会有监听效果，一般用户优化性能
        * v-cloak
            > 该指令一致出现在标签属性中，直到数据显然完成，一般用于解决数据闪现问题（配合css）
                
* 自定义指令
    * 什么是指令：一种具有某些特定功能的特殊的html属性
    * 完整指令格式：v-name:arg.modifer="value"
        * name: 名称
        * arg: 参数
        * modifer: 修饰符
        * value: 值
    * 分类
        * 全局指令
            * Vue.directive(name,definition)
        * 局部指令
            * directives
    * 使用
        > 必须以`v-`开头：`v-name`
        ```js
            v-name
            v-name="value"
            v-name:title="value"
            v-name:title.enter.x="value"
        ``
    * 指令钩子函数
        * bind：初始化时执行（默认）
        * inserted：元素插入页面时执行
        * update：所在模板更新时执行
        * componentUpdated：所在模板完成一次更新周期时调用
        * unbind：指令与元素解绑时执行

        * 参数
            * el 指令所绑定的元素，可以用来直接操作 DOM
            * binding 一个对象，包含以下案例中的属性
            * vnode
            * oldVnode
                > 仅在update 和 componentUpdated 钩子中可用

## day3-2

### 面试题
* 为什么组件的data必须为函数类型
    > 因为组件需要复用，如果data不使用函数来返回一个对象，则所有组件共用一份数据，达不到复用的效果

### 知识点
* 组件
    * 问题
        * 什么是组件
            > 把一个大的功能拆分成一些独立的模块，用独立可复用的小组件来构建大型应用
            * 组件是可复用的 Vue 实例
                > 定义组件时拥有与实例化Vue几乎一样的选项
        * 有什么用
            * 更好的分工
            * 更好的复用
            * 更好的维护
        * 怎么用
            * 定义（注册）组件
                > 定义一个组件相当于创建了一个标签
            * 使用组件
                ```
                    <name></name>
                ```
    * 注册组件
        * 全局组件
            > Vue.component(name,options)
            * name: 不能与内置html标签重名
        * 局部组件
            > components:{name:options}
    * 组件要求
        * 组件名称不能与内置html标签重名
            > 注册时组件名可以是kebab-case或PascalCase，但在html页面上使用时，必须写成遵循W3C 规范中的自定义组件名 (字母全小写或包含一个连字符)
        * 不能使用el
        * data必须为Function类型
        * 每个组件必须只有一个根元素
    * this指向
        > 组件中的this指向组件实例
    * 组件选项
        * template  模板
        * render    渲染函数
            > 通过`createElement()`方法利用js的方式生成虚拟节点（Virtual DOM）
        * data
            > 只能为Function类型
        * components
* 组件通讯
    * 父->子：props
        1. 父组件操作：给子组件定义属性，并传递父组件数据
        2. 子组件操作：通过props选项接收父组件数据，props中的数据会自动写入组件实例
    * 子->父
        > 子组件无法直接修改props数据
        * 方式一：父组件方法传递到子组件执行，并回传数据
        * 方式二：自定义事件（推荐）
            1. 父组件操作：给子组件定义事件，并把父组件函数作为事件处理函数
            2. 子组件操作：子组件通过`$emit()`触发自定义事件
    * 兄弟->兄弟
        * 状态提升：把数据放到他们共同的父级
    * 深层及组件通讯
        * 方式一：逐层传递（不推荐）
            > 不断使用父传子的方式获取到数据，但操作繁琐，且不好维护
        * Bus事件总线
        * 依赖注入

* 单向数据流
    > 建议：数据定义在哪个组件，修改的方法就定义在哪个组件（谁的数据谁修改）

* 自定义事件与触发
    * 模板：v-on:type="handle"
    * js: $on(type,handle)
    * 触发：$emit(type,args)
    * 移除：$off(type)

### 练习
* 组件化todolist的选择功能
* 编写一个按钮组件

## day3-3

### 知识点
* Vue渲染步骤
    1. 先查看是否有render函数，有则直接渲染，没有则进入第2步
    2. 查看是否有template选项，有则把template中的代码编译成render函数再渲染，没有则进入第3步
    3. 查看是否有el选项（或$mount()），有则把el对应节点的outerHTML作为template，再编译到render函数并渲染

* Provide/Inject依赖注入
    > 增强版的props，但**注入的数据不是响应式属性**（除非注入的数据本身就是响应式对象，不建议滥用），比较常用的用法是用来共享方法


* Vue-cli
    > @vue/cli
    * 安装
        ```bash
            npm install -g @vue/cli
        ```
    * 创建Vue项目
* npm script
    > package.json文件中的scripts属性，称为npm脚本命令，这些命令可以直接在命令行执行

* 模块化规范
    * commonJS
        * 导入：require()
        * 导出：
            * module.exports
            * exports
    * ESModule
        * 导入：import
        * 导出：export
    * AMD   require.js
    * CMD   sea.js
    * UMD   通过模块化开发规范
* ESModule
    * 特点
        * 把一个js文件当作一个模块，每个模块具有独立的作用域，
        * 不能直接访问模块中的变量，除非模块导出（暴露），
        * 外部能修改模块中的属性（因为是getter）
        * 必须在http服务器环境中使用
    * 导入：import
    * 导出：export
    * 在webpack环境中使用
    * 在html文件中使用
        ```html
            <script type="module"></script>
        ```
* Vue的**单文件组件（SFC）**
    > 后缀名为.vue的包含html,css,js的文件
    ```js
        Vue.component({
            template:``, // -> render()
            data(){
                return {}
            },
            computed:{

            }
        })
    ```
    * SFC组成部分
        * `<template/>`
        * `<script/>`
        * `<style/>`
    * 编译规则
        1. webpack把`<template>`标签中的内容编译成render函数
        2. webpack把`<style>`标签中的样式编译到html页面的style标签

        > webpack --{编译}--> html -> 浏览器中渲染

* 组件选项
    * inheritAttrs
        * prop属性：通过props选项声明的属性
            > prop属性会自动称为组件实例的属性
        * attr属性：不通过props选项声明的属性
            > attr属性会自动称为组件根节点html属性
* 插槽slot
    * 默认插槽: `<slot/>`
    * 命名插槽：`<slot name/>`
        > 给插槽添加名字

    * 插槽默认值
        > 当插槽中没有传入内容时，使用默认值
    * v-slot: 简写`#`
* 给组件绑定事件
    * .native - 监听组件根元素的原生事件

### 练习
* 利用插槽实现todolist


## day3-5

### 知识点
* props组件通讯与插槽的区别
    * props：把数据传入到子组件去生成html结构并渲染
    * slot: 在父组件生成html结构并传入子组件渲染
        > 实现可定制化

* 作用域插槽
    > 把子组件的数据通过插槽往父组件传递，实现在父组件中使用子组件的数据
    ```js
        TodoList{completeItem,removeItem} --> TodoBody{selectIds，checkAll}
    ```

* 生命周期
    > 一个组件从创建到销毁的过程
    * 生命周期去函数（钩子函数）
    * 阶段
        * 创建阶段
            * beforeCreate()
            > 初始化注入操作与响应式属性
            * created()
        * 挂载阶段
            > 数据->虚拟节点->真实节点->渲染到挂载点
            * beforeMount()
            * mounted()
        * 卸载（销毁）阶段
            > 切断watcher与视图、父子组件、事件等联系
            * beforeDestroy() -> beforeUnmount
            * destroyed -> unmounted
        * 更新阶段
            > 数据修改 -> 创建新的虚拟节点 -> 对比旧的虚拟节点（得到差异项）-(打补丁)-> 生成真实节点-> 渲染到页面
            * beforeUpdate()
            * updated()
    * 学习生命周期要搞懂以下两个问题
        * 生命周期的执行过程
        * 生命周期中的每个钩子函数适合做什么
* 虚拟节点VitualDOM
    > 一个结构类似于真实DOM的**js对象**
    * diff算法
        > 对比虚拟节点前后状态，得到差异项
    * key的作用
        > 让diff算法更高效更准确，如果没有提供key，则根据类型匹配，如类型一致（v-for），则按顺序进行对比
    ```js
        // 旧的虚拟节点
        {
            type:'div',
            children:[
                {
                    type:'h4',
                    chilren:'生命周期'
                },
                {
                    type:'p',
                    attrs:{},
                    on:{},
                    children:'count:1'
                },
                {
                    type:'button',
                    on:{},
                    children:'销毁组件'
                }
            ]
        }
        
        // 新的虚拟节点
        {
            type:'div',
            children:[
                {
                    type:'h4',
                    chilren:'生命周期'
                },
                {
                    type:'p',
                    attrs:{},
                    on:{},
                    children:'count:2'
                },
                {
                    type:'button',
                    on:{},
                    children:'销毁组件'
                }
            ]
        }

        // 新虚拟节点
        {
            type:'div',
            children:[
                {
                    type:'h4',
                    chilren:'生命周期'
                },
                {
                    type:'p',
                    attrs:{},
                    on:{},
                    children:'count:3', // 4->5->6....->11
                },
                {
                    type:'button',
                    on:{},
                    children:'销毁组件'
                }
            ]
        }
    ```
* 如何取消ajax请求
    * 通过设置超时时间
    * 通过xhr.abort()
    ```js
        const xhr = new XMLHttpRequest()
        xhr.open()
        xhr.send()

        xhr.timeout = 5000;

        xhr.abort()
    ```


## day4-1

### 知识点
* Vue-Router
    * 多页面应用（MPA：Multiple Page Application）
    * 单页Web应用（SPA: Single Page Application）
        > Vue-router允许我们通过不同的 URL 访问不同的内容。实现多视图的单页Web应用
    * 使用步骤
        1. 安装
            ```bash
                npm install vue-router
            ```
        2. 引用
            ```js
                import VueRouter from 'vue-router'
            ```
        3. 安装插件
            > 安装插件时，注册了`<router-view>`与`<router-link>`全局组件
            ```js
                Vue.use(VueRouter)

                // Vue.component('RouterView',{})
                // Vue.component('RouterLink',{})
            ```
        4. 实例化路由并配置参数
            ```js
                const router = new VueRouter({

                })
            ```
        5. 把router实例注入到Vue实例
            > 注入后，Vue会给每个组件实例添加`$router`与`$route`属性
            * $router: 路由实例 
            * $route: 当前路由对象（保存当前路由信息）
            ```js
                new Vue({
                    //...
                    router:router
                })
            ```
        6. 在组件中使用路由
            * 使用`<router-view>`渲染路由组件

    * 路由类型: mode
        * hash路由: 地址带丑陋的#
        * history路由：更像一个网站
    * 路由跳转
        * 声明式导航：`<router-link>`
            * to
            * replace
            * active-class
            * ...
        * 编程式导航
            > 利用js进行跳转
            * $router
                * push()        跳转并留下浏览记录
                    > `<router-link to>`
                * replace()     跳转不留下浏览记录
                    > `<router-link to replace>`
                * back()    回退
                * forward() 前进
                * go()      前进与后退
            * $route
* 动态组件
    > 根据不同的条件渲染相应的内容
* Vue常见UI框架（组件库）
    > 所有的UI组件库都是Vue的插件
    * VantUI        有赞出品
    * ElementUI     饿了么
    * ant-design    蚂蚁金服
    * iView         腾讯出品
    * Bootstrap 
    * ....

* 接口地址：http://120.76.247.5:2003
* 接口文档链接：https://easydoc.net/s/58934052   密码：4wSFKBYp
* axios
    * axios(config)
    * axios.get(url,config)
    * axios.post(url,data,config)
    * axios.put(url,data,config)
    * axios.patch(url,data,config)
    * axios.delete(url,config)
    * config
        * params
        * data
        * headers

### 练习
* 基于NodeJS项目配置页面路由
    * /home
    * /reg
    * /login
    * ...

## day4-2

### 面试题
* 如何在子组件修改父组件的数据
    > 子组件不能直接修改父组件传入的数据（不能修改props）
    * 把父组件的方法传入子组件执行（父组件的方法修改父组件的数据）
    * 自定义事件（把父组件方法作为事件处理函数）
        * 常规写法
            ```js
                //App{num:10}->Home->List,Page

                // 父组件App代码
                <List v-on:changenum="changeNum"/>

                // 子组件List代码
                this.$emit('changenum',20)
            ```
        * 利用v-bind的**sync修饰符**简化自定义事件写法
            ```js
                //App{num:10}->Home->List,Page

                // 父组件App代码
                <List v-bind:num.sync="num" />
                // 等效于以下代码
                // <List v-on:update:num="num=$event">

                // 子组件List代码
                this.$emit('update:num',20)
            ```

    * 利用组件层级关系实现修改
        > 通过$parent获取父组件实例，并修改它的数据
        * $parent
        ```js
            // Child
            this.$parent.num++
        ```
* 在父组件修改子组件数据
    * $children （Vue3不支持）
    * ref


### 知识点
* 通过组件层级操作数据
    > 组件组合在一起后就形成了组件树，就有了父子关系
    * 在子组件操作父组件数据:`$parent`
        ```js
            Child.$parent.num++
        ```
    * 在父组件操作子组件数据
        * `$children`
            ```js
                Parent.$children[0].qty++
                Parent.$children[0].getData()
            ```
        * ref（推荐）
            ```js
                // 父组件代码
                <Child ref="c"/>

                this.$refs.c.qty++
                this.$refs.c.getData()
            ```
* 路由传参
    * 跳转传参
        * query: 问号后的参数
            > 接收：this.$route.query
            ```js
                this.$router.push('/list?cat=xxx&page=1')
                this.$router.push({
                    path:'/list',
                    query:{
                        cat:'xxx',
                        page:1
                    }
                })
            ```
        * params
            > 接收：this.$route.params
            * 动态路由
                > params方式给动态路由传参，只支持name方式跳转
                ```js
                    // {name:'Goods',path:'/goods/:id',component:Goods}
                    this.$router.push('/goods/123')
                    // 以下代码无法跳转
                    this.$router.push({
                        path:'/goods',
                        params:{id:'123'}
                    })

                    this.$router.push({
                        name:'Goods',
                        params:{id:'123'}
                    })
                ```
* hard code 硬编码（写死）
* 封装axios
    > 二次封装
    ```js
        axios.get('http://xxxx.com/api/goods')

        const instance = axios.create({
            baseURL:'http://xxxx.com/api'
        })

        const {data} = await instance.get('/goods',{
            params:{}
        })

        function request(config){
            return instance(config)
        }

        request.get = async function(url,data,config={}){
            config.params = data;
            const {data} = await instance.get(url,config)
            return data;
        }
        
        const {data} = await request.get()
        data.data.result;
    ```

### 练习
* 实现下拉刷新效果


## day4-3

### 知识点
* 监听动态路由变化
    * watch
        ```js
            watch:{
                '$route.params.id':function(){
                    // ajax
                }
            }
        ```
    * 路由守卫
        * beforeRouteUpdate
        ```js
            // /goods/60377657ef13c32cd88706fb -> 
            // /goods/60377657ef13c32cd88706fc
            // /goods/1(Goods) -> /goods/2(Goods)
            beforeRouteUpdate(to,from,next){

                next();

            }
        ```
* 路由守卫
    * 应用场景
        * 控制页面访问权限
        * 用户登录后才允许访问页面
            > 先放行后校验的原则
            1. 判断用户是否登录
                * 登录：放行
            2. 校验token
                * 校验不通过则跳回登录页面
    * 分类
        * 组件内的守卫
            > 写在组件配置中，类似于生命周期函数
            * beforeRouteUpdate()   动态路由切换时执行
            * beforeRouteEnter()
            * beforeRouteLeave()
        * 路由独享守卫
            > 写在路由配置中
            * beforeEnter()
        * 全局守卫
            > 是路由实例的方法，一般写在路由配置文件中
            * router.beforeEach(fn)
                * to
                * from
                * next()
            * router.afterEach(fn)
                * to
                * from
            * router.beforeResolve(fn)
                * to
                * from
                * next()
    * 完整的导航解析流程
        > 一个路由跳转经历的步骤
        * 动态路由（组件复用）
            1. 导航被触发。
            2. 调用全局的 beforeEach 守卫。
            3. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
            4. 调用全局的 beforeResolve 守卫 (2.5+)。
            5. 导航被确认。
            6. 调用全局的 afterEach 钩子。
            7. 触发 DOM 更新。
        * 一般路由
            > /home(Home) -> /goods/123(Goods)
            >> 路由跳转 -> 组件渲染

            1. 导航被触发。
            2. 在失活的组件里调用beforeRouteLeave离开守卫。
            3. 调用全局的 beforeEach 守卫。
            4. 在路由配置里调用 beforeEnter。
            5. 解析异步路由组件。
            6. 在被激活的组件里调用 beforeRouteEnter。
            7. 调用全局的 beforeResolve 守卫 (2.5+)。
            8. 导航被确认。
            9. 调用全局的 afterEach 钩子。
            10. 触发 DOM 更新。
* 购物车页面效果

### 练习
* 完成购物车批量删除效果
* 实现添加到购物车效果


## day4-4

### 知识点
* 子路由（嵌套路由）
    * 路由配置：children
    * 添加router-view组件
* 路由重定向
    * redirect
* 过渡效果
    * `<transition>`
    * `<transition-group/>`
        ```html
            <transition>
                <div v-show="show"></div>
            </transition>
            <transition-group>
                <div v-if="show"></div>
                <span v-if="show"></span>
            </transition-group>
            <transition>
                <router-view/>
            <transition>
        ```
    * 触发动画条件
        1. 设置过渡动过
            > 可以是css或js
        2. 必须有进场或出场状态
            * 条件渲染 (使用 v-if)
            * 条件展示 (使用 v-show)
            * 动态组件 (component或router-view)