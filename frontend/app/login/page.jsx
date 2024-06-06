'use client';

import React, { useEffect, useState } from 'react';
import Header from '../_components/Header.jsx';
import Button from '../_components/Button.jsx';
import Link from 'next/link.js';
import { useRouter } from 'next/navigation.js';
import apiClient from '../_utils/apiClient.jsx';

const LogIn = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    const getCsrfToken = async () => {
      try {
        await apiClient.get('/sanctum/csrf-cookie');
      } catch (error) {
        console.error('CSRFトークンの取得に失敗しました', error);
      }
    };

    getCsrfToken();

    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiClient.post('/api/login', formData);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/view-manuals');
    } catch (error) {
      console.error('ログインに失敗しました', error);
    }
  };

  return (
    <div className="min-h-screen bg-baseColor flex flex-col">
      <Header showUserInfo={false} />
      <div className="flex-grow flex justify-center my-10">
        <div className="w-full max-w-md">
          <div className="text-center py-4 rounded-t bg-main text-white text-2xl font-bold">
            Log in
          </div>
          <form
            className="bg-white shadow-md rounded-b px-8 py-6"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                ユーザー名
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                パスワード
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center my-8">
              <Button text="ログイン" type="submit" />
            </div>
            <div className="flex justify-center text-sm hover:text-blue-400">
              <Link href="signup">
                <p>新規登録がまだの方はこちら</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
