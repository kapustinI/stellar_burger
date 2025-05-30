import { getFeedsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedState = {
  allOrders: TOrder[];
  feedLoading: boolean;
  burgersReady: number;
  todayBurgersReady: number;
  error: string | null;
};

export const initialState: TFeedState = {
  allOrders: [],
  feedLoading: false,
  burgersReady: 0,
  todayBurgersReady: 0,
  error: null
};

export const getFeed = createAsyncThunk(
  'feed/getFeed',
  async () => await getFeedsApi()
);

export const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    getFeedSelector: (state) => state.allOrders,
    getTotalBurgersReadySelector: (state) => state.burgersReady,
    getTotalBurgersReadyTodaySelector: (state) => state.todayBurgersReady,
    getFeedLoadingStatusSelector: (state) => state.feedLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeed.pending, (state) => {
        state.feedLoading = true;
        state.error = null;
      })
      .addCase(getFeed.rejected, (state, action) => {
        state.feedLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getFeed.fulfilled, (state, action) => {
        state.feedLoading = false;
        state.allOrders = action.payload.orders;
        state.burgersReady = action.payload.total;
        state.todayBurgersReady = action.payload.totalToday;
      });
  }
});

export const feedReducer = feedSlice.reducer;

export const {
  getFeedSelector,
  getTotalBurgersReadySelector,
  getTotalBurgersReadyTodaySelector,
  getFeedLoadingStatusSelector
} = feedSlice.selectors;
