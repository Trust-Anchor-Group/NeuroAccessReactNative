import { createSlice } from '@reduxjs/toolkit';
import {
  getDomainDetails,
  mobileNumberOtpVerification,
  setDomainDetails,
  setSelectedDomain,
} from '../Actions/GetDomainDetails';
import { ContextType } from '@Services/Data';

export interface DomainInfo {
  Domain?: string;
  Key?: string;
  Secret?: string;
  useEncryption?: boolean;
  humanReadableName?: string;
  humanReadableDescription?: string;
}

const initialState = {
  defaultDomain: <DomainInfo>{},
  selectedDomain: <DomainInfo>{},
  loading: <boolean>false,
  error: <any> undefined,
};

const domainSlice = createSlice({
  name: 'domain',
  initialState,
  reducers: {
    setDomainSliceError: (state, action) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(mobileNumberOtpVerification.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(mobileNumberOtpVerification.fulfilled, (state, action) => {
        state.loading = false;
        state.defaultDomain = action.payload;
      })
      .addCase(mobileNumberOtpVerification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getDomainDetails.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getDomainDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.defaultDomain = { ...state.defaultDomain, ...action.payload };
      })
      .addCase(getDomainDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload || '';
      })
      .addCase(setDomainDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.defaultDomain = { ...action.payload };
      })
      .addCase(setSelectedDomain.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedDomain = action.payload;
      });
  },
});

export const { setDomainSliceError } = domainSlice.actions;
export default domainSlice.reducer;
