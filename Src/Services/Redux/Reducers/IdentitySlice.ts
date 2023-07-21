import { createSlice } from '@reduxjs/toolkit';
import {
  getIdentityApi,
  getPopMessageApi,
  getApplicationAttributeApi
} from '../Actions/GetStatusForIdentity';

interface CryptoState {
  identityResponse: {};
  popMessageResponse: {};
  attributeResponse: {};
  loading: boolean;
  error: string;
}

const initialState = {
  identityResponse: {},
  popMessageResponse: {},
  attributeResponse: {},
  loading: false,
  error: '',
};

const identitySlice = createSlice({
  name: 'identity',
  initialState,
  reducers: {
    saveIdentity: (state, action) => {
      state.identityResponse = action.payload;
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
        state.error = action?.error?.message || '';
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
        state.error = action?.error?.message || '';
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
        state.error = action?.error?.message || '';
      });
  },
});

export const {saveIdentity} = identitySlice.actions;
export default identitySlice.reducer;
