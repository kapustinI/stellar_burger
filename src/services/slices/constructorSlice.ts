import { PayloadAction, createSlice, nanoid } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';

type TConstructorBurgersState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorBurgersState = {
  bun: null,
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  selectors: {
    getConstructorSelector: (state) => state
  },
  reducers: {
    addToConstructor: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: nanoid() }
      })
    },
    deleteItemFromConstructor: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    deleteAllFromConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    },
    moveIngredientDown: (state, action: PayloadAction<number>) => {
      const currentItem = state.ingredients[action.payload];
      const nextItem = state.ingredients[action.payload + 1];

      state.ingredients.splice(action.payload, 2, nextItem, currentItem);
    },
    moveIngredientUp: (state, action: PayloadAction<number>) => {
      const currentItem = state.ingredients[action.payload];
      const previousItem = state.ingredients[action.payload - 1];

      state.ingredients.splice(
        action.payload - 1,
        2,
        currentItem,
        previousItem
      );
    }
  }
});

export const constructorReducer = constructorSlice.reducer;
export const { getConstructorSelector } = constructorSlice.selectors;
export const {
  addToConstructor,
  deleteItemFromConstructor,
  deleteAllFromConstructor,
  moveIngredientDown,
  moveIngredientUp
} = constructorSlice.actions;
