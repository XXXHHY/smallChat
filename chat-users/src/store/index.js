import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducer/user'
import chatReducer from './reducer/chat'

const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatReducer
  }
})

export default store