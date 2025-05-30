import { TOrdersData } from '@utils-types';
import { feedReducer, getFeed, initialState } from '../feedSlice';

const mockFeed: TOrdersData = {
  orders: [
    {
      createdAt: '2025-05-30T12:25:52.138Z',
      ingredients: ['643d69a5c3f7b9001cfa093d', '643d69a5c3f7b9001cfa0943'],
      name: 'Space флюоресцентный антарианский бургер',
      number: 45941,
      status: 'done',
      updatedAt: '2025-05-30T12:25:52.138Z',
      _id: '66963f34119d45001b4f928b'
    },

    {
      createdAt: '2025-05-30T12:29:52.138Z',
      ingredients: [
        '643d69a5c3f7b9001cfa093c',
        '643d69a5c3f7b9001cfa0943',
        '643d69a5c3f7b9001cfa0947'
      ],
      name: 'Краторный space фалленианский бургер',
      number: 45940,
      status: 'done',
      updatedAt: '2025-05-30T12:29:50.138Z',
      _id: '66963cb5119d45001b4f9288'
    }
  ],
  total: 12,
  totalToday: 1
};

describe('tests for feed slice', () => {
  it('set true when getFeed is pending', () => {
    const newState = feedReducer(initialState, {
      type: getFeed.pending.type
    });

    expect(newState).toEqual({ ...initialState, feedLoading: true });
  });

  it('set feed when getFeed is fulfilled', () => {
    const newState = feedReducer(initialState, {
      type: getFeed.fulfilled.type,
      payload: mockFeed
    });

    expect(newState).toEqual({
      ...initialState,
      allOrders: mockFeed.orders,
      burgersReady: mockFeed.total,
      todayBurgersReady: mockFeed.totalToday
    });
  });

  it('set error when getFeed is rejected', () => {
    const newState = feedReducer(initialState, {
      type: getFeed.rejected.type,
      error: { message: 'Some error' }
    });

    expect(newState).toEqual({ ...initialState, error: 'Some error' });
  });
});
