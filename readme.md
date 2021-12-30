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

