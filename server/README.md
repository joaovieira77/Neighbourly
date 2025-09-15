# 🏢 Neighbourly Backend

Neighbourly Backend Overview  
This backend is built with **Node.js**, **Express**, and **MongoDB** (native driver, no Mongoose).  
It manages condominium administration tasks including:

- User authentication  
- Annual administrator rotation  
- Quotas (payments)  
- Expenses  
- Occurrences  
- Meetings  
- Notifications  

---

## ⚙️ Stack

- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Authentication:** JWT (JSON Web Tokens)  
- **Password hashing:** bcryptjs  

---

## 🚀 API Features

### 1. Authentication
- **Signup** – `POST /auth/signup`  
  Create a new user (condómino). Returns a JWT token.  
- **Login** – `POST /auth/login`  
  Authenticate a user and return a JWT. Passwords are hashed using bcrypt.  

---

### 2. Gestão Anual de Administradores
> ⚠️ The first 2 admins are supposed to be manually chosen by me  

- **Get administrators for a year** – `GET /gestao/:ano/admins`  
- **Set administrators for a year** – `POST /gestao/:ano/admins`  
  - Only current-year admins can perform this.  
  - Middleware ensures only current-year admins can access admin-only endpoints.  

---

### 3. Quotas (Condominium Payments)
- **List own quotas** – `GET /quotas/me` (logged-in users)  
- **Assign quota to a user** – `POST /quotas` (Admin-only)  
- **List quotas by year** – `GET /quotas/ano/:ano` (Admin-only)  
- **Update quota value** – `PATCH /quotas/:id/valor` (Admin-only, only if quota is pending)  
- **Mark quota as paid** – `PATCH /quotas/:id/pagar` (Admin-only)  

---

### 4. Expenses (Despesas)
- **Create expense** – `POST /despesas` (Admin-only)  
- **List expenses** – `GET /despesas` (all users, filter by year using `?ano=YYYY`)  

---

### 5. Occurrences (Issues / Reports)
- **Create occurrence** – `POST /ocorrencias` (any logged-in user)  
- **List occurrences** – `GET /ocorrencias` (all users)  
- **Resolve occurrence** – `PATCH /ocorrencias/:id/resolver` (Admin-only)  

---

### 6. Meetings (Reuniões)
- **Create meeting** – `POST /reunioes` (Admin-only)  
- **List meetings** – `GET /reunioes` (all users)  
- **Edit meeting** – `PATCH /reunioes/:id` (Admin-only)  
- **Delete meeting** – `DELETE /reunioes/:id` (Admin-only)  
- **Add minutes (ata)** – `PATCH /reunioes/:id/ata` (Admin-only)  

---

### 7. Notifications (Notificações)
- **Create notification** – `POST /notificacoes` (Admin-only)  
- **List notifications** – `GET /notificacoes` (all users)  

---

## 🛡️ Middleware
- **protect** – Protect routes, ensures user is authenticated via JWT.  
- **isAdminAnoAtual** – Protect admin-only routes for the current year.  

---

## 🗄️ Database Collections
- `users` – Condóminos and administrators  
- `gestaoAnual` – Yearly admin rotation  
- `quotas` – Payments per user per year  
- `despesas` – Expenses  
- `ocorrencias` – Issues reported by users  
- `reunioes` – Meetings  
- `notificacoes` – Notifications  
