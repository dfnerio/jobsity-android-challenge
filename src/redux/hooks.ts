import { useDispatch, useSelector } from 'react-redux';
import { RootDispatch, RootState } from './store';

export const useRootDispatch = useDispatch.withTypes<RootDispatch>();
export const useRootSelector = useSelector.withTypes<RootState>();
