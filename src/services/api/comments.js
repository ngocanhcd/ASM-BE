import apiClient from '../apiClient'

export const commentsApi = {
  async getByPostId(postId) {
    const response = await apiClient.get(`/posts/${postId}/comments`)
    return response.data
  },

  async create(postId, data) {
    const response = await apiClient.post(`/posts/${postId}/comments`, data)
    return response.data
  },

  async delete(postId, commentId) {
    await apiClient.delete(`/posts/${postId}/comments/${commentId}`)
  }
}
