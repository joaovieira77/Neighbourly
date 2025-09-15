import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { listDespesas, createDespesa } from '../services/despesaService'
import DespesaCard from '../components/DespesaCard'
import AdminRoute from '../routes/AdminRoute'

export default function Despesas() {
  const { isAdmin } = useAuth()
  const [ano, setAno] = useState('')
  const [despesas, setDespesas] = useState([])
  const [form, setForm] = useState({ descricao: '', valor: '', ano: '', categoria: '' })

  const load = async () => {
    const data = await listDespesas(ano ? Number(ano) : undefined)
    setDespesas(data)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line
  }, [ano])

  const onCreate = async (e) => {
    e.preventDefault()
    await createDespesa({ ...form, valor: Number(form.valor), ano: Number(form.ano) })
    setForm({ descricao: '', valor: '', ano: '', categoria: '' })
    load()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h1 className="text-xl font-semibold">Despesas</h1>
        <input placeholder="Filtrar por ano" className="ml-auto border rounded px-3 py-2 w-40"
               value={ano} onChange={e => setAno(e.target.value)} />
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        {despesas.map(d => <DespesaCard key={d.id} despesa={d} />)}
        {despesas.length === 0 && <div className="text-sm text-gray-500">Sem despesas.</div>}
      </div>

      <AdminRoute>
        <section className="border-t pt-6">
          <h2 className="text-lg font-semibold mb-3">Criar despesa</h2>
          <form onSubmit={onCreate} className="grid md:grid-cols-4 gap-3">
            <input placeholder="Descrição" className="border rounded px-3 py-2" value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} required />
            <input placeholder="Valor (€)" type="number" step="0.01" className="border rounded px-3 py-2" value={form.valor} onChange={e => setForm({ ...form, valor: e.target.value })} required />
            <input placeholder="Ano" type="number" className="border rounded px-3 py-2" value={form.ano} onChange={e => setForm({ ...form, ano: e.target.value })} required />
            <input placeholder="Categoria" className="border rounded px-3 py-2" value={form.categoria} onChange={e => setForm({ ...form, categoria: e.target.value })} />
            <button className="md:col-span-4 bg-indigo-600 text-white rounded px-4 py-2">Criar</button>
          </form>
        </section>
      </AdminRoute>
    </div>
  )
}
