'use client';

import { useEffect } from 'react';
import axios from 'axios';

const GetCsrfToken = () => {
  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        await axios.get('https://quicktutor.work/sanctum/csrf-cookie', {});
        console.log('CSRF token set');
      } catch (error) {
        console.error('Failed to get CSRF token', error);
      }
    };

    getCsrfToken();
  }, []);

  return null;
};

export default GetCsrfToken;
