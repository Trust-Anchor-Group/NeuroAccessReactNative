import { createAsyncThunk } from '@reduxjs/toolkit';
import { AgentAPI } from '@Services/API/Agent';

interface UserPayload {
  UserName: string;
  EMail: string;
  Password: string;
  ApiKey?: string;
  Secret?: any;
  Seconds?: number;
}

export const fetchUser = createAsyncThunk(
  'user/fetchUser',
  async (payload: UserPayload) => {
    try {
      const response = await AgentAPI.Account.Create(
        payload.UserName,
        payload.EMail,
        payload.Password,
        payload.ApiKey,
        payload.Secret,
        payload.Seconds,
      );
      return response;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);
