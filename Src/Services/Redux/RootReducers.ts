import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './Reducers/UserSlice';
import cryptoReducer from './Reducers/CryptoSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  crypto: cryptoReducer,
});

