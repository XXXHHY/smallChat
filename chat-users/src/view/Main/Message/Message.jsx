import React, { useState } from 'react'
import {Button} from 'antd'
import {useSelector, useDispatch} from 'react-redux/es/exports'
import { send_message } from '../../../utils/api/chat' 
import c from './Message.module.css'
import { updataState } from '../../../store/reducer/chat'


export default function Message() {
  // 定义input输入框状态
  const [msg, setMsg] = useState()

  const userInfo = useSelector(state => state.user)
  const chatInfo = useSelector(state => state.chat)
  const dispatch = useDispatch()


  // 定义发送消息的处理函数
  const sendMsg = async () => {
    if(msg.trim() === '' || chatInfo.targetId === '' || userInfo.id === '') return
    const data = {
      text: msg,
      send: userInfo.id,
      receive: chatInfo.targetId
    }
    const result = await send_message(data)
    console.log(result);
    if(result.status === 1) {
      dispatch(updataState())
      setMsg('')
    }
  }
  return (
    <div className={c.message}>
      <input value={msg} onChange={e => setMsg(e.target.value)} type="text" placeholder='点击输入内容'/>
      <Button onClick={sendMsg}>发送</Button>
    </div>
  )
}
