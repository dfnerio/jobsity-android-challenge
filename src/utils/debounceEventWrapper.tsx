import { debounce } from 'lodash';
import { NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';

export const debounceEventWrapper = (func: any, timeout: number) => {
  const debounced = debounce(func, timeout);
  return (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    e.persist();
    return debounced(e);
  };
};
