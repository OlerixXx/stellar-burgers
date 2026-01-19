import store, { RootState } from './store';
import ingredientsSliceReducer from '../components/slices/ingredients/ingredientsSlice';
import burgerConstructorSliceReducer from '../components/slices/burger-constructor/burgerConstructorSlice';
import userSliceReducer from '../components/slices/user/userSlice';
import feedOrdersSliceReducer from '../components/slices/feed-orders/feedOrdersSlice';
import ordersSliceReducer from '../components/slices/orders/ordersSlice';
import modalOrderSliceReducer from '../components/slices/modal-order/modalOrderSlice';
import { combineReducers } from '@reduxjs/toolkit';

// Создаем rootReducer для тестирования
const rootReducer = combineReducers({
  ingredients: ingredientsSliceReducer,
  burgerConstructor: burgerConstructorSliceReducer,
  user: userSliceReducer,
  feedOrders: feedOrdersSliceReducer,
  orders: ordersSliceReducer,
  modalOrder: modalOrderSliceReducer
});

describe('rootReducer', () => {
  it('должен вернуть корректное начальное состояние при вызове с undefined', () => {
    const initialState = rootReducer(undefined, { type: '@@INIT' });

    expect(initialState).toBeDefined();
    expect(typeof initialState).toBe('object');

    expect(initialState).toHaveProperty('ingredients');
    expect(initialState).toHaveProperty('burgerConstructor');
    expect(initialState).toHaveProperty('user');
    expect(initialState).toHaveProperty('feedOrders');
    expect(initialState).toHaveProperty('orders');
    expect(initialState).toHaveProperty('modalOrder');

    expect(initialState.ingredients).toEqual({
      ingredients: [],
      isLoading: true
    });

    expect(initialState.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    expect(initialState.user).toEqual({
      isInit: false,
      isLoading: false,
      user: null,
      error: null
    });

    expect(initialState.feedOrders).toEqual({
      feedOrders: { orders: [], total: 0, totalToday: 0 },
      isLoading: false
    });

    expect(initialState.orders).toEqual({
      newOrder: null,
      newOrderRequest: false,
      orders: [],
      orderRequest: false
    });

    expect(initialState.modalOrder).toEqual({
      modalOrder: null,
      modalOrderRequest: false
    });
  });

  it('должен вернуть то же состояние для неизвестного действия', () => {
    const currentState = rootReducer(undefined, { type: '@@INIT' });
    const newState = rootReducer(currentState, { type: 'UNKNOWN_ACTION' as any });

    expect(newState).toEqual(currentState);
  });

  it('должен правильно инициализировать store', () => {
    const state: RootState = store.getState();

    expect(state).toHaveProperty('ingredients');
    expect(state).toHaveProperty('burgerConstructor');
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('feedOrders');
    expect(state).toHaveProperty('orders');
    expect(state).toHaveProperty('modalOrder');
  });
});
