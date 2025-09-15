import api from './api'

export const createOcorrencia = (payload) => api.post('/ocorrencias', payload)
export const listOcorrencias = () => api.get('/ocorrencias')
export const resolveOcorrencia = (id) => api.patch(`/ocorrencias/${id}/resolver`)
