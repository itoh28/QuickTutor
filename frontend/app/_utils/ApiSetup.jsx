import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const Api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

const GetCsrfToken = async () => {
  try {
    await Api.get('/sanctum/csrf-cookie');
    console.log('CSRF cookie set successfully.');
  } catch (error) {
    console.error('Failed to get CSRF token', error);
  }
};

export { Api, GetCsrfToken };
