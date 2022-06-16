import { reduxAPI } from "./services/reduxAPI";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import itemSlice from "./features/itemSlice";
import authSlice from "./features/authSlice";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import poRequestSlice from "./features/poRequestSlice";
import filterSlice from "./features/filterSlice";
import titleSlice from "./features/titleSlice";
import menuItemSlice from "./features/menuItemSlice";
import equipmentItemSlice from "./features/equipmentItemSlice"
import invoiceSlice from "./features/invoiceSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const rootReducer = combineReducers({
  [reduxAPI.reducerPath]: reduxAPI.reducer,
  items: itemSlice,
  menuItems: menuItemSlice,
  equipmentItems: equipmentItemSlice,
  auth: authSlice,
  poRequest: poRequestSlice,
  filters: filterSlice,
  title: titleSlice,
  invoice: invoiceSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(reduxAPI.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
