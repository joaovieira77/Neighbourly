import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { myQuotas } from '../services/quotaService'
import { listNotificacoes } from '../services/notificacaoService'
import QuotaCard from '../components/QuotaCard'
import NotificacaoCard from '../components/NotificacaoCard'

export default function Dashboard() {
  const { user } = useAuth()
  const [quotas, setQuotas] = useState([])
  const [notifs, setNotifs] = useState([])

  useEffect(() => {
    const load = async () => {
      try {
        const q = await myQuotas()
        setQuotas(q)
      } catch {}
      try {
        const n = await listNotificacoes()
        setNotifs(n)
      } catch {}
    }
    load()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold">Olá, {user?.name || user?.email}</h1>
      </div>

      <section>
        <h2 className="text-lg font-semibold mb-3">As suas quotas</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {quotas.map((q) => <QuotaCard key={q.id} quota={q} />)}
          {quotas.length === 0 && <div className="text-sm text-gray-500">Sem quotas.</div>}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-3">Notificações</h2>
        <div className="grid md:grid-cols-2 gap-3">
          {notifs.map((n) => <NotificacaoCard key={n.id} notif={n} />)}
          {notifs.length === 0 && <div className="text-sm text-gray-500">Sem notificações.</div>}
        </div>
      </section>
    </div>
  )
}
