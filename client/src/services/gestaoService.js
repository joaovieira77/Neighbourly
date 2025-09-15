import api from './api'

export const listAdminsByYear = (ano) => api.get(`/gestao/${ano}/admins`)
export const setYearAdmins = (ano, adminIds) => api.post(`/gestao/${ano}/admins`, { admins: adminIds })
