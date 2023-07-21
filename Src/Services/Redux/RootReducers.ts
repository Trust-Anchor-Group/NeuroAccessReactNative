import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './Reducers/UserSlice';
import domainSlice from './Reducers/DomainSlice';
import cryptoReducer from './Reducers/CryptoSlice';
import IdentitySlice from './Reducers/IdentitySlice';

export const rootReducer = combineReducers({
  user: userReducer,
  domain: domainSlice,
  crypto: cryptoReducer,
  identity: IdentitySlice,
});

