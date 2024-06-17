'use client';

import React, { useState, useEffect } from 'react';
import Header from '../_components/Header.jsx';
import Button from '../_components/Button.jsx';
import Link from 'next/link.js';
import { useRouter } from 'next/navigation.js';
import axios from 'axios';

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
  withXSRFToken: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  headers: {
    'Content-Type': 'application/json',
    // prettier-ignore
    'Accept': 'application/json',
  },
});

const getCsrfToken = async () => {
  try {
    await api.get('/sanctum/csrf-cookie');
    const csrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    if (csrfToken) {
      api.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
      console.log('CSRF token set:', csrfToken);
    } else {
      console.error('CSRF token not found in cookies');
    }
  } catch (error) {
    console.error('Failed to get CSRF token', error);
  }
};

// リクエストインターセプターを追加して、リクエストヘッダーをデバッグログに出力
api.interceptors.request.use(
  (config) => {
    console.log('Request headers before sending:', config.headers);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    group_name: '',
    username: '',
    password: '',
    passwordConfirm: '',
  });

  useEffect(() => {
    getCsrfToken();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
      console.error('パスワードが一致しません');
      return;
    }

    try {
      // CSRFトークンの確認
      console.log(
        'CSRF token before request:',
        api.defaults.headers.common['X-CSRF-TOKEN'],
      );

      // デバッグ処理: トークンがヘッダーに設定されているか確認
      if (!api.defaults.headers.common['X-CSRF-TOKEN']) {
        console.error('CSRF token is not set in headers');
        return;
      }

      const response = await api.post('/api/register', {
        group_name: formData.group_name,
        username: formData.username,
        password: formData.password,
        password_confirmation: formData.passwordConfirm,
      });

      // サーバーからのレスポンスヘッダーをログに出力
      console.log('Response headers:', response.headers);

      const user = response.data.user;
      localStorage.setItem('user', JSON.stringify(user));
      router.push('/view-manuals');
    } catch (error) {
      console.error('アカウントを登録できませんでした', error);
      if (error.response && error.response.status === 419) {
        console.error('CSRF token mismatch or expired');
      }
      // エラーレスポンスヘッダーをログに出力
      if (error.response) {
        console.log('Error response headers:', error.response.headers);
      }
    }
  };

  return (
    <div className="min-h-screen bg-baseColor flex flex-col">
      <Header showUserInfo={false} />
      <div className="flex-grow flex justify-center my-10">
        <div className="w-full max-w-md">
          <div className="text-center py-4 rounded-t bg-main text-white text-2xl font-bold">
            Sign up
          </div>
          <form
            className="bg-white shadow-md rounded-b px-8 py-6"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="group_name"
              >
                会社/団体名
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="group_name"
                type="text"
                placeholder="例）株式会社マニュアル"
                value={formData.group_name}
                onChange={handleChange}
              />
            </div>
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
                placeholder="例）田中太郎"
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
                placeholder="8文字以上の英数字"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="passwordConfirm"
              >
                パスワード（確認用）
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-6 leading-tight focus:outline-none focus:shadow-outline"
                id="passwordConfirm"
                type="password"
                placeholder="パスワード再入力"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center">
              <Button text="登録" type="submit" />
            </div>
            <div className="flex justify-center text-sm hover:text-blue-400 pt-6">
              <Link href="login">
                <p>ログインはこちら</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
