<template>
  <div class="container">
    <div class="page-container fade-in">
      <!-- Header Section -->
      <div class="text-center mb-5">
        <h1 class="text-gradient mb-3">
          <i class="bi bi-shop-window me-2"></i>
          Trang Bán Hàng
        </h1>
        <p class="lead text-secondary">Khám phá các bài viết và sản phẩm mới nhất</p>
      </div>
      
      <!-- Search and Filter -->
      <div class="row mb-4">
        <div class="col-md-8 mx-auto">
          <div class="input-group">
            <span class="input-group-text">
              <i class="bi bi-search"></i>
            </span>
            <input 
              type="text" 
              class="form-control" 
              v-model="searchQuery"
              placeholder="Tìm kiếm bài viết..."
            >
          </div>
        </div>
      </div>
      
      <!-- Posts Grid -->
      <div v-if="filteredPosts.length > 0" class="row g-4">
        <div 
          v-for="post in filteredPosts" 
          :key="post.id" 
          class="col-md-6 col-lg-4"
        >
          <PostCard 
            :post="post" 
            :comment-count="getCommentCount(post.id)"
            @delete="handleDeletePost"
          />
        </div>
      </div>
      
      <!-- Empty State -->
      <div v-else class="empty-state">
        <i class="bi bi-inbox"></i>
        <h3>Chưa có bài viết nào</h3>
        <p>{{ searchQuery ? 'Không tìm thấy bài viết phù hợp' : 'Hãy là người đầu tiên đăng bài!' }}</p>
        <router-link v-if="isAuthenticated && !searchQuery" to="/posts/create" class="btn btn-primary">
          <i class="bi bi-plus-circle me-2"></i>
          Tạo bài viết đầu tiên
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import PostCard from '../components/PostCard.vue'
import { useAuth } from '../store/auth'
import { postsApi } from '../services/api/posts'

const { isAuthenticated } = useAuth()

const posts = ref([])
const searchQuery = ref('')
const loading = ref(false)
const error = ref('')

const filteredPosts = computed(() => {
  if (!searchQuery.value) {
    return posts.value
  }
  
  const query = searchQuery.value.toLowerCase()
  return posts.value.filter(post => 
    post.title.toLowerCase().includes(query) || 
    post.content.toLowerCase().includes(query)
  )
})

const loadPosts = async () => {
  loading.value = true
  error.value = ''
  try {
    posts.value = await postsApi.getAll()
  } catch (err) {
    error.value = 'Không thể tải bài viết'
    console.error('Error loading posts:', err)
  } finally {
    loading.value = false
  }
}

const getCommentCount = (postId) => {
  const post = posts.value.find(p => p.id === postId)
  return post?.commentCount || 0
}

const handleDeletePost = async (postId) => {
  if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
    try {
      await postsApi.delete(postId)
      await loadPosts() // Reload posts after delete
    } catch (err) {
      alert('Không thể xóa bài viết')
      console.error('Error deleting post:', err)
    }
  }
}

onMounted(() => {
  loadPosts()
})
</script>
