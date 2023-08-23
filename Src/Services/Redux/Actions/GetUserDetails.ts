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
};

export const createAccountUsingEmail = createAsyncThunk(
  'user/createAccountUsingEmail',
  async (payload: UserPayload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await AgentAPI.Account.Create(
        payload.UserName,
        payload.EMail,
        payload.Password
      );
      return fulfillWithValue(response);
    } catch (error) {
      const message =
        typeof error?.message === 'string'
          ? error?.message
          : error?.message?.Message;
      const alternatives = error?.alternatives;
      throw rejectWithValue({message, alternatives});
    }
  }
);

export const createAccountUsingMobileNumber = createAsyncThunk(
  'user/createAccountUsingMobileNumber',
  async (mobileNumber: string, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await OnboardingAPI.ID.sendVerificationMessage(
        mobileNumber
      );
      return fulfillWithValue(response);
    } catch (error) {
      const message =
        typeof error?.message === 'string'
          ? error?.message
          : error?.message?.Message;
      throw rejectWithValue(message);
    }
  }
);

export const saveEmail = createAsyncThunk(
  'user/saveEmail',
  async (email: string) => {
    try {
      return email;
    } catch (error) {
      throw error;
    }
  }
);

export const saveNumber = createAsyncThunk(
  'user/saveNumber',
  async (mobileNumber: {}) => {
    try {
      return mobileNumber;
    } catch (error) {
      throw error;
    }
  }
);

export const addUserName = createAsyncThunk(
  'user/addUserName',
  async (userName: string) => {
    try {
      return userName;
    } catch (error) {
      throw error;
    }
  }
);

export const saveAccountPassword = createAsyncThunk(
  'user/saveAccountPassword',
  async (accountPassword: string) => {
    try {
      return accountPassword;
    } catch (error) {
      throw error;
    }
  }
);

export const saveKeyId = createAsyncThunk(
  'user/saveKeyId',
  async (keyId: string) => {
    try {
      return keyId;
    } catch (error) {
      throw error;
    }
  }
);

export const saveKeyIdPassword = createAsyncThunk(
  'user/saveKeyIdPassword',
  async (keyPassword: string) => {
    try {
      return keyPassword;
    } catch (error) {
      throw error;
    }
  }
);

export const selectedPupose = createAsyncThunk(
  'user/selectedPupose',
  async (selectedPupose: ContextType) => {
    try {
      return selectedPupose;
    } catch (error) {
      throw error;
    }
  }
);

export const saveLegalID = createAsyncThunk(
  'user/saveLegalID',
  async (legalID: string) => {
    try {
      return legalID;
    } catch (error) {
      throw error;
    }
  }
);

//Onboarding---

export const getUsersCountry = createAsyncThunk(
  'user/getUsersCountry',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await OnboardingAPI.ID.CountryCode();
      return fulfillWithValue(response);
    } catch (error) {
      const message =
        typeof error?.message === 'string'
          ? error?.message
          : error?.message?.Message;
      throw rejectWithValue(message);
    }
  }
);
