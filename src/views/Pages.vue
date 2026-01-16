<template>
  <div class="container">
    <div class="page-container fade-in">
      <div class="d-flex justify-content-between align-items-center mb-4">
        <h2 class="mb-0">
          <i class="bi bi-file-text me-2" style="color: var(--primary-color);"></i>
          Trang
        </h2>
        <button class="btn btn-primary" v-if="isAuthenticated">
          <i class="bi bi-plus-circle me-2"></i>
          Tạo trang mới
        </button>
      </div>
      
      <p class="text-secondary mb-4">Quản lý các trang tĩnh của blog</p>
      
      <div class="list-group">
        <div v-for="page in pages" :key="page.id" class="list-group-item">
          <div class="d-flex justify-content-between align-items-center">
            <div>
              <h5 class="mb-1">{{ page.title }}</h5>
              <small class="text-secondary">{{ page.slug }}</small>
            </div>
            <div class="btn-group">
              <button class="btn btn-sm btn-outline-primary">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-sm btn-outline-secondary">
                <i class="bi bi-eye"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="pages.length === 0" class="empty-state">
        <i class="bi bi-file-text"></i>
        <h3>Chưa có trang nào</h3>
        <p>Tạo trang tĩnh như Giới thiệu, Liên hệ, v.v.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../store/auth'

const { isAuthenticated } = useAuth()

const pages = ref([
  { id: '1', title: 'Giới thiệu', slug: '/about' },
  { id: '2', title: 'Liên hệ', slug: '/contact' },
])
</script>

<style scoped>
.list-group-item {
  border-radius: 8px;
  border: 1px solid var(--border-color);
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
}

.list-group-item:hover {
  background: var(--bg-light);
  border-color: var(--primary-color);
}
</style>
