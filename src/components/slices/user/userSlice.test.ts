import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  getUser,
  init,
  fetchGetUser,
  fetchLogoutUser
} from './userSlice';

const mockUser = {
  email: 'oleg.morozov.2003@bk.ru',
  name: 'Олег Морозов'
};

describe('Тесты селекторов', () => {
  test('Получение пользователя когда он авторизован', () => {
    const store = configureStore({
      reducer: {
        user: reducer
      },
      preloadedState: {
        user: {
          isInit: true,
          isLoading: false,
          user: mockUser,
          error: null
        }
      }
    });

    const user = getUser(store.getState());
    expect(user).toEqual(mockUser);
  });

  test('Получение пользователя когда он не авторизован', () => {
    const store = configureStore({
      reducer: {
        user: reducer
      },
      preloadedState: {
        user: {
          isInit: true,
          isLoading: false,
          user: null,
          error: null
        }
      }
    });

    const user = getUser(store.getState());
    expect(user).toBeNull();
  });
});

describe('Тесты экшенов', () => {
  test('init устанавливает isInit в true', () => {
    const state = {
      isInit: false,
      isLoading: false,
      user: null,
      error: null
    };

    const newState = reducer(state, init());

    expect(newState.isInit).toBe(true);
    expect(newState.user).toBeNull();
    expect(newState.isLoading).toBe(false);
  });
});

describe('Тесты extraReducers для fetchGetUser', () => {
  const initialState = {
    isInit: false,
    isLoading: false,
    user: null,
    error: null
  };

  test('fetchGetUser.pending устанавливает isLoading в true', () => {
    const action = { type: fetchGetUser.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.isInit).toBe(false);
    expect(state.user).toBeNull();
  });

  test('fetchGetUser.rejected устанавливает isInit в true и isLoading в false', () => {
    const stateWithLoading = {
      ...initialState,
      isLoading: true
    };

    const action = { type: fetchGetUser.rejected.type };
    const state = reducer(stateWithLoading, action);

    expect(state.isInit).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
  });

  test('fetchGetUser.fulfilled устанавливает пользователя, isInit в true и isLoading в false', () => {
    const stateWithLoading = {
      ...initialState,
      isLoading: true
    };

    const payload = { user: mockUser };
    const action = {
      type: fetchGetUser.fulfilled.type,
      payload
    };
    const state = reducer(stateWithLoading, action);

    expect(state.isInit).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
  });
});

describe('Тесты extraReducers для fetchLogoutUser', () => {
  const initialState = {
    isInit: true,
    isLoading: false,
    user: mockUser,
    error: null
  };

  test('fetchLogoutUser.pending устанавливает isLoading в true', () => {
    const action = { type: fetchLogoutUser.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.user).toEqual(mockUser);
  });

  test('fetchLogoutUser.rejected устанавливает isInit в true и isLoading в false', () => {
    const stateWithLoading = {
      ...initialState,
      isLoading: true
    };

    const action = { type: fetchLogoutUser.rejected.type };
    const state = reducer(stateWithLoading, action);

    expect(state.isInit).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.user).toEqual(mockUser);
  });

  test('fetchLogoutUser.fulfilled очищает пользователя, устанавливает isInit в true и isLoading в false', () => {
    const stateWithLoading = {
      ...initialState,
      isLoading: true
    };

    const action = { type: fetchLogoutUser.fulfilled.type };
    const state = reducer(stateWithLoading, action);

    expect(state.isInit).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.user).toBeNull();
  });
});
