// Caminho: studyvault/frontend/src/pages/Dashboard.tsx

import React, { useEffect } from 'react';
// ⚠️ 1. REMOVIDAS: as importações padrão do react-redux
// ⚠️ 1. REMOVIDAS: as importações de tipagem RootState e AppDispatch de '../redux/store'

// ⚡️ NOVO: Importa os hooks tipados do arquivo isolado
import { useAppDispatch, useAppSelector } from '../redux/hooks';

// Importa o fetchEntries, Entry, e o NOVO Thunk: deleteEntry
import { fetchEntries, type Entry, deleteEntry } from '../redux/slices/entrySlice';
import EntryList from '../components/EntryList';
import EntryForm from '../components/EntryForm';

const Dashboard: React.FC = () => {
    // ⚡️ 2. USO DO HOOK TIPADO: useAppDispatch
    const dispatch = useAppDispatch();

    // ⚡️ 3. USO DO HOOK TIPADO: useAppSelector (Não precisa mais de tipagem explícita no state)
    const { entries, loading, error } = useAppSelector((state) => state.entries);

    // 2. Estado local para gerenciamento do formulário (Adicionar/Editar)
    const [editingEntry, setEditingEntry] = React.useState<Entry | null>(null);
    const [isModalOpen, setIsModalOpen] = React.useState(false);


    // 3. Efeito para buscar as entradas ao carregar
    useEffect(() => {
        dispatch(fetchEntries());
    }, [dispatch]);


    // 4. Handlers para a lista
    const handleEdit = (entry: Entry) => {
        setEditingEntry(entry); // Define a entrada para edição
        setIsModalOpen(true);   // Abre o formulário/modal
    };

    // ⚠️ LÓGICA DE EXCLUSÃO FINALIZADA
    const handleDelete = async (entryId: string) => {
        if (window.confirm('Tem certeza que deseja EXCLUIR permanentemente esta entrada? Esta ação não pode ser desfeita.')) {

            // Dispara o Thunk deleteEntry e espera o resultado
            const resultAction = await dispatch(deleteEntry(entryId));

            // Verifica se a exclusão foi bem-sucedida
            if (deleteEntry.fulfilled.match(resultAction)) {
                alert('Entrada excluída com sucesso!');
            }
            // Se falhar, o estado de erro no Redux será atualizado, e a mensagem exibida na tela.
        }
    };

    const handleCreateNew = () => {
        setEditingEntry(null); // Limpa o estado para criar nova entrada
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingEntry(null);
    };

    return (
        <div className="dashboard-page">
            <style>{`.dashboard-page { padding: 20px; max-width: 1000px; margin: 0 auto; } .loading-message { font-weight: bold; color: #5c67f2; } .error-message { font-weight: bold; color: #ff4d4f; } .dashboard-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }`}</style>

            <div className="dashboard-header">
                <h2>Seu Diário de Estudo Criptografado</h2>
                <button className="primary" onClick={handleCreateNew} disabled={loading}>
                    + Nova Entrada
                </button>
            </div>

            {/* Formulário de Criação/Edição (condicional) */}
            {isModalOpen && (
                <EntryForm
                    entryToEdit={editingEntry}
                    onClose={handleCloseModal}
                />
            )}

            {loading && <p className="loading-message">Carregando entradas...</p>}

            {/* ⚠️ Exibe o erro de forma destacada, se houver */}
            {error && <p className="error-message">Erro na Operação: {error}</p>}

            {/* Listagem de Entradas */}
            {!loading && !error && entries.length > 0 && (
                <EntryList
                    entries={entries}
                    onEdit={handleEdit}
                    onDelete={handleDelete} // Passa a função finalizada
                />
            )}

            {!loading && !error && entries.length === 0 && (
                <p>Você ainda não tem entradas no diário. Clique em **+ Nova Entrada** para começar.</p>
            )}
        </div>
    );
};

export default Dashboard;