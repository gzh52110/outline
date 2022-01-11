import axios from 'axios' 

export const host = 'http://120.76.247.5:2003'
export const apiUrl = host + '/api'

// 创建axios实例:创建一个类似与axios的对象
const instance = axios.create({
    baseURL:apiUrl,
})

export default instance


// 'http://120.76.247.5:2003/api/user/check'
// function request(config){
//     return instance(config);
// }

// request.get = function(url,data,config={}){
//     config.method = 'get',
//     config.params = data;
//     return instance.get(url,config)
// }
// request.post = function(url,data,config={}){
//     return instance.post(url,data,config)
// }
// request.put = function(url,data,config={}){
//     return instance.put(url,data,config)
// }
// request.delete = function(url,data,config={}){
//     config.method = 'delete',
//     config.params = data;
//     return instance.delete(url,config)
// }
// export default request;
// request('/user/check',{
//     params:{
//         username:'laoxie'
//     }
// })
// request.get('/user/check',{username:'laoxie'})

