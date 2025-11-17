// Caminho: frontend/src/utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor de requisição
axiosInstance.interceptors.request.use(
    (config) => {
        const publicPaths = ['/users/login', '/users/register'];

        // 🔓 Se for rota pública, não adiciona token
        if (publicPaths.some((path) => config.url?.includes(path))) {
            console.log(`🔓 Rota pública detectada: ${config.url}`);
            return config;
        }

        // 🔐 Adiciona token se existir no localStorage
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
            console.log('🔐 Token adicionado no header Authorization');
        } else {
            console.warn('⚠️ Nenhum token encontrado no localStorage.');
        }

        console.log('➡️ Interceptando requisição para:', config.url);
        return config;
    },
    (error) => Promise.reject(error)
);

export default axiosInstance;
