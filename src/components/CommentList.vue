<template>
  <div class="comments-section mt-4">
    <h4 class="mb-4">
      <i class="bi bi-chat-dots me-2"></i>
      Bình luận ({{ comments.length }})
    </h4>
    
    <!-- Add Comment Form (only for authenticated users) -->
    <div v-if="isAuthenticated" class="mb-4">
      <form @submit.prevent="handleAddComment" class="glass-effect p-3 rounded">
        <div class="mb-3">
          <textarea 
            v-model="newComment"
            class="form-control"
            placeholder="Viết bình luận của bạn..."
            rows="3"
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary" :disabled="!newComment.trim()">
          <i class="bi bi-send me-1"></i>
          Gửi bình luận
        </button>
      </form>
    </div>
    
    <div v-else class="alert alert-info">
      <i class="bi bi-info-circle me-2"></i>
      Vui lòng <router-link to="/login">đăng nhập</router-link> để bình luận
    </div>
    
    <!-- Comments List -->
    <div v-if="comments.length > 0" class="comments-list">
      <div 
        v-for="comment in sortedComments" 
        :key="comment.id" 
        class="comment-item fade-in"
      >
        <div class="d-flex align-items-start gap-3">
          <img 
            :src="getAuthorAvatar(comment.authorId)" 
            :alt="getAuthorName(comment.authorId)"
            class="avatar"
          >
          <div class="flex-grow-1">
            <div class="d-flex justify-content-between align-items-start mb-2">
              <div>
                <div class="comment-author">{{ getAuthorName(comment.authorId) }}</div>
                <div class="comment-time">{{ formatDate(comment.createdAt) }}</div>
              </div>
              <button 
                v-if="canDeleteComment(comment)"
                @click="$emit('delete-comment', comment.id)"
                class="btn btn-sm btn-outline-danger"
              >
                <i class="bi bi-trash"></i>
              </button>
            </div>
            <p class="mb-0">{{ comment.content }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="empty-state">
      <i class="bi bi-chat-text"></i>
      <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuth } from '../store/auth'
import { userStorage } from '../utils/storage'

const props = defineProps({
  comments: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['add-comment', 'delete-comment'])

const { isAuthenticated, currentUser } = useAuth()
const newComment = ref('')

const sortedComments = computed(() => {
  return [...props.comments].sort((a, b) => 
    new Date(b.createdAt) - new Date(a.createdAt)
  )
})

const handleAddComment = () => {
  if (newComment.value.trim()) {
    emit('add-comment', newComment.value)
    newComment.value = ''
  }
}

const getAuthorName = (authorId) => {
  const author = userStorage.findById(authorId)
  return author?.name || 'Unknown User'
}

const getAuthorAvatar = (authorId) => {
  const author = userStorage.findById(authorId)
  return author?.avatar || `https://ui-avatars.com/api/?name=${author?.name || 'U'}&background=6366f1&color=fff`
}

const formatDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const diff = now - date
  
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)
  
  if (minutes < 1) return 'Vừa xong'
  if (minutes < 60) return `${minutes} phút trước`
  if (hours < 24) return `${hours} giờ trước`
  if (days < 7) return `${days} ngày trước`
  
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const canDeleteComment = (comment) => {
  return currentUser.value && currentUser.value.id === comment.authorId
}
</script>
