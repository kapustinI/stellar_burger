import { TOrder } from '@utils-types';
import {
  getUserOrders,
  initialState,
  userOrdersReducer
} from '../userOrdersSlice';

const mockUserOrders: TOrder[] = [
  {
    _id: '66967711119d45001b4f9368',
    status: 'done',
    name: 'бургер',
    createdAt: '2025-05-30',
    updatedAt: '2025-05-30',
    number: 12,
    ingredients: ['string']
  },
  {
    _id: '6694f488119d45001b4f8fbf',
    status: 'done',
    name: 'бургер',
    createdAt: '2025-05-30',
    updatedAt: '2025-05-30',
    number: 1,
    ingredients: ['string']
  }
];

describe('tests for userOrders slice', () => {
  it('set true when getUserOrders is pending', () => {
    const newState = userOrdersReducer(initialState, {
      type: getUserOrders.pending.type
    });

    expect(newState).toEqual({ ...initialState, requestStatus: true });
  });

  it('set user orders feed when getUserOrders is fulfilled', () => {
    const newState = userOrdersReducer(initialState, {
      type: getUserOrders.fulfilled.type,
      payload: mockUserOrders
    });

    expect(newState).toEqual({ ...initialState, orders: mockUserOrders });
  });

  it('set false when getUserOrders is rejected', () => {
    const newState = userOrdersReducer(initialState, {
      type: getUserOrders.rejected.type
    });

    expect(newState).toEqual(initialState);
  });
});
