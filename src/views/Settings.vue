<template>
  <div class="container">
    <div class="page-container fade-in">
      <h2 class="mb-4">
        <i class="bi bi-gear me-2" style="color: var(--primary-color);"></i>
        Cài đặt
      </h2>
      
      <div class="settings-section">
        <h4><i class="bi bi-person me-2"></i>Tài khoản</h4>
        <router-link to="/profile" class="settings-item">
          <div>
            <strong>Thông tin cá nhân</strong>
            <p class="text-secondary mb-0">Cập nhật hồ sơ và thông tin của bạn</p>
          </div>
          <i class="bi bi-chevron-right"></i>
        </router-link>
      </div>
      
      <div class="settings-section">
        <h4><i class="bi bi-palette me-2"></i>Giao diện</h4>
        <router-link to="/theme" class="settings-item">
          <div>
            <strong>Chủ đề</strong>
            <p class="text-secondary mb-0">Tùy chỉnh màu sắc và giao diện</p>
          </div>
          <i class="bi bi-chevron-right"></i>
        </router-link>
        <router-link to="/layout" class="settings-item">
          <div>
            <strong>Bố cục</strong>
            <p class="text-secondary mb-0">Điều chỉnh cách hiển thị nội dung</p>
          </div>
          <i class="bi bi-chevron-right"></i>
        </router-link>
      </div>
      
      <div class="settings-section">
        <h4><i class="bi bi-bell me-2"></i>Thông báo</h4>
        <div class="settings-item">
          <div>
            <strong>Email thông báo</strong>
            <p class="text-secondary mb-0">Nhận thông báo qua email</p>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" v-model="notifications.email">
          </div>
        </div>
        <div class="settings-item">
          <div>
            <strong>Thông báo bình luận</strong>
            <p class="text-secondary mb-0">Khi có người bình luận vào bài viết của bạn</p>
          </div>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" v-model="notifications.comments">
          </div>
        </div>
      </div>
      
      <div class="settings-section">
        <h4><i class="bi bi-shield-check me-2"></i>Bảo mật</h4>
        <router-link to="/profile" class="settings-item">
          <div>
            <strong>Đổi mật khẩu</strong>
            <p class="text-secondary mb-0">Cập nhật mật khẩu của bạn</p>
          </div>
          <i class="bi bi-chevron-right"></i>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const notifications = ref({
  email: true,
  comments: true
})
</script>

<style scoped>
.settings-section {
  margin-bottom: 2rem;
}

.settings-section h4 {
  color: var(--text-primary);
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-color);
}

.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background: white;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  margin-bottom: 0.5rem;
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.2s ease;
}

.settings-item:hover {
  background: var(--bg-light);
  border-color: var(--primary-color);
}

.settings-item strong {
  display: block;
  margin-bottom: 0.25rem;
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
