import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
console.log('API Base URL:', baseURL);

const Api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

Api.interceptors.request.use((request) => {
  console.log('Starting Request', request);
  return request;
});

Api.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('Response Error:', error);
    if (error.response) {
      console.error('Response Error Data:', error.response.data);
      console.error('Response Error Status:', error.response.status);
      console.error('Response Error Headers:', error.response.headers);
    }
    return Promise.reject(error);
  },
);

const GetCsrfToken = async () => {
  try {
    const response = await Api.get('/sanctum/csrf-cookie');
    console.log('CSRF cookie set successfully:', response);
  } catch (error) {
    console.error('Failed to get CSRF token', error);
  }
};

export { Api, GetCsrfToken };
