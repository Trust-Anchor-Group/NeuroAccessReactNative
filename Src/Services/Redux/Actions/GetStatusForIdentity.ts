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
  async (payload: IdentityPayload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await AgentAPI.Legal.GetIdentity(payload.LegalId);
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

export const getApplicationAttributeApi = createAsyncThunk(
  'identity/getApplicationAttributeApi',
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await AgentAPI.Legal.GetApplicationAttributes();
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

export const getPopMessageApi = createAsyncThunk(
  'identity/getPopMessageApi',
  async (payload: PopMessagePayload, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await AgentAPI.Xmpp.PopMessages(payload.MaxCount);
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
