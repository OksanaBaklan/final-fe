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
import { typeReducer } from "../store/index";

export const store = configureStore({
    reducer: {
    //   auth: persistReducer(authPersistConfig, authReducer),
    //   transactions: transactionsReducer,
    modal: modalTransaction,
      color: typeReducer
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