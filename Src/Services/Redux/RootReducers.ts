import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './Reducers/UserSlice';
import domainSlice from './Reducers/DomainSlice';
import cryptoReducer from './Reducers/CryptoSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  domain: domainSlice,
  crypto: cryptoReducer,
});

