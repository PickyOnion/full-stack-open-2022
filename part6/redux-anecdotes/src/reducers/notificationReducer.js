import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setNotification(state, action) {
      console.log("action.payload", action.payload);
      if (state.timer) {
        clearTimeout(state.timer);
      }
      state.message = action.payload.message;
      state.visible = true;
      state.timer = action.payload.timer;
    },
    deleteNotification: () => initialState,
  },
});

export const setEasyNotification = (message, time) => {
  return (dispatch) => {
    const timer = setTimeout(() => dispatch(deleteNotification()), time * 1000);
    const notification = {
      message: message,
      timer: timer,
    };
    dispatch(setNotification(notification));
  };
};

export const { setNotification, deleteNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
