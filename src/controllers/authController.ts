import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// Função auxiliar para gerar o Token
const generateToken = (id: string): string => {
    return jwt.sign({ id }, process.env.JWT_SECRET!, {
        expiresIn: '30d', // Opcional: tempo de expiração
    });
};

// 1. Função de Registro
export const registerUser = async (req: Request, res: Response): Promise<void> => {
    const { name, email, password } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            res.status(400).json({ message: 'Usuário já existe' });
            return;
        }

        const user: IUser = await User.create({ name, email, password });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id.toString()), // Gera o token JWT
        });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao registrar usuário.' });
    }
};

// 2. Função de Login
export const loginUser = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id.toString()), // Gera o token JWT
            });
        } else {
            res.status(401).json({ message: 'Email ou senha inválidos' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Erro ao fazer login.' });
    }
};