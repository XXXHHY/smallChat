/**
 * 在这里定义和消息相关的路由处理函数，供 /router/chat.js 模块进行调用
 */
// 导入数据库操作模块
const db = require('../db/index')


// 获取好友列表的处理函数
exports.getList_friend = (req, res) => {
  // 接收前端传递过来的id值
  const {id} = req.body
  if(!id) return
  // id为有效值
  // 定义查询语句查询是否有这个用户
  const sql = 'select * from ev_users where id=?'

  db.query(sql, id, (err, result) => {
    if(err) {
      return res.cc(err)
    }

    // 没有这个用户
    if(result.length === 0) return

    // 有这个用户
    // 定义查询语句查询该用户的好友列表
    const sql = 'select * from friend_relationship where user_id=? or friend_id=?'


    db.query(sql, [id, id], (err, result) => {
      if(err) {
        return res.cc(err)
      }
      // console.log(result);

      // 定义一个数组，用来拿到该用户好友的id
      const arr = []
      // 拿到匹配的结果，是一个数组
      result.map(item => {
        if(item.user_id === +id) {
          arr.push(item.friend_id)
        }
        if(item.friend_id === +id) {
          arr.push(item.user_id)
        }
      })

      // 此时好友id已经在arr数组中
      // 定义查询好友数据的sql
      const sql = "select id,username from ev_users where FIND_IN_SET(id, ?)"
      // 按照条件查询好友信息
      db.query(sql, arr.toString(), (err, result) => {
        if(err) return res.cc(err)

        // 查询没有出错，包装结果
        res.send({
          status: 0,
          message: '获取数据成功！',
          data: result
        })
      })
    })
  })
}


// 添加好友的处理函数
exports.add_friend = (req, res) => {
  // 获取需要添加的好友的信息id
  const {user_id, friend_id} = req.body
  // console.log(user_id,friend_id)
  // 判断朋友关系表中是否已经存在
  const arr = [user_id < friend_id ? user_id: friend_id, user_id < friend_id ? friend_id : user_id]
  const searchSql = 'select * from friend_relationship where (user_id=? and friend_id=?)'
  db.query(searchSql, arr, (err, result) => {
    if(err) return res.cc(err)

    if(result.length !== 0) return res.cc('你们已经是朋友了！')

    // 定义查询字符串
    const sql = 'select * from ev_users where id=?'

    db.query(sql, friend_id, (err, result) => {
      if(err) return res.cc(err)

      // 查询成功，判断是否存在该用户
      if(result.length === 0) return res.cc('不存在该用户！')

      // 存在该用户
      // ------假设不需要对方同意,后续等待完善

      // 查询朋友列表的relation_id

      const sql = 'select * from friend_relationship'
      db.query(sql, (err, result) => {
        if(err) return res.cc(err)

        if(result.length !== 0) {
          const relation_id = result.length

          // 定义向数据库插入朋友关系数据的sql
          const insertSql = 'insert into friend_relationship (relation_id, user_id, friend_id) values (?, ?, ?)'
          db.query(insertSql, [+relation_id + 1, ...arr], (err, result) => {
            if(err) return res.cc(err)

            // console.log(relation_id, arr);
            // 插入成功
            res.send({
              status: 0,
              message: '添加好友成功！'
            })
          }) 
        }
      })
    })
  })
}


// 发送信息的处理函数
exports.send_message = (req, res) => {
  // 接收用户发送过来的消息
  const message = req.body

  // 获取最后一条信息的ID
  const sql_id = 'select * from msg_1'
  db.query(sql_id, (err, result) => {
    // console.log(result, '获取id');
    if(err) return res.cc(err)
    
    // 得到id
    let mag_id = result.length + 1

    // 定义插入信息的sql语句
    const sql = 'insert into msg_1 (msg_id, msg_text, msg_send, msg_receive, msg_date) values (?, ?, ?, ?, ?)'
    db.query(sql, [mag_id, message.text, message.send, message.receive, new Date()], (err, result) => {
      if(err) return res.cc(err)

      // console.log(result, '插入信息');
      res.send({
        status: 1,
        data:'发送消息成功！！'
      })
    })
  }) 
}

// 获取发送的信息的函数
exports.getList_message = (req, res) => {
  // 获取两个用户的id
  const {msg_send, msg_receive} = req.body

  // 定义查询字符串
  const sql = 'select * from msg_1 where (msg_send=? and msg_receive=?) or (msg_send=? and msg_receive=?)'
  db.query(sql, [msg_send, msg_receive, msg_receive, msg_send], (err, result) => {
    if(err) return res.cc(err)

    // console.log(result);
    res.send({
      data: {
        status: 1,
        message: '获取信息列表成功',
        data: result
      }
    })
  })
}