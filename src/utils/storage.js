// Local Storage utilities for managing application data

const STORAGE_KEYS = {
  USERS: 'sales_app_users',
  POSTS: 'sales_app_posts',
  COMMENTS: 'sales_app_comments',
  CURRENT_USER: 'sales_app_current_user'
}

// Generic storage functions
export const storage = {
  get(key) {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : null
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return null
    }
  },

  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error('Error writing to localStorage:', error)
    }
  },

  remove(key) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error('Error removing from localStorage:', error)
    }
  }
}

// User management
export const userStorage = {
  getAll() {
    return storage.get(STORAGE_KEYS.USERS) || []
  },

  add(user) {
    const users = this.getAll()
    users.push(user)
    storage.set(STORAGE_KEYS.USERS, users)
  },

  update(userId, updates) {
    const users = this.getAll()
    const index = users.findIndex(u => u.id === userId)
    if (index !== -1) {
      users[index] = { ...users[index], ...updates }
      storage.set(STORAGE_KEYS.USERS, users)
    }
  },

  findByEmail(email) {
    const users = this.getAll()
    return users.find(u => u.email === email)
  },

  findById(id) {
    const users = this.getAll()
    return users.find(u => u.id === id)
  }
}

// Post management
export const postStorage = {
  getAll() {
    return storage.get(STORAGE_KEYS.POSTS) || []
  },

  add(post) {
    const posts = this.getAll()
    posts.unshift(post) // Add to beginning for newest first
    storage.set(STORAGE_KEYS.POSTS, posts)
  },

  update(postId, updates) {
    const posts = this.getAll()
    const index = posts.findIndex(p => p.id === postId)
    if (index !== -1) {
      posts[index] = { ...posts[index], ...updates, updatedAt: new Date().toISOString() }
      storage.set(STORAGE_KEYS.POSTS, posts)
    }
  },

  delete(postId) {
    const posts = this.getAll()
    const filtered = posts.filter(p => p.id !== postId)
    storage.set(STORAGE_KEYS.POSTS, filtered)
  },

  findById(id) {
    const posts = this.getAll()
    return posts.find(p => p.id === id)
  }
}

// Comment management
export const commentStorage = {
  getAll() {
    return storage.get(STORAGE_KEYS.COMMENTS) || []
  },

  getByPostId(postId) {
    const comments = this.getAll()
    return comments.filter(c => c.postId === postId)
  },

  add(comment) {
    const comments = this.getAll()
    comments.push(comment)
    storage.set(STORAGE_KEYS.COMMENTS, comments)
  },

  delete(commentId) {
    const comments = this.getAll()
    const filtered = comments.filter(c => c.id !== commentId)
    storage.set(STORAGE_KEYS.COMMENTS, filtered)
  }
}

// Current user session
export const sessionStorage = {
  getCurrentUser() {
    return storage.get(STORAGE_KEYS.CURRENT_USER)
  },

  setCurrentUser(user) {
    storage.set(STORAGE_KEYS.CURRENT_USER, user)
  },

  clearCurrentUser() {
    storage.remove(STORAGE_KEYS.CURRENT_USER)
  }
}
