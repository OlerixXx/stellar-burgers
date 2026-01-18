import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  getIngredients,
  isLoading,
  fetchIngredients
} from './ingredientsSlice';

const ingredientsList = [
  {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa0942',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
  }
];

describe('Тесты селекторов', () => {
  const store = configureStore({
    reducer: {
      ingredients: reducer
    },
    preloadedState: {
      ingredients: {
        ingredients: ingredientsList,
        isLoading: false
      }
    }
  });

  test('Получение ингредиентов', () => {
    const ingredients = getIngredients(store.getState());
    expect(ingredients).toEqual(ingredientsList);
  });

  test('Получение состояния загрузки', () => {
    const loading = isLoading(store.getState());
    expect(loading).toBe(false);
  });
});

describe('Тесты extraReducers', () => {
  const initialState = {
    ingredients: [],
    isLoading: true
  };

  test('fetchIngredients.pending устанавливает isLoading в true', () => {
    const action = { type: fetchIngredients.pending.type };
    const state = reducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.ingredients).toEqual([]);
  });

  test('fetchIngredients.rejected устанавливает isLoading в false', () => {
    const stateWithLoading = {
      ingredients: [],
      isLoading: true
    };

    const action = { type: fetchIngredients.rejected.type };
    const state = reducer(stateWithLoading, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual([]);
  });

  test('fetchIngredients.fulfilled устанавливает ингредиенты и isLoading в false', () => {
    const stateWithLoading = {
      ingredients: [],
      isLoading: true
    };

    const action = {
      type: fetchIngredients.fulfilled.type,
      payload: ingredientsList
    };
    const state = reducer(stateWithLoading, action);

    expect(state.isLoading).toBe(false);
    expect(state.ingredients).toEqual(ingredientsList);
  });
});
