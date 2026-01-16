<template>
  <div class="card h-100">
    <img 
      v-if="post.image" 
      :src="post.image" 
      class="card-img-top" 
      :alt="post.title"
    >
    <div v-else class="card-img-top bg-gradient d-flex align-items-center justify-content-center">
      <i class="bi bi-image" style="font-size: 3rem; color: white;"></i>
    </div>
    
    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ post.title }}</h5>
      <p class="card-text flex-grow-1">{{ truncatedContent }}</p>
      
      <div class="post-meta">
        <span>
          <i class="bi bi-person"></i>
          {{ authorName }}
        </span>
        <span>
          <i class="bi bi-calendar"></i>
          {{ formattedDate }}
        </span>
        <span>
          <i class="bi bi-chat"></i>
          {{ commentCount }} bình luận
        </span>
      </div>
      
      <div class="d-flex gap-2 mt-3">
        <router-link 
          :to="`/posts/${post.id}`" 
          class="btn btn-primary flex-grow-1"
        >
          <i class="bi bi-eye me-1"></i>
          Xem chi tiết
        </router-link>
        
        <router-link 
          v-if="canEdit"
          :to="`/posts/${post.id}/edit`" 
          class="btn btn-outline-primary"
        >
          <i class="bi bi-pencil"></i>
        </router-link>
        
        <button 
          v-if="canEdit"
          @click="$emit('delete', post.id)"
          class="btn btn-outline-danger"
        >
          <i class="bi bi-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth } from '../store/auth'

const props = defineProps({
  post: {
    type: Object,
    required: true
  },
  commentCount: {
    type: Number,
    default: 0
  }
})

defineEmits(['delete'])

const { currentUser } = useAuth()

const truncatedContent = computed(() => {
  if (props.post.content.length > 150) {
    return props.post.content.substring(0, 150) + '...'
  }
  return props.post.content
})

const authorName = computed(() => {
  return props.post.authorName || 'Unknown'
})

const formattedDate = computed(() => {
  const date = new Date(props.post.createdAt)
  return date.toLocaleDateString('vi-VN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
})

const canEdit = computed(() => {
  return currentUser.value && currentUser.value.id === props.post.authorId
})
</script>

<style scoped>
.bg-gradient {
  height: 200px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
}
</style>
