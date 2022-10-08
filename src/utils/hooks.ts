import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { AppDispatch, Dispatch, RootState } from 'services/store';

export const useAppDispatch = () => useDispatch<Dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
