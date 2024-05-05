import { RootState } from '../../../redux/store';

export const getIsPinEnabled = (state: RootState) => {
  return state.security.isPinEnabled;
};
