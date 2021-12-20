# Express
>Express 是一个第三方模块，对原生模块封装了一套更灵活、更简洁的应用框架，其在 Node.js 环境的地位和作用好比 jQuery 在前端的地位和作用。使用 Express 可以快速地搭建一个完整功能的网站

### 安装
```bash
    npm install express
```

### 使用
```javascript
    //引入模块
    var express = require('express');
    var app = express();

    //开启服务器，定义端口8080：
    app.listen(8080, function(){
        console.log('Server running on http://localhost:8080');
    });
```
    

### Express中间件(middleware)
>中间件是一个封装了某些处理数据功能的函数，在request或response调用之前执行，从本质上来说，一个Express应用其实就是在调用各种中间件

#### 使用中间件
格式：`app.use([path],...middlewares)`

#### 内置中间件：
* `express.static(root, [options])`
    > 基于 server-static 开发的中间件，负责托管 Express 应用内的静态资源，如：图片， CSS, JavaScript 等，一般用于实现静态资源服务器
    * root 参数指的是静态资源文件所在的根目录。
    * options 对象是可选的，支持以下属性：
        * maxAge

    ```javascript
        // express实现静态资源服务器
        app.use(express.static('./public'));
    ```
* `express.json()`
* `express.urlencoded()`
* `express.Router()`

#### 自定义中间件
格式为：`function(request,response,next){}`
* next():next是一个方法，因为一个应用中可以使用多个中间件，而要想运行下一个中间件，那么上一个中间件必须运行
```js
    app.use((req,res,next)=>{
        // 任何请求都进入此中间件
    });

    app.use('/goods',(req,res,next)=>{
        //只有请求地址为/goods时才进入此中间件
    })
```

#### 常用第三方中间件
* body-parser：解析body中的数据到`request.body`
* multer：用于处理FormData数据（表单的 `enctype="multipart/form-data"`属性）
* cookie-parser ：解析客户端cookie中的数据到`request.cookies`
* express-session ：解析服务端生成的sessionid对应的session数据到`request.session`属性
* http-proxy-middleware : 服务器代理中间件

### 请求对象Request与响应对象Response
* request
* response

### 客户端渲染(BSR)与服务器渲染(SSR)
* BSR(Browser Side Rendering): 前后端分离
    > 利用ajax请求拿到数据后在浏览器端生成html结构
* SSR(Server Side Rendering)
    > 在服务器端生成html结构后再返回浏览器渲染
    * 模板引擎
        * ejs
        * jade/pug
        ```js
            const app = express();
            // 设置模板引擎
            app.set('views', path.join(__dirname,'./views'));
            app.set('view engine', 'ejs');
            // app.set('view engine', 'jade');

            // 渲染模板:login.ejs
            app.get('/login',(req,res)=>{
                const {username,password} = req.query;
                res.render('login',{username,password})
            })
        ```

### 定义路由
* 接口规范：RESTful
    > 根据不同的请求类型与不同的路径实现不同的接口
    * 请求类型: post,delete,put,patch,get
    * 请求路径
* 获取请求参数
    * 通过url参数传递（get）：`request.query`
    * 通过请求体/formData传递（post）：`request.body`
    * 动态路由：`request.params`
    * 请求头：`request.get()`

* 图片上传
    > 利用`multer`模块做为中间件进行格式化，前端需要设置`multipart/form-data`请求头

    ```js
        // @文件上传
        const multer  = require('multer')
        const path = require('path');
        // 1.简单上传：设置上传文件路径
        // let upload = multer({ dest: 'uploads/' })

        // 2. 控制上传细节
        // 配置上传参数
        let storage = multer.diskStorage({
            // destination: function (req, file, cb) {
            //   cb(null, './uploads/');
            // },

            // 上传文件保存目录，无则自动创建
            destination:'./uploads/',

            // 格式化文件名
            filename: function (req, file, cb) {
                // 获取文件后缀名
                let ext = path.extname(file.originalname);

                cb(null, file.fieldname + '-' + Date.now() + ext);
            }
        })
        
        // 设置文件保存目录
        let upload = multer({storage});


        Router.post('/avatar',upload.single('avatar'),async (req,res)=>{
            // 后端如何接收文件格式的数据
            // post -> req.body
            // 文件 -> multer中间件格式化到req.file
            console.log('avatar:',req.file)

            res.send(formatData({data:req.file}))

        })
    ```

#### 跨域支持
> 把这个路由配置放在所有路由的前面，方便调用next操作

* 简单跨域
    > 只需设置`Access-Control-Allow-Origin`即可

* 复杂跨域：
    > 复杂跨域请求浏览器会自动向服务器发`OPTIONS`请求(预检请求)，一个 CORS 预检请求是用于检查服务器是否支持 CORS 即跨域资源共享，服务器必须在该请求中响应正确的Origin,Methods和Headers

    * 复杂跨域条件
        * 非GET、HEAD、POST请求。
        * POST请求的Content-Type不是`application/x-www-form-urlencoded`, `multipart/form-data`, 或`text/plain`。
        * 添加了自定义header

    ```javascript
        app.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");

            // 处理复杂跨域中的预检请求
            if(req.method=="OPTIONS") {
                res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
                res.header("Access-Control-Allow-Methods","PUT,POST,GET,PATCH,DELETE,OPTIONS");
                res.sendStatus(200);/*让options请求快速返回*/
            } else{
                next();
            }
        });
    ```

* 允许多个域名访问
    ```js
        const allowOrigin = 'http://localhost:1000,http://localhost:8080,http://localhost:3000'.split(',');
        app.use(function(req, res, next) {
            const currentOrigin = req.get('Origin')
            if(allowOrigin.includes(currentOrigin)){
                res.set({
                    "Access-Control-Allow-Origin": currentOrigin
                });
                // 跨域请求CORS中的预请求
                if(req.method=="OPTIONS") {
                    res.set({
                        "Access-Control-Allow-Headers": "Content-Type,Content-Length, Authorization, Accept,X-Requested-With",
                        "Access-Control-Allow-Methods": "PUT,POST,GET,PATCH,DELETE,OPTIONS"
                    });
                    // 让options请求只需要返回200状态码
                    res.sendStatus(200);
                } else{
                    next();
                }
            }else{
                next()
            }
        });
    ```

#### 代理服务器
代理服务器最关键和主要的作用就是请求转发，即代理服务器将实际的浏览器请求转发至目标服务器，

* 实现这个功能，关键就在下面两点：
    - 请求转发至目标服务器。
    - 响应转发至浏览器。

* 无论请求还是响应，转发有需要关注两个点：
    - 请求或响应头。
    >http请求是无状态的，我们使用session的方式验证用户权限，session等经常保存在cookie中，所以，头的转发是必须的。
    - 请求或响应实体数据。

* 利用http-proxy-middleware实现代理
    > webpack代理服务器使用的中间件

---

**【案例】**

* 利用express实现静态资源服务器
* 利用路由编写RESTful规范的数据接口
* 实现图片上传效果

**【练习】**

* 编写符合RESTful规范的商品与用户CRUD接口
    > 只实现接口，不用具体实现
* 把二阶段项目的后端使用Node进行改版