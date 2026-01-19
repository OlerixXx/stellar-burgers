import { configureStore } from '@reduxjs/toolkit';
import reducer, {
  addIngredient,
  addBun,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearConstructor,
  getIngredients,
  getBun
} from './burgerConstructorSlice';

// afterEach(() => {
//   jest.restoreAllMocks(); // Восстанавливает все замоканные функции
//   jest.clearAllMocks();   // Очищает информацию о вызовах моков
// });
//
// // Или очистка после всех тестов
// afterAll(() => {
//   jest.restoreAllMocks();
// });

const constructorIngredientsList = [
  {
    id: 'zlXE-nFwxHdFwa9xnDJkm',
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
    id: 'x7Fk-dgl9V2y8WbGvuP1q',
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
    id: 'YNPFowqzeArnFeS4NNjeq',
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

const bunList = [
  {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  },
  {
    _id: '643d69a5c3f7b9001cfa093d',
    name: 'Флюоресцентная булка R2-D3',
    type: 'bun',
    proteins: 44,
    fat: 26,
    carbohydrates: 85,
    calories: 643,
    price: 988,
    image: 'https://code.s3.yandex.net/react/code/bun-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png'
  }
];

describe('Тесты редьюсеров', () => {
  test('Очистка конструктора', () => {
    const initialConstructorState = {
      bun: bunList[0],
      ingredients: constructorIngredientsList
    };

    const newState = reducer(initialConstructorState, clearConstructor());
    const { ingredients, bun } = newState;
    expect(ingredients).toEqual([]);
    expect(bun).toEqual(null);
  });

  test('Добавление нового ингредиента', () => {
    const initialConstructorState = {
      bun: null,
      ingredients: constructorIngredientsList
    };

    const newState = reducer(
      initialConstructorState,
      addIngredient(ingredientsList[0])
    );
    const { ingredients } = newState;
    expect(ingredients).toEqual([
      ...constructorIngredientsList,
      { ...ingredientsList[0], id: expect.any(String) }
    ]);
  });

  test('Добавление булки', () => {
    const initialConstructorState = {
      bun: null,
      ingredients: []
    };

    const newState = reducer(initialConstructorState, addBun(bunList[0]));
    const { bun } = newState;
    expect(bun).toEqual(bunList[0]);
  });

  test('Удаление ингредиента', () => {
    const initialConstructorState = {
      bun: null,
      ingredients: constructorIngredientsList
    };

    const newState = reducer(
      initialConstructorState,
      removeIngredient('x7Fk-dgl9V2y8WbGvuP1q')
    );
    const { ingredients } = newState;
    expect(ingredients).toEqual([
      constructorIngredientsList[0],
      constructorIngredientsList[2]
    ]);
  });

  describe('Сменить позицию ингредиента, выше', () => {
    test('Из середины', () => {
      const initialConstructorState = {
        bun: null,
        ingredients: constructorIngredientsList
      };

      const newState = reducer(
        initialConstructorState,
        moveUpIngredient('x7Fk-dgl9V2y8WbGvuP1q')
      );
      const { ingredients } = newState;
      expect(ingredients).toEqual([
        constructorIngredientsList[1],
        constructorIngredientsList[0],
        constructorIngredientsList[2]
      ]);
    });

    test('В начале', () => {
      const initialConstructorState = {
        bun: null,
        ingredients: constructorIngredientsList
      };

      const newState = reducer(
        initialConstructorState,
        moveUpIngredient('zlXE-nFwxHdFwa9xnDJkm')
      );
      const { ingredients } = newState;
      expect(ingredients).toEqual(constructorIngredientsList);
    });
  });

  describe('Сменить позицию ингредиента, ниже', () => {
    test('Из середины', () => {
      const initialConstructorState = {
        bun: null,
        ingredients: constructorIngredientsList
      };

      const newState = reducer(
        initialConstructorState,
        moveDownIngredient('x7Fk-dgl9V2y8WbGvuP1q')
      );
      const { ingredients } = newState;
      expect(ingredients).toEqual([
        constructorIngredientsList[0],
        constructorIngredientsList[2],
        constructorIngredientsList[1]
      ]);
    });

    test('В конце', () => {
      const initialConstructorState = {
        bun: null,
        ingredients: constructorIngredientsList
      };

      const newState = reducer(
        initialConstructorState,
        moveDownIngredient('YNPFowqzeArnFeS4NNjeq')
      );
      const { ingredients } = newState;
      expect(ingredients).toEqual(constructorIngredientsList);
    });
  });
});

describe('Тесты селекторов', () => {
  const store = configureStore({
    reducer: {
      burgerConstructor: reducer
    },
    preloadedState: {
      burgerConstructor: {
        bun: bunList[0],
        ingredients: constructorIngredientsList
      }
    }
  });

  test('Получение ингредиентов', () => {
    const ingredients = getIngredients(store.getState());
    expect(ingredients).toEqual(constructorIngredientsList);
  });

  test('Получение булок', () => {
    const bun = getBun(store.getState());
    expect(bun).toEqual(bunList[0]);
  });
});
