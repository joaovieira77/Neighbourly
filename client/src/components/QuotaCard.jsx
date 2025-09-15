export default function QuotaCard({ quota, onPay, onUpdate }) {
  return (
    <div className="bg-white rounded-lg border p-4 flex justify-between items-center">
      <div>
        <div className="font-medium">Ano: {quota.ano}</div>
        <div className="text-sm text-gray-600">Valor: € {quota.valor}</div>
        <div className={`mt-1 text-sm ${quota.paga ? 'text-green-600' : 'text-red-600'}`}>
          {quota.paga ? 'Paga' : 'Pendente'}
        </div>
      </div>
      <div className="flex gap-2">
        {!quota.paga && onPay && (
          <button onClick={() => onPay(quota)} className="px-3 py-1 text-sm bg-emerald-600 text-white rounded hover:bg-emerald-700">
            Marcar paga
          </button>
        )}
        {!quota.paga && onUpdate && (
          <button onClick={() => {
            const novo = prompt('Novo valor (€):', quota.valor)
            if (novo) onUpdate(quota, Number(novo))
          }} className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700">
            Atualizar valor
          </button>
        )}
      </div>
    </div>
  )
}
