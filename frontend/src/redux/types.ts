// Caminho: studyVault/frontend/src/redux/types.ts

// Cria um tipo vazio inicial para ser preenchido por outros arquivos
import { type store } from './store'; // Importa APENAS o tipo da store

// Define a tipagem do estado completo da store (RootState)
export type RootState = ReturnType<typeof store.getState>;

// Define a tipagem para a função `dispatch`
export type AppDispatch = typeof store.dispatch;