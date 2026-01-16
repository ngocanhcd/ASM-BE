<template>
  <div class="container">
    <div class="page-container fade-in">
      <h2 class="mb-4">
        <i class="bi bi-bar-chart me-2" style="color: var(--primary-color);"></i>
        Thống kê
      </h2>
      
      <div class="row g-4 mb-4">
        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-primary">
              <i class="bi bi-file-text"></i>
            </div>
            <h3>{{ stats.totalPosts }}</h3>
            <p>Tổng bài viết</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-success">
              <i class="bi bi-eye"></i>
            </div>
            <h3>{{ stats.totalViews }}</h3>
            <p>Lượt xem</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-info">
              <i class="bi bi-chat"></i>
            </div>
            <h3>{{ stats.totalComments }}</h3>
            <p>Bình luận</p>
          </div>
        </div>
        <div class="col-md-3">
          <div class="stat-card">
            <div class="stat-icon bg-warning">
              <i class="bi bi-heart"></i>
            </div>
            <h3>{{ stats.totalLikes }}</h3>
            <p>Lượt thích</p>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-md-12">
          <div class="chart-card">
            <h4 class="mb-3">Lượt xem theo thời gian</h4>
            <div class="chart-placeholder">
              <i class="bi bi-graph-up"></i>
              <p>Biểu đồ sẽ hiển thị ở đây</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const stats = ref({
  totalPosts: 24,
  totalViews: 1250,
  totalComments: 89,
  totalLikes: 342
})
</script>

<style scoped>
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--shadow-md);
  text-align: center;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: white;
  font-size: 1.5rem;
}

.stat-card h3 {
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.stat-card p {
  color: var(--text-secondary);
  margin-bottom: 0;
}

.chart-card {
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--shadow-md);
}

.chart-placeholder {
  height: 300px;
  background: var(--bg-light);
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.chart-placeholder i {
  font-size: 4rem;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.bg-primary {
  background: var(--primary-color);
}

.bg-success {
  background: var(--success-color);
}

.bg-info {
  background: #3b82f6;
}

.bg-warning {
  background: var(--warning-color);
}
</style>
