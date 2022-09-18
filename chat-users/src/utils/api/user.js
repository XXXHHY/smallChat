import request from "../request";
import qs from 'qs'


// 定义注册的api
// data包含username,password,email
export const register = data => {
  return request({
    url: '/api/register',
    method: 'post',
    data: qs.stringify(data),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

// 定义登录的api
// data包含username,password
export const login = data => {
  return request({
    url: '/api/login',
    method: 'post',
    data: qs.stringify(data),
    // headers: {
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // }
  })
}
