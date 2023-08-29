import { createReducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { authUser, loginUser, logOut, fetchCurrentUser, avatarUpdate } from './auth-operations';

const initialUserState = {
  data: { userName: null, email: null, balance: null, avatar: null },
  token: null,
};

const user = createReducer(initialUserState, {
  [authUser.fulfilled]: (_, { payload }) => payload,
  [loginUser.fulfilled]: (_, { payload }) => payload,
  [logOut.fulfilled]: () => initialUserState,
  [fetchCurrentUser.fulfilled]: (_, { payload }) => payload.data,
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

export default combineReducers({
  user,
  token,
  isAuth,
  isAuthRefresh,
  isLoadingAvatar,
});
