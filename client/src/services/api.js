import axios from 'axios'

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

const api = {
  get: (url, config) => apiClient.get(url, config).then(r => r.data),
  post: (url, data, config) => apiClient.post(url, data, config).then(r => r.data),
  patch: (url, data, config) => apiClient.patch(url, data, config).then(r => r.data),
  delete: (url, config) => apiClient.delete(url, config).then(r => r.data),
  setToken: (token) => {
    if (!token) {
      delete apiClient.defaults.headers.common.Authorization
    } else {
      apiClient.defaults.headers.common.Authorization = `Bearer ${token}`
    }
  }
}

export default api
