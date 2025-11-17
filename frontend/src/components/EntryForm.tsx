import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveEntry, type Entry } from '../redux/slices/entrySlice';
import { type AppDispatch, type RootState } from '../redux/store';
import { FaSave, FaTimes } from 'react-icons/fa';

interface EntryFormProps {
    entryToEdit: Entry | null; // Null para criar, Entry para editar
    onClose: () => void; // Função para fechar o modal/formulário
}

const EntryForm: React.FC<EntryFormProps> = ({ entryToEdit, onClose }) => {
    const dispatch = useDispatch<AppDispatch>();
    const { loading, error } = useSelector((state: RootState) => state.entries);

    // Inicializa o estado com a entrada de edição ou com valores vazios
    const [title, setTitle] = useState(entryToEdit?.title || '');
    const [content, setContent] = useState(entryToEdit?.content || '');

    // Garante que o estado seja atualizado se a entrada de edição mudar
    useEffect(() => {
        setTitle(entryToEdit?.title || '');
        setContent(entryToEdit?.content || '');
    }, [entryToEdit]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Cria o objeto de dados com base se é uma edição ou criação
        const data: Entry = {
            _id: entryToEdit?._id || '', // Inclui o _id se for edição
            title,
            content,
            // O restante das propriedades (user, dates) é preenchido pelo backend,
            // mas o TypeScript exige que Entry tenha esses campos. 
            // Podemos usar valores default para satisfazer o TypeScript.
            createdAt: entryToEdit?.createdAt || new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            // Nota: O campo 'user' é ignorado aqui, pois é determinado pelo JWT no backend
        };

        // Dispara o Thunk de salvar e espera o resultado
        const resultAction = await dispatch(saveEntry(data));

        // Verifica se a operação foi bem-sucedida e fecha o formulário
        if (saveEntry.fulfilled.match(resultAction)) {
            onClose();
        }
        // Se falhar, o estado de erro será atualizado no Redux
    };

    return (
        <div className="entry-form-overlay">
            <div className="entry-form-modal">
                <div className="modal-header">
                    <h3>{entryToEdit ? 'Editar Entrada' : 'Nova Entrada'}</h3>
                    <button className="close-btn" onClick={onClose} title="Fechar">
                        <FaTimes />
                    </button>
                </div>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Título (Ex: Revisão de Redux Thunks)"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        maxLength={100}
                    />
                    <textarea
                        placeholder="Conteúdo do seu diário de estudo..."
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        required
                    />

                    {error && <p className="error-message">{error}</p>}

                    <button type="submit" className="primary" disabled={loading}>
                        <FaSave /> {loading ? 'Salvando...' : 'Salvar Entrada'}
                    </button>
                </form>
            </div>
            <style>{`
        .entry-form-overlay {
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex; justify-content: center; align-items: center;
          z-index: 1000;
        }
        .entry-form-modal {
          background: #fefefe; padding: 25px; border-radius: 10px;
          width: 90%; max-width: 600px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.3);
        }
        .modal-header {
          display: flex; justify-content: space-between; align-items: center;
          margin-bottom: 20px;
        }
        .close-btn { background: transparent; color: #777; border: none; font-size: 1.5rem; }
        .close-btn:hover { color: #333; }
        .entry-form-modal textarea { resize: vertical; }
        .entry-form-modal button { margin-top: 15px; width: 100%; display: flex; justify-content: center; align-items: center; gap: 10px; }
      `}</style>
        </div>
    );
};

export default EntryForm;