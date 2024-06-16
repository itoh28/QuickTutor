import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://quicktutor.work',
  headers: {
    'Content-Type': 'application/json',
  },
});

// クライアントサイドでのみ localStorage にアクセス
if (typeof window !== 'undefined') {
  const token = localStorage.getItem('token');
  if (token) {
    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}

export default apiClient;
