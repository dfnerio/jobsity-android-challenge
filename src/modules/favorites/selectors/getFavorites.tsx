import { RootState } from '../../redux/store';

export const getFavorites = (state: RootState) => {
  return state.favorites.value;
};
