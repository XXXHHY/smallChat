import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  targetName: '',
  targetId: '',
  friendList: [],
  targetMsg: [],
  historyMsg: [],
  updataMsg: ''
}



const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatInfo(state, {payload}) {
      state.targetName = payload.targetName
      state.targetId = payload.targetId
    },
    setChatMsg(state, {payload}) {
      state.targetMsg = payload
      state.historyMsg.push(payload)
    },
    setFriendList(state, {payload}) {
      state.friendList = payload
    },
    updataState(state) {
      state.updataMsg = `${new Date()}`
    },
    clearChatInfo(state) {
      state = initialState
    }
  }
})

export const {setChatInfo, setChatMsg, updataState, setFriendList, clearChatInfo} = chatSlice.actions
export default chatSlice.reducer