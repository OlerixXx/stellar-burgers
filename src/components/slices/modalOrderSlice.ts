import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  TConstructorIngredient,
  TIngredient,
  TOrder,
  TOrdersData
} from '@utils-types';
import {
  getFeedsApi,
  getIngredientsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { RootState } from '../../services/store';

type OrdersState = {
  modalOrder: TOrder | null;
  modalOrderRequest: boolean;
};

const initialState: OrdersState = {
  modalOrder: null,
  modalOrderRequest: false
};

export const modalOrderSlice = createSlice({
  name: 'modalOrder',
  initialState,
  reducers: {},
  selectors: {
    getModalOrder: (state) => state.modalOrder,
    isModalOrderRequest: (state) => state.modalOrderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderById.pending, (state) => {
        state.modalOrderRequest = true;
      })
      .addCase(fetchOrderById.rejected, (state) => {
        state.modalOrderRequest = false;
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.modalOrder = action.payload.orders[0];
        state.modalOrderRequest = false;
      });
  }
});

export const fetchOrderById = createAsyncThunk(
  'modalOrder/getById',
  async (data: number) => getOrderByNumberApi(data)
);

export const { getModalOrder, isModalOrderRequest } = modalOrderSlice.selectors;
export const {} = modalOrderSlice.actions;
export default modalOrderSlice.reducer;
