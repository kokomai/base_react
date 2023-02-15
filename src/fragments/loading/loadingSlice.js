import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
  status: 'idle',
};

export const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    show: (state) => {
      state.value = true;
    },
    hide: (state) => {
      state.value = false;
    },
  },
});

export const { show, hide } = loadingSlice.actions;

export const selectLoading = (state) => state.loading.value;

export default loadingSlice.reducer;
