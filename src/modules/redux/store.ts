import { configureStore } from '@reduxjs/toolkit';
import { FavoritesReducer, favoritesSlice } from './slices/favorites';
import persistReducer from 'redux-persist/es/persistReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import persistStore from 'redux-persist/es/persistStore';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

export const rootStore = configureStore({
  reducer: {
    favorites: persistReducer(persistConfig, favoritesSlice.reducer),
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const rootPersistor = persistStore(rootStore);

export type RootState = {
  favorites: FavoritesReducer;
};

export type RootDispatch = typeof rootStore.dispatch;
