import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../store/auth'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: { title: 'Trang chủ' }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/Register.vue'),
    meta: { title: 'Đăng ký', guest: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { title: 'Đăng nhập', guest: true }
  },
  {
    path: '/posts/create',
    name: 'CreatePost',
    component: () => import('../views/CreatePost.vue'),
    meta: { title: 'Tạo bài viết', requiresAuth: true }
  },
  {
    path: '/posts/:id/edit',
    name: 'EditPost',
    component: () => import('../views/CreatePost.vue'),
    meta: { title: 'Chỉnh sửa bài viết', requiresAuth: true }
  },
  {
    path: '/posts/:id',
    name: 'PostDetail',
    component: () => import('../views/PostDetail.vue'),
    meta: { title: 'Chi tiết bài viết' }
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: { title: 'Thông tin cá nhân', requiresAuth: true }
  },
  {
    path: '/tags',
    name: 'Tags',
    component: () => import('../views/Tags.vue'),
    meta: { title: 'Nhãn xét', requiresAuth: true }
  },
  {
    path: '/reading-list',
    name: 'ReadingList',
    component: () => import('../views/ReadingList.vue'),
    meta: { title: 'Danh sách đọc', requiresAuth: true }
  },
  {
    path: '/pages',
    name: 'Pages',
    component: () => import('../views/Pages.vue'),
    meta: { title: 'Trang', requiresAuth: true }
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import('../views/Layout.vue'),
    meta: { title: 'Bố cục', requiresAuth: true }
  },
  {
    path: '/theme',
    name: 'Theme',
    component: () => import('../views/Theme.vue'),
    meta: { title: 'Chủ đề', requiresAuth: true }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue'),
    meta: { title: 'Cài đặt', requiresAuth: true }
  },
  {
    path: '/stats',
    name: 'Stats',
    component: () => import('../views/Stats.vue'),
    meta: { title: 'Thống kê', requiresAuth: true }
  },
  {
    path: '/help',
    name: 'Help',
    component: () => import('../views/Help.vue'),
    meta: { title: 'Trợ giúp' }
  },
  {
    path: '/posts/drafts',
    name: 'Drafts',
    component: () => import('../views/Home.vue'),
    meta: { title: 'Bài nháp', requiresAuth: true }
  },
  {
    path: '/posts/published',
    name: 'Published',
    component: () => import('../views/Home.vue'),
    meta: { title: 'Đã xuất bản', requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guards for authentication
router.beforeEach((to, from, next) => {
  const { isAuthenticated } = useAuth()
  
  // Update page title
  document.title = to.meta.title ? `${to.meta.title} - Quản Lý Bán Hàng` : 'Quản Lý Bán Hàng'
  
  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  // Check if route is for guests only (login/register)
  else if (to.meta.guest && isAuthenticated.value) {
    next({ name: 'Home' })
  }
  else {
    next()
  }
})

export default router
