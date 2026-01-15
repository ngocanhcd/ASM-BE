<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8">
        <div class="page-container fade-in">
          <h2 class="text-gradient mb-4">
            <i class="bi bi-plus-circle me-2"></i>
            {{ isEditMode ? 'Chỉnh sửa bài viết' : 'Tạo bài viết mới' }}
          </h2>
          
          <div v-if="error" class="alert alert-danger" role="alert">
            <i class="bi bi-exclamation-triangle me-2"></i>
            {{ error }}
          </div>
          
          <div v-if="success" class="alert alert-success" role="alert">
            <i class="bi bi-check-circle me-2"></i>
            {{ success }}
          </div>
          
          <form @submit.prevent="handleSubmit">
            <div class="mb-4">
              <label for="title" class="form-label">
                <i class="bi bi-card-heading me-1"></i>
                Tiêu đề
              </label>
              <input 
                type="text" 
                class="form-control" 
                id="title"
                v-model="formData.title"
                required
                placeholder="Nhập tiêu đề bài viết"
              >
            </div>
            
            <div class="mb-4">
              <label for="content" class="form-label">
                <i class="bi bi-file-text me-1"></i>
                Nội dung
              </label>
              <textarea 
                class="form-control" 
                id="content"
                v-model="formData.content"
                required
                rows="8"
                placeholder="Viết nội dung bài viết của bạn..."
              ></textarea>
            </div>
            
            <div class="mb-4">
              <label for="image" class="form-label">
                <i class="bi bi-image me-1"></i>
                Hình ảnh minh họa
              </label>
              <input 
                type="file" 
                class="form-control" 
                id="image"
                @change="handleImageUpload"
                accept="image/*"
              >
              <small class="text-secondary">Tùy chọn: Chọn hình ảnh để minh họa cho bài viết</small>
              
              <div v-if="imagePreview" class="mt-3">
                <img :src="imagePreview" alt="Preview" class="img-fluid rounded" style="max-height: 300px;">
                <button 
                  type="button" 
                  @click="removeImage" 
                  class="btn btn-sm btn-outline-danger mt-2"
                >
                  <i class="bi bi-x-circle me-1"></i>
                  Xóa hình ảnh
                </button>
              </div>
            </div>
            
            <div class="d-flex gap-2">
              <button type="submit" class="btn btn-primary px-4">
                <i class="bi bi-check-circle me-2"></i>
                {{ isEditMode ? 'Cập nhật' : 'Đăng bài' }}
              </button>
              <router-link to="/" class="btn btn-outline-secondary px-4">
                <i class="bi bi-x-circle me-2"></i>
                Hủy
              </router-link>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '../store/auth'
import { postStorage } from '../utils/storage'

const router = useRouter()
const route = useRoute()
const { currentUser } = useAuth()

const formData = ref({
  title: '',
  content: '',
  image: ''
})

const imagePreview = ref('')
const error = ref('')
const success = ref('')

const isEditMode = computed(() => !!route.params.id)

onMounted(() => {
  if (isEditMode.value) {
    loadPost()
  }
})

const loadPost = () => {
  const post = postStorage.findById(route.params.id)
  
  if (!post) {
    error.value = 'Không tìm thấy bài viết'
    return
  }
  
  // Check if current user is the author
  if (post.authorId !== currentUser.value.id) {
    error.value = 'Bạn không có quyền chỉnh sửa bài viết này'
    setTimeout(() => router.push('/'), 2000)
    return
  }
  
  formData.value = {
    title: post.title,
    content: post.content,
    image: post.image || ''
  }
  
  if (post.image) {
    imagePreview.value = post.image
  }
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (!file) return
  
  // Validate file size (max 2MB)
  if (file.size > 2 * 1024 * 1024) {
    error.value = 'Kích thước file phải nhỏ hơn 2MB'
    return
  }
  
  // Validate file type
  if (!file.type.startsWith('image/')) {
    error.value = 'Vui lòng chọn file hình ảnh'
    return
  }
  
  const reader = new FileReader()
  reader.onload = (e) => {
    formData.value.image = e.target.result
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(file)
}

const removeImage = () => {
  formData.value.image = ''
  imagePreview.value = ''
}

const handleSubmit = () => {
  error.value = ''
  success.value = ''
  
  try {
    if (isEditMode.value) {
      // Update existing post
      postStorage.update(route.params.id, {
        title: formData.value.title,
        content: formData.value.content,
        image: formData.value.image
      })
      success.value = 'Cập nhật bài viết thành công!'
    } else {
      // Create new post
      const newPost = {
        id: Date.now().toString(),
        title: formData.value.title,
        content: formData.value.content,
        image: formData.value.image,
        authorId: currentUser.value.id,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      postStorage.add(newPost)
      success.value = 'Đăng bài thành công!'
    }
    
    // Redirect to home after 1 second
    setTimeout(() => router.push('/'), 1000)
  } catch (err) {
    error.value = err.message
  }
}
</script>
