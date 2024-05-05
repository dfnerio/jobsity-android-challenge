import { RootState } from '../../../redux/store';
import { getIsAuthorized } from './getIsAuthorized';
import { getIsPinEnabled } from './getIsPinEnabled';

export const getShouldAskForAuthentication = (state: RootState) => {
  const isAuthorized = getIsAuthorized(state);
  const isPinEnabled = getIsPinEnabled(state);
  return !isAuthorized && isPinEnabled;
};
