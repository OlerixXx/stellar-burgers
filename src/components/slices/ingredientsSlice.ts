import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { getIngredientsApi } from '@api';
import { RootState } from '../../services/store';

type IngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
};

const initialState: IngredientsState = {
  ingredients: [],
  isLoading: true
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredients: (state) => state.ingredients,
    isLoading: (state) => state.isLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const fetchIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => getIngredientsApi()
);

export const getIngredientById = (
  state: RootState,
  ingredientId: string | undefined
) => state.ingredients.ingredients.find((item) => item._id === ingredientId);

export const { getIngredients, isLoading } = ingredientsSlice.selectors;
export const {} = ingredientsSlice.actions;
export default ingredientsSlice.reducer;
