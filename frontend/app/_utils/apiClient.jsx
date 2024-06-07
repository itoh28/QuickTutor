import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export const getCsrfCookie = async () => {
  try {
    await apiClient.get('/sanctum/csrf-cookie');
  } catch (error) {
    console.error('CSRFトークンを取得できませんでした', error);
  }
};

export default apiClient;
