import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

export type BurgerConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: BurgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    clearConstructor: (state) => {
      state.ingredients = [];
      state.bun = null;
    },
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      state.ingredients.push({
        ...action.payload,
        id: nanoid()
      });
    },
    addBun: (state, action: PayloadAction<TIngredient>) => {
      state.bun = action.payload;
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveUpIngredient: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        const ingredient = state.ingredients[index];

        state.ingredients.splice(index, 1);
        const endRemoved = state.ingredients.splice(index - 1);
        state.ingredients = [...state.ingredients, ingredient, ...endRemoved];
      }
    },
    moveDownIngredient: (state, action: PayloadAction<string>) => {
      const index = state.ingredients.findIndex(
        (item) => item.id === action.payload
      );
      if (index !== -1) {
        const ingredient = state.ingredients[index];

        state.ingredients.splice(index, 1);
        const endRemoved = state.ingredients.splice(index + 1);
        state.ingredients = [...state.ingredients, ingredient, ...endRemoved];
      }
    }
  },
  selectors: {
    getIngredients: (state) => state.ingredients,
    getBun: (state) => state.bun
  }
});

export const { getIngredients, getBun } = burgerConstructorSlice.selectors;
export const {
  addIngredient,
  addBun,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;
export default burgerConstructorSlice.reducer;
