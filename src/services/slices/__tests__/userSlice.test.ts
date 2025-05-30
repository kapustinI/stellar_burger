import { TLoginData, TRegisterData } from '@api';
import {
  authChecked,
  checkUserAuth,
  initialState,
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
  userLogout,
  userReducer
} from '../userSlice';
import { TUser } from '@utils-types';

const mockRegisterUser: TRegisterData = {
  email: 'test@email.ru',
  name: 'ivanK',
  password: '0808'
};

const mockLoginUser: TLoginData = {
  email: 'test@email.ru',
  password: '0808'
};

const mockUser: TUser = {
  email: 'test@email.ru',
  name: 'ivanK'
};

const mockUpdateUser: TRegisterData = {
  email: 'test@email.ru',
  name: 'ivanK',
  password: '0808'
};

describe('tests for user slice', () => {
  // reducers tests
  it('authChecked test', () => {
    const newState = userReducer(initialState, authChecked());

    expect(newState.isAuthChecked).toEqual(true);
  });

  it('logout test', () => {
    const newState = userReducer(
      { ...initialState, data: mockUser },
      userLogout()
    );

    expect(newState.data).toEqual(null);
  });
  // register user
  it('set true when registerUser is pending', () => {
    const newState = userReducer(initialState, {
      type: registerUser.pending.type
    });

    expect(newState).toEqual({
      ...initialState,
      loginUserRequest: true
    });
  });

  it('set user data when registerUser is fulfilled', () => {
    const newState = userReducer(initialState, {
      type: registerUser.fulfilled.type,
      payload: mockRegisterUser
    });

    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: true,
      data: mockRegisterUser
    });
  });

  it('set error when registerUser is rejected', () => {
    const newState = userReducer(initialState, {
      type: registerUser.rejected.type,
      error: { message: 'Some error' }
    });

    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginUserError: 'Some error',
      loginUserRequest: false
    });
  });

  // Login user
  it('set true when loginUser is pending', () => {
    const newState = userReducer(initialState, {
      type: loginUser.pending.type
    });

    expect(newState).toEqual({ ...initialState, loginUserRequest: true });
  });

  it('set user data when loginUser is fulfilled', () => {
    const newState = userReducer(initialState, {
      type: loginUser.fulfilled.type,
      payload: mockLoginUser
    });

    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: true,
      data: mockLoginUser
    });
  });

  it('set error when loginUser is rejected', () => {
    const newState = userReducer(initialState, {
      type: loginUser.rejected.type,
      error: { message: 'Some error' }
    });

    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginUserError: 'Some error'
    });
  });

  // Check user auth
  it('set true when checkUserAuth is pending', () => {
    const newState = userReducer(initialState, {
      type: checkUserAuth.pending.type
    });

    expect(newState).toEqual({ ...initialState, loginUserRequest: true });
  });

  it('set user data when checkUserAuth is fulfilled', () => {
    const newState = userReducer(initialState, {
      type: checkUserAuth.fulfilled.type,
      payload: { user: mockUser }
    });

    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: true,
      data: mockUser
    });
  });

  it('set error when checkUserAuth is rejected', () => {
    const newState = userReducer(initialState, {
      type: checkUserAuth.rejected.type,
      error: { message: 'Some error' }
    });

    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginUserError: 'Some error'
    });
  });

  // Update user
  it('set true when updateUser is pending', () => {
    const newState = userReducer(initialState, {
      type: updateUser.pending.type
    });

    expect(newState).toEqual({
      ...initialState,
      loginUserRequest: true
    });
  });

  it('set new user data when updateUser is fulfilled', () => {
    const newState = userReducer(
      { ...initialState, data: mockUser },
      {
        type: updateUser.fulfilled.type,
        payload: mockUpdateUser
      }
    );

    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: true,
      data: mockUpdateUser
    });
  });

  it('set error when updateUser is rejected', () => {
    const newState = userReducer(initialState, {
      type: updateUser.rejected.type,
      error: { message: 'Some error' }
    });

    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginUserError: 'Some error'
    });
  });

  // Log out user
  it('set true when logoutUser is pending', () => {
    const newState = userReducer(initialState, {
      type: logoutUser.pending.type
    });

    expect(newState).toEqual({ ...initialState, loginUserRequest: true });
  });

  it('set new user data when logoutUser is fulfilled', () => {
    const newState = userReducer(
      { ...initialState, data: mockUser },
      {
        type: logoutUser.fulfilled.type
      }
    );

    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      isAuthenticated: true
    });
  });

  it('set error when logoutUser is rejected', () => {
    const newState = userReducer(initialState, {
      type: logoutUser.rejected.type,
      error: { message: 'Some error' }
    });

    expect(newState).toEqual({
      ...initialState,
      isAuthChecked: true,
      loginUserError: 'Some error'
    });
  });
});
