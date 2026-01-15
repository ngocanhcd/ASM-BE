import { reactive, computed } from 'vue'
import { sessionStorage, userStorage } from '../utils/storage'

// Reactive authentication state
const state = reactive({
  currentUser: sessionStorage.getCurrentUser(),
  isAuthenticated: !!sessionStorage.getCurrentUser()
})

// Authentication store with composition API
export const useAuth = () => {
  const login = (email, password) => {
    const user = userStorage.findByEmail(email)
    
    if (!user) {
      throw new Error('Người dùng không tồn tại')
    }
    
    if (user.password !== password) {
      throw new Error('Mật khẩu không đúng')
    }
    
    // Don't store password in session
    const { password: _, ...userWithoutPassword } = user
    state.currentUser = userWithoutPassword
    state.isAuthenticated = true
    sessionStorage.setCurrentUser(userWithoutPassword)
    
    return userWithoutPassword
  }

  const register = (userData) => {
    const existingUser = userStorage.findByEmail(userData.email)
    
    if (existingUser) {
      throw new Error('Email đã được sử dụng')
    }
    
    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      avatar: userData.avatar || '',
      createdAt: new Date().toISOString()
    }
    
    userStorage.add(newUser)
    
    // Auto login after registration
    const { password: _, ...userWithoutPassword } = newUser
    state.currentUser = userWithoutPassword
    state.isAuthenticated = true
    sessionStorage.setCurrentUser(userWithoutPassword)
    
    return userWithoutPassword
  }

  const logout = () => {
    state.currentUser = null
    state.isAuthenticated = false
    sessionStorage.clearCurrentUser()
  }

  const updateProfile = (updates) => {
    if (!state.currentUser) {
      throw new Error('Chưa đăng nhập')
    }
    
    // If email is being updated, check if it's already in use
    if (updates.email && updates.email !== state.currentUser.email) {
      const existingUser = userStorage.findByEmail(updates.email)
      if (existingUser) {
        throw new Error('Email đã được sử dụng')
      }
    }
    
    userStorage.update(state.currentUser.id, updates)
    
    // Update current session (exclude password from session)
    const updatedUser = userStorage.findById(state.currentUser.id)
    const { password: _, ...userWithoutPassword } = updatedUser
    state.currentUser = userWithoutPassword
    sessionStorage.setCurrentUser(userWithoutPassword)
    
    return userWithoutPassword
  }

  return {
    // State
    currentUser: computed(() => state.currentUser),
    isAuthenticated: computed(() => state.isAuthenticated),
    
    // Actions
    login,
    register,
    logout,
    updateProfile
  }
}
