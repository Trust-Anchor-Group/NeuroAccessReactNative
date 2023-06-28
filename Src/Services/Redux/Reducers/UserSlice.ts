import { createSlice } from '@reduxjs/toolkit';
import {
  addUserName,
  createAccountUsingEmail,
  selectedPupose,
  saveEmail,
  saveNumber,
  createAccountUsingMobileNumber,
  sendEmailVerificationMessage,
} from '../Actions/GetUserDetails';
import { ContextType } from '@Services/Data';

type UserProfile = {
  userName?: string;
  email?: string;
  purpose: ContextType;
  mobileNumber?: {
    number: string;
    code: string;
  };
  password?: string;
  tokenData?: any;
};

const initialState = {
  userDetails: <UserProfile>{},
  loading: <boolean>false,
  error: <string>'',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createAccountUsingMobileNumber.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(createAccountUsingMobileNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = { ...state.userDetails, tokenData: action.payload };
      })
      .addCase(createAccountUsingMobileNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || '';
      })
      .addCase(sendEmailVerificationMessage.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(sendEmailVerificationMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = { ...state.userDetails };
      })
      .addCase(sendEmailVerificationMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.error?.message || '';
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
        state.error = action?.error?.message || '';
      })
      .addCase(addUserName.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = { ...state.userDetails, userName: action.payload };
      })
      .addCase(saveEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.userDetails = { ...state.userDetails, email: action.payload };
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
      });
  },
});

export default userSlice.reducer;
