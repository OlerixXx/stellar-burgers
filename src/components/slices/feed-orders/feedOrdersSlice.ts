import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrdersData } from '@utils-types';
import { getFeedsApi } from '@api';

type FeedOrdersState = {
  feedOrders: TOrdersData;
  isLoading: boolean;
};

const initialState: FeedOrdersState = {
  feedOrders: { orders: [], total: 0, totalToday: 0 },
  isLoading: false
};

export const feedOrdersSlice = createSlice({
  name: 'feedOrders',
  initialState,
  reducers: {},
  selectors: {
    getFeedOrders: (state) => state.feedOrders,
    ordersIsLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeedOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchFeedOrders.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchFeedOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.feedOrders = action.payload;
      });
  }
});

export const fetchFeedOrders = createAsyncThunk('feedOrders/getAll', async () =>
  getFeedsApi()
);

export const { getFeedOrders, ordersIsLoading } = feedOrdersSlice.selectors;
export const {} = feedOrdersSlice.actions;
export default feedOrdersSlice.reducer;
