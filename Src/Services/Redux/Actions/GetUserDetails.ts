import { createAsyncThunk } from '@reduxjs/toolkit';
import { AgentAPI } from '@Services/API/Agent';

export const fetchUser = createAsyncThunk('user/fetchUser', async (email: string) => {
  try {
    const response = await AgentAPI.Account.Create(email, email, 'pradsadf@gmail.com');
    return response;
  } catch (error) {
    throw error?.response?.data;
  }
});


