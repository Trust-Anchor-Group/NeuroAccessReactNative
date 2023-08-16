import { createSlice } from '@reduxjs/toolkit';
import { petitionIdApi, petitionSignatureApi } from '../Actions/PeerReviewAction';


const initialState = {
  petitionIDResponse: null,
  petitionSignatureResponse: null,
  loading: false,
  error: <any>undefined,
};

const PeerReviewSlice = createSlice({
  name: 'peerReview',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(petitionIdApi.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(petitionIdApi.fulfilled, (state, action) => {
        state.loading = false;
        state.petitionIDResponse = action.payload;
      })
      .addCase(petitionIdApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload || '';
      })
      .addCase(petitionSignatureApi.pending, (state) => {
        state.loading = true;
        state.error = '';
      })
      .addCase(petitionSignatureApi.fulfilled, (state, action) => {
        state.loading = false;
        state.petitionSignatureResponse = action.payload;
      })
      .addCase(petitionSignatureApi.rejected, (state, action) => {
        state.loading = false;
        state.error = action?.payload || '';
      });
  },
});

export default PeerReviewSlice.reducer;
