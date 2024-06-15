'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import { useEffect } from 'react';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'QuickTutor',
  description: '誰でも手軽にマニュアルの作成・閲覧ができます。',
};

export default function RootLayout({ children }) {
  useEffect(() => {
    const getCsrfToken = async () => {
      await axios.get('https://quicktutor.work/sanctum/csrf-cookie', {
        withCredentials: true,
      });
    };

    getCsrfToken();
  }, []);

  return (
    <html lang="ja">
      <head>
        <meta name="csrf-token" content="" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
