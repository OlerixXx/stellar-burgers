import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  fetchFeedOrders,
  getFeedOrders,
  ordersIsLoading
} from './feedOrdersSlice';

const mockOrders = [
  {
    _id: '696920dfa64177001b3278a8',
    ingredients: [
      '643d69a5c3f7b9001cfa093c',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0946',
      '643d69a5c3f7b9001cfa0947',
      '643d69a5c3f7b9001cfa0949',
      '643d69a5c3f7b9001cfa0943',
      '643d69a5c3f7b9001cfa093c'
    ],
    status: 'done',
    name: 'Space краторный био-марсианский экзо-плантаго фалленианский минеральный люминесцентный бургер',
    createdAt: '2026-01-15T17:16:15.314Z',
    updatedAt: '2026-01-15T17:16:15.531Z',
    number: 99056
  },
  {
    _id: '69691db5a64177001b32789f',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa0940',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Метеоритный флюоресцентный бургер',
    createdAt: '2026-01-15T17:02:45.818Z',
    updatedAt: '2026-01-15T17:02:46.041Z',
    number: 99055
  },
  {
    _id: '69691d4ba64177001b32789d',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2026-01-15T17:00:59.424Z',
    updatedAt: '2026-01-15T17:00:59.688Z',
    number: 99054
  }
];

describe('Тесты селекторов', () => {
  const store = configureStore({
    reducer: {
      feedOrders: reducer
    },
    preloadedState: {
      feedOrders: {
        feedOrders: { orders: mockOrders, total: 3, totalToday: 3 },
        isLoading: false
      }
    }
  });

  test('Получение заказов', () => {
    const orders = getFeedOrders(store.getState());
    expect(orders.orders).toEqual(mockOrders);
  });

  test('Получение состояния загрузки', () => {
    const isLoading = ordersIsLoading(store.getState());
    expect(isLoading).toEqual(false);
  });
});

describe('Тесты extraReducers', () => {
  const initialState = {
    feedOrders: { orders: [], total: 0, totalToday: 0 },
    isLoading: false
  };

  test('fetchFeedOrders.pending устанавливает isLoading в true', () => {
    const action = { type: fetchFeedOrders.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.feedOrders).toEqual({ orders: [], total: 0, totalToday: 0 });
  });

  test('fetchFeedOrders.rejected устанавливает isLoading в false', () => {
    const stateWithLoading = {
      feedOrders: { orders: [], total: 0, totalToday: 0 },
      isLoading: true
    };

    const action = { type: fetchFeedOrders.rejected.type };
    const state = reducer(stateWithLoading, action);

    expect(state.isLoading).toBe(false);
    expect(state.feedOrders).toEqual({ orders: [], total: 0, totalToday: 0 });
  });

  test('fetchFeedOrders.fulfilled устанавливает заказы и isLoading в false', () => {
    const stateWithLoading = {
      feedOrders: { orders: [], total: 0, totalToday: 0 },
      isLoading: true
    };

    const payload = { orders: mockOrders, total: 100, totalToday: 50 };
    const action = {
      type: fetchFeedOrders.fulfilled.type,
      payload
    };
    const state = reducer(stateWithLoading, action);

    expect(state.isLoading).toBe(false);
    expect(state.feedOrders).toEqual(payload);
  });
});
