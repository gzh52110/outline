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
* try...catch
    ```js
        try{
            // 尝试执行这里的代码，
            // 如果顺利执行完这里的代码，则忽略catch
            // 如果有错误或promise对象的状态为reject，则执行catch中的代码
        }catch(err){

        }
    ```
### 练习
* 爬取目标网站数据，并写入数据库
* 编写接口
    