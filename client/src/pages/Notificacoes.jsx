import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { listNotificacoes, createNotificacao } from '../services/notificacaoService'
import NotificacaoCard from '../components/NotificacaoCard'
import AdminRoute from '../routes/AdminRoute'

export default function Notificacoes() {
  const { isAdmin } = useAuth()
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ titulo: '', mensagem: '' })

  const load = async () => {
    const data = await listNotificacoes()
    setItems(data)
  }

  useEffect(() => { load() }, [])

  const onCreate = async (e) => {
    e.preventDefault()
    await createNotificacao(form)
    setForm({ titulo: '', mensagem: '' })
    load()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Notificações</h1>
      <div className="grid md:grid-cols-2 gap-3">
        {items.map(n => <NotificacaoCard key={n.id} notif={n} />)}
        {items.length === 0 && <div className="text-sm text-gray-500">Sem notificações.</div>}
      </div>

      <AdminRoute>
        <section className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-3">Criar notificação</h2>
          <form onSubmit={onCreate} className="grid md:grid-cols-3 gap-3">
            <input placeholder="Título" className="border rounded px-3 py-2" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} required />
            <input placeholder="Mensagem" className="border rounded px-3 py-2" value={form.mensagem} onChange={e => setForm({ ...form, mensagem: e.target.value })} required />
            <button className="bg-indigo-600 text-white rounded px-4 py-2">Criar</button>
          </form>
        </section>
      </AdminRoute>
    </div>
  )
}
