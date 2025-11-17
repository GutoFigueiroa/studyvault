// Caminho: src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import entriesReducer from './slices/entrySlice';


// Criação da store global
export const store = configureStore({
  reducer: {
    auth: authReducer,
     entries: entriesReducer,
  },
});

// Tipos para hooks do Redux (useAppDispatch / useAppSelector)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
