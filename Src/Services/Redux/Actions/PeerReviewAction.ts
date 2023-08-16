import { createAsyncThunk } from '@reduxjs/toolkit';
import { AgentAPI } from '@Services/API/Agent';

export type PetitionIdApiPayload = {
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

export type PetitionSignatureApiPayload = {
  UserName: string,
      LocalName: string,
      Namespace: string,
      KeyId: string,
      KeyPassword: string,
      AccountPassword: string,
      LegalId: string,
      RemoteId: string,
      PetitionId: string,
      Purpose: string,
      ContentBase64: string
};

export const petitionIdApi = createAsyncThunk(
  'peerReview/petitionIdApi',
  async (
    payload: PetitionIdApiPayload,
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await AgentAPI.Legal.PetitionId(
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


export const petitionSignatureApi = createAsyncThunk(
  'peerReview/petitionSignatureApi',
  async (
    payload: PetitionSignatureApiPayload,
    { fulfillWithValue, rejectWithValue }
  ) => {
    try {
      const response = await AgentAPI.Legal.PetitionSignature(
        payload.UserName,
        payload.LocalName,
        payload.Namespace,
        payload.KeyId,
        payload.KeyPassword,
        payload.AccountPassword,
        payload.LegalId,
        payload.RemoteId,
        payload.PetitionId,
        payload.Purpose,
        payload.ContentBase64
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

