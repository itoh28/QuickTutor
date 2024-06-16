'use client';

import { useEffect } from 'react';
import axios from 'axios';

const GetCsrfToken = () => {
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.get(
          'https://quicktutor.work/sanctum/csrf-cookie',
        );
        const csrfToken = response.headers['x-xsrf-token'];

        if (csrfToken) {
          axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
          console.log('CSRF token set:', csrfToken);
        } else {
          console.error('CSRF token not found in response headers');
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
