import api from './api'

export const listReunioes = () => api.get('/reunioes')
export const createReuniao = (payload) => api.post('/reunioes', payload)
export const editReuniao = (id, payload) => api.patch(`/reunioes/${id}`, payload)
export const deleteReuniao = (id) => api.delete(`/reunioes/${id}`)
export const addAta = (id, ata) => api.patch(`/reunioes/${id}/ata`, { ata })
