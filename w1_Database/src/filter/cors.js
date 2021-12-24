/**
 * CORS跨域解决方案
 * whilelist: 白名单（允许跨域访问的域名）
 */
const whilelist = ['http://localhost:8080','http://localhost:3000']

module.exports = function(req,res,next){
    // 获取请求源（从哪发起的请求）
    const Origin = req.get('Origin')

    // 判断请求源是否在白名单中
    if(whilelist.includes(Origin)){
        res.set({
            'Access-Control-Allow-Origin':Origin
        })
    }

    // 处理复杂跨域中的预检请求
    if(req.method=="OPTIONS") {
        res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,PATCH,DELETE,OPTIONS");
        res.sendStatus(200);/*让options请求快速返回*/
    }else{

        next();
    }

}