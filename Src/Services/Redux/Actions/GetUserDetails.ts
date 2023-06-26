import { createAsyncThunk } from '@reduxjs/toolkit';
import { AgentAPI } from '@Services/API/Agent';
import { OnboardingAPI } from '@Services/API/OnboardingApi';
import { ContextType } from '@Services/Data';

export type UserPayload = {
  UserName: string;
  EMail: string;
  Password: string;
  ApiKey?: string;
  Secret?: any;
  Seconds?: number;
}

export const sendEmailVerificationMessage = createAsyncThunk(
  'user/sendEmailVerificationMessage',
  async (email: string) => {
    try {
      const response = await OnboardingAPI.ID.sendEmailVerificationMessage(
        email,
      );
      return response ;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);

export const createAccountUsingEmail = createAsyncThunk(
  'user/createAccountUsingEmail',
  async (payload: UserPayload) => {
    try {
      const response = await AgentAPI.Account.Create(
        payload.UserName,
        payload.EMail,
        payload.Password,
      );
      return response ;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);

export const createAccountUsingMobileNumber = createAsyncThunk(
  'user/createAccountUsingMobileNumber',
  async (mobileNumber: string) => {
    try {
      
      const response = await OnboardingAPI.ID.sendVerificationMessage(mobileNumber);
      return response ;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);

export const saveEmail = createAsyncThunk(
  'user/saveEmail',
  async (email: string) => {
    try {
      return email
    } catch (error) {
      throw error?.response?.data;
    }
  }
);

export const saveNumber = createAsyncThunk(
  'user/saveNumber',
  async (mobileNumber: {}) => {
    try {
      return mobileNumber
    } catch (error) {
      throw error?.response?.data;
    }
  }
);

export const addUserName = createAsyncThunk(
  'user/addUserName',
  async (userName: string) => {
    try {
      return userName;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);

export const selectedPupose = createAsyncThunk(
  'user/selectedPupose',
  async (selectedPupose: ContextType) => {
    try {
      return selectedPupose;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);



