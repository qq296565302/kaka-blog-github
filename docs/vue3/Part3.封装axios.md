# 封装 axios

🔴 正在编写...
todo...

### 简易版封装

```JavaScript
// utils/request.js
import axios from 'axios'
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 8000,
})
// 请求拦截器
service.interceptors.request.use(config => {
  // 处理配置...
  return config
})
// 响应拦截器
service.interceptors.response.use(res => {
  // 处理响应...
  return res
})
function request(options) {
  options.method = options.method || 'get'
  if (options.method.toLowerCase() === 'get') {
    options.params = options.data;
  }
  return service(options)
}
// 对外暴露
export default request
```

在组件中使用方式：

```JavaScript
// 组件中
import request from '@/utils/request'

// 发送请求
request({
  method: 'post',
  url: '/user',
  data: {
    name: 'jack'
  }
})
```

这么编写可以实现:

-   支持统一的请求方法
-   统一处理 `param` 和 `data` 参数
-   支持请求和响应拦截
-   统一处理请求异常等
    从而提高代码复用性和可维护性。

### axios 登录失效后，阻止其他请求

应用场景：用户登录太长时间`token`过期，导致后续请求异常，需要及时弹框提醒用户跳转到登录页重新登录。如果在全局`axios`做了弹出框提示处理，那么当`token`过期的后续请求接口有很多个时，弹出框对应的就会有很多个。这时我们就需要阻止其他后续接口的请求，使弹框提示只弹出一次，提高用户体验。

```JavaScript
// request.js
const cancelToken = axios.CancelToken
let source = cancelToken.source()

axios.interceptors.request.use(
    config => {
        config.cancelToken = source.token; // 全局添加cancelToken
            return config;
        },
        err => {
            return Promise.reject(err);
        }
   )

axios.interceptors.response.use(
    response => {
        // 登录失效 401
        if ( response.data.code === 401) {
            source.cancel('登录信息已过期'); // 取消其他正在进行的请求
           // some coding
        }
        return response;
    },
    error => {
        if (axios.isCancel(error)) { // 取消请求的情况下，终端Promise调用链
            return new Promise(() => {});
        } else {
            return Promise.reject(error);
        }
    }
)
```

### `Axios`使用`cancel token`取消请求后，无法再次发送请求的问题及解决思路

问题复现：

-   当执行`cancelReauest`操作时，中断接口请求，控制台打印错误信息
-   重新发起请求，请求却直接中断，错误被 catch 捕获，控制台打印错误信息

猜测及理解：

-   在执行`cancelReauest`方法之前，打印了`source`对象查看数据结构，发现`token`下有一个`promise`对象，此时它的状态是`pending`
-   当执行完`cancelReauest`方法之后，此时`promise`的状态变成了`fulfilled`，并且多了一个`reason`对象，里面放着上次中断请求传递的信息
-   于是大胆猜测，请求中断是根据`source.token`下`promise`的状态进行控制的
    -   当状态为`pending`时，可以正常发起请求
    -   当状态为`fulfilled`时，请求中断
-   在问题复现的过程中：
    -   存储在`data`中的`source`对象，它`token`里的`promise`状态已经修改为`fulfilled`
    -   当再次发送请求，`config`中携带的是状态为`fulfilled`的`source`对象，所有请求直接中断

解决思路：

-   重新给`source`对象赋值，刷新`promise`状态

```JavaScript
const cancelToken = axios.CancelToken

cancelReauest() {
  source.cancel('Stop')
  source = cancelToken.source()   // 重新赋值
}
```
