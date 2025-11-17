import { Routes, Route } from 'react-router-dom';
// IMPORTANTE: Estes componentes ainda não existem, mas os criaremos depois.
import Navbar from './components/Navbar';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute'; // Para rotas protegidas

function App() {
  return (
    // Aplica a classe global definida no SCSS
    <div className="app-container">
      {/* O Navbar aparece em todas as páginas */}
      <Navbar />

      <main>
        {/* Definição das Rotas da Aplicação */}
        <Routes>
          {/* Rota de Autenticação (Login e Registro) */}
          <Route path="/" element={<Auth />} />

          {/* Rota Protegida (Dashboard) */}
          {/* Somente acessível se o usuário estiver autenticado (usará o Redux) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          {/* Rota de fallback (404) ou redirecionamento para o dashboard */}
          <Route path="*" element={<Auth />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;