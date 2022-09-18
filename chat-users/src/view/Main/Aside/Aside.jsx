import React from 'react'
import {useSelector, useDispatch} from 'react-redux/es/exports'
import c from './Aside.module.css'
import { useState } from 'react';
import {add_friend, getList_message} from '../../../utils/api/chat'
import {updataState, setChatMsg, setChatInfo} from '../../../store/reducer/chat'
import { useEffect } from 'react';
import { useCallback } from 'react';

export default function Aside() {
  const userInfo = useSelector(state => state.user)
  const chatInfo = useSelector(state => state.chat)
  const dispatch = useDispatch()
  

  // 定义添加好友input的状态
  const [friendId, setFriendId] = useState('')

  // 定义添加好友的
  const addFriend = async () => {
    // 定义数据结构
    const data = {
      user_id: userInfo.id,
      friend_id: friendId
    }
    const result = await add_friend(data)
    console.log(result,friendId)
    if(result.status === 0) {
      dispatch(updataState())
    }
  }

  // 点击好友获取聊天数据并缓存msg_send,msg_receive
  const setInfo = item => {
    dispatch(setChatInfo({
      targetName: item.username,
      targetId: item.id
    }))
  } 


  const getMsg = useCallback((item) => {
    console.log(item);
    (async () => {
        console.log(11111111);
        // 定义数据结构
        const data = {
          msg_send: userInfo.id,
          msg_receive: item.id
        }
        const result = await getList_message(data)
        console.log(result)
        if(result.data.status === 1) {
          // dispatch(setChatInfo({
          //   targetName: item.username,
          //   targetId: item.id
          // }))
          dispatch(setChatMsg(result.data.data))
          console.log(chatInfo,'chatInfo');
        }
    
      })()
  }, [])

  // const getMsg = async item => {
  //   // 定义数据结构
  //   const data = {
  //     msg_send: userInfo.id,
  //     msg_receive: item.id
  //   }
  //   const result = await getList_message(data)
  //   console.log(result)
  //   if(result.data.status === 1) {
  //     // dispatch(setChatInfo({
  //     //   targetName: item.username,
  //     //   targetId: item.id
  //     // }))
  //     dispatch(setChatMsg(result.data.data))
  //     console.log(chatInfo,'chatInfo');
  //   }

  // }

  useEffect(() => {
    console.log(22222);
    getMsg({
      id: chatInfo.targetId,
      username: chatInfo.targetName
    })
  }, [chatInfo.updataMsg, chatInfo.targetId, chatInfo.targetName, getMsg])

  return (
    <div>
      <div className={c.user}>
        <img src="#" alt="" />
        <span>{userInfo.username}</span>
      </div>
      <div className={c.list}>
        <div className={c.title}>我的好友</div>
        <ul>
            {
              chatInfo.friendList.map(item => {
                return (
                  <li key={item.id} onClick={() => setInfo(item)}>
                    <img src="#" alt="" />
                    <span>{item.username}</span>
                  </li>
                )
              })
            }
        </ul>
      </div>
      <div className={c.add}>
        <input value={friendId} onChange={(e) => setFriendId(e.target.value)} type="text" placeholder='请输入该用户专属ID'/>
        <button onClick={addFriend}>添加好友</button>
      </div>
    </div>
  )
}
