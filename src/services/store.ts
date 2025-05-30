import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './slices/ingredientsSlice';
import { constructorSlice } from './slices/constructorSlice';
import { feedSlice } from './slices/feedSlice';
import { userSlice } from './slices/userSlice';
import { orderSlice } from './slices/orderSlice';
import { userOrdersSlice } from './slices/userOrdersSlice';

export const rootReducer = combineReducers({
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [constructorSlice.name]: constructorSlice.reducer,
  [feedSlice.name]: feedSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [orderSlice.name]: orderSlice.reducer,
  [userOrdersSlice.name]: userOrdersSlice.reducer
}); // Заменить на импорт настоящего редьюсера)

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
