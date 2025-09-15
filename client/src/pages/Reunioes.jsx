import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { listReunioes, createReuniao, editReuniao, deleteReuniao, addAta } from '../services/reuniaoService'
import ReuniaoCard from '../components/ReuniaoCard'
import AdminRoute from '../routes/AdminRoute'

export default function Reunioes() {
  const { isAdmin } = useAuth()
  const [items, setItems] = useState([])
  const [form, setForm] = useState({ titulo: '', data: '', local: '' })

  const load = async () => {
    const r = await listReunioes()
    setItems(r)
  }

  useEffect(() => { load() }, [])

  const onCreate = async (e) => {
    e.preventDefault()
    await createReuniao({ ...form, data: new Date(form.data).toISOString() })
    setForm({ titulo: '', data: '', local: '' })
    load()
  }

  const onEdit = async (reuniao) => {
    const titulo = prompt('Novo título:', reuniao.titulo)
    if (titulo === null) return
    await editReuniao(reuniao.id, { titulo })
    load()
  }

  const onDelete = async (reuniao) => {
    if (!window.confirm('Remover reunião?')) return
    await deleteReuniao(reuniao.id)
    load()
  }

  const onAddAta = async (reuniao, ata) => {
    await addAta(reuniao.id, ata)
    load()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-semibold">Reuniões</h1>
      <div className="grid md:grid-cols-2 gap-3">
        {items.map(r => (
          <ReuniaoCard
            key={r.id}
            reuniao={r}
            onEdit={isAdmin ? onEdit : undefined}
            onDelete={isAdmin ? onDelete : undefined}
            onAddAta={isAdmin ? onAddAta : undefined}
          />
        ))}
        {items.length === 0 && <div className="text-sm text-gray-500">Sem reuniões.</div>}
      </div>

      <AdminRoute>
        <section className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-3">Criar reunião</h2>
          <form onSubmit={onCreate} className="grid md:grid-cols-3 gap-3">
            <input placeholder="Título" className="border rounded px-3 py-2" value={form.titulo} onChange={e => setForm({ ...form, titulo: e.target.value })} required />
            <input placeholder="Data" type="datetime-local" className="border rounded px-3 py-2" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} required />
            <input placeholder="Local" className="border rounded px-3 py-2" value={form.local} onChange={e => setForm({ ...form, local: e.target.value })} />
            <button className="md:col-span-3 bg-indigo-600 text-white rounded px-4 py-2">Criar</button>
          </form>
        </section>
      </AdminRoute>
    </div>
  )
}
