// Importa o Router do Express.
import { Router } from 'express';
// Importa o middleware de autenticação JWT.
import { authenticateJWT } from '../middleware/auth';
// Importa as funções de CRUD que criamos no controlador de entradas.
import {
    createEntry,
    getEntries,
    updateEntry,
    deleteEntry
} from '../controllers/entryController';

// Cria uma nova instância de Router.
const router = Router();

// --- Definição das Rotas de Entradas (Todas Protegidas) ---

// Em todas as rotas abaixo, a função 'authenticateJWT' é chamada primeiro.
// Se o token JWT for válido, ela adiciona o userId ao request e chama a próxima função (o controlador).
// Se o token for inválido ou ausente, ela impede o acesso e retorna um erro 401/403.

// 1. Rota de Criação (CREATE)
// Rota: POST /api/entries
// Protegida: Somente usuários logados podem criar entradas.
router.post('/', authenticateJWT, createEntry);

// 2. Rota de Leitura (READ - Listar todas)
// Rota: GET /api/entries
// Protegida: Somente usuários logados podem listar SUAS entradas.
router.get('/', authenticateJWT, getEntries);

// 3. Rota de Atualização (UPDATE)
// Rota: PUT /api/entries/:id (o :id é um parâmetro dinâmico na URL)
// Protegida: O middleware e o controlador garantem que o usuário só atualize suas entradas.
router.put('/:id', authenticateJWT, updateEntry);

// 4. Rota de Exclusão (DELETE)
// Rota: DELETE /api/entries/:id
// Protegida: O middleware e o controlador garantem que o usuário só exclua suas entradas.
router.delete('/:id', authenticateJWT, deleteEntry);

// Exporta o router para ser importado e usado no arquivo server.ts.
export default router;