// Importa o módulo 'express', que facilita a criação de servidores web em Node.js.
import express, { Request, Response } from 'express';
// Importa o 'mongoose' para interagir com o banco de dados MongoDB de forma mais fácil.
import mongoose from 'mongoose';
// Importa o 'cors' para permitir que o frontend (em outra porta/domínio) acesse o backend.
import cors from 'cors';
// IMPORTANTE: Essas rotas ainda não existem, mas vamos criá-las em seguida.
import authRoutes from './routes/authRoutes';
import entryRoutes from './routes/entryRoutes';

// Define a porta onde o servidor irá rodar.
const PORT = 3001;
// Define a string de conexão com o MongoDB. (Altere se seu DB estiver em outro local!)
const MONGO_URI = 'mongodb://localhost:27017/study_vault';

// Cria uma instância do aplicativo Express.
const app = express();

// --- Configurações do Middleware ---

// Habilita o CORS para todas as requisições.
app.use(cors());
// Permite que o Express entenda requisições com corpo no formato JSON.
app.use(express.json());

// --- Conexão com o Banco de Dados ---

// Tenta conectar ao MongoDB. O `.connect()` retorna uma Promise.
mongoose.connect(MONGO_URI)
    // Se a conexão for bem-sucedida, exibe uma mensagem no console.
    .then(() => console.log('Conectado ao MongoDB!'))
    // Se houver erro, exibe a mensagem de erro.
    .catch(err => console.error('Erro ao conectar ao MongoDB:', err));

// --- Definição de Rotas ---

// Adiciona as rotas de autenticação sob o prefixo `/api/auth`.
app.use('/api/auth', authRoutes);
// Adiciona as rotas de entradas do diário sob o prefixo `/api/entries`.
app.use('/api/entries', entryRoutes);

// --- Inicialização do Servidor ---

// Faz o servidor "escutar" requisições na porta definida.
app.listen(PORT, () => {
    // Confirma que o servidor está rodando.
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});