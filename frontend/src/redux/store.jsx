import { configureStore } from '@reduxjs/toolkit'
import userSlice from "./slice/userSlice"
import messageSlice from "./slice/messageSlice"
// store.js
export const store = configureStore({
  reducer: {
    userSlice,
    messageSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false // socket ke warning band ho jayenge
    })
});
