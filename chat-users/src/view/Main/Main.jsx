import { Layout, Button } from 'antd';
import React, { useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux/es/exports'
import c from './Main.module.css'
import Aside from './Aside/Aside';
import {getList_friend} from '../../utils/api/chat'
import {setFriendList, clearChatInfo} from '../../store/reducer/chat'
import { clearUserInfo } from '../../store/reducer/user';
import Chat from './Chat/Chat';
import Message from './Message/Message';
const { Header, Sider, Content } = Layout;

export default function Main() {
  const userInfo = useSelector(state => state.user)
  const chatInfo = useSelector(state => state.chat)
  const dispatch = useDispatch()

  // 初次登录进入该页面会向服务器发送请求拿到好友数据
  useEffect(() => {
    return async () => {
      const result = await getList_friend({id: userInfo.id, token: sessionStorage.getItem('token')})
      console.log(result)
      if(result.status === 0) {
        dispatch(setFriendList(result.data))
      }
    }
  }, [userInfo.id, dispatch, chatInfo.updataMsg])

  // console.log(chatInfo,'main');

  const navigate = useNavigate()
  // 退出登录的处理函数
  const logout = () => {
    dispatch(clearUserInfo())
    dispatch(clearChatInfo())
    sessionStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className={c.wrapper}>
      <Layout className={c.layout}>
        <Sider width='25%' style={{backgroundColor: 'rgb(41, 41, 49)'}} className={c.sider}><Aside/></Sider>
        <Layout className={c.right}>
          <Header className={c.header}>
            <Button onClick={logout}>退出登录</Button>
          </Header>
          <Content className={c.content}>
            <Chat/>
          </Content>
          <div className={c.footer}>
            <Message/>
          </div>
        </Layout>
      </Layout>
    </div>
  )
}
