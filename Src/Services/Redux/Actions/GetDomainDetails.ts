import { createAsyncThunk } from '@reduxjs/toolkit';
import { AgentAPI } from '@Services/API/Agent';
import { OnboardingAPI } from '@Services/API/OnboardingApi';
import { ContextType } from '@Services/Data';
import { DomainInfo } from '../Reducers/DomainSlice';

export const getDomainDetails = createAsyncThunk(
  'user/getDomainDetails',
  async (domain: string) => {
    try {
      const response = await AgentAPI.Account.GetDomainInfo(domain);
      let responseObj: DomainInfo = {
        Domain: response['domain'],
        useEncryption: response['useEncryption'],
        humanReadableName: response['humanReadableName'],
        humanReadableDescription: response['humanReadableDescription'],
      };
      return responseObj;

    } catch (error) {
      throw error?.response?.data;
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


