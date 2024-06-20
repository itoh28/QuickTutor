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
    const csrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    if (csrfToken) {
      Api.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
      console.log('CSRF token set:', csrfToken);
    } else {
      console.error('CSRF token not found in cookies');
    }
  } catch (error) {
    console.error('Failed to get CSRF token', error);
  }
};

export { Api, GetCsrfToken };
