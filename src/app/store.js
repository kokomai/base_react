import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loadingReducer from '../fragments/loading/loadingSlice';
import userReducer from '../features/login/userSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    loading: loadingReducer,
    user: userReducer
  },
});
