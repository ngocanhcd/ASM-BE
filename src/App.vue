<template>
  <div id="app" class="app-container">
    <Sidebar v-if="isAuthenticated" />
    <div class="main-content" :class="{ 'with-sidebar': isAuthenticated }">
      <Navbar />
      <main class="py-4">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>
    </div>
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import { useAuth } from './store/auth'

const { isAuthenticated } = useAuth()
</script>

<style scoped>
.app-container {
  display: flex;
  min-height: 100vh;
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  transition: margin-left 0.3s ease;
}

.main-content.with-sidebar {
  margin-left: 250px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
