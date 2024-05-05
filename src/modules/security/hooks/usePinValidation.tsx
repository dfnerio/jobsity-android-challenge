import { useCallback } from 'react';
import { useRootSelector } from '../../../redux/hooks';
import { getStoredPin } from '../selectors/getStoredPin';

export const usePinValidation = () => {
  const storedPin = useRootSelector(getStoredPin);

  const isPinValid = useCallback(
    (value: string) => {
      return storedPin === value;
    },
    [storedPin],
  );

  return {
    isPinValid,
  };
};
