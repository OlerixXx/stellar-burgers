import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  getAllOrders,
  getNewOrder,
  isNewOrderRequest,
  isOrdersRequest,
  clearNewOrder,
  fetchNewOrder,
  fetchOrders
} from './ordersSlice';

const mockOrders = [
  {
    _id: '690ca99ea64177001b31d44a',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Флюоресцентный люминесцентный бургер',
    createdAt: '2025-11-06T13:58:54.097Z',
    updatedAt: '2025-11-06T13:58:54.307Z',
    number: 93489
  },
  {
    _id: '690cac18a64177001b31d458',
    ingredients: [
      '643d69a5c3f7b9001cfa093d',
      '643d69a5c3f7b9001cfa093e',
      '643d69a5c3f7b9001cfa0941',
      '643d69a5c3f7b9001cfa093d'
    ],
    status: 'done',
    name: 'Био-марсианский флюоресцентный люминесцентный бургер',
    createdAt: '2025-11-06T14:09:28.453Z',
    updatedAt: '2025-11-06T14:09:28.705Z',
    number: 93490
  }
];

const mockNewOrder = {
  _id: '696a886ea64177001b3279c8',
  ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa093d'],
  owner: '695abb29a64177001b325faf',
  status: 'done',
  name: 'Флюоресцентный бургер',
  createdAt: '2026-01-16T18:50:22.693Z',
  updatedAt: '2026-01-16T18:50:22.932Z',
  number: 99069,
  __v: 0
};

describe('Тесты селекторов', () => {
  const store = configureStore({
    reducer: {
      orders: reducer
    },
    preloadedState: {
      orders: {
        newOrder: mockNewOrder,
        newOrderRequest: false,
        orders: mockOrders,
        orderRequest: false
      }
    }
  });

  test('Получение всех заказов', () => {
    const orders = getAllOrders(store.getState());
    expect(orders).toEqual(mockOrders);
  });

  test('Получение нового заказа', () => {
    const order = getNewOrder(store.getState());
    expect(order).toEqual(mockNewOrder);
  });

  test('Получение состояния запроса нового заказа', () => {
    const request = isNewOrderRequest(store.getState());
    expect(request).toBe(false);
  });

  test('Получение состояния запроса всех заказов', () => {
    const request = isOrdersRequest(store.getState());
    expect(request).toBe(false);
  });
});

describe('Тесты экшенов', () => {
  test('clearNewOrder очищает новый заказ и сбрасывает флаг запроса', () => {
    const state = {
      newOrder: mockNewOrder,
      newOrderRequest: true,
      orders: mockOrders,
      orderRequest: false
    };

    const newState = reducer(state, clearNewOrder());

    expect(newState.newOrder).toBeNull();
    expect(newState.orderRequest).toBe(false);
    expect(newState.orders).toEqual(mockOrders);
  });
});

describe('Тесты extraReducers для fetchNewOrder', () => {
  const initialState = {
    newOrder: null,
    newOrderRequest: false,
    orders: [],
    orderRequest: false
  };

  test('fetchNewOrder.pending устанавливает newOrderRequest в true', () => {
    const action = { type: fetchNewOrder.pending.type };
    const state = reducer(initialState, action);

    expect(state.newOrderRequest).toBe(true);
    expect(state.newOrder).toBeNull();
  });

  test('fetchNewOrder.rejected устанавливает newOrderRequest в false', () => {
    const stateWithRequest = {
      ...initialState,
      newOrderRequest: true
    };

    const action = { type: fetchNewOrder.rejected.type };
    const state = reducer(stateWithRequest, action);

    expect(state.newOrderRequest).toBe(false);
    expect(state.newOrder).toBeNull();
  });

  test('fetchNewOrder.fulfilled устанавливает новый заказ и newOrderRequest в false', () => {
    const stateWithRequest = {
      ...initialState,
      newOrderRequest: true
    };

    const payload = { order: mockNewOrder };
    const action = {
      type: fetchNewOrder.fulfilled.type,
      payload
    };
    const state = reducer(stateWithRequest, action);

    expect(state.newOrderRequest).toBe(false);
    expect(state.newOrder).toEqual(mockNewOrder);
  });
});

describe('Тесты extraReducers для fetchOrders', () => {
  const initialState = {
    newOrder: null,
    newOrderRequest: false,
    orders: [],
    orderRequest: false
  };

  test('fetchOrders.pending устанавливает orderRequest в true', () => {
    const action = { type: fetchOrders.pending.type };
    const state = reducer(initialState, action);

    expect(state.orderRequest).toBe(true);
    expect(state.orders).toEqual([]);
  });

  test('fetchOrders.rejected устанавливает orderRequest в false', () => {
    const stateWithRequest = {
      ...initialState,
      orderRequest: true
    };

    const action = { type: fetchOrders.rejected.type };
    const state = reducer(stateWithRequest, action);

    expect(state.orderRequest).toBe(false);
    expect(state.orders).toEqual([]);
  });

  test('fetchOrders.fulfilled устанавливает заказы и orderRequest в false', () => {
    const stateWithRequest = {
      ...initialState,
      orderRequest: true
    };

    const action = {
      type: fetchOrders.fulfilled.type,
      payload: mockOrders
    };
    const state = reducer(stateWithRequest, action);

    expect(state.orderRequest).toBe(false);
    expect(state.orders).toEqual(mockOrders);
  });
});
