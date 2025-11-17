import React from 'react';
import { type Entry } from '../redux/slices/entrySlice';
import EntryItem from './EntryItem';

interface EntryListProps {
    entries: Entry[];
    // Estas funções serão passadas do Dashboard para o EntryItem
    onEdit: (entry: Entry) => void;
    onDelete: (entryId: string) => void;
}

const EntryList: React.FC<EntryListProps> = ({ entries, onEdit, onDelete }) => {
    return (
        <div className="entry-list">
            {/* Mapeia (itera) o array de entradas e renderiza um EntryItem para cada */}
            {entries.map((entry) => (
                <EntryItem
                    key={entry._id}
                    entry={entry}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
            <style>{`
        .entry-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      `}</style>
        </div>
    );
};

export default EntryList;