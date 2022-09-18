# smallChat

### 前端部分
#### 1.主要技术栈  
有 react18 + redux搭配reduxjs/toolkit + antd（主要布局和小组件） + react-router6 等等
#### 2.主要功能有
不需要权限认证的：登录注册，该功能不需要token认证  
需要权限认证：添加好友（通过id单向添加，后续把id设置成随机ID的拼串，防止乱输入id也能添加好友）、实时发送接收消息（只使用于小范围使用，因为是短线程连接（尴尬））

### 后端部分
主要用express搭建的服务器，设置了cors跨域中间件，token生成和认证的中间件，解析表单格式的数据中间件。其中包含了前端用到的几个接口

### 数据库部分
我用的mysql，软件是Navicat，用到了三张表：一张用户表（id,username,password,email）、一张关系表（relation_id, user_id, friend_id）、一张消息表（msg_id,msg_send,msg_receive,msg_date,其中前三个全是id）

#### 有事留言谢谢
#### 自用的练习项目，因为忽然想做一个这种项目，所以自己构思做的，没有抄袭没有抄袭

