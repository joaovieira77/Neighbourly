export default function DespesaCard({ despesa }) {
  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="font-medium">{despesa.descricao}</div>
      <div className="text-sm text-gray-600">Ano: {despesa.ano}</div>
      <div className="text-sm text-gray-600">Valor: € {despesa.valor}</div>
      {despesa.categoria && <div className="text-xs mt-1 text-gray-500">Categoria: {despesa.categoria}</div>}
    </div>
  )
}
