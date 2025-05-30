import { rootReducer } from '../../store';
import { constructorSlice } from '../constructorSlice';
import { feedSlice } from '../feedSlice';
import { ingredientsSlice } from '../ingredientsSlice';
import { orderSlice } from '../orderSlice';
import { userOrdersSlice } from '../userOrdersSlice';
import { userSlice } from '../userSlice';

const storeInitialStates = {
  [ingredientsSlice.name]: ingredientsSlice.getInitialState(),
  [constructorSlice.name]: constructorSlice.getInitialState(),
  [feedSlice.name]: feedSlice.getInitialState(),
  [userSlice.name]: userSlice.getInitialState(),
  [orderSlice.name]: orderSlice.getInitialState(),
  [userOrdersSlice.name]: userOrdersSlice.getInitialState()
};

describe('test for root reducer', () => {
  it('right initializing rootReducer test', () => {
    const newState = rootReducer(undefined, { type: '' });

    expect(newState).toEqual(storeInitialStates);
  });
});
