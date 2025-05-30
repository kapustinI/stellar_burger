import { TConstructorIngredient, TIngredient } from '@utils-types';
import {
  addToConstructor,
  constructorReducer,
  deleteAllFromConstructor,
  deleteItemFromConstructor,
  initialState,
  moveIngredientDown,
  moveIngredientUp
} from '../constructorSlice';

const mockIngredients: TConstructorIngredient[] = [
  {
    _id: '1',
    name: 'Арахис',
    type: 'string',
    proteins: 123,
    fat: 234,
    carbohydrates: 345,
    calories: 567,
    price: 678,
    image: 'string',
    image_mobile: 'string',
    image_large: 'string',
    id: '1'
  },
  {
    _id: '2',
    name: 'Орех',
    type: 'string',
    proteins: 123,
    fat: 234,
    carbohydrates: 345,
    calories: 567,
    price: 678,
    image: 'string',
    image_mobile: 'string',
    image_large: 'string',
    id: '2'
  }
];

const newIngredient = {
  _id: '3',
  name: 'Кунжут',
  type: 'string',
  proteins: 123,
  fat: 234,
  carbohydrates: 345,
  calories: 567,
  price: 678,
  image: 'string',
  image_mobile: 'string',
  image_large: 'string'
};

const filteredIngredients = [
  {
    _id: '1',
    name: 'Арахис',
    type: 'string',
    proteins: 123,
    fat: 234,
    carbohydrates: 345,
    calories: 567,
    price: 678,
    image: 'string',
    image_mobile: 'string',
    image_large: 'string',
    id: '1'
  }
];

const moveIngredients = [
  {
    _id: '2',
    name: 'Орех',
    type: 'string',
    proteins: 123,
    fat: 234,
    carbohydrates: 345,
    calories: 567,
    price: 678,
    image: 'string',
    image_mobile: 'string',
    image_large: 'string',
    id: '2'
  },
  {
    _id: '1',
    name: 'Арахис',
    type: 'string',
    proteins: 123,
    fat: 234,
    carbohydrates: 345,
    calories: 567,
    price: 678,
    image: 'string',
    image_mobile: 'string',
    image_large: 'string',
    id: '1'
  }
];

describe('test for constructor slice', () => {
  afterAll(() => {
    jest.restoreAllMocks();
  });

  it('add to constructor test', () => {
    const newState = constructorReducer(
      { ...initialState, ingredients: mockIngredients },
      addToConstructor(newIngredient)
    );

    const { ingredients } = newState;
    expect(ingredients.length).toBe(3);
  });

  it('delete ingredient', () => {
    const newState = constructorReducer(
      { ...initialState, ingredients: mockIngredients },
      deleteItemFromConstructor(1)
    );

    const { ingredients } = newState;
    expect(ingredients).toEqual(filteredIngredients);
  });

  it('clear constructor', () => {
    const newState = constructorReducer(
      { ...initialState, ingredients: mockIngredients },
      deleteAllFromConstructor()
    );

    const { ingredients } = newState;
    expect(ingredients).toEqual([]);
  });

  it('move ingredient down', () => {
    const newState = constructorReducer(
      { ...initialState, ingredients: mockIngredients },
      moveIngredientDown(0)
    );

    const { ingredients } = newState;
    expect(ingredients).toEqual(moveIngredients);
  });

  it('move ingredient up', () => {
    const newState = constructorReducer(
      { ...initialState, ingredients: mockIngredients },
      moveIngredientUp(1)
    );

    const { ingredients } = newState;
    expect(ingredients).toEqual(moveIngredients);
  });
});
