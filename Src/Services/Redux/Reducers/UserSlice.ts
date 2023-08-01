import { createSlice } from '@reduxjs/toolkit';
import {
  addUserName,
  createAccountUsingEmail,
  selectedPupose,
  saveEmail,
  saveNumber,
  createAccountUsingMobileNumber,
  saveAccountPassword,
  saveKeyId,
  saveKeyIdPassword, saveLegalID, getUsersCountry
} from '../Actions/GetUserDetails';
import { ContextType } from '@Services/Data';

export type UserProfile = {
  userName?: string;
  email?: string;
  purpose: ContextType;
  mobileNumber?: {
    number: string;
    code: string;
  };
  password?: string;
  keyId?: string;
  legalId?: string;
  keyPassword?: string;
  tokenData?: any;
  createAccountRespnose: {},
  country: any;
};

const initialState = {
  userDetails: <UserProfile>{},
  countryList: <any>undefined,
  sendVerificationCodeResponse: <any> undefined,
  loading: <boolean>false,
  error: <any>undefined,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSliceError: (state, action) => {
      state.error = action.payload;
    },
    clearSendVerificationCodeResponse: (state, action) => {
      state.sendVerificationCodeResponse = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAccountUsingMobileNumber.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.sendVerificationCodeResponse = undefined
      })
      .addCase(createAccountUsingMobileNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.sendVerificationCodeResponse = action.payload;
      })
      .addCase(createAccountUsingMobileNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '';
      })
      .addCase(createAccountUsingEmail.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(createAccountUsingEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = { ...state.userDetails, tokenData: action.payload };
      })
      .addCase(createAccountUsingEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '';
        state.userDetails = { ...state.userDetails, tokenData: undefined };
      })
      .addCase(addUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = { ...state.userDetails, userName: action.payload };
      })
      .addCase(saveEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = { ...state.userDetails, email: action.payload };
      })
      .addCase(saveAccountPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = { ...state.userDetails, password: action.payload };
      })
      .addCase(saveKeyId.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = { ...state.userDetails, keyId: action.payload };
      })
      .addCase(saveKeyIdPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = {
          ...state.userDetails,
          keyPassword: action.payload,
        };
      })
      .addCase(saveLegalID.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = {
          ...state.userDetails,
          legalId: action.payload,
        };
      })
      .addCase(saveNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = {
          ...state.userDetails,
          mobileNumber: action.payload,
        };
      })
      .addCase(selectedPupose.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = { ...state.userDetails, purpose: action.payload };
      })
      .addCase(getUsersCountry.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(getUsersCountry.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = { ...state.userDetails, country: action.payload };;
      })
      .addCase(getUsersCountry.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || '';
        state.userDetails = { ...state.userDetails, country: undefined };;
      })
  },
});
export const { setUserSliceError, clearSendVerificationCodeResponse } = userSlice.actions;
export default userSlice.reducer;
