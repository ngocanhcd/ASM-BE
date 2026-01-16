<template>
  <div class="sidebar" :class="{ 'collapsed': isCollapsed }">
    <div class="sidebar-header">
      <router-link to="/" class="sidebar-brand">
        <i class="bi bi-shop"></i>
        <span v-if="!isCollapsed">Xem blog</span>
      </router-link>
    </div>
    
    <nav class="sidebar-nav">
      <!-- Bài đăng -->
      <div class="nav-section">
        <div 
          class="nav-item has-submenu" 
          :class="{ active: isPostsActive }"
          @click="togglePosts"
        >
          <i class="bi bi-file-earmark-text"></i>
          <span v-if="!isCollapsed">Bài đăng</span>
          <i v-if="!isCollapsed" class="bi bi-chevron-down toggle-icon" :class="{ rotated: postsExpanded }"></i>
        </div>
        <div v-if="postsExpanded && !isCollapsed" class="submenu">
          <router-link to="/" class="submenu-item">
            Tất cả ({{ postCount }})
          </router-link>
          <router-link to="/posts/drafts" class="submenu-item">
            Nháp ({{ draftCount }})
          </router-link>
          <router-link to="/posts/published" class="submenu-item">
            Đã xuất bản ({{ publishedCount }})
          </router-link>
        </div>
      </div>
      
      <!-- Thống kê -->
      <router-link to="/stats" class="nav-item">
        <i class="bi bi-bar-chart"></i>
        <span v-if="!isCollapsed">Thống kê</span>
      </router-link>
      
      <!-- Nhãn -->
      <router-link to="/tags" class="nav-item">
        <i class="bi bi-tags"></i>
        <span v-if="!isCollapsed">Nhãn xét</span>
      </router-link>
      
      <!-- Trang -->
      <router-link to="/pages" class="nav-item">
        <i class="bi bi-file-text"></i>
        <span v-if="!isCollapsed">Trang</span>
      </router-link>
      
      <!-- Bố cục -->
      <router-link to="/layout" class="nav-item">
        <i class="bi bi-layout-three-columns"></i>
        <span v-if="!isCollapsed">Bố cục</span>
      </router-link>
      
      <!-- Chủ đề -->
      <router-link to="/theme" class="nav-item">
        <i class="bi bi-palette"></i>
        <span v-if="!isCollapsed">Chủ đề</span>
      </router-link>
      
      <!-- Cài đặt -->
      <router-link to="/settings" class="nav-item">
        <i class="bi bi-gear"></i>
        <span v-if="!isCollapsed">Cài đặt</span>
      </router-link>
      
      <div class="sidebar-divider"></div>
      
      <!-- Danh sách đọc -->
      <router-link to="/reading-list" class="nav-item">
        <i class="bi bi-bookmark"></i>
        <span v-if="!isCollapsed">Danh sách Đọc</span>
      </router-link>
      
      <!-- Trợ giúp -->
      <router-link to="/help" class="nav-item">
        <i class="bi bi-question-circle"></i>
        <span v-if="!isCollapsed">Trợ giúp và phản hồi</span>
      </router-link>
    </nav>
    
    <button 
      class="sidebar-toggle" 
      @click="toggleSidebar"
      :title="isCollapsed ? 'Mở rộng' : 'Thu gọn'"
    >
      <i class="bi" :class="isCollapsed ? 'bi-chevron-right' : 'bi-chevron-left'"></i>
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { postStorage } from '../utils/storage'

const route = useRoute()
const isCollapsed = ref(false)
const postsExpanded = ref(true)

const postCount = computed(() => postStorage.getAll().length)
const draftCount = computed(() => 0) // Placeholder for draft functionality
const publishedCount = computed(() => postStorage.getAll().length)

const isPostsActive = computed(() => {
  return route.path === '/' || route.path.startsWith('/posts')
})

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value
}

const togglePosts = () => {
  if (!isCollapsed.value) {
    postsExpanded.value = !postsExpanded.value
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100vh;
  background: #fff;
  border-right: 1px solid #e0e0e0;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
  z-index: 1000;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 1.5rem 1rem;
  border-bottom: 1px solid #e0e0e0;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: #e88c30;
  font-weight: 600;
  font-size: 1rem;
}

.sidebar-brand i {
  font-size: 1.5rem;
  min-width: 24px;
}

.sidebar-nav {
  flex: 1;
  overflow-y: auto;
  padding: 1rem 0;
}

.nav-section {
  margin-bottom: 0.5rem;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  color: #5f6368;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
}

.nav-item i {
  font-size: 1.25rem;
  min-width: 24px;
  color: #5f6368;
}

.nav-item:hover {
  background: #f1f3f4;
  color: #202124;
}

.nav-item.active,
.nav-item.router-link-active {
  background: #fef7e0;
  color: #e88c30;
  font-weight: 500;
}

.nav-item.active i,
.nav-item.router-link-active i {
  color: #e88c30;
}

.nav-item.has-submenu {
  justify-content: space-between;
}

.toggle-icon {
  font-size: 0.875rem;
  transition: transform 0.2s ease;
}

.toggle-icon.rotated {
  transform: rotate(180deg);
}

.submenu {
  padding-left: 3rem;
}

.submenu-item {
  display: block;
  padding: 0.5rem 1rem;
  color: #5f6368;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.submenu-item:hover {
  background: #f1f3f4;
  color: #202124;
}

.submenu-item.router-link-active {
  color: #e88c30;
  font-weight: 500;
}

.sidebar-divider {
  height: 1px;
  background: #e0e0e0;
  margin: 0.5rem 1rem;
}

.sidebar-toggle {
  position: absolute;
  bottom: 1rem;
  right: -12px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #fff;
  border: 1px solid #e0e0e0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.sidebar-toggle:hover {
  background: #f1f3f4;
}

.sidebar-toggle i {
  font-size: 0.75rem;
  color: #5f6368;
}

/* Collapsed state */
.sidebar.collapsed .sidebar-brand span,
.sidebar.collapsed .nav-item span {
  display: none;
}

.sidebar.collapsed .submenu {
  display: none;
}

.sidebar.collapsed .nav-item {
  justify-content: center;
  padding: 0.75rem;
}

/* Scrollbar */
.sidebar-nav::-webkit-scrollbar {
  width: 6px;
}

.sidebar-nav::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-nav::-webkit-scrollbar-thumb {
  background: #dadce0;
  border-radius: 3px;
}

.sidebar-nav::-webkit-scrollbar-thumb:hover {
  background: #bdc1c6;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }
  
  .sidebar.show {
    transform: translateX(0);
  }
}
</style>
