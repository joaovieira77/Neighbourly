# 🏢 Neighbourly — Condominium Management App

Neighbourly is a full-stack web application designed to streamline condominium administration. It empowers residents and annual administrators to manage payments, meetings, expenses, and communication in a secure and organized way.

---

## 🌐 Live Overview

Neighbourly consists of two main components:

- **Frontend:** Built with React, providing a responsive and role-based user interface.
- **Backend:** Built with Node.js and Express, connected to MongoDB using the native driver.

---

## ⚙️ Tech Stack

| Layer       | Technology                     |
|-------------|--------------------------------|
| Frontend    | React, Axios, React Router     |
| Backend     | Node.js, Express, MongoDB      |
| Auth        | JWT (JSON Web Tokens)          |
| Security    | bcryptjs for password hashing  |
| Styling     | CSS Modules / Tailwind / SCSS  |

---

## 🔐 Authentication

Neighbourly uses JWT-based authentication. Users can:

- **Sign up** as residents (`POST /auth/signup`)
- **Log in** to access protected features (`POST /auth/login`)
- Tokens are stored in `localStorage` and sent via `Authorization: Bearer <token>`

---

## 🧩 Core Features

### 👥 User Roles
- **Resident (Condómino):** Can view quotas, submit occurrences, and access shared information.
- **Administrator:** Has elevated permissions to manage quotas, expenses, meetings, and notifications.

### 💰 Quotas
- Assign, update, and mark payments
- Residents can view their own quota status

### 📦 Expenses
- Admins can register expenses
- All users can view expenses by year

### 🛠️ Occurrences
- Residents can report issues
- Admins can resolve them

### 📅 Meetings
- Admins can schedule, edit, delete meetings and register minutes (ata)
- All users can view upcoming meetings

### 📣 Notifications
- Admins can send announcements
- All users receive and view them

### 🔄 Annual Admin Rotation
- Admins are defined per year
- Only current-year admins can perform admin-only actions

---

## 🗄️ Database Collections

- `users` — Residents and admins
- `gestaoAnual` — Annual admin assignments
- `quotas` — Payment records
- `despesas` — Expense records
- `ocorrencias` — Reported issues
- `reunioes` — Meeting schedules and minutes
- `notificacoes` — System-wide announcements

---

## 🚀 Getting Started

### 🔧 Backend Setup

```bash
cd server
npm install
node index.js
-create a .env file
PORT=3037
JWT_SECRET=uma_chave_secreta_segura

### 💻 Frontend Setup
cd client
npm install
npm start
