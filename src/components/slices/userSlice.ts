import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../services/store';
import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  TLoginData,
  TRegisterData,
  updateUserApi
} from '@api';

type UserState = {
  isInit: boolean;
  isLoading: boolean;
  user: TUser | null;
  error: string | null;
};

const initialState: UserState = {
  isInit: false,
  isLoading: false,
  user: null,
  error: null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    init: (state) => {
      state.isInit = true;
    }
  },
  selectors: {
    getUser: (state) => state.user
  },
  extraReducers: (builder) => {
    builder.addCase(fetchGetUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchGetUser.rejected, (state) => {
      state.isInit = true;
      state.isLoading = false;
    });
    builder.addCase(fetchGetUser.fulfilled, (state, action) => {
      state.isInit = true;
      state.isLoading = false;
      state.user = action.payload.user;
    });

    builder.addCase(fetchLogoutUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLogoutUser.rejected, (state) => {
      state.isInit = true;
      state.isLoading = false;
    });
    builder.addCase(fetchLogoutUser.fulfilled, (state) => {
      state.isInit = true;
      state.isLoading = false;
      state.user = null;
    });
  }
});

export const fetchRegisterUser = createAsyncThunk(
  'users/registerUser',
  async (data: TRegisterData) => registerUserApi(data)
);

export const fetchLoginUser = createAsyncThunk(
  'users/loginUser',
  async (data: TLoginData) => loginUserApi(data)
);

export const fetchLogoutUser = createAsyncThunk('users/logoutUser', async () =>
  logoutApi()
);

export const fetchGetUser = createAsyncThunk('users/getUser', async () =>
  getUserApi()
);

export const fetchUpdateUser = createAsyncThunk(
  'users/updateUser',
  async (data: TRegisterData) => updateUserApi(data)
);

export const { getUser } = userSlice.selectors;
export const { init } = userSlice.actions;
export default userSlice.reducer;
