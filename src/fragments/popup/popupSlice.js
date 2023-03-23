import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { 
    alert: false, confirm: false, popup: false, title: "", text: "",
    alertBtnText: "", confirmBtnText: "", cancelBtnText: "", onConfirm: function() {}
    , onCancel: function() {}
  },
  status: 'idle',
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    showAlert: (state) => {
      let temp = {...state.value};
      temp.alert = true;
      state.value = temp;
    },
    hideAlert: (state) => {
      let temp = {...state.value};
      temp.alert = false;
      state.value = temp;
    },
    showConfirm: (state) => {
      let temp = {...state.value};
      temp.confirm = true;
      state.value = temp;
    },
    hideConfirm: (state) => {
      let temp = {...state.value};
      temp.confirm = false;
      state.value = temp;
    },
    setTitle: (state, action) => {
      let temp = {...state.value};
      temp.title = action.payload;
      state.value = temp;
    },
    setText: (state, action) => {
      let temp = {...state.value};
      temp.text = action.payload;
      state.value = temp;
    },
    setAlertBtnText: (state, action) => {
      let temp = {...state.value};
      temp.alertBtnText = action.payload;
      state.value = temp;
    },
    setConfirmBtnText: (state, action) => {
      let temp = {...state.value};
      temp.confirmBtnText = action.payload;
      state.value = temp;
    },
    setCancelBtnText: (state, action) => {
      let temp = {...state.value};
      temp.cancelBtnText = action.payload;
      state.value = temp;
    },
    setOnConfirm: (state, action) => {
      let temp = {...state.value};
      temp.onConfirm = action.payload;
      state.value = temp;
    },
    setOnCancel: (state, action) => {
      let temp = {...state.value};
      temp.onCancel = action.payload;
      state.value = temp;
    },
  },
});

export const { 
  showAlert, hideAlert, showConfirm, hideConfirm, 
  setTitle, setText, setAlertBtnText, setConfirmBtnText,
  setCancelBtnText, setOnConfirm, setOnCancel
} = popupSlice.actions;

export const selectPopup = (state) => state.popup.value;

export default popupSlice.reducer;
