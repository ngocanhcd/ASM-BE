<template>
  <div class="container">
    <div class="page-container fade-in">
      <h2 class="mb-4">
        <i class="bi bi-question-circle me-2" style="color: var(--primary-color);"></i>
        Trợ giúp và Phản hồi
      </h2>
      
      <div class="help-section">
        <h4><i class="bi bi-book me-2"></i>Hướng dẫn sử dụng</h4>
        <div class="list-group mb-4">
          <a href="#" class="list-group-item list-group-item-action">
            <i class="bi bi-chevron-right me-2"></i>
            Cách tạo bài viết mới
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <i class="bi bi-chevron-right me-2"></i>
            Quản lý bình luận
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <i class="bi bi-chevron-right me-2"></i>
            T ùy chỉnh giao diện
          </a>
          <a href="#" class="list-group-item list-group-item-action">
            <i class="bi bi-chevron-right me-2"></i>
            Sử dụng nhãn và danh mục
          </a>
        </div>
      </div>
      
      <div class="help-section">
        <h4><i class="bi bi-envelope me-2"></i>Gửi phản hồi</h4>
        <p class="text-secondary">Chúng tôi rất mong nhận được ý kiến đóng góp từ bạn</p>
        <form>
          <div class="mb-3">
            <label class="form-label">Tiêu đề</label>
            <input type="text" class="form-control" placeholder="Nhập tiêu đề phản hồi">
          </div>
          <div class="mb-3">
            <label class="form-label">Nội dung</label>
            <textarea class="form-control" rows="5" placeholder="Mô tả chi tiết phản hồi của bạn"></textarea>
          </div>
          <button type="submit" class="btn btn-primary">
            <i class="bi bi-send me-2"></i>
            Gửi phản hồi
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.help-section {
  margin-bottom: 3rem;
}

.help-section h4 {
  color: var(--text-primary);
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--border-color);
}

.list-group-item {
  border-radius: 8px;
  border: 1px solid var(--border-color);
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
}

.list-group-item:hover {
  background: var(--bg-light);
  border-color: var(--primary-color);
}
</style>
