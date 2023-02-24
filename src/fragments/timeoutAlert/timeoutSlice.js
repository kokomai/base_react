import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
  status: 'idle',
};

export const timeoutSlice = createSlice({
  name: 'timeoutAlert',
  initialState,
  reducers: {
    showTimeoutAlert: (state) => {
      state.value = true;
    },
    hideTimeoutAlert: (state) => {
      state.value = false;
    },
  },
});

export const { showTimeoutAlert, hideTimeoutAlert } = timeoutSlice.actions;

export const selectTimeoutAlert = (state) => state.timeoutAlert.value;

export default timeoutSlice.reducer;
