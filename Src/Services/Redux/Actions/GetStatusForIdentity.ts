import { createAsyncThunk } from '@reduxjs/toolkit';
import { AgentAPI } from '@Services/API/Agent';

export type IdentityPayload = {
  LegalId: string;
};

export type PopMessagePayload = {
  MaxCount: number;
};

export type ReviewServicePayload = {
  serviceId: string;
  serviceProvider: string;
};

export type AuthorizeAccessToIdPayload = {
  legalId: string;
  remoteId: string;
  authorized: boolean;
};

export type PetitionPeerReviewPayload = {
  UserName: string,
      LocalName: string,
      Namespace: string,
      KeyId: string,
      KeyPassword: string,
      AccountPassword: string,
      LegalId: string,
      RemoteId: string,
      PetitionId: string,
      Purpose: string
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

export const getServiceProvidersForIdReviewApi = createAsyncThunk(
  'identity/getServiceProvidersForIdReviewApi',
  async (LegalId: any, { fulfillWithValue, rejectWithValue }) => {
    try {
      const response = await AgentAPI.Legal.GetServiceProvidersForIdReview(
        LegalId
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

export const selectReviewServiceApi = createAsyncThunk(
  'identity/selectReviewServiceApi',
  async (
    payload: ReviewServicePayload,
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await AgentAPI.Legal.SelectReviewService(
        payload.serviceId,
        payload.serviceProvider
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

export const authorizeAccessToIdApi = createAsyncThunk(
  'identity/authorizeAccessToIdApi',
  async (
    payload: AuthorizeAccessToIdPayload,
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await AgentAPI.Legal.AuthorizeAccessToId(
        payload.legalId,
        payload.remoteId,
        payload.authorized
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

export const petitionPeerReviewApi = createAsyncThunk(
  'identity/petitionPeerReviewApi',
  async (
    payload: PetitionPeerReviewPayload,
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await AgentAPI.Legal.PetitionPeerReview(
        payload.UserName,
        payload.LocalName,
        payload.Namespace,
        payload.KeyId,
        payload.KeyPassword,
        payload.AccountPassword,
        payload.LegalId,
        payload.RemoteId,
        payload.PetitionId,
        payload.Purpose
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

