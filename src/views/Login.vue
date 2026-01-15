<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="page-container fade-in">
          <div class="text-center mb-4">
            <i class="bi bi-box-arrow-in-right" style="font-size: 3rem; color: var(--primary-color);"></i>
            <h2 class="mt-3 text-gradient">Đăng nhập</h2>
            <p class="text-secondary">Chào mừng bạn trở lại!</p>
          </div>
          
          <div v-if="error" class="alert alert-danger" role="alert">
            <i class="bi bi-exclamation-triangle me-2"></i>
            {{ error }}
          </div>
          
          <form @submit.prevent="handleLogin">
            <div class="mb-3">
              <label for="email" class="form-label">
                <i class="bi bi-envelope me-1"></i>
                Email
              </label>
              <input 
                type="email" 
                class="form-control" 
                id="email"
                v-model="formData.email"
                required
                placeholder="example@email.com"
                autofocus
              >
            </div>
            
            <div class="mb-3">
              <label for="password" class="form-label">
                <i class="bi bi-lock me-1"></i>
                Mật khẩu
              </label>
              <input 
                type="password" 
                class="form-control" 
                id="password"
                v-model="formData.password"
                required
                placeholder="Nhập mật khẩu của bạn"
              >
            </div>
            
            <button type="submit" class="btn btn-primary w-100 py-2 mb-3">
              <i class="bi bi-box-arrow-in-right me-2"></i>
              Đăng nhập
            </button>
            
            <div class="text-center">
              <p class="text-secondary mb-0">
                Chưa có tài khoản? 
                <router-link to="/register" class="text-decoration-none fw-bold">
                  Đăng ký ngay
                </router-link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../store/auth'

const router = useRouter()
const route = useRoute()
const { login } = useAuth()

const formData = ref({
  email: '',
  password: ''
})

const error = ref('')

const handleLogin = async () => {
  error.value = ''
  
  try {
    await login(formData.value.email, formData.value.password)
    
    // Redirect to the page they were trying to access or home
    const redirect = route.query.redirect || '/'
    router.push(redirect)
  } catch (err) {
    error.value = err.message
  }
}
</script>
