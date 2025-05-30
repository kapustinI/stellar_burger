import {
  TLoginData,
  TRegisterData,
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  isAuthChecked: boolean; // флаг для статуса проверки токена пользователя
  isAuthenticated: boolean;
  data: TUser | null;
  loginUserError: string | null;
  loginUserRequest: boolean;
};

export const initialState: TUserState = {
  isAuthChecked: false,
  isAuthenticated: false,
  data: null,
  loginUserError: null,
  loginUserRequest: false
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({ email, name, password }: TRegisterData) => {
    const data = await registerUserApi({ email, name, password });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: TLoginData) => {
    const data = await loginUserApi({ email, password });

    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const checkUserAuth = createAsyncThunk(
  'user/checkUser',
  async () => await getUserApi()
);

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: TRegisterData) => {
    const data = await updateUserApi(user);
    return data.user;
  }
);

export const logoutUser = createAsyncThunk(
  'user/logoutUser',
  (_, { dispatch }) => {
    logoutApi()
      .then(() => {
        localStorage.removeItem('refreshToken');
        deleteCookie('accessToken');
        dispatch(userLogout());
      })
      .catch(() => {
        console.error('Ошибка выполнения выхода');
      });
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  selectors: {
    getUserSelector: (state) => state.data,
    isAuthCheckedSelector: (state) => state.isAuthChecked
  },
  reducers: {
    userLogout: (state) => {
      state.data = null;
    },
    authChecked: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message as string;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.data = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message as string;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.data = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
        state.isAuthenticated = false;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message as string;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.data = action.payload.user;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
        state.isAuthenticated = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message as string;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loginUserRequest = false;
        state.data = action.payload;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loginUserError = null;
        state.loginUserRequest = true;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loginUserRequest = false;
        state.loginUserError = action.error.message as string;
        state.isAuthChecked = true;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loginUserRequest = false;
        state.data = null;
        state.isAuthChecked = true;
        state.isAuthenticated = true;
      });
  }
});

export const { userLogout, authChecked } = userSlice.actions;
export const userReducer = userSlice.reducer;
export const { getUserSelector, isAuthCheckedSelector } = userSlice.selectors;
