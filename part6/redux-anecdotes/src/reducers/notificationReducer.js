import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.push(action.payload);
      console.log("action.payload", action.payload);
    },
    deleteNotification: () => initialState,
  },
});

export const { setNotification, deleteNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
