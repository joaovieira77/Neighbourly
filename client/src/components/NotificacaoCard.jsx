export default function NotificacaoCard({ notif }) {
  return (
    <div className="bg-white rounded-lg border p-4">
      <div className="font-medium">{notif.titulo}</div>
      <div className="text-sm text-gray-600">{notif.mensagem}</div>
      <div className="text-xs text-gray-500 mt-1">
        {notif.createdAt ? new Date(notif.createdAt).toLocaleString() : ''}
      </div>
    </div>
  )
}
