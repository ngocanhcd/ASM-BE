<template>
  <nav class="navbar navbar-expand-lg sticky-top">
    <div class="container">
      <router-link to="/" class="navbar-brand">
        <i class="bi bi-shop me-2"></i>
        Quản Lý Bán Hàng
      </router-link>
      
      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto align-items-lg-center">
          <li class="nav-item">
            <router-link to="/" class="nav-link">
              <i class="bi bi-house-door me-1"></i>
              Trang chủ
            </router-link>
          </li>
          
          <template v-if="isAuthenticated">
            <li class="nav-item">
              <router-link to="/posts/create" class="nav-link">
                <i class="bi bi-plus-circle me-1"></i>
                Đăng bài
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">
                <i class="bi bi-person-circle me-1"></i>
                {{ currentUser?.fullName }}
              </router-link>
            </li>
            <li class="nav-item ms-lg-2">
              <button @click="handleLogout" class="btn btn-outline-primary">
                <i class="bi bi-box-arrow-right me-1"></i>
                Đăng xuất
              </button>
            </li>
          </template>
          
          <template v-else>
            <li class="nav-item">
              <router-link to="/login" class="nav-link">
                <i class="bi bi-box-arrow-in-right me-1"></i>
                Đăng nhập
              </router-link>
            </li>
            <li class="nav-item ms-lg-2">
              <router-link to="/register" class="btn btn-primary">
                <i class="bi bi-person-plus me-1"></i>
                Đăng ký
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuth } from '../store/auth'
import { useRouter } from 'vue-router'

const { isAuthenticated, currentUser, logout } = useAuth()
const router = useRouter()

const handleLogout = () => {
  logout()
  router.push('/')
}
</script>

<style scoped>
.nav-item {
  margin: 0.25rem 0;
}

@media (min-width: 992px) {
  .nav-item {
    margin: 0 0.25rem;
  }
}
</style>
