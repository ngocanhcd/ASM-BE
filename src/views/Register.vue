<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="page-container fade-in">
          <div class="text-center mb-4">
            <i class="bi bi-person-plus-fill" style="font-size: 3rem; color: var(--primary-color);"></i>
            <h2 class="mt-3 text-gradient">Đăng ký tài khoản</h2>
            <p class="text-secondary">Tạo tài khoản để bắt đầu đăng bài và bình luận</p>
          </div>
          
          <div v-if="error" class="alert alert-danger" role="alert">
            <i class="bi bi-exclamation-triangle me-2"></i>
            {{ error }}
          </div>
          
          <form @submit.prevent="handleRegister">
            <div class="mb-3">
              <label for="name" class="form-label">
                <i class="bi bi-person me-1"></i>
                Họ và tên
              </label>
              <input 
                type="text" 
                class="form-control" 
                id="name"
                v-model="formData.name"
                required
                minlength="3"
                placeholder="Nhập họ và tên của bạn"
              >
            </div>
            
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
                minlength="6"
                placeholder="Tối thiểu 6 ký tự"
              >
            </div>
            
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">
                <i class="bi bi-lock-fill me-1"></i>
                Xác nhận mật khẩu
              </label>
              <input 
                type="password" 
                class="form-control" 
                id="confirmPassword"
                v-model="formData.confirmPassword"
                required
                placeholder="Nhập lại mật khẩu"
              >
            </div>
            
            <button type="submit" class="btn btn-primary w-100 py-2 mb-3">
              <i class="bi bi-person-plus me-2"></i>
              Đăng ký
            </button>
            
            <div class="text-center">
              <p class="text-secondary mb-0">
                Đã có tài khoản? 
                <router-link to="/login" class="text-decoration-none fw-bold">
                  Đăng nhập ngay
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
import { useRouter } from 'vue-router'
import { useAuth } from '../store/auth'

const router = useRouter()
const { register } = useAuth()

const formData = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const error = ref('')

const handleRegister = async () => {
  error.value = ''
  
  // Validation
  if (formData.value.password !== formData.value.confirmPassword) {
    error.value = 'Mật khẩu xác nhận không khớp'
    return
  }
  
  if (formData.value.password.length < 6) {
    error.value = 'Mật khẩu phải có ít nhất 6 ký tự'
    return
  }
  
  try {
    await register({
      name: formData.value.name,
      email: formData.value.email,
      password: formData.value.password
    })
    
    // Redirect to home after successful registration
    router.push('/')
  } catch (err) {
    error.value = err.message
  }
}
</script>
