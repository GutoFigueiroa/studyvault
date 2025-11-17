// Importa Response e os tipos necessários.
import { Response } from 'express';
// Importa o modelo de Entrada.
import Entry from '../models/Entry';
// Importa a interface customizada que inclui o userId do middleware JWT.
import { AuthRequest } from '../middleware/auth';
import { Types } from 'mongoose';

// --- 1. Criar Nova Entrada (POST /api/entries) ---
// Usa AuthRequest pois esta rota é protegida e exige o userId.
export const createEntry = async (req: AuthRequest, res: Response) => {
    // Desestrutura o título e o conteúdo do corpo da requisição.
    const { title, content } = req.body;
    // O ID do usuário logado é inserido no request pelo middleware JWT.
    const userId = req.userId;

    try {
        // 1. Cria a nova entrada no MongoDB.
        const newEntry = new Entry({
            title,
            content,
            user: userId // Associa a entrada ao ID do usuário logado.
        });

        // 2. Salva e retorna a entrada criada.
        await newEntry.save();
        return res.status(201).json(newEntry);

    } catch (error) {
        console.error('Erro ao criar entrada:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// --- 2. Listar Entradas do Usuário (GET /api/entries) ---

export const getEntries = async (req: AuthRequest, res: Response) => {
    const userId = req.userId;

    try {
        // 1. Busca TODAS as entradas onde o campo 'user' é igual ao ID do usuário logado.
        const entries = await Entry.find({ user: userId })
            // Ordena as entradas pela data de criação (mais novas primeiro).
            .sort({ createdAt: -1 });

        // 2. Retorna a lista de entradas.
        return res.status(200).json(entries);

    } catch (error) {
        console.error('Erro ao listar entradas:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// --- 3. Atualizar Entrada (PUT /api/entries/:id) ---

export const updateEntry = async (req: AuthRequest, res: Response) => {
    // O ID da entrada a ser atualizada vem dos parâmetros da URL.
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.userId;

    // Verifica se o ID fornecido é um ObjectId válido do MongoDB.
    if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'ID da entrada inválido.' });
    }

    try {
        // 1. Procura e atualiza a entrada:
        const updatedEntry = await Entry.findOneAndUpdate(
            // Condição de busca: Garante que o ID da entrada E o ID do usuário correspondam.
            { _id: id, user: userId },
            // Novos dados a serem aplicados.
            { title, content, updatedAt: new Date() },
            // Opção: Retorna o documento atualizado.
            { new: true }
        );

        if (!updatedEntry) {
            // Se não encontrar (ID errado ou o usuário não é o dono).
            return res.status(404).json({ message: 'Entrada não encontrada ou acesso negado.' });
        }

        return res.status(200).json(updatedEntry);

    } catch (error) {
        console.error('Erro ao atualizar entrada:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};

// --- 4. Excluir Entrada (DELETE /api/entries/:id) ---

export const deleteEntry = async (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const userId = req.userId;

    if (!Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: 'ID da entrada inválido.' });
    }

    try {
        // 1. Procura e remove a entrada:
        const deletedEntry = await Entry.findOneAndDelete({
            // Condição de busca: Garante que o ID da entrada E o ID do usuário correspondam.
            _id: id,
            user: userId
        });

        if (!deletedEntry) {
            // Se não encontrar (ID errado ou o usuário não é o dono).
            return res.status(404).json({ message: 'Entrada não encontrada ou acesso negado.' });
        }

        // Retorna uma resposta vazia 204 (No Content) ou 200 com a mensagem.
        return res.status(200).json({ message: 'Entrada excluída com sucesso.' });

    } catch (error) {
        console.error('Erro ao excluir entrada:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
};