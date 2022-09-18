const express = require('express')

const router = express.Router()

// 导入用户路由处理函数模块
const chatHandler = require('../router_handler/chat')

// 1. 导入验证表单数据的中间件
// const expressJoi = require('@escook/express-joi')
// 2. 导入需要的验证规则对象
// const { reg_rule, login_rule } = require('../rules/chat')


// 获取好友列表
// router.get('/get', expressJoi(reg_rule), userHandler.regUser)
router.post('/getList_friend', chatHandler.getList_friend)

// 添加一个好友
router.post('/add_friend', chatHandler.add_friend)

// 获取会话信息列表
router.post('/getList_message', chatHandler.getList_message)

// 发送信息
router.post('/send_message', chatHandler.send_message)




module.exports = router