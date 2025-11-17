// Importa módulos necessários do Express e JWT.
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Define a interface para o payload (carga) do token JWT.
// O 'userId' é o dado que inserimos no token no momento do login.
interface JwtPayload {
    userId: string;
}

// --- 1. Definição da Interface Customizada ---

// Estende a interface Request do Express para incluir a propriedade 'userId'.
// Esta interface é exportada e usada nos controladores (AuthRequest) para tipagem.
export interface AuthRequest extends Request {
    userId?: string;
}

// --- 2. Variável Secreta do JWT ---

// Segredo usado para assinar e verificar o token. (DEVE ser o mesmo usado no authController!)
const JWT_SECRET = 'seu_segredo_super_secreto';

// --- 3. Função Middleware de Verificação ---

// Middleware para verificar se o token JWT é válido em rotas protegidas.
export const authenticateJWT = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Pega o header 'Authorization' da requisição.
    const authHeader = req.headers.authorization;

    // Verifica se o token está no formato correto ("Bearer TOKEN").
    if (authHeader && authHeader.startsWith('Bearer ')) {
        // Extrai apenas o TOKEN, removendo 'Bearer '.
        const token = authHeader.split(' ')[1];

        try {
            // Tenta verificar e decodificar o token usando o segredo.
            const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;

            // Adiciona o ID do usuário (vindo do token) ao objeto Request.
            // Isso é o que permite que os controladores saibam quem fez a requisição.
            req.userId = decoded.userId;

            // Se o token for válido, passa para a próxima função (o controlador).
            next();
        } catch (error) {
            // Se a verificação falhar (token inválido, expirado, etc.).
            return res.status(403).json({ message: 'Token inválido ou expirado.' });
        }
    } else {
        // Se não houver token no header.
        return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }
};