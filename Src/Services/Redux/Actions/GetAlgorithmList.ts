import { createAsyncThunk } from '@reduxjs/toolkit';
import { AgentAPI } from '@Services/API/Agent';

export type ApplyLegalPayload = {
  LocalName: string;
  Namespace: string;
  KeyId: string;
  KeyPassword: string;
  AccountPassword: string;
  Properties:{ [x: string]: any };
}

export type PnrPayload = {
  countryCode: string;
  pnr: string;
}

export type AddIdAttachmentPayload = {
  LocalName: string;
  Namespace: string;
  KeyId: string;
  KeyPassword: string;
  AccountPassword: string;
  LegalId: any,
  Attachment: string,
  FileName: string,
  ContentType: string
}

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

export const  validatePNrApi = createAsyncThunk(
  'crypto/validatePNrApi',
  async (payload: PnrPayload) => {
    try {
      const response = await AgentAPI.Legal.ValidatePNr(payload.countryCode,
        payload.pnr);
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
      console.log('print request====',payload)
      const response = await AgentAPI.Legal.ApplyId(payload.LocalName,
        payload.Namespace,
        payload.KeyId,
        payload.KeyPassword,
        payload.AccountPassword,
        payload.Properties);
        console.log('legal id response',response)
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
      const response = await AgentAPI.Legal.AddIdAttachment(payload.LocalName,
        payload.Namespace,
        payload.KeyId,
        payload.KeyPassword,
        payload.AccountPassword,
        payload.LegalId,
        payload.Attachment,
        payload.FileName,
        payload.ContentType);
      return response;
    } catch (error) {
      throw error?.response?.data;
    }
  }
);