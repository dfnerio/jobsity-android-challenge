import { RootState } from '../../../redux/store';

export const getIsAuthorized = (state: RootState) => {
  return state.security.isAuthorized;
};
