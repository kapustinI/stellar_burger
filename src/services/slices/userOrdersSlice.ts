import { getOrdersApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TUserOrders = {
  orders: TOrder[];
  requestStatus: boolean;
};

export const initialState: TUserOrders = {
  orders: [],
  requestStatus: false
};

export const getUserOrders = createAsyncThunk(
  'userOrders/getUserOrders',
  async () => await getOrdersApi()
);

export const userOrdersSlice = createSlice({
  name: 'userOrders',
  initialState,
  reducers: {},
  selectors: {
    getAllUserOrdersSelector: (state) => state.orders
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserOrders.pending, (state) => {
        state.requestStatus = true;
      })
      .addCase(getUserOrders.rejected, (state) => {
        state.requestStatus = false;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.requestStatus = false;
      });
  }
});

export const userOrdersReducer = userOrdersSlice.reducer;
export const { getAllUserOrdersSelector } = userOrdersSlice.selectors;
