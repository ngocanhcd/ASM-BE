<template>
  <div class="container">
    <div class="page-container fade-in">
      <h2 class="mb-4">
        <i class="bi bi-tags me-2" style="color: var(--primary-color);"></i>
        Nhãn xét
      </h2>
      
      <div class="row mb-4">
        <div class="col-md-8">
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              class="form-control" 
              v-model="searchQuery"
              placeholder="Tìm kiếm nhãn..."
            >
          </div>
        </div>
        <div class="col-md-4 text-end">
          <button 
            class="btn btn-primary" 
            @click="showCreateModal = true"
            v-if="isAuthenticated"
          >
            <i class="bi bi-plus-circle me-2"></i>
            Tạo nhãn mới
          </button>
        </div>
      </div>
      
      <div class="row g-3">
        <div v-for="tag in filteredTags" :key="tag.id" class="col-md-4 col-lg-3">
          <div class="tag-card">
            <div class="tag-icon" :style="{ backgroundColor: tag.color }">
              <i class="bi bi-tag-fill"></i>
            </div>
            <h5 class="tag-name">{{ tag.name }}</h5>
            <p class="tag-count">{{ tag.postCount }} bài viết</p>
            <div class="tag-actions" v-if="canEdit(tag)">
              <button class="btn btn-sm btn-outline-primary" @click="editTag(tag)">
                <i class="bi bi-pencil"></i>
              </button>
              <button class="btn btn-sm btn-outline-danger" @click="deleteTag(tag.id)">
                <i class="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div v-if="filteredTags.length === 0" class="empty-state">
        <i class="bi bi-tags"></i>
        <h3>Chưa có nhãn nào</h3>
        <p>Tạo nhãn để phân loại bài viết của bạn</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '../store/auth'

const { isAuthenticated, currentUser } = useAuth()
const searchQuery = ref('')
const showCreateModal = ref(false)

// Sample data - would come from storage in real app
const tags = ref([
  { id: '1', name: 'Công nghệ', color: '#e88c30', postCount: 15, createdBy: 'user1' },
  { id: '2', name: 'Tin tức', color: '#10b981', postCount: 8, createdBy: 'user1' },
  { id: '3', name: 'Review', color: '#ef4444', postCount: 12, createdBy: 'user2' },
])

const filteredTags = computed(() => {
  if (!searchQuery.value) return tags.value
  
  const query = searchQuery.value.toLowerCase()
  return tags.value.filter(tag => 
    tag.name.toLowerCase().includes(query)
  )
})

const canEdit = (tag) => {
  return currentUser.value && tag.createdBy === currentUser.value.id
}

const editTag = (tag) => {
  // Implementation would go here
  console.log('Edit tag:', tag)
}

const deleteTag = (id) => {
  if (confirm('Bạn có chắc chắn muốn xóa nhãn này?')) {
    tags.value = tags.value.filter(t => t.id !== id)
  }
}
</script>

<style scoped>
.tag-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  text-align: center;
  transition: all 0.3s ease;
}

.tag-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
}

.tag-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
}

.tag-name {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.tag-count {
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.tag-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}
</style>
