import { createAsyncThunk } from '@reduxjs/toolkit';
import { AgentAPI } from '@Services/API/Agent';

export type ApplyLegalPayload = {
  userName: string;
  LocalName: string;
  Namespace: string;
  KeyId: string;
  KeyPassword: string;
  AccountPassword: string;
  Properties: { [x: string]: any };
};

export type PnrPayload = {
  countryCode: string;
  pnr: string;
};

export type CreateKeyPayload = {
  userName: string;
  LocalName: string;
  Namespace: string;
  Id: string;
  KeyPassword: string;
  AccountPassword: string;
};

export type AddIdAttachmentPayload = {
  userName: string;
  LocalName: string;
  Namespace: string;
  KeyId: string;
  KeyPassword: string;
  AccountPassword: string;
  LegalId: any;
  Attachment: string;
  FileName: string;
  ContentType: string;
};

export const getAlgorithmListApi = createAsyncThunk(
  'crypto/getAlgorithmListApi',
  async () => {
    try {
      const response = await AgentAPI.Crypto.GetAlgorithms();
      return response;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);

export const validatePNrApi = createAsyncThunk(
  'crypto/validatePNrApi',
  async (payload: PnrPayload) => {
    try {
      const response = await AgentAPI.Legal.ValidatePNr(
        payload.countryCode,
        payload.pnr
      );
      return response;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);

export const createKeyIdApi = createAsyncThunk(
  'crypto/createKeyIdApi',
  async (payload: CreateKeyPayload) => {
    try {
      const response = await AgentAPI.Crypto.CreateKey(
        payload.userName,
        payload.LocalName,
        payload.Namespace,
        payload.Id,
        payload.KeyPassword,
        payload.AccountPassword
      );
      return response;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);

export const applyLegalIdApi = createAsyncThunk(
  'crypto/applyLegalIdApi',
  async (payload: ApplyLegalPayload) => {
    try {
      const response = await AgentAPI.Legal.ApplyId(
        payload.userName,
        payload.LocalName,
        payload.Namespace,
        payload.KeyId,
        payload.KeyPassword,
        payload.AccountPassword,
        payload.Properties
      );
      return response;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);

export const addIdAttachmentApi = createAsyncThunk(
  'crypto/addIdAttachmentApi',
  async (payload: AddIdAttachmentPayload) => {
    try {
      const response = await AgentAPI.Legal.AddIdAttachment(
        payload.userName,
        payload.LocalName,
        payload.Namespace,
        payload.KeyId,
        payload.KeyPassword,
        payload.AccountPassword,
        payload.LegalId,
        payload.Attachment,
        payload.FileName,
        payload.ContentType
      );
      return response;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);

export const readyForApproval = createAsyncThunk(
  'crypto/readyForApproval',
  async (legalId: any) => {
    try {
      const response = await AgentAPI.Legal.ReadyForApproval(legalId);
      return response;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);

export const clearState = createAsyncThunk('crypto/clearState', async () => {
  try {
    return {};
  } catch (error) {
    throw error?.response?.data;
  }
});
