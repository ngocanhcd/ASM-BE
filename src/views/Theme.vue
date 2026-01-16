<template>
  <div class="container">
    <div class="page-container fade-in">
      <h2 class="mb-4">
        <i class="bi bi-palette me-2" style="color: var(--primary-color);"></i>
        Chủ đề
      </h2>
      
      <p class="text-secondary mb-4">Tùy chỉnh màu sắc và giao diện blog</p>
      
      <div class="theme-section">
        <h4 class="mb-3">Màu chủ đạo</h4>
        <div class="row g-3">
          <div v-for="color in colors" :key="color.name" class="col-md-3">
            <div 
              class="color-option"
              :class="{ active: theme.primaryColor === color.value }"
              @click="theme.primaryColor = color.value"
            >
              <div 
                class="color-preview" 
                :style="{ backgroundColor: color.value }"
              ></div>
              <p class="mb-0 mt-2">{{ color.name }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="theme-section">
        <h4 class="mb-3">Chế độ hiển thị</h4>
        <div class="row g-3">
          <div class="col-md-6">
            <div 
              class="mode-option"
              :class="{ active: theme.mode === 'light' }"
              @click="theme.mode = 'light'"
            >
              <i class="bi bi-sun"></i>
              <h5>Sáng</h5>
              <p class="text-secondary">Nền sáng, chữ tối</p>
            </div>
          </div>
          <div class="col-md-6">
            <div 
              class="mode-option"
              :class="{ active: theme.mode === 'dark' }"
              @click="theme.mode = 'dark'"
            >
              <i class="bi bi-moon-stars"></i>
              <h5>Tối</h5>
              <p class="text-secondary">Nền tối, chữ sáng</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="theme-section">
        <h4 class="mb-3">Font chữ</h4>
        <select class="form-select" v-model="theme.fontFamily">
          <option value="Segoe UI">Segoe UI</option>
          <option value="Arial">Arial</option>
          <option value="Roboto">Roboto</option>
          <option value="Inter">Inter</option>
        </select>
      </div>
      
      <div class="theme-section">
        <h4 class="mb-3">Kích thước chữ</h4>
        <div class="d-flex align-items-center gap-3">
          <label>Nhỏ</label>
          <input 
            type="range" 
            class="form-range flex-grow-1" 
            min="14" 
            max="20" 
            v-model="theme.fontSize"
          >
          <label>Lớn</label>
          <span class="badge bg-secondary">{{ theme.fontSize }}px</span>
        </div>
      </div>
      
      <button class="btn btn-primary">
        <i class="bi bi-check-circle me-2"></i>
        Áp dụng chủ đề
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const colors = [
  { name: 'Cam', value: '#e88c30' },
  { name: 'Xanh dương', value: '#3b82f6' },
  { name: 'Xanh lá', value: '#10b981' },
  { name: 'Tím', value: '#8b5cf6' },
  { name: 'Đỏ', value: '#ef4444' },
  { name: 'Hồng', value: '#ec4899' },
]

const theme = ref({
  primaryColor: '#e88c30',
  mode: 'light',
  fontFamily: 'Segoe UI',
  fontSize: 16
})
</script>

<style scoped>
.theme-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--border-color);
}

.theme-section:last-of-type {
  border-bottom: none;
}

.color-option {
  background: white;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-option:hover {
  transform: translateY(-3px);
  box-shadow: var(--shadow-md);
}

.color-option.active {
  border-color: var(--primary-color);
  background: rgba(232, 140, 48, 0.05);
}

.color-preview {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin: 0 auto;
  box-shadow: var(--shadow-md);
}

.mode-option {
  background: white;
  border: 2px solid var(--border-color);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.mode-option:hover {
  border-color: var(--primary-color);
  background: var(--bg-light);
}

.mode-option.active {
  border-color: var(--primary-color);
  background: rgba(232, 140, 48, 0.1);
}

.mode-option i {
  font-size: 3rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.mode-option.active i {
  color: var(--primary-color);
}

.form-range::-webkit-slider-thumb {
  background: var(--primary-color);
}

.form-range::-moz-range-thumb {
  background: var(--primary-color);
}
</style>
