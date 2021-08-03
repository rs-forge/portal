import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { membersApi } from '../services/members';

export const store = configureStore({
  reducer: {
    [membersApi.reducerPath]: membersApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(membersApi.middleware)
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
