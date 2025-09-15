import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { login as apiLogin, signup as apiSignup } from '../services/authService'
import api from '../services/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedToken = localStorage.getItem('token')
    const savedUser = localStorage.getItem('user')
    if (savedToken && savedUser) {
      setToken(savedToken)
      setUser(JSON.parse(savedUser))
      api.setToken(savedToken)
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const { user, token } = await apiLogin(email, password)
    setUser(user)
    setToken(token)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    api.setToken(token)
    return user
  }

  const signup = async (payload) => {
    const { user, token } = await apiSignup(payload)
    setUser(user)
    setToken(token)
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    api.setToken(token)
    return user
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    api.setToken(null)
  }

  const isAdmin = user?.role === 'admin'

  const value = useMemo(() => ({
    user, token, loading, isAdmin, login, signup, logout
  }), [user, token, loading])

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export function useAuth() {
  return useContext(AuthContext)
}
