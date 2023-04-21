<<<<<<< HEAD
import { createSlice } from '@reduxjs/toolkit';
import Main from '../../features/main/Main';
import LANG from '../../app/language'

const initialState = {
  value: { 
    tabs: [
     
    ],
    index: 0
  },
  status: 'idle',
};

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setIndex: (state, action) => {
      state.value.index = action.payload;
    },
    add: (state, action) => {
      let temp = [...state.value.tabs];
      temp.push(action.payload);
      state.value.tabs = temp;
    },
    remove: (state, action) => {
      let temp = [...state.value.tabs];
      temp.splice(action.payload, 1);
      let newList = [];
      for(let tabs of temp) {
        newList.push(tabs);
      }
      state.value.tabs = newList;
      if(state.value.tabs.length > 0) {
        state.value.index = state.value.tabs.length-1;
      } else {
        state.value.index = 0;
      }
    },
    switch: (state, action) => {
      let temp = [...state.value.tabs];
    },
  },
});

export const { 
  add,
  remove,
  setIndex
} = tabsSlice.actions;

export const selectTabs = (state) => state.tabs.value;

export default tabsSlice.reducer;
=======
import { createSlice } from '@reduxjs/toolkit';
import Main from '../../features/main/Main';
import LANG from '../../app/language'

const initialState = {
  value: { 
    tabs: [
     
    ],
    index: 0
  },
  status: 'idle',
};

export const tabsSlice = createSlice({
  name: 'tabs',
  initialState,
  reducers: {
    setIndex: (state, action) => {
      state.value.index = action.payload;
    },
    add: (state, action) => {
      let temp = [...state.value.tabs];
      temp.push(action.payload);
      state.value.tabs = temp;
    },
    remove: (state, action) => {
      let temp = [...state.value.tabs];
      temp.splice(action.payload, 1);
      let newList = [];
      for(let tabs of temp) {
        newList.push(tabs);
      }
      state.value.tabs = newList;
      if(state.value.tabs.length > 0) {
        state.value.index = state.value.tabs.length-1;
      } else {
        state.value.index = 0;
      }
    },
    switch: (state, action) => {
      let temp = [...state.value.tabs];
    },
  },
});

export const { 
  add,
  remove,
  setIndex
} = tabsSlice.actions;

export const selectTabs = (state) => state.tabs.value;

export default tabsSlice.reducer;
>>>>>>> 9f0664ac30d3fd670a3bcb1a34268c932f907d3f
