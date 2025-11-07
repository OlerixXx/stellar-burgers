import { combineSlices, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from '../components/slices/ingredientsSlice';
import { burgerConstructorSlice } from '../components/slices/burgerConstructorSlice';
import ingredientsSliceReducer from '../components/slices/ingredientsSlice';
import burgerConstructorSliceReducer from '../components/slices/burgerConstructorSlice';
import userSliceReducer from '../components/slices/userSlice';
import feedOrdersSliceReducer from '../components/slices/feedOrdersSlice';
import ordersSliceReducer from '../components/slices/ordersSlice';
import modalOrderSliceRedicer from '../components/slices/modalOrderSlice';

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
