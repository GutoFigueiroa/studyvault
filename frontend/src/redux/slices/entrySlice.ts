// Caminho: studyvault/frontend/src/redux/slices/entrySlice.ts

import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import axiosInstance from '../../utils/axiosInstance';
import axios from 'axios'; // ✅ Pode manter apenas se for usado em `axios.isAxiosError`

const API_URL = '/entries';

type AppThunkConfig = {
    state: {
        auth: { token: string | null };
        entries: EntryState;
    };
    rejectValue: string;
};

// Tipagem da entrada
export interface Entry {
    _id: string;
    title: string;
    content: string;
    user?: string;
    createdAt: string;
    updatedAt: string;
}

// Tipagem do estado do slice
interface EntryState {
    entries: Entry[];
    loading: boolean;
    error: string | null;
}

const initialState: EntryState = {
    entries: [],
    loading: false,
    error: null,
};

// --- Thunks Assíncronos (Interação com a API) ---

// Buscar todas as entradas
export const fetchEntries = createAsyncThunk<Entry[], void, AppThunkConfig>(
    'entries/fetchEntries',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(API_URL);
            return response.data;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message || 'Falha ao carregar entradas.';
                return rejectWithValue(message);
            }
            return rejectWithValue('Erro inesperado ao carregar entradas.');
        }
    }
);

// Criar ou atualizar entrada
export const saveEntry = createAsyncThunk<Entry, Entry, AppThunkConfig>(
    'entries/saveEntry',
    async (entryData, { rejectWithValue }) => {
        try {
            if (entryData._id) {
                const response = await axiosInstance.put(`${API_URL}/${entryData._id}`, entryData);
                return response.data;
            } else {
                const dataToSend = { title: entryData.title, content: entryData.content };
                const response = await axiosInstance.post(API_URL, dataToSend);
                return response.data;
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message || 'Falha ao salvar a entrada.';
                return rejectWithValue(message);
            }
            return rejectWithValue('Erro inesperado ao salvar entrada.');
        }
    }
);

// Deletar entrada
export const deleteEntry = createAsyncThunk<string, string, AppThunkConfig>(
    'entries/deleteEntry',
    async (entryId, { rejectWithValue }) => {
        try {
            await axiosInstance.delete(`${API_URL}/${entryId}`);
            return entryId;
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                const message = err.response?.data?.message || 'Falha ao excluir a entrada.';
                return rejectWithValue(message);
            }
            return rejectWithValue('Erro inesperado ao excluir entrada.');
        }
    }
);

// --- Slice ---

const entrySlice = createSlice({
    name: 'entries',
    initialState,
    reducers: {
        clearEntries: (state) => {
            state.entries = [];
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // --- Fetch ---
            .addCase(fetchEntries.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEntries.fulfilled, (state, action: PayloadAction<Entry[]>) => {
                state.loading = false;
                state.entries = action.payload;
            })
            .addCase(fetchEntries.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Erro ao buscar entradas.';
            })

            // --- Save ---
            .addCase(saveEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(saveEntry.fulfilled, (state, action: PayloadAction<Entry>) => {
                state.loading = false;
                const savedEntry = action.payload;

                const index = state.entries.findIndex(e => e._id === savedEntry._id);
                if (index >= 0) {
                    state.entries[index] = savedEntry; // atualização
                } else {
                    state.entries.unshift(savedEntry); // criação
                }
            })
            .addCase(saveEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Erro ao salvar entrada.';
            })

            // --- Delete ---
            .addCase(deleteEntry.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteEntry.fulfilled, (state, action: PayloadAction<string>) => {
                state.loading = false;
                state.entries = state.entries.filter(e => e._id !== action.payload);
            })
            .addCase(deleteEntry.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || 'Erro ao excluir entrada.';
            });
    },
});

export const { clearEntries } = entrySlice.actions;
export default entrySlice.reducer;
