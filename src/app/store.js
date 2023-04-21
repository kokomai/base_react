import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loadingReducer from '../fragments/loading/loadingSlice';
import userReducer from '../features/login/userSlice';
import timeoutReducer from '../fragments/timeoutAlert/timeoutSlice';
import popupReducer from '../fragments/popup/popupSlice';
import tabsReducer from '../fragments/tabs/tabsSlice';
import session from 'redux-persist/lib/storage/session';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';

const persistConfig = {
  key : 'root',
  storage: session,
}

const rootReducer = combineReducers({
  counter: counterReducer,
  loading: loadingReducer,
  user: userReducer,
  timeoutAlert: timeoutReducer,
  popup: popupReducer,
  tabs: tabsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk]
});

export const persistor = persistStore(store)