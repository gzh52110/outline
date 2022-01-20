import axios from 'axios' 

export const host = 'http://120.76.247.5:2003'
export const apiUrl = host + '/api'

// 创建axios实例:创建一个类似与axios的对象
const instance = axios.create({
    baseURL:apiUrl,
})

// 请求拦截：所有通关过instance发出的请求，都会进入以下代码
instance.interceptors.request.use(function (config) {
   // config={url,method,data,headers,params}
   let userInfo = localStorage.getItem("userInfo");
    try {
        userInfo = JSON.parse(userInfo) || {};
    } catch (err) {
        userInfo = {};
    }
   config.headers.Authorization = userInfo.authorization
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 响应拦截
// axios.interceptors.response.use(function (response) {
//     // response = {data,headers,...}
//     // Any status code that lie within the range of 2xx cause this function to trigger
//     // Do something with response data
//     return response;
// }, function (error) {
//     // Any status codes that falls outside the range of 2xx cause this function to trigger
//     // Do something with response error
//     return Promise.reject(error);
// });

export default instance
