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
import { postStorage, commentStorage } from '../utils/storage'

const { isAuthenticated } = useAuth()

const posts = ref([])
const searchQuery = ref('')

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

const loadPosts = () => {
  posts.value = postStorage.getAll()
}

const getCommentCount = (postId) => {
  return commentStorage.getByPostId(postId).length
}

const handleDeletePost = (postId) => {
  if (confirm('Bạn có chắc chắn muốn xóa bài viết này?')) {
    postStorage.delete(postId)
    loadPosts()
  }
}

onMounted(() => {
  loadPosts()
})
</script>
