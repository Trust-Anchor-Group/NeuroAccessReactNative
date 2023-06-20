import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './Reducers/UserSlice';

export const rootReducer = combineReducers({
  user: userReducer,
});

