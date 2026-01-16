<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="page-container fade-in">
          <h2 class="text-gradient mb-4">
            <i class="bi bi-person-circle me-2"></i>
            Thông tin cá nhân
          </h2>
          
          <div v-if="error" class="alert alert-danger" role="alert">
            <i class="bi bi-exclamation-triangle me-2"></i>
            {{ error }}
          </div>
          
          <div v-if="success" class="alert alert-success" role="alert">
            <i class="bi bi-check-circle me-2"></i>
            {{ success }}
          </div>
          
          <!-- Profile Avatar -->
          <div class="text-center mb-4">
            <div class="position-relative d-inline-block">
              <img 
                :src="avatarUrl" 
                :alt="formData.name"
                class="avatar avatar-lg shadow"
              >
              <label 
                for="avatarInput" 
                class="position-absolute bottom-0 end-0 btn btn-sm btn-primary rounded-circle"
                style="width: 40px; height: 40px; padding: 0;"
              >
                <i class="bi bi-camera"></i>
              </label>
              <input 
                type="file" 
                id="avatarInput" 
                class="d-none"
                @change="handleAvatarUpload"
                accept="image/*"
              >
            </div>
          </div>
          
          <form @submit.prevent="handleUpdateProfile">
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
              >
            </div>
            
            <hr class="my-4">
            
            <h5 class="mb-3">
              <i class="bi bi-key me-2"></i>
              Đổi mật khẩu
            </h5>
            <p class="text-secondary small">Để trống nếu không muốn thay đổi mật khẩu</p>
            
            <div class="mb-3">
              <label for="currentPassword" class="form-label">
                <i class="bi bi-lock me-1"></i>
                Mật khẩu hiện tại
              </label>
              <input 
                type="password" 
                class="form-control" 
                id="currentPassword"
                v-model="passwordData.current"
                placeholder="Nhập mật khẩu hiện tại"
              >
            </div>
            
            <div class="mb-3">
              <label for="newPassword" class="form-label">
                <i class="bi bi-lock-fill me-1"></i>
                Mật khẩu mới
              </label>
              <input 
                type="password" 
                class="form-control" 
                id="newPassword"
                v-model="passwordData.new"
                placeholder="Nhập mật khẩu mới (tối thiểu 6 ký tự)"
                minlength="6"
              >
            </div>
            
            <div class="mb-4">
              <label for="confirmPassword" class="form-label">
                <i class="bi bi-lock-fill me-1"></i>
                Xác nhận mật khẩu mới
              </label>
              <input 
                type="password" 
                class="form-control" 
                id="confirmPassword"
                v-model="passwordData.confirm"
                placeholder="Nhập lại mật khẩu mới"
              >
            </div>
            
            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-primary px-4">
                <i class="bi bi-check-circle me-2"></i>
                Cập nhật thông tin
              </button>
              <router-link to="/" class="btn btn-outline-secondary px-4">
                <i class="bi bi-arrow-left me-2"></i>
                Quay lại
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../store/auth'

const { currentUser, updateProfile } = useAuth()

const formData = ref({
  name: '',
  email: '',
  avatar: ''
})

const passwordData = ref({
  current: '',
  new: '',
  confirm: ''
})

const error = ref('')
const success = ref('')

const avatarUrl = computed(() => {
  if (formData.value.avatar) {
    return formData.value.avatar
  }
  return `https://ui-avatars.com/api/?name=${formData.value.name}&background=6366f1&color=fff&size=120`
})


onMounted(() => {
  if (currentUser.value) {
    formData.value = {
      name: currentUser.value.fullName || currentUser.value.name || '',
      email: currentUser.value.email || '',
      avatar: currentUser.value.avatar || ''
    }
  }
})

const handleAvatarUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  if (file.size > 1024 * 1024) {
    error.value = 'Kích thước avatar phải nhỏ hơn 1MB'
    return
  }
  
  if (!file.type.startsWith('image/')) {
    error.value = 'Vui lòng chọn file hình ảnh'
    return
  }
  
  const reader = new FileReader()
  reader.onload = (e) => {
    formData.value.avatar = e.target.result
  }
  reader.readAsDataURL(file)
}

const handleUpdateProfile = () => {
  error.value = ''
  success.value = ''
  
  try {
    // Prepare updates
    const updates = {
      name: formData.value.name,
      email: formData.value.email,
      avatar: formData.value.avatar
    }
    
    // Password change not supported by backend yet
    if (passwordData.value.current || passwordData.value.new || passwordData.value.confirm) {
      error.value = 'Đổi mật khẩu chưa được hỗ trợ. Vui lòng chỉ cập nhật thông tin cá nhân.'
      return
    }
    
    updateProfile(updates)
    success.value = 'Cập nhật thông tin thành công!'
    
    // Clear password fields
    passwordData.value = {
      current: '',
      new: '',
      confirm: ''
    }
  } catch (err) {
    error.value = err.message
  }
}
</script>
