// 这里为了后续更清楚的书写代码,我们将原有代码注释掉,换成如下代码
// 参考https://blog.csdn.net/Web_chicken/article/details/117111251
// 导出一个axios的实例  而且这个实例要有请求拦截器 响应拦截器
// import axios from 'axios'
// const service = axios.create() // 创建一个axios的实例
// service.interceptors.request.use()
// 请求拦截器service.interceptors.response.use()
// 响应拦截器export default service // 导出axios实例




import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import $ from "jquery";

// 参考https://blog.csdn.net/Web_chicken/article/details/117111251

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: global_config.BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor请求拦截器主要处理 token的**统一注入问题**
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      // 请求拦截器主要处理 token的**统一注入问题**
      console.log('token注入')
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log('未找到token')
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor 响应拦截器主要处理 返回的**数据异常** 和**数据结构**问题
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
