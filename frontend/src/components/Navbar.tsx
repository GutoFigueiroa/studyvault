import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// Actions do Redux
import { logout } from '../redux/slices/authSlice';
import { clearEntries } from '../redux/slices/entrySlice';
// Tipagem da Store
import { type RootState, type AppDispatch } from '../redux/store';

const Navbar: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    // Verifica se o usuário está logado acessando a fatia 'auth'
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    // Função para lidar com o Logout
    const handleLogout = () => {
        // 1. Limpa o estado de autenticação (remove token do Redux/localStorage)
        dispatch(logout());
        // 2. Limpa o estado de entradas (para não vazar dados para o próximo login)
        dispatch(clearEntries());
        // 3. Redireciona para a página de Login
        navigate('/');
    };

    return (
        <header className="navbar">
            <h1>StudyVault 🔐</h1>
            <nav>
                {isAuthenticated ? (
                    // Se estiver logado, mostra o botão de Logout
                    <button className="danger" onClick={handleLogout}>
                        Sair
                    </button>
                ) : (
                    // Se não estiver logado, apenas uma informação (ou um link para Login)
                    <span className="nav-info"></span>
                )}
            </nav>

            {/* Estilização básica para o Navbar */}
            <style>{`
        .navbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 20px;
          background-color: #5c67f2; /* $color-primary do styles.scss */
          color: white;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .navbar h1 {
          font-size: 1.5rem;
          margin: 0;
        }
        .navbar button.danger {
          background-color: #ff4d4f;
          color: white;
          padding: 8px 15px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
        .navbar button.danger:hover {
          background-color: #e04141;
        }
      `}</style>
        </header>
    );
};

export default Navbar;
