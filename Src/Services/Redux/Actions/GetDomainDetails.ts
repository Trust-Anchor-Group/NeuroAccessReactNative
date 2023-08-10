import { createAsyncThunk } from '@reduxjs/toolkit';
import { AgentAPI } from '@Services/API/Agent';
import { OnboardingAPI } from '@Services/API/OnboardingApi';
import { ContextType } from '@Services/Data';
import { DomainInfo } from '../Reducers/DomainSlice';
import { isEmpty } from '@Helpers/Utility/Utils';

export const getDomainDetails = createAsyncThunk(
  'user/getDomainDetails',
  async (domain: string, {rejectWithValue, fulfillWithValue}) => {
    try {
      const response = await AgentAPI.Account.GetDomainInfo(domain);
      let responseObj: DomainInfo = {
        Domain: response['domain'],
        useEncryption: response['useEncryption'],
        humanReadableName: response['humanReadableName'],
        humanReadableDescription: response['humanReadableDescription'],
      };
      return fulfillWithValue(responseObj);    
    } catch (error) {
      const message =
        typeof error?.message === 'string'
          ? error?.message
          : error?.message?.Message;
      throw rejectWithValue(message);
    }
  }
);

export const setDomainDetails = createAsyncThunk(
  'user/setDomainDetails',
  async (domainInfo: DomainInfo) => {
    try {
      return domainInfo;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);

export const setSelectedDomain = createAsyncThunk(
  'user/setSelectedDomain',
  async (domainInfo: DomainInfo) => {
    try {
      return domainInfo;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);

export const mobileNumberOtpVerification = createAsyncThunk(
  'domain/mobileNumberOtpVerification',
  async ({ mobileNumber, otpValue, purpose }: any, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await OnboardingAPI.ID.verifyNumber(mobileNumber, otpValue, purpose)
      let responseObj: DomainInfo = {
        Domain: response.Domain,
        Secret: response.Secret,
        Key: response.Key,
      };
      return fulfillWithValue(responseObj);    
    } catch (error) {
      const message =
        typeof error?.message === 'string'
          ? error?.message
          : error?.message?.Message;
      throw rejectWithValue(message);
    }
  }
);
