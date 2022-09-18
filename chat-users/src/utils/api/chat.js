import request from "../request";
import qs from 'qs'

// 定义获取好友列表的api
// data包括自己的id
export const getList_friend = data => {
  return request({
    url: '/chat/getList_friend',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 定义添加好友的api
// data包括自己的user_id和friend_id
export const add_friend = data => {
  return request({
    url: '/chat/add_friend',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 定义发送信息的api
// data包括.text, .send, .receive三个参数，后两个是id值
export const send_message = data => {
  return request({
    url: '/chat/send_message',
    method: 'post',
    data: qs.stringify(data)
  })
}

// 定义获取信息列表的api
// data包括msg_send,msg_receive两个参数，两个都是id值
export const getList_message = data => {
  return request({
    url: '/chat/getList_message',
    method: 'post',
    data: qs.stringify(data)
  })
}