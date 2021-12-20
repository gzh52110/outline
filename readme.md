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
* 模块
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
    * 请求
        * 从客户端发起
        * 请求头
    * 响应
        * 从服务器被动响应
        * 响应头
    
* Buffer

* mime类型