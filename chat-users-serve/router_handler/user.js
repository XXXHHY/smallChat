/**
 * 在这里定义和用户相关的路由处理函数，供 /router/user.js 模块进行调用
 */
// 导入数据库操作模块
const db = require('../db/index')
// 导入加密相关的包
const bcrypt = require('bcryptjs')
// 用这个包来生成 Token 字符串
const jwt = require('jsonwebtoken')



// 注册用户的处理函数
exports.regUser = (req, res) => {
  // 接收表单数据
  const userinfo = req.body
  // 判断数据是否合法
  // if (!userinfo.username || !userinfo.password) {
  //   return res.send({
  //     status: 1,
  //     message: '用户名或密码不能为空！'
  //   })
  // }

  // 定义查询是否存在name的sql语句
  const sql = `select * from ev_users where username=?`
  // 执行 SQL 语句并根据结果判断用户名是否被占用：
  db.query(sql, [userinfo.username], function (err, results) {
    // 执行 SQL 语句失败
    if (err) {
      // return res.send({
      //   status: 1,
      //   message: err.message
      // })

      // 调用app.js全局封装的错误函数
      return res.cc(err)
    }
    // 用户名被占用
    if (results.length > 0) {
      // return res.send({
      //   status: 1,
      //   message: '用户名被占用，请更换其他用户名！'
      // })

      // 调用app.js全局封装的错误函数
      return res.cc('用户名被占用，请更换其他用户名！')
    }
    // TODO: 用户名可用，继续后续流程...
    db.query('select * from ev_users', (err, result) => {
      // 查询最后一条的id
      const id = result[result.length - 1].id + 1

      // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
      // 调用bcrypt.hashSync
      userinfo.password = bcrypt.hashSync(userinfo.password, 10)

      // 定义插入用户的 SQL 语句：
      const sql = 'insert into ev_users set ?'
      db.query(sql, {
        id: id,
        username: userinfo.username,
        password: userinfo.password,
        // nickname: userinfo.nickname,
        email: userinfo.email,
        // user_pic: userinfo.user_pic
      }, function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
          // return res.send({
          //   status: 1,
          //   message: err.message
          // })

          // 调用app.js全局封装的错误函数
          return res.cc(err)
        }
        // SQL 语句执行成功，但影响行数不为 1
        if (results.affectedRows !== 1) {
          // return res.send({
          //   status: 1,
          //   message: '注册用户失败，请稍后再试！'
          // })

          // 调用app.js全局封装的错误函数
          return res.cc('注册用户失败，请稍后再试！')
        }
        // 注册成功
        // res.send({
        //   status: 0,
        //   message: '注册成功！'
        // })

        res.cc('注册成功！', 0)
      })
    })
  })
}

// 登录的处理函数
exports.login = (req, res) => {
  // 接收表单数据
  const userInfo = req.body
  // console.log(userInfo);
  // 定义sql查询语句
  const sql = 'select * from ev_users where username=?'

  db.query(sql, userInfo.username, (err, result) => {
    // 执行sql语句失败
    if(err) return res.cc(err)
    // 执行sql语句成功
    // 没有找到该用户名
    if(result.length !== 1) return res.cc('登录失败')

    // 有该用户名
    // 验证密码
    // 拿着用户输入的密码,和数据库中存储的密码进行对比
    const compareResult = bcrypt.compareSync(userInfo.password, result[0].password)

    // 如果对比的结果等于 false, 则证明用户输入的密码错误
    if (!compareResult) {
      return res.cc('登录失败！')
    }
    
    // 登录成功，生成token字符串
    // 剔除完毕之后，user 中只保留了用户的 id, username, nickname, email 这四个属性的值
    const user = { ...result[0], password: '', user_pic: '' }

    // 导入配置文件
    const config = require('../config')

    // 生成 Token 字符串
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: '10h', // token 有效期为 10 个小时
    })

    // 将token响应给客户端
    res.send({
      status: 0,
      message: '登录成功！',
      // 为了方便客户端使用 Token，在服务器端直接拼接上 Bearer 的前缀
      token: 'Bearer ' + tokenStr,
      data: user
    })
})
}