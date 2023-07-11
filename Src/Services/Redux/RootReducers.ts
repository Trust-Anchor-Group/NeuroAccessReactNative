import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './Reducers/UserSlice';
import domainSlice from './Reducers/DomainSlice';

export const rootReducer = combineReducers({
  user: userReducer,
  domain: domainSlice,
});

