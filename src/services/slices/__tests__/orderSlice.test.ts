import { TOrder } from '@utils-types';
import {
  initialState,
  orderBurger,
  orderReducer,
  resetOrder
} from '../orderSlice';

const mockOrder: TOrder = {
  _id: '66967711119d45001b4f9368',
  status: 'done',
  name: 'бургер',
  createdAt: '2025-05-30',
  updatedAt: '2025-05-30',
  number: 1,
  ingredients: ['string']
};

describe('tests for orderSlice', () => {
  it('resetOrder test', () => {
    const newState = orderReducer(
      { ...initialState, order: mockOrder },
      resetOrder()
    );

    expect(newState).toEqual(initialState);
  });

  it('set true when orderBurger is pending', () => {
    const newState = orderReducer(initialState, {
      type: orderBurger.pending.type
    });

    expect(newState).toEqual({ ...initialState, orderRequest: true });
  });

  it('set order when orderBurger is fulfilled', () => {
    const newState = orderReducer(initialState, {
      type: orderBurger.fulfilled.type,
      payload: { order: mockOrder }
    });

    expect(newState).toEqual({ ...initialState, order: mockOrder });
  });

  it('set error when orderBurger is rejected', () => {
    const newState = orderReducer(initialState, {
      type: orderBurger.rejected.type
    });

    expect(newState).toEqual(initialState);
  });
});
