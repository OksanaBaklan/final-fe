import { configureStore } from "@reduxjs/toolkit";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from "redux-persist";
  import { modalTransaction } from "./global/global-reducer";
  import transactionsReducer from "./transactions/transactions-reducer";


export const store = configureStore({
    reducer: {
    //   auth: persistReducer(authPersistConfig, authReducer),
      transactions: transactionsReducer,
      modal: modalTransaction,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
    devTools: process.env.NODE_ENV === "development",
  });

export const persistor = persistStore(store);