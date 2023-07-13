import { createSlice } from '@reduxjs/toolkit';
import {
  getAlgorithmListApi,
  validatePNrApi,
  applyLegalIdApi,
  addIdAttachmentApi,
} from '../Actions/GetAlgorithmList';

export interface Algorithm {
  localName: string;
  namespace: string;
  securityStrength: number;
  safe: boolean;
  slow: boolean;
  score: number;
}

interface CryptoState {
  algorithmDetails: Algorithm[];
  pnrResponse: {};
  legalResponse: {};
  attachmentResponse: {};
  loading: boolean;
  error: string;
}

const initialState: CryptoState = {
  algorithmDetails: [],
  pnrResponse: {},
  legalResponse: {},
  attachmentResponse: {},
  loading: false,
  error: '',
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAlgorithmListApi.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getAlgorithmListApi.fulfilled, (state, action) => {
        state.loading = false;
        state.algorithmDetails = action.payload;
      })
      .addCase(getAlgorithmListApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || '';
      })
      .addCase(validatePNrApi.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(validatePNrApi.fulfilled, (state, action) => {
        state.loading = false;
        state.pnrResponse = action.payload;
      })
      .addCase(validatePNrApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || '';
      })
      .addCase(applyLegalIdApi.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(applyLegalIdApi.fulfilled, (state, action) => {
        state.loading = false;
        state.legalResponse = action.payload;
      })
      .addCase(applyLegalIdApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || '';
      })
      .addCase(addIdAttachmentApi.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(addIdAttachmentApi.fulfilled, (state, action) => {
        state.loading = false;
        state.attachmentResponse = action.payload;
      })
      .addCase(addIdAttachmentApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || '';
      });
  },
});

export default cryptoSlice.reducer;
