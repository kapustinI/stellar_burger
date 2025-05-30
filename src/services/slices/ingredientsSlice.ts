import { getIngredientsApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  ingredients: TIngredient[];
  ingredientsLoading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  ingredients: [],
  ingredientsLoading: false,
  error: null
};

export const getIngredients = createAsyncThunk(
  'ingredients/getAll',
  async () => await getIngredientsApi()
);

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    getIngredientSelector: (state) => state.ingredients,
    getLoadingStatusSelector: (state) => state.ingredientsLoading
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.error = null;
        state.ingredientsLoading = true;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.ingredientsLoading = false;
        state.error = action.error.message as string;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.ingredientsLoading = false;
        state.ingredients = action.payload;
      });
  }
});

export const { getIngredientSelector, getLoadingStatusSelector } =
  ingredientsSlice.selectors;

export const ingredientsReducer = ingredientsSlice.reducer;
