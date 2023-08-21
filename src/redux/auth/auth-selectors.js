export const getAuth = (state) => state.auth.isAuth;
export const getUsername = (state) => state.auth.user.userName;
export const getUserAvatar = (state) => state.auth.user.avatar;
export const getAuthRefresh = (state) => state.auth.isAuthRefresh;
export const getToken = (state) => state.auth.token;
export const getTransactionCategories = (state) =>
  state.auth.user.transactionCategories;
