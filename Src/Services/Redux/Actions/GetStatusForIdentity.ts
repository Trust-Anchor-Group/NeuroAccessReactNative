import { createAsyncThunk } from '@reduxjs/toolkit';
import { AgentAPI } from '@Services/API/Agent';

export type IdentityPayload = {
  LegalId: string;
};

export type PopMessagePayload = {
  MaxCount: number;
};

export const getIdentityApi = createAsyncThunk(
  'identity/getIdentityApi',
  async (payload: IdentityPayload) => {
    try {
      const response = await AgentAPI.Legal.GetIdentity(payload.LegalId);
      return response;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);

export const getApplicationAttributeApi = createAsyncThunk(
  'identity/getApplicationAttributeApi',
  async () => {
    try {
      const response = await AgentAPI.Legal.GetApplicationAttributes();
      return response;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);

export const getPopMessageApi = createAsyncThunk(
  'identity/getPopMessageApi',
  async (payload: PopMessagePayload) => {
    try {
      const response = await AgentAPI.Xmpp.PopMessages(payload.MaxCount);
      return response;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);
