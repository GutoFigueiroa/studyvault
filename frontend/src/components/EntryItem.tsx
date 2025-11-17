import React from 'react';
import { type Entry } from '../redux/slices/entrySlice';
// Importa o ícone de caneta para editar
import { FaPen, FaTrash } from 'react-icons/fa';
// OBS: Você precisará instalar o pacote de ícones: npm install react-icons

interface EntryItemProps {
    entry: Entry;
    onEdit: (entry: Entry) => void;
    onDelete: (entryId: string) => void;
}

const EntryItem: React.FC<EntryItemProps> = ({ entry, onEdit, onDelete }) => {

    // Formata a data de criação
    const formattedDate = new Date(entry.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });

    return (
        <div className="entry-item">
            <h3>{entry.title}</h3>
            <p className="entry-date">Criado em: {formattedDate}</p>

            {/* Exibe apenas um resumo do conteúdo */}
            <p className="entry-content-preview">
                {entry.content.substring(0, 200)}...
            </p>

            <div className="entry-actions">
                <button className="primary" onClick={() => onEdit(entry)} title="Editar">
                    <FaPen /> Editar
                </button>
                <button className="danger" onClick={() => onDelete(entry._id)} title="Excluir">
                    <FaTrash /> Excluir
                </button>
            </div>

            <style>{`
        .entry-item {
          background: #fff;
          padding: 15px;
          margin-bottom: 15px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          border-left: 5px solid #5c67f2;
        }
        .entry-item h3 {
          color: #333;
          margin-bottom: 5px;
        }
        .entry-date {
          font-size: 0.85em;
          color: #777;
          margin-bottom: 10px;
        }
        .entry-actions {
          margin-top: 15px;
        }
        .entry-actions button {
          margin-right: 10px;
          padding: 8px 12px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
      `}</style>
        </div>
    );
};

export default EntryItem;