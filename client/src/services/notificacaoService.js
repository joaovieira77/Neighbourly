import api from './api'

export const listNotificacoes = () => api.get('/notificacoes')
export const createNotificacao = (payload) => api.post('/notificacoes', payload)
