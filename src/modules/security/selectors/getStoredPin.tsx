import { RootState } from '../../../redux/store';

export const getStoredPin = (state: RootState) => {
  return state.security.pin;
};
