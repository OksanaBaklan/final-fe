import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import {
  authUser,
  loginUser,
  logOut,
  fetchCurrentUser,
  avatarUpdate,
  passwordReset,
} from './auth-operations';

const initialUserState = {
  data: { userName: null, email: null, balance: null, avatar: null },
  token: null,
};

const user = createReducer(initialUserState, {
  [authUser.fulfilled]: (_, { payload }) => payload,
  [loginUser.fulfilled]: (_, { payload }) => payload,
  [logOut.fulfilled]: () => initialUserState,
  [fetchCurrentUser.fulfilled]: (_, { payload }) => payload.data,
  [passwordReset.fulfilled]: (_, { payload }) => payload,
  [avatarUpdate.fulfilled]: (state, { payload }) => {
    return {
      ...state,
      data: {
        ...state.data,
        avatar: payload,
      },
    };
  },
});

const token = createReducer(null, {
  [loginUser.fulfilled]: (_, { payload }) => payload.token,
  [logOut.fulfilled]: () => null,
});

const isAuth = createReducer(false, {
  [authUser.fulfilled]: () => false,
  [loginUser.fulfilled]: () => true,
  [logOut.fulfilled]: () => false,
  [fetchCurrentUser.fulfilled]: () => true,
});

const isAuthRefresh = createReducer(false, {
  [fetchCurrentUser.pending]: () => true,
  [fetchCurrentUser.fulfilled]: () => false,
  [fetchCurrentUser.rejected]: () => false,
});

const isLoadingAvatar = createReducer(false, {
  [avatarUpdate.pending]: () => true,
  [avatarUpdate.fulfilled]: () => false,
  [avatarUpdate.rejected]: () => false,
});

const isLoadingAuth = createReducer(false, {
  [loginUser.pending]: () => true,
  [loginUser.fulfilled]: () => false,
  [loginUser.rejected]: () => false,

  [logOut.pending]: () => true,
  [logOut.fulfilled]: () => false,
  [logOut.rejected]: () => false,

  [authUser.pending]: () => true,
  [authUser.fulfilled]: () => false,
  [authUser.rejected]: () => false,

  [passwordReset.pending]: () => true,
  [passwordReset.fulfilled]: () => false,
  [passwordReset.rejected]: () => false,
});

export default combineReducers({
  user,
  token,
  isAuth,
  isAuthRefresh,
  isLoadingAvatar,
  isLoadingAuth,
});
