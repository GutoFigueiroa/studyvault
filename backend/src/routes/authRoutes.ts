// Importa o Router do Express, que é usado para criar rotas modulares.
import { Router } from 'express';
// Importa as funções de registro e login do nosso controlador.
import { register, login } from '../controllers/authController';

// Cria uma nova instância de Router.
const router = Router();

// --- Definição das Rotas de Autenticação ---

// 1. Rota de Registro de Usuário (Criação de conta)
// Quando o frontend faz uma requisição POST para /api/auth/register,
// a função 'register' do controlador é executada.
router.post('/register', register);

// 2. Rota de Login de Usuário (Geração do JWT)
// Quando o frontend faz uma requisição POST para /api/auth/login,
// a função 'login' do controlador é executada e retorna o token JWT.
router.post('/login', login);

// Exporta o router para ser usado e importado no arquivo server.ts.
export default router;