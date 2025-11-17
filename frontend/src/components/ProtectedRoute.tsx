import React, { type ReactNode } from 'react'; // Tipo ReactNode importado como 'type'
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { type RootState } from '../redux/store'; // Tipo RootState importado como 'type'

// Define a tipagem das props (propriedades) que este componente espera.
interface ProtectedRouteProps {
    children: ReactNode;
}

// Componente que verifica a autenticação antes de renderizar a rota.
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {

    // 1. Acessa o estado de autenticação do Redux e DESESTRUTURA.
    // Tipagem correta: informa ao useSelector que o estado completo é RootState.
    const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth) as { isAuthenticated: boolean; loading: boolean };

    // 2. Se o estado de autenticação ainda está sendo carregado.
    if (loading) {
        return <div>Carregando...</div>;
    }

    // 3. Lógica principal: Se o usuário NÃO está autenticado.
    if (!isAuthenticated) {
        // Se não estiver logado, redireciona para a página inicial (Auth).
        return <Navigate to="/" replace />;
    }

    // 4. Se estiver autenticado, renderiza o componente filho (ex: Dashboard).
    return children;
};

export default ProtectedRoute;