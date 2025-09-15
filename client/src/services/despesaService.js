import api from './api'

export const listDespesas = (ano) => api.get('/despesas', { params: ano ? { ano } : {} })
export const createDespesa = (payload) => api.post('/despesas', payload)
