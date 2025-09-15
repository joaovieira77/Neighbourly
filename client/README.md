# 🏢 Neighbourly Frontend

Neighbourly is a condominium management platform designed to simplify communication,  and administration between residents and annual administrators. This frontend interfaces with the Neighbourly backend API and adapts its features based on user roles.

---

## ⚙️ Tech Stack

- **Framework:** React  
- **Routing:** React Router  
- **State Management:** Context API (or Redux)  
- **HTTP Client:** Axios  
- **Authentication:** JWT (stored in localStorage)  
- **Styling:** CSS Modules / Tailwind / Styled Components (depending on implementation)

---

## 🧭 Navigation Overview

### 🔐 Authentication

- **Login Page**  
  - Sends `POST /auth/login`  
  - Stores JWT token  
  - Redirects to dashboard

- **Signup Page**  
  - Sends `POST /auth/signup`  
  - Used for initial registration of residents

---

### 🏠 Dashboard

- Displays recent notifications, upcoming meetings, and quota status  
- Content adapts based on user role (`resident` vs `admin`)  
- May include visual indicators or charts

---

### 💰 Quotas

- **Resident:**  
  - View personal quotas (`GET /quotas/me`)  
  - Status: Pending or Paid

- **Administrator:**  
  - Assign quotas (`POST /quotas`)  
  - Update quota value (`PATCH /quotas/:id/valor`)  
  - Mark quota as paid (`PATCH /quotas/:id/pagar`)  
  - View quotas by year (`GET /quotas/ano/:ano`)

---

### 📦 Expenses

- **Administrator:**  
  - Create new expenses (`POST /despesas`)

- **All users:**  
  - View expenses (`GET /despesas?ano=YYYY`)

---

### 📣 Notifications

- **Administrator:**  
  - Create notifications (`POST /notificacoes`)

- **All users:**  
  - View notifications (`GET /notificacoes`)

---

### 🛠️ Occurrences

- **Resident:**  
  - Report issues (`POST /ocorrencias`)

- **All users:**  
  - View reported occurrences (`GET /ocorrencias`)

- **Administrator:**  
  - Resolve occurrences (`PATCH /ocorrencias/:id/resolver`)

---

### 📅 Meetings

- **Administrator:**  
  - Schedule meetings (`POST /reunioes`)  
  - Edit meetings (`PATCH /reunioes/:id`)  
  - Delete meetings (`DELETE /reunioes/:id`)  
  - Register meeting minutes (`PATCH /reunioes/:id/ata`)

- **All users:**  
  - View meetings (`GET /reunioes`)

---

## 🔐 Authentication & Authorization

- JWT token stored in `localStorage`  
- Axios interceptor adds `Authorization: Bearer <token>` to requests  
- Protected routes using `PrivateRoute` or equivalent  
- Role-based rendering for admin-only features
