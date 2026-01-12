import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { getOrdersApi, orderBurgerApi } from '@api';

type OrdersState = {
  newOrder: TOrder | null;
  newOrderRequest: boolean;
  orders: TOrder[];
  orderRequest: boolean;
};

const initialState: OrdersState = {
  newOrder: null,
  newOrderRequest: false,
  orders: [],
  orderRequest: false
};

export const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearNewOrder: (state) => {
      state.newOrder = null;
      state.orderRequest = false;
    }
  },
  selectors: {
    getAllOrders: (state) => state.orders,
    getNewOrder: (state) => state.newOrder,
    isNewOrderRequest: (state) => state.newOrderRequest,
    isOrdersRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewOrder.pending, (state) => {
        state.newOrderRequest = true;
      })
      .addCase(fetchNewOrder.rejected, (state) => {
        state.newOrderRequest = false;
      })
      .addCase(fetchNewOrder.fulfilled, (state, action) => {
        state.newOrderRequest = false;
        state.newOrder = action.payload.order;
      })

      .addCase(fetchOrders.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.orderRequest = false;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.orders = action.payload;
      });
  }
});

export const fetchNewOrder = createAsyncThunk(
  'order/create',
  async (data: string[]) => orderBurgerApi(data)
);

export const fetchOrders = createAsyncThunk('order/getAll', async () =>
  getOrdersApi()
);

export const { getNewOrder, getAllOrders, isOrdersRequest, isNewOrderRequest } =
  ordersSlice.selectors;
export const { clearNewOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
