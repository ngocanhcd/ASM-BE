import { reactive, computed } from 'vue'
import { authApi } from '../services/api/auth'

// Reactive authentication state
const state = reactive({
  currentUser: JSON.parse(localStorage.getItem('currentUser') || 'null'),
  token: localStorage.getItem('token') || null,
  isAuthenticated: !!localStorage.getItem('token')
})

// Authentication store with composition API
export const useAuth = () => {
  const login = async (email, password) => {
    try {
      // Call API
      const response = await authApi.login({ email, password })
      
      // Store token and user
      localStorage.setItem('token', response.token)
      localStorage.setItem('currentUser', JSON.stringify(response.user))
      
      state.token = response.token
      state.currentUser = response.user
      state.isAuthenticated = true
      
      return response.user
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Đăng nhập thất bại')
    }
  }

  const register = async (userData) => {
    try {
      // Call API
      const response = await authApi.register({
        email: userData.email,
        password: userData.password,
        fullName: userData.name
      })
      
      // Store token and user (auto login after registration)
      localStorage.setItem('token', response.token)
      localStorage.setItem('currentUser', JSON.stringify(response.user))
      
      state.token = response.token
      state.currentUser = response.user
      state.isAuthenticated = true
      
      return response.user
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Đăng ký thất bại')
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('currentUser')
    
    state.token = null
    state.currentUser = null
    state.isAuthenticated = false
  }

  const updateProfile = (updates) => {
    if (!state.currentUser) {
      throw new Error('Chưa đăng nhập')
    }
    
    // Update local user info (API doesn't have profile update endpoint yet)
    state.currentUser = { ...state.currentUser, ...updates }
    localStorage.setItem('currentUser', JSON.stringify(state.currentUser))
    
    return state.currentUser
  }

  return {
    // State
    currentUser: computed(() => state.currentUser),
    isAuthenticated: computed(() => state.isAuthenticated),
    token: computed(() => state.token),
    
    // Actions
    login,
    register,
    logout,
    updateProfile
  }
}
