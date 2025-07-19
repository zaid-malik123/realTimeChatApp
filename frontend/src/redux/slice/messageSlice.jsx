// redux/slice/messageSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: []
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload; // puri list set
    },
    appendMessage: (state, action) => {
      state.messages.push(action.payload); // ek ek msg add
    }
  }
});

export const { setMessages, appendMessage } = messageSlice.actions;
export default messageSlice.reducer;
