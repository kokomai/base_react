import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { id: '', name: ''},
  status: 'idle',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setId: (state, action) => {
      let temp = {...state.value};
      temp.id = action.payload;
      state.value = temp;
    },
    setName: (state, action) => {
      let temp = {...state.value};
      temp.name = action.payload;
      state.value = temp;
    },
  },
});

export const { setId, setName } = userSlice.actions;

export const selectUser = (state) => state.user.value;

export default userSlice.reducer;
