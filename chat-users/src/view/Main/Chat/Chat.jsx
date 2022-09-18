import React from 'react'
import {useSelector} from 'react-redux/es/exports'

import c from './Chat.module.css'

export default function Chat() {
  const chatInfo = useSelector(state => state.chat)
  const userInfo = useSelector(state => state.user)
  console.log(chatInfo);
  return (
    <div className={c.chat}>
      <ul>
        {
          chatInfo.targetName && chatInfo.targetId &&
          chatInfo.targetMsg.map(item => {
            return (
              <li 
                className={c.item} 
                key={item.msg_id}
                style={{justifyContent: item.msg_send === userInfo.id ? 'flex-end' : 'flex-start'}}
                >
                {
                  item.msg_send === userInfo.id && 
                  <div className={c.msg}>
                    {item.msg_text}
                  </div> 
                }

                <div className={c.user}>
                  <img src="#" alt="" />
                  <span>{item.msg_send === userInfo.id ? userInfo.username : chatInfo.targetName}</span>
                </div>
                
                {
                  item.msg_send !== userInfo.id && 
                  <div className={c.msg}>
                    {item.msg_text}
                  </div> 
                }
                

              </li>
            )
          })
        }

        {
          !chatInfo.targetId && <span>您还没有添加对话哦！</span>
        }    
      </ul>
    </div>
  )
}
