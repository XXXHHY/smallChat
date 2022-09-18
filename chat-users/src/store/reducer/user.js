import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: '',
  username: '',
  email: '',
  status: '',
  token: ''

}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo(state, {payload}) {
      state.id = payload.id
      state.username = payload.username
      state.email = payload.email
      state.status = payload.status
      state.token = payload.token
    },
    clearUserInfo(state) {
      state = initialState
    }
  }
})

export const {setUserInfo, clearUserInfo} = userSlice.actions
export default userSlice.reducer