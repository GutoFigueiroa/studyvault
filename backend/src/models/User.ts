// Importa as funções essenciais do Mongoose (Schema e model) e o tipo Document.
import { Schema, model, Document } from 'mongoose';
// Importa o módulo 'bcryptjs', que é usado para criptografar senhas (hashing).
import bcrypt from 'bcryptjs';

// --- 1. Definição da Interface (TypeScript) ---

// Define a estrutura (tipagem) que um documento de Usuário deve ter.
// 'IUser' é a nossa interface para garantir a tipagem estática.
export interface IUser extends Document {
    email: string; // O email do usuário (único para autenticação).
    password: string; // A senha do usuário (será armazenada como hash).
    comparePassword: (candidatePassword: string) => Promise<boolean>; // Método para comparar senhas.
}

// --- 2. Definição do Schema (Mongoose) ---

// Cria o esquema do Mongoose, que define a forma dos dados no MongoDB.
const UserSchema: Schema = new Schema({
    // Campo 'email':
    email: {
        type: String, // O tipo de dado no MongoDB.
        required: true, // É obrigatório.
        unique: true, // Não pode haver dois usuários com o mesmo email.
        trim: true, // Remove espaços em branco antes e depois.
        lowercase: true, // Armazena sempre em minúsculas.
    },
    // Campo 'password':
    password: {
        type: String,
        required: true,
        minlength: 6, // Define um tamanho mínimo para a segurança da senha.
    },
}, {
    // Configuração opcional: Mongoose adiciona automaticamente campos 'createdAt' e 'updatedAt'.
    timestamps: true,
});

// --- 3. Middleware (Ação antes de Salvar) ---

// Este é um "pré-save hook" do Mongoose. Ele executa uma função ANTES de salvar o documento.
// Usamos a função tradicional (function(next)) para que o 'this' se refira ao documento atual.
UserSchema.pre<IUser>('save', async function (next) {
    // Verifica se o campo 'password' foi modificado.
    // Se for um novo usuário OU se a senha estiver sendo alterada, continua.
    if (!this.isModified('password')) {
        return next(); // Se não foi modificada, passa para a próxima etapa (salvar).
    }

    try {
        // Gera um 'salt' (valor aleatório) para garantir que dois hashes de senhas iguais sejam diferentes.
        const salt = await bcrypt.genSalt(10);
        // Cria o hash da senha (criptografa) usando o salt.
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // Substitui a senha em texto simples pelo hash antes de salvar no DB.
        this.password = hashedPassword;
        // Continua com o processo de salvamento.
        next();
    } catch (err) {
        // Se ocorrer um erro durante o hash, passa o erro para o Mongoose.
        next(err as Error);
    }
});

// --- 4. Método de Instância (Comparação de Senha) ---

// Adiciona um método que estará disponível em cada objeto de usuário.
// É usado para comparar uma senha fornecida (durante o login) com a senha criptografada (hash) no DB.
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    // Usa o bcrypt para comparar a senha fornecida com o hash armazenado.
    // Retorna 'true' se as senhas coincidirem, 'false' caso contrário.
    return bcrypt.compare(candidatePassword, this.password);
};

// --- 5. Exportação do Modelo ---

// Cria e exporta o modelo 'User' para ser usado em outras partes da aplicação (controladores).
// <IUser> garante que o modelo use a nossa tipagem.
export default model<IUser>('User', UserSchema);