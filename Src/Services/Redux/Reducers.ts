import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './UserSlice';

export const rootReducer = combineReducers({
  user: userReducer,
});

