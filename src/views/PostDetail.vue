<template>
  <div class="container">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    
    <div v-else-if="error" class="page-container">
      <div class="alert alert-danger">
        <i class="bi bi-exclamation-triangle me-2"></i>
        {{ error }}
      </div>
      <router-link to="/" class="btn btn-primary">
        <i class="bi bi-arrow-left me-2"></i>
        Về trang chủ
      </router-link>
    </div>
    
    <div v-else-if="post" class="row">
      <div class="col-lg-8 mx-auto">
        <div class="page-container fade-in">
          <!-- Post Header -->
          <div class="mb-4">
            <h1 class="mb-3">{{ post.title }}</h1>
            
            <div class="post-meta mb-3">
              <span>
                <i class="bi bi-person-circle"></i>
                {{ authorName }}
              </span>
              <span>
                <i class="bi bi-calendar"></i>
                {{ formattedDate }}
              </span>
              <span v-if="post.updatedAt !== post.createdAt">
                <i class="bi bi-pencil"></i>
                Đã chỉnh sửa
              </span>
            </div>
            
            <!-- Action Buttons for Author -->
            <div v-if="canEdit" class="d-flex gap-2 mb-3">
              <router-link 
                :to="`/posts/${post.id}/edit`" 
                class="btn btn-outline-primary"
              >
                <i class="bi bi-pencil me-1"></i>
                Chỉnh sửa
              </router-link>
              <button @click="handleDelete" class="btn btn-outline-danger">
                <i class="bi bi-trash me-1"></i>
                Xóa
              </button>
            </div>
          </div>
          
          <!-- Post Image -->
          <div v-if="post.image" class="mb-4">
            <img 
              :src="post.image" 
              :alt="post.title" 
              class="img-fluid rounded shadow"
            >
          </div>
          
          <!-- Post Content -->
          <div class="post-content mb-5">
            <p style="white-space: pre-wrap;">{{ post.content }}</p>
          </div>
          
          <hr class="my-5">
          
          <!-- Comments Section -->
          <CommentList 
            :comments="comments"
            @add-comment="handleAddComment"
            @delete-comment="handleDeleteComment"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuth } from '../store/auth'
import { postsApi } from '../services/api/posts'
import { commentsApi } from '../services/api/comments'
import CommentList from '../components/CommentList.vue'

const route = useRoute()
const router = useRouter()
const { currentUser, isAuthenticated } = useAuth()

const post = ref(null)
const comments = ref([])
const loading = ref(true)
const error = ref('')

const authorName = computed(() => {
  if (!post.value) return ''
  return post.value.authorName || 'Unknown'
})

const formattedDate = computed(() => {
  if (!post.value) return ''
  const date = new Date(post.value.createdAt)
  return date.toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
})

const canEdit = computed(() => {
  return currentUser.value && post.value && currentUser.value.id === post.value.authorId
})

const loadPostAndComments = async () => {
  loading.value = true
  error.value = ''
  
  try {
    const postId = route.params.id
    
    // Load post
    post.value = await postsApi.getById(postId)
    
    // Load comments
    comments.value = await commentsApi.getByPostId(postId)
  } catch (err) {
    error.value = 'Không tìm thấy bài viết'
    console.error('Error loading post:', err)
  } finally {
    loading.value = false
  }
}

const handleAddComment = async (content) => {
  if (!isAuthenticated.value) {
    error.value = 'Vui lòng đăng nhập để bình luận'
    return
  }
  
  try {
    const newComment = await commentsApi.create(post.value.id, { content })
    comments.value.push(newComment)
  } catch (err) {
    alert('Không thể thêm bình luận')
    console.error('Error adding comment:', err)
  }
}

const handleDeleteComment = async (commentId) => {
  if (confirm('Bạn có chắc chắn muốn xóa bình luận này?')) {
    try {
      await commentsApi.delete(post.value.id, commentId)
      comments.value = comments.value.filter(c => c.id !== commentId)
    } catch (err) {
      alert('Không thể xóa bình luận')
      console.error('Error deleting comment:', err)
    }
  }
}

const handleDelete = async () => {
  if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
    try {
      await postsApi.delete(post.value.id)
      router.push('/')
    } catch (err) {
      alert('Không thể xóa bài viết')
      console.error('Error deleting post:', err)
    }
  }
}

onMounted(() => {
  loadPostAndComments()
})
</script>

<style scoped>
.post-content {
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-primary);
}
</style>
