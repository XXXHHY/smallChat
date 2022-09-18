// 导入express
const express = require('express')
const path = require('path')
// 创建实例对象
const app = express()
// 解析 token 的中间件:5.3.3版本的包
const expressJWT = require('express-jwt')

// 跨域解决方案cors
const cors = require('cors')
app.use(cors())

// 配置解析表单数据的中间件:解析application/x-www-from-urlencoded
app.use(express.urlencoded({extended: false}))

// 加载静态资源路径
app.use(express.static(__dirname + '/public'))

// 将所有请求交给index.html处理
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'))
})


// 响应数据的中间件，全局的错误返回函数，或者成功的返回函数
app.use(function (req, res, next) {
  // status = 0 为成功； status = 1 为失败； 默认将 status 的值设置为 1，方便处理失败的情况
  res.cc = function (err, status = 1) {
    res.send({
      // 状态
      status,
      // 状态描述，判断 err 是 错误对象 还是 字符串
      message: err instanceof Error ? err.message : err,
    })
  }
  next()
})

// -------以下是解析token的配置
// 导入配置文件
const config = require('./config')

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
// app.use(expressJWT({ secret: config.jwtSecretKey }).unless({ path: [/^\/chat\//] }))
// 导入并注册用户路由模块,该模块不需要权限
const userRouter = require('./router/user')
app.use('/api', userRouter)
// 导入并注册消息路由模块，该模块需要权限
const chatRouter = require('./router/chat')
app.use('/chat', chatRouter)

// 导入并使用用户信息路由模块
// const userinfoRouter = require('./router/userinfo')
// // 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证
// app.use('/my', userinfoRouter)

// 导入验证的包，里面包含joi.ValidationError错误类型
const joi = require('joi')

// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 捕获身份认证失败的错误
  if (err.name === 'UnauthorizedError') return res.cc('身份认证失败！')
  // 未知错误
  res.cc(err)
})

// 启动服务器
app.listen(3007, () =>{
  console.log('服务器已经启动！！ http://127.0.0.1:3007');
})