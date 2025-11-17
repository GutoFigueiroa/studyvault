// Importa as funções essenciais do Mongoose (Schema, model) e o tipo Document, além do tipo Types.
import { Schema, model, Document, Types } from 'mongoose';

// --- 1. Definição da Interface (TypeScript) ---

// Define a estrutura (tipagem) que um documento de Entrada deve ter.
export interface IEntry extends Document {
    title: string; // Título da entrada (ex: "Revisão de React Hooks").
    content: string; // O conteúdo real do diário de estudo.
    // Referência ao ID do usuário que criou esta entrada.
    // O tipo é ObjectId do Mongoose, e faz referência ao modelo 'User'.
    user: Types.ObjectId;
}

// --- 2. Definição do Schema (Mongoose) ---

// Cria o esquema do Mongoose para a Entrada.
const EntrySchema: Schema = new Schema({
    // Campo 'title':
    title: {
        type: String,
        required: true, // É obrigatório.
        trim: true,
        maxlength: 100, // Limita o tamanho do título.
    },
    // Campo 'content':
    content: {
        type: String,
        required: true, // O conteúdo não pode ser vazio.
    },
    // Campo 'user': (O relacionamento crucial)
    user: {
        type: Types.ObjectId, // O tipo de dado é o ObjectId.
        required: true,
        ref: 'User', // Faz referência ao modelo chamado 'User'.
        // Esta referência permite que o Mongoose use o método 'populate' para carregar os dados do usuário.
    },
}, {
    // Configuração opcional: Mongoose adiciona automaticamente 'createdAt' e 'updatedAt'.
    timestamps: true,
});

// --- 3. Exportação do Modelo ---

// Cria e exporta o modelo 'Entry' para ser usado em outras partes da aplicação (controladores).
// <IEntry> garante que o modelo use a nossa tipagem.
export default model<IEntry>('Entry', EntrySchema);