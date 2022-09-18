import axios from 'axios'

const request = axios.create({
  baseURL: 'http://127.0.0.1:3007',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': sessionStorage.getItem('token')
  }
})

// // 请求拦截器
// request.interceptors.request.use(config => {


//   return config
// })

// 响应拦截器
request.interceptors.response.use(
  res => {
    return res.data
  },
  // err => {
  //   return err
  // }
)

export default request
