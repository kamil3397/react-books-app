
# 📚 React Books App

> A full-stack book browser using the Gutendex API and custom Express + MongoDB backend.

---

## 🧰 Tech Stack

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript)
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)
![Express](https://img.shields.io/badge/API-Express-black?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)
![JWT](https://img.shields.io/badge/Auth-JWT-orange?logo=jsonwebtokens)
![Docker](https://img.shields.io/badge/DevOps-Docker-blue?logo=docker)

---

## 🚀 Features

- User registration with preferred book language
- Login/logout using JWT
- Browse books filtered by preferred language
- Search books by title/author
- Add/remove favorites
- Favorites view page
- Responsive Material UI interface
- JWT token-based route protection

---

## 📦 Installation

### Backend

```bash
git clone https://github.com/kamil3397/react-books-app.git
cd react-books-app/backend
cp .env.example .env
# Edit .env with your MongoDB URI and JWT secret

docker-compose up --build
# Runs at http://localhost:4000
```

### Frontend

```bash
cd react-books-app/frontend
npm install
npm run dev
# Runs at http://localhost:5173
```

---

## 🌐 API Overview

### Book Data (Gutendex API)

```http
GET https://gutendex.com/books/?languages=<preferredLanguage>
GET https://gutendex.com/books/?search=<query>&languages=<preferredLanguage>
```

### Auth

```http
POST /register
POST /login
```

### Favorites (protected)

```http
GET    /favorites
POST   /favorites/:bookId
DELETE /favorites/:bookId
```

---

## 🔐 Auth & Token

- JWT stored in `localStorage`
- Token used in `Authorization: Bearer <token>`
- Middleware `verifyToken` protects routes

---

## 🗂 Folder Structure

```
react-books-app/
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── index.ts
│   └── Dockerfile
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── App.tsx
```

---

## ✅ Future Ideas

- Add pagination
- Profile page for user info
- OAuth login
- Multi-language UI

---

## 📄 License

MIT
