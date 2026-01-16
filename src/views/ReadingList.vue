<template>
  <div class="container">
    <div class="page-container fade-in">
      <h2 class="mb-4">
        <i class="bi bi-bookmark me-2" style="color: var(--primary-color);"></i>
        Danh sách Đọc
      </h2>
      
      <p class="text-secondary mb-4">Các bài viết đã lưu để đọc sau</p>
      
      <div v-if="savedPosts.length > 0" class="row g-4">
        <div v-for="post in savedPosts" :key="post.id" class="col-md-6 col-lg-4">
          <div class="saved-card">
            <div class="saved-image" v-if="post.image">
              <img :src="post.image" :alt="post.title">
            </div>
            <div class="saved-content">
              <h5>{{ post.title }}</h5>
              <p>{{ truncate(post.content, 100) }}</p>
              <div class="saved-footer">
                <small class="text-secondary">{{ formatDate(post.savedAt) }}</small>
                <button class="btn btn-sm btn-outline-danger" @click="removeFromSaved(post.id)">
                  <i class="bi bi-bookmark-dash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="empty-state">
        <i class="bi bi-bookmark"></i>
        <h3>Danh sách đọc trống</h3>
        <p>Lưu các bài viết để đọc sau</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const savedPosts = ref([])

const truncate = (text, length) => {
  return text.length > length ? text.substring(0, length) + '...' : text
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('vi-VN')
}

const removeFromSaved = (id) => {
  savedPosts.value = savedPosts.value.filter(p => p.id !== id)
}
</script>

<style scoped>
.saved-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--shadow-md);
  transition: all 0.3s ease;
}

.saved-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.saved-image {
  height: 150px;
  overflow: hidden;
}

.saved-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.saved-content {
  padding: 1rem;
}

.saved-content h5 {
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.saved-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}
</style>
