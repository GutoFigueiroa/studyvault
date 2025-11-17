// Importa módulos necessários do Express e JWT.
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
// Importa o Modelo de Usuário que acabamos de criar.
import User from '../models/User';

// Define o segredo para assinar o JWT. (MUITO CRÍTICO: Deve vir de variáveis de ambiente em produção!)
const JWT_SECRET = 'seu_segredo_super_secreto';

// --- 1. Função de Registro (POST /api/auth/register) ---

// Função assíncrona para lidar com o registro de novos usuários.
export const register = async (req: Request, res: Response) => {
    // Desestrutura o email e a senha do corpo da requisição (JSON).
    const { email, password } = req.body;

    try {
        // 1. Verifica se o usuário já existe no banco de dados.
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            // Se o email já estiver em uso, retorna erro 400 (Bad Request).
            return res.status(400).json({ message: 'Este email já está registrado.' });
        }

        // 2. Cria uma nova instância do Modelo de Usuário.
        const newUser = new User({ email, password });

        // 3. Salva o novo usuário no MongoDB. 
        // O middleware 'pre-save' em User.ts criptografa a senha aqui!
        await newUser.save();

        // 4. Retorna a resposta de sucesso.
        return res.status(201).json({ message: 'Usuário registrado com sucesso!' });

    } catch (error) {
        // Captura e retorna qualquer erro do servidor ou do MongoDB.
        console.error('Erro no registro:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// --- 2. Função de Login (POST /api/auth/login) ---

// Função assíncrona para lidar com o login e geração do JWT.
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // 1. Encontra o usuário pelo email.
        const user = await User.findOne({ email });

        if (!user) {
            // Se o usuário não for encontrado.
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        // 2. Compara a senha fornecida com a senha criptografada (hash) no DB.
        // Usamos o método 'comparePassword' definido em User.ts.
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            // Se a senha não coincidir.
            return res.status(400).json({ message: 'Credenciais inválidas.' });
        }

        // 3. Geração do JWT (JSON Web Token).
        // O token guarda o ID do usuário como 'payload' (carga).
        const token = jwt.sign(
            { userId: user._id }, // Payload: informações para identificar o usuário.
            JWT_SECRET,            // O segredo para assinar o token.
            { expiresIn: '1d' }    // Opção: O token expira em 1 dia.
        );

        // 4. Retorna o token para o frontend.
        // Este token será usado pelo frontend para acessar rotas protegidas.
        return res.status(200).json({
            message: 'Login realizado com sucesso.',
            token // Envia o JWT de volta.
        });

    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};