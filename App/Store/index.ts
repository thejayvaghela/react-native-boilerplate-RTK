import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { persistStore, persistReducer, Storage } from 'redux-persist';
import { storage } from '@Utils/Storage';
import { userSlice } from '@Slices';
import { Slices } from '@Utils/Enums';

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  whitelist: [Slices.USER],
  storage: reduxStorage,
};

const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    user: userSlice,
  }),
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

const useAppDispatch = () => useDispatch<typeof store.dispatch>();
const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export { store, persistor, useAppSelector, useAppDispatch };
