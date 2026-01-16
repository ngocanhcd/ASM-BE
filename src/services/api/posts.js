import apiClient from '../apiClient'

export const postsApi = {
  async getAll() {
    const response = await apiClient.get('/posts')
    return response.data
  },

  async getById(id) {
    const response = await apiClient.get(`/posts/${id}`)
    return response.data
  },

  async create(data) {
    const response = await apiClient.post('/posts', data)
    return response.data
  },

  async update(id, data) {
    await apiClient.put(`/posts/${id}`, data)
  },

  async delete(id) {
    await apiClient.delete(`/posts/${id}`)
  }
}
