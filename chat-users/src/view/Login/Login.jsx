import React, { useState } from 'react'
import {useDispatch} from 'react-redux/es/exports'
import {useNavigate} from 'react-router-dom'
import {register, login} from '../../utils/api/user'
import {setUserInfo} from '../../store/reducer/user'
import c  from './Login.module.css'



export default function Login() {
  // 定义是登录还是注册的状态
  const [isLogin, setIsLogin] = useState(true)

  // 处理登录注册状态切换的函数
  const changeState = (e) => {
    e.preventDefault()
    setIsLogin(pre => !pre)
  }

  // 使用hooks调用store中的数据
  // const {username, email, password} = useSelector(state => state.user)
  // 定义input框中的状态
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 定义注册的处理函数
  const registerHandle = async (e) => {
    e.preventDefault()
    const data = {
      username,
      password,
      email
    }
    const result = await register(data)
    if(result.status === 0) {
      setIsLogin(true)
      alert(result.message)
    }
  }

  // 定义登录的处理函数
  const loginHandle = async (e) => {
    e.preventDefault()
    const data = {
      username,
      password
    }
    const result = await login(data)
    console.log(result)
    if(result.status === 0) {
      dispatch(setUserInfo({
        id: result.data.id,
        username,
        email,
        status: 'on',
        token: result.token
      }))
      sessionStorage.setItem('token', result.token)
      navigate('/main')
    } 
    
  }

  return (
    <div className={c.login}>
      <div className={c.title}>
        <h2>{isLogin ? '登录' : '注册'}</h2>
      </div>
      <form className={c.form}>
        <div className={c.username}>
          <label htmlFor="username">用户名：</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} id='username' type="text" placeholder='请输入用户名'/>
        </div>
        <div className={c.password}>
          <label htmlFor="password">密&nbsp;&nbsp;&nbsp;&nbsp;码：</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} id='password' type="password" placeholder='请输入密码'/>
        </div>
        {
          !isLogin &&
          <div className={c.email}>
            <label htmlFor="email">邮&nbsp;&nbsp;&nbsp;&nbsp;箱：</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} id='email' type="email" placeholder='请输入电子邮箱'/>
          </div>
        }
        <div className={c.btn}>
          <button onClick={changeState}>{isLogin ? '没有账号？点击注册' : '已有账号？点击登录' }</button>
          {isLogin && <button onClick={loginHandle}>登录</button>}
          {!isLogin && <button onClick={registerHandle}>注册</button>}
        </div>
      </form>
    </div>
  )
}
