'use client';

import { useEffect } from 'react';
import axios from 'axios';

const GetCsrfToken = () => {
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        axios.defaults.withCredentials = true;
        await axios.get('https://quicktutor.work/sanctum/csrf-cookie');
        const csrfToken = document.cookie
          .split('; ')
          .find((row) => row.startsWith('XSRF-TOKEN='))
          ?.split('=')[1];

        if (csrfToken) {
          axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
          console.log('CSRF token set:', csrfToken);
        } else {
          console.error('CSRF token not found in cookies');
        }
      } catch (error) {
        console.error('Failed to get CSRF token', error);
      }
    };

    getCsrfToken();
  }, []);

  return null;
};

export default GetCsrfToken;
