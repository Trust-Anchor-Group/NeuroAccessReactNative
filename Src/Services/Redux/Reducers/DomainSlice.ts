import { createSlice } from '@reduxjs/toolkit';
import {
  getDomainDetails,
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
  error: <string>'',
};

const domainSlice = createSlice({
  name: 'domain',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDomainDetails.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getDomainDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.defaultDomain = { ...action.payload };
      })
      .addCase(getDomainDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || '';
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

export default domainSlice.reducer;
