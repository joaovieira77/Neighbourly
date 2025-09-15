import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import Quotas from './pages/Quotas'
import Despesas from './pages/Despesas'
import Reunioes from './pages/Reunioes'
import Notificacoes from './pages/Notificacoes'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/quotas" element={<Quotas />} />
            <Route path="/despesas" element={<Despesas />} />
            <Route path="/reunioes" element={<Reunioes />} />
            <Route path="/notificacoes" element={<Notificacoes />} />
          </Route>
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      </main>
    </div>
  )
}
