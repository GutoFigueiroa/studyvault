// Caminho: studyvault/frontend/src/pages/Auth.tsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ⚡️ Redux
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { clearError, registerUser, loginUser } from '../redux/slices/authSlice'; // loginUser agora existe!

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading, error, token } = useAppSelector((state) => state.auth);

  // 🔁 Redireciona se o usuário já estiver autenticado
  useEffect(() => {
    if (token) {
      navigate('/dashboard');
    }
  }, [token, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(clearError());

    if (isLogin) {
      // 🔐 LOGIN — usa o thunk do Redux
      const resultAction = await dispatch(loginUser({ email, password }));

      if (loginUser.fulfilled.match(resultAction)) {
        alert('Login realizado com sucesso!');
        navigate('/dashboard');
      } else {
        console.error('Erro ao fazer login:', resultAction.payload);
      }
    } else {
      // 🧾 REGISTRO — também via Redux
      const resultAction = await dispatch(registerUser({ name, email, password }));

      if (registerUser.fulfilled.match(resultAction)) {
        alert('Usuário registrado com sucesso!');
        setIsLogin(true);
      } else {
        console.error('Erro ao registrar usuário:', resultAction.payload);
      }
    }
  };

  return (
    <div className="auth-page">
      <style>{`
  .auth-page {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 80vh;
    background-color: #f8fafc;
  }

  .auth-card {
    background: white;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    width: 100%;
    max-width: 400px;
  }

  .auth-card h2 {
    margin-bottom: 20px;
  }

  .auth-card input {
    width: 100%;
    padding: 10px 12px;
    margin-bottom: 15px;
    border: 1px solid #d1d5db;
    border-radius: 6px;
    font-size: 1rem;
    box-sizing: border-box;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .auth-card input:focus {
    border-color: #5c67f2;
    box-shadow: 0 0 0 2px rgba(92, 103, 242, 0.2);
    outline: none;
  }

  .auth-card button.primary {
    width: 100%;
    background-color: #5c67f2;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .auth-card button.primary:hover {
    background-color: #4751d9;
  }

  .error-message {
    color: ${error ? '#ff4d4f' : 'transparent'};
    margin-bottom: 15px;
    font-weight: bold;
  }

  .toggle-mode {
    text-align: center;
    margin-top: 15px;
  }

  .toggle-mode span {
    color: #5c67f2;
    cursor: pointer;
    text-decoration: underline;
  }

  @media (max-width: 480px) {
    .auth-card {
      padding: 20px;
    }
    .auth-card input {
      font-size: 0.95rem;
    }
  }
`}</style>


      <div className="auth-card">
        <h2>{isLogin ? 'Login' : 'Criar Conta'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Nome Completo"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <p className="error-message">{error}</p>

          <button type="submit" className="primary" disabled={loading}>
            {loading ? 'Processando...' : isLogin ? 'Entrar' : 'Registrar'}
          </button>
        </form>

        <p className="toggle-mode">
          {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
          <span
            onClick={() => {
              setIsLogin(!isLogin);
              dispatch(clearError());
            }}
          >
            {isLogin ? ' Registrar agora' : ' Fazer login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Auth;
