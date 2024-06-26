import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TvShow } from '../../modules/tvShows/types/tvShow';

interface FavoritesState {
  value: TvShow[];
}

const initialState: FavoritesState = {
  value: [],
};

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<TvShow>) => {
      state.value.push(action.payload);
      state.value.sort((a, b) => a.name.localeCompare(b.name));
    },
    remove: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter(
        favorite => favorite.id !== action.payload,
      );
    },
  },
});

export type FavoritesReducer = ReturnType<typeof favoritesSlice.reducer>;

export const { add: addFavorite, remove: removeFavoriteById } =
  favoritesSlice.actions;

export default favoritesSlice.reducer;
