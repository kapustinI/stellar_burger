import { orderBurgerApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  order: TOrder | null;
  orderRequest: boolean;
};

export const initialState: TOrderState = {
  order: null,
  orderRequest: false
};

export const orderBurger = createAsyncThunk(
  'burder/orderBurger',
  async (data: string[]) => await orderBurgerApi(data)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    resetOrder: (state) => {
      state.order = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    getOrderRequest: (state) => state.orderRequest,
    getOrder: (state) => state.order
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(orderBurger.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.order = action.payload.order;
        state.orderRequest = false;
      });
  }
});

export const orderReducer = orderSlice.reducer;
export const { resetOrder } = orderSlice.actions;
export const { getOrderRequest, getOrder } = orderSlice.selectors;
