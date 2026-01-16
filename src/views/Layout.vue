<template>
  <div class="container">
    <div class="page-container fade-in">
      <h2 class="mb-4">
        <i class="bi bi-layout-three-columns me-2" style="color: var(--primary-color);"></i>
        Bố cục
      </h2>
      
      <p class="text-secondary mb-4">Tùy chỉnh cách hiển thị nội dung blog</p>
      
      <div class="layout-section">
        <h4 class="mb-3">Kiểu hiển thị bài viết</h4>
        <div class="row g-3">
          <div class="col-md-4">
            <div 
              class="layout-option" 
              :class="{ active: layout.postView === 'grid' }"
              @click="layout.postView = 'grid'"
            >
              <i class="bi bi-grid-3x3-gap"></i>
              <p class="mb-0">Lưới</p>
            </div>
          </div>
          <div class="col-md-4">
            <div 
              class="layout-option"
              :class="{ active: layout.postView === 'list' }"
              @click="layout.postView = 'list'"
            >
              <i class="bi bi-list-ul"></i>
              <p class="mb-0">Danh sách</p>
            </div>
          </div>
          <div class="col-md-4">
            <div 
              class="layout-option"
              :class="{ active: layout.postView === 'card' }"
              @click="layout.postView = 'card'"
            >
              <i class="bi bi-card-list"></i>
              <p class="mb-0">Thẻ</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="layout-section">
        <h4 class="mb-3">Thanh bên</h4>
        <div class="form-check form-switch mb-3">
          <input 
            class="form-check-input" 
            type="checkbox" 
            v-model="layout.showSidebar"
            id="showSidebar"
          >
          <label class="form-check-label" for="showSidebar">
            Hiển thị thanh bên
          </label>
        </div>
        <div class="form-check form-switch mb-3">
          <input 
            class="form-check-input" 
            type="checkbox" 
            v-model="layout.sidebarPosition"
            id="sidebarPosition"
          >
          <label class="form-check-label" for="sidebarPosition">
            Thanh bên bên phải
          </label>
        </div>
      </div>
      
      <div class="layout-section">
        <h4 class="mb-3">Kích thước nội dung</h4>
        <div class="mb-3">
          <label class="form-label">Chiều rộng tối đa</label>
          <select class="form-select" v-model="layout.maxWidth">
            <option value="1200px">1200px (Chuẩn)</option>
            <option value="1400px">1400px (Rộng)</option>
            <option value="100%">100% (Toàn màn hình)</option>
          </select>
        </div>
      </div>
      
      <button class="btn btn-primary">
        <i class="bi bi-check-circle me-2"></i>
        Lưu cài đặt
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const layout = ref({
  postView: 'grid',
  showSidebar: true,
  sidebarPosition: false,
  maxWidth: '1200px'
})
</script>

<style scoped>
.layout-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.layout-section:last-of-type {
  border-bottom: none;
}

.layout-option {
  background: white;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 2rem 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.layout-option:hover {
  border-color: var(--primary-color);
  background: var(--bg-light);
}

.layout-option.active {
  border-color: var(--primary-color);
  background: rgba(232, 140, 48, 0.1);
}

.layout-option i {
  font-size: 3rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.layout-option.active i {
  color: var(--primary-color);
}

.layout-option p {
  font-weight: 500;
  color: var(--text-primary);
}

.form-check-input {
  width: 50px;
  height: 25px;
  cursor: pointer;
}

.form-check-input:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}
</style>
