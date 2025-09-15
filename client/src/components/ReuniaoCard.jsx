export default function ReuniaoCard({ reuniao, onEdit, onDelete, onAddAta }) {
  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="font-medium">{reuniao.titulo}</div>
      <div className="text-sm text-gray-600">Data: {new Date(reuniao.data).toLocaleString()}</div>
      {reuniao.local && <div className="text-sm text-gray-600">Local: {reuniao.local}</div>}
      {reuniao.ata && <div className="text-xs mt-2 p-2 bg-gray-50 rounded border">Ata: {reuniao.ata}</div>}
      {(onEdit || onDelete || onAddAta) && (
        <div className="mt-3 flex gap-2">
          {onEdit && (
            <button
              onClick={() => onEdit(reuniao)}
              className="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Editar
            </button>
          )}
          {onAddAta && (
            <button
              onClick={() => {
                const ata = prompt('Adicionar/editar ata:')
                if (ata !== null) onAddAta(reuniao, ata)
              }}
              className="px-3 py-1 text-sm bg-sky-600 text-white rounded hover:bg-sky-700"
            >
              Adicionar ata
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(reuniao)}
              className="px-3 py-1 text-sm bg-rose-600 text-white rounded hover:bg-rose-700"
            >
              Remover
            </button>
          )}
        </div>
      )}
    </div>
  )
}
