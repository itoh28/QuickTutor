import axios from 'axios';

axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL: 'https://quicktutor.work',
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
  },
});

const getCsrfToken = async () => {
  try {
    await api.get('/sanctum/csrf-cookie');
  } catch (error) {
    console.error('Failed to get CSRF token', error);
  }
};

getCsrfToken();

export default api;
