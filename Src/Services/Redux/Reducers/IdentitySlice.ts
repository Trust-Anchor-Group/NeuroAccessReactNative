import { createSlice } from '@reduxjs/toolkit';
import {
  getIdentityApi,
  getPopMessageApi,
  getApplicationAttributeApi,
  getServiceProvidersForIdReviewApi,
  selectReviewServiceApi,
  authorizeAccessToIdApi,
  petitionPeerReviewApi
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
  selectReviewServiceResponse: null,
  authorizeAccessToIdResponse: null,
  petitionPeerReviewResponse: null,
  getServiceProvidersForIdReviewResponse: {},
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
      })
      .addCase(getServiceProvidersForIdReviewApi.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getServiceProvidersForIdReviewApi.fulfilled, (state, action) => {
        state.loading = false;
        state.getServiceProvidersForIdReviewResponse = action.payload;
      })
      .addCase(getServiceProvidersForIdReviewApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload || '';
      })
      .addCase(selectReviewServiceApi.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(selectReviewServiceApi.fulfilled, (state, action) => {
        state.loading = false;
        state.selectReviewServiceResponse = action.payload;
      })
      .addCase(selectReviewServiceApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload || '';
      })
      .addCase(authorizeAccessToIdApi.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(authorizeAccessToIdApi.fulfilled, (state, action) => {
        state.loading = false;
        state.authorizeAccessToIdResponse = action.payload;
      })
      .addCase(authorizeAccessToIdApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload || '';
      })
      .addCase(petitionPeerReviewApi.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(petitionPeerReviewApi.fulfilled, (state, action) => {
        state.loading = false;
        state.petitionPeerReviewResponse = action.payload;
      })
      .addCase(petitionPeerReviewApi.rejected, (state, action) => {
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
