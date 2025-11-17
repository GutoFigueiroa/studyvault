# 📘 Study Vault

> Uma aplicação full stack para organização de estudos, com autenticação, gerenciamento de anotações e integração com MongoDB.

---

## 🚀 Visão Geral

**Study Vault** é uma aplicação web desenvolvida com **React + TypeScript** no frontend e **Node.js + Express + MongoDB** no backend.  
O objetivo é permitir que usuários se **cadastrem**, **façam login** e **gerenciem anotações** (criar, editar e excluir registros) de forma simples e segura.

---

## 🧩 Funcionalidades

✅ Cadastro e autenticação de usuários  
✅ Login com persistência de sessão via JWT  
✅ Criação, edição e exclusão de anotações  
✅ Interface responsiva e moderna  
✅ Integração completa com banco de dados MongoDB  
✅ Separação clara entre frontend e backend  
✅ Estrutura modular com Redux Toolkit no cliente  

---

## 🏗️ Arquitetura do Projeto

```
project-root/
│
├── server/                  # Backend (Node.js + Express)
│   ├── server.ts            # Arquivo principal do servidor
│   ├── routes/              # Rotas (auth, entries)
│   ├── models/              # Schemas Mongoose (User, Entry)
│   └── controllers/         # Lógica de autenticação e CRUD
│
└── client/                  # Frontend (React + TypeScript)
    ├── src/
    │   ├── pages/           # Páginas (Auth, Dashboard)
    │   ├── redux/           # Store, slices (authSlice, entrySlice)
    │   ├── services/        # axiosInstance.ts, api.ts
    │   ├── components/      # Componentes reutilizáveis
    │   ├── App.tsx          # Ponto de entrada principal
    │   └── main.tsx
    └── public/
```

---

## ⚙️ Tecnologias Utilizadas

### Frontend
- ⚛️ React + TypeScript  
- 🧠 Redux Toolkit  
- 💅 CSS Responsivo  
- ⚡ Axios para requisições HTTP  

### Backend
- 🟢 Node.js + Express  
- 🗄️ MongoDB + Mongoose  
- 🔐 JSON Web Token (JWT)  
- 🌍 CORS e Express.json configurados  

---

## 🧰 Pré-requisitos

Antes de rodar o projeto, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (v18 ou superior)
- [MongoDB](https://www.mongodb.com/try/download/community)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

---

## 🛠️ Instalação e Execução

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seuusuario/study-vault.git
   cd study-vault
   ```

2. **Instale as dependências**
   - Backend:
     ```bash
     cd server
     npm install
     ```
   - Frontend:
     ```bash
     cd client
     npm install
     ```

3. **Configure o banco de dados**
   Verifique se o MongoDB está ativo localmente:
   ```bash
   mongod
   ```
   Por padrão, a aplicação conecta em:
   ```
   mongodb://localhost:27017/study_vault
   ```

4. **Inicie o servidor**
   ```bash
   cd server
   npm run dev
   ```
   O backend será iniciado em:
   ```
   http://localhost:3001
   ```

5. **Inicie o frontend**
   ```bash
   cd client
   npm run dev
   ```
   O frontend rodará em:
   ```
   http://localhost:5173
   ```

---

## 🔒 Autenticação

O sistema utiliza **JWT (JSON Web Tokens)** para autenticação segura.

- Após login, o token é armazenado no `localStorage`
- O Axios intercepta todas as requisições e envia o token automaticamente
- Caso o token expire ou falte, o usuário é redirecionado para a tela de login

---

## 🧾 Rotas da API

### Usuários (`/api/users`)
| Método | Rota        | Descrição |
|--------|--------------|-----------|
| `POST` | `/register`  | Cria um novo usuário |
| `POST` | `/login`     | Autentica o usuário e retorna um token |

### Entradas (`/api/entries`)
| Método | Rota        | Descrição |
|--------|--------------|-----------|
| `GET`  | `/`          | Lista todas as entradas do usuário |
| `POST` | `/`          | Cria uma nova entrada |
| `PUT`  | `/:id`       | Atualiza uma entrada existente |
| `DELETE` | `/:id`     | Remove uma entrada |

---

## 🧠 Melhores Práticas Aplicadas

- Separação clara entre camadas (rotas, modelos, controladores)
- Uso de **Redux Toolkit** para simplificar a lógica global de estado
- Configuração de **Axios Interceptors** para autenticação automática
- Estrutura modular e escalável
- Tratamento de erros centralizado

---

## 🧑‍💻 Próximos Passos / Melhorias Futuras

- Implementar recuperação de senha  
- Adicionar upload de arquivos nas anotações  
- Melhorar o design da dashboard com gráficos e estatísticas  
- Deploy completo (Render, Vercel, MongoDB Atlas)

---

## 💬 Autor

**Fernando Augusto Lustoza Figueirôa**  
📍 João Pessoa - PB, Brasil  
💼 Projeto desenvolvido como prática em desenvolvimento **Full Stack com React, Node.js e MongoDB**.  

---

## 🪪 Licença
Este projeto está sob a licença **MIT** – sinta-se à vontade para usar e modificar.
