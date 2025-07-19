import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: null,
  otherUsers:null,
  selectedUser:null,
  socket: null,
  onlineUsers:null,
  searchData:null
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
   setUserData : (state, action)=>{
      state.userData = action.payload
   },
    setOtherUsers : (state, action)=>{
      state.otherUsers = action.payload
   },
    setSelectedUser : (state, action)=>{
      state.selectedUser = action.payload
   },
    setSocket : (state, action)=>{
      state.socket = action.payload
   },
    setOnlineUser : (state, action)=>{
      state.onlineUsers = action.payload
   },
     setSearchData : (state, action)=>{
      state.searchData = action.payload
   }
  },
})

export default userSlice.reducer
export const {setUserData, setOtherUsers, setSelectedUser, setSocket, setOnlineUser, setSearchData} = userSlice.actions;