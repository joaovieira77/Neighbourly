import api from './api'

export const myQuotas = () => api.get('/quotas/me')
export const assignQuota = (userId, ano, valor) => api.post('/quotas', { userId, ano, valor })
export const listQuotasByYear = (ano) => api.get(`/quotas/ano/${ano}`)
export const updateQuotaValor = (id, valor) => api.patch(`/quotas/${id}/valor`, { valor })
export const markQuotaPaid = (id) => api.patch(`/quotas/${id}/pagar`)
