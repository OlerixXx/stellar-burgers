import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  getModalOrder,
  isModalOrderRequest,
  fetchOrderById
} from './modalOrderSlice';

const mockOrder = {
  _id: '696a886ea64177001b3279c8',
  ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
  owner: '695abb29a64177001b325faf',
  status: 'done',
  name: 'Флюоресцентный бургер',
  createdAt: '2026-01-16T18:50:22.693Z',
  updatedAt: '2026-01-16T18:50:22.932Z',
  number: 99069
};

describe('Тесты селекторов', () => {
  const store = configureStore({
    reducer: {
      modalOrder: reducer
    },
    preloadedState: {
      modalOrder: {
        modalOrder: mockOrder,
        modalOrderRequest: false
      }
    }
  });

  test('Получение заказа из модального окна', () => {
    const order = getModalOrder(store.getState());
    expect(order).toEqual(mockOrder);
  });

  test('Получение состояния запроса заказа', () => {
    const request = isModalOrderRequest(store.getState());
    expect(request).toBe(false);
  });
});

describe('Тесты extraReducers', () => {
  const initialState = {
    modalOrder: null,
    modalOrderRequest: false
  };

  test('fetchOrderById.pending устанавливает modalOrderRequest в true', () => {
    const action = { type: fetchOrderById.pending.type };
    const state = reducer(initialState, action);

    expect(state.modalOrderRequest).toBe(true);
    expect(state.modalOrder).toBeNull();
  });

  test('fetchOrderById.rejected устанавливает modalOrderRequest в false', () => {
    const stateWithRequest = {
      modalOrder: null,
      modalOrderRequest: true
    };

    const action = { type: fetchOrderById.rejected.type };
    const state = reducer(stateWithRequest, action);

    expect(state.modalOrderRequest).toBe(false);
    expect(state.modalOrder).toBeNull();
  });

  test('fetchOrderById.fulfilled устанавливает заказ и modalOrderRequest в false', () => {
    const stateWithRequest = {
      modalOrder: null,
      modalOrderRequest: true
    };

    const payload = { orders: [mockOrder] };
    const action = {
      type: fetchOrderById.fulfilled.type,
      payload
    };
    const state = reducer(stateWithRequest, action);

    expect(state.modalOrderRequest).toBe(false);
    expect(state.modalOrder).toEqual(mockOrder);
  });
});
