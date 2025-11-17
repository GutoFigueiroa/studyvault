// Caminho: studyVault/frontend/src/redux/hooks.ts

import { useDispatch, useSelector } from 'react-redux';
import { type store } from './store'; // Importa a store SOMENTE para tipagem

// Define a tipagem do estado completo (RootState)
export type RootState = ReturnType<typeof store.getState>;

// Define a tipagem para a função dispatch
export type AppDispatch = typeof store.dispatch;

// Cria hooks customizados tipados
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();