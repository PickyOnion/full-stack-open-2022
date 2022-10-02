import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      state.push(action.payload);
      console.log("action.payload", action.payload);
      console.log("state.notification", state.notification);
    },
    deleteNotification: () => initialState,
  },
});

export const setEasyNotification = (message, time) => {
  return (dispatch) => {
    dispatch(setNotification(message));
    setTimeout(() => {
      dispatch(deleteNotification());
    }, time * 1000);
  };
};

export const { setNotification, deleteNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
