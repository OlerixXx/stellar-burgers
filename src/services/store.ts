import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSliceReducer from '../components/slices/ingredients/ingredientsSlice';
import burgerConstructorSliceReducer from '../components/slices/burger-constructor/burgerConstructorSlice';
import userSliceReducer from '../components/slices/user/userSlice';
import feedOrdersSliceReducer from '../components/slices/feed-orders/feedOrdersSlice';
import ordersSliceReducer from '../components/slices/orders/ordersSlice';
import modalOrderSliceRedicer from '../components/slices/modal-order/modalOrderSlice';

const rootReducer = {
  ingredients: ingredientsSliceReducer,
  burgerConstructor: burgerConstructorSliceReducer,
  user: userSliceReducer,
  feedOrders: feedOrdersSliceReducer,
  orders: ordersSliceReducer,
  modalOrder: modalOrderSliceRedicer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
