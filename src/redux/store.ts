import { configureStore } from '@reduxjs/toolkit';
import { FavoritesReducer, favoritesSlice } from './slices/favorites';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistStore from 'redux-persist/es/persistStore';
import { SecurityReducer, securitySlice } from './slices/security';

const rootConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['security'],
};

const securityConfig = {
  key: 'security',
  storage: AsyncStorage,
  blacklist: ['isAuthorized'],
};

export const rootStore = configureStore({
  reducer: {
    favorites: persistReducer(rootConfig, favoritesSlice.reducer),
    security: persistReducer(securityConfig, securitySlice.reducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const rootPersistor = persistStore(rootStore);

export type RootState = {
  favorites: FavoritesReducer;
  security: SecurityReducer;
};

export type RootDispatch = typeof rootStore.dispatch;
