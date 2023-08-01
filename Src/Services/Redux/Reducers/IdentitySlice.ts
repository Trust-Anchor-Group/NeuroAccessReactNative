import { createSlice } from '@reduxjs/toolkit';
import {
  getIdentityApi,
  getPopMessageApi,
  getApplicationAttributeApi,
} from '../Actions/GetStatusForIdentity';

interface CryptoState {
  identityResponse: {};
  popMessageResponse: {};
  popMessageLastResponse: {};
  attributeResponse: {};
  loading: boolean;
  error: string;
}

const initialState = {
  identityResponse: {},
  popMessageResponse: {},
  popMessageLastResponse: {},
  attributeResponse: {},
  loading: false,
  error: <any>undefined,
};

const identitySlice = createSlice({
  name: 'identity',
  initialState,
  reducers: {
    saveIdentity: (state, action) => {
      state.identityResponse = action.payload;
    },
    savePopMessageLast: (state, action) => {
      state.popMessageLastResponse = action.payload;
    },
    clearIdentity: (state) => {
      state.identityResponse = {};
    },
    setIdentitySliceError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIdentityApi.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getIdentityApi.fulfilled, (state, action) => {
        state.loading = false;
        state.identityResponse = action.payload;
      })
      .addCase(getIdentityApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload || '';
      })
      .addCase(getPopMessageApi.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getPopMessageApi.fulfilled, (state, action) => {
        state.loading = false;
        state.popMessageResponse = action.payload;
      })
      .addCase(getPopMessageApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload || '';
      })
      .addCase(getApplicationAttributeApi.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getApplicationAttributeApi.fulfilled, (state, action) => {
        state.loading = false;
        state.attributeResponse = action.payload;
      })
      .addCase(getApplicationAttributeApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload || '';
      });
  },
});

export const {
  savePopMessageLast,
  setIdentitySliceError,
  saveIdentity,
  clearIdentity,
} = identitySlice.actions;
export default identitySlice.reducer;
