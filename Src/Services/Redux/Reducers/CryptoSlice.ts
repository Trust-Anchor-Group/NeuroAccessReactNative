import { createSlice } from '@reduxjs/toolkit';
import {
  getAlgorithmListApi,
  validatePNrApi,
  applyLegalIdApi,
  addIdAttachmentApi,
  createKeyIdApi,
  clearState,
  readyForApproval,
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
  createKeyResponse: {};
  pnrResponse: {};
  legalResponse: {};
  attachmentResponse: {};
  readyForApprovalResponse: null;
  loading: boolean;
  error: any;
}

const initialState: CryptoState = {
  algorithmDetails: [],
  createKeyResponse: {},
  pnrResponse: {},
  legalResponse: {},
  attachmentResponse: {},
  readyForApprovalResponse: null,
  loading: false,
  error: <any> undefined,
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    clearReadyForApproval: (state) => {
      state.readyForApprovalResponse = null;
    },
    setCryptoSliceError: (state, action) => {
      state.error = action.payload;
    },
  },
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
        state.error = action.payload || '';
      })
      .addCase(createKeyIdApi.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(createKeyIdApi.fulfilled, (state, action) => {
        state.loading = false;
        state.createKeyResponse = action.payload;
      })
      .addCase(createKeyIdApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '';
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
        state.error = action.payload || '';
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
        state.error = action.payload || '';
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
        state.error = action.payload || '';
      })
      .addCase(readyForApproval.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(readyForApproval.fulfilled, (state, action) => {
        state.loading = false;
        state.readyForApprovalResponse = action.payload;
      })
      .addCase(readyForApproval.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '';
      })
      .addCase(clearState.fulfilled, (state, action) => {
        state.loading = false;
        state.error = '';
        state.createKeyResponse = {};
        state.pnrResponse = {};
        state.legalResponse = {};
        state.attachmentResponse = {};
      });
  },
});

export const { clearReadyForApproval, setCryptoSliceError } = cryptoSlice.actions;
export default cryptoSlice.reducer;
