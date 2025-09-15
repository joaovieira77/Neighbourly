import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { myQuotas, assignQuota, listQuotasByYear, updateQuotaValor, markQuotaPaid } from '../services/quotaService'
import QuotaCard from '../components/QuotaCard'
import AdminRoute from '../routes/AdminRoute'

export default function Quotas() {
  const { isAdmin } = useAuth()
  const [my, setMy] = useState([])
  const [year, setYear] = useState(new Date().getFullYear())
  const [list, setList] = useState([])
  const [loading, setLoading] = useState(false)
  const [assignForm, setAssignForm] = useState({ userId: '', ano: year, valor: '' })

  const loadMy = async () => {
    try {
      const q = await myQuotas()
      setMy(q)
    } catch {}
  }

  const loadYear = async () => {
    if (!isAdmin) return
    setLoading(true)
    try {
      const q = await listQuotasByYear(year)
      setList(q)
    } catch {} finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadMy()
  }, [])

  useEffect(() => {
    loadYear()
  }, [year, isAdmin])

  const onAssign = async (e) => {
    e.preventDefault()
    await assignQuota(assignForm.userId, Number(assignForm.ano), Number(assignForm.valor))
    setAssignForm({ userId: '', ano: year, valor: '' })
    loadYear()
  }

  const onPay = async (q) => {
    await markQuotaPaid(q.id)
    loadYear()
    loadMy()
  }

  const onUpdate = async (q, valor) => {
    await updateQuotaValor(q.id, Number(valor))
    loadYear()
  }

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-xl font-semibold mb-3">As minhas quotas</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {my.map(q => <QuotaCard key={q.id} quota={q} />)}
          {my.length === 0 && <div className="text-sm text-gray-500">Sem quotas.</div>}
        </div>
      </section>

      <AdminRoute>
        <section className="border-t pt-6">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h2 className="text-xl font-semibold">Gestão de quotas</h2>
            <label className="ml-auto text-sm">
              Ano:
              <input className="ml-2 border rounded px-2 py-1 w-28"
                     type="number" value={year}
                     onChange={(e) => setYear(Number(e.target.value))} />
            </label>
          </div>

          <form onSubmit={onAssign} className="grid md:grid-cols-4 gap-3 mb-4">
            <input placeholder="User ID" value={assignForm.userId} onChange={e => setAssignForm({ ...assignForm, userId: e.target.value })} className="border rounded px-3 py-2" required />
            <input placeholder="Ano" type="number" value={assignForm.ano} onChange={e => setAssignForm({ ...assignForm, ano: e.target.value })} className="border rounded px-3 py-2" required />
            <input placeholder="Valor (€)" type="number" step="0.01" value={assignForm.valor} onChange={e => setAssignForm({ ...assignForm, valor: e.target.value })} className="border rounded px-3 py-2" required />
            <button className="bg-indigo-600 text-white rounded px-4 py-2">Atribuir quota</button>
          </form>

          {loading ? (
            <div>A carregar...</div>
          ) : (
            <div className="grid md:grid-cols-2 gap-3">
              {list.map(q => (
                <QuotaCard key={q.id} quota={q} onPay={onPay} onUpdate={onUpdate} />
              ))}
              {list.length === 0 && <div className="text-sm text-gray-500">Sem quotas para o ano selecionado.</div>}
            </div>
          )}
        </section>
      </AdminRoute>
    </div>
  )
}
