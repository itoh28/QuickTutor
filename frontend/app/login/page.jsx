'use client';

import React, { useState } from 'react';
import Header from '../_components/Header';
import Button from '../_components/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Axios from '../_utils/axiosSetup';

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    groupName: '',
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post('/api/login', {
        username: formData.username,
        password: formData.password,
        group_name: formData.groupName, // グループ名を送信
      });

      const { user, token } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      console.log('Logged in successfully:', user);
      router.push('/view-manual-list');
    } catch (error) {
      console.error('ログインできませんでした', error);
    }
  };

  return (
    <div className="min-h-screen bg-baseColor flex flex-col">
      <Header showUserInfo={false} />
      <div className="flex-grow flex justify-center my-10">
        <div className="w-full max-w-md">
          <div className="text-center py-4 rounded-t bg-main text-white text-2xl font-bold">
            Login
          </div>
          <form
            className="bg-white shadow-md rounded-b px-8 py-6"
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="groupName"
              >
                グループ名
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="groupName"
                type="text"
                placeholder="グループ名"
                value={formData.groupName}
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
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="ユーザー名"
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
                className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-6 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="パスワード"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex justify-center">
              <Button text="ログイン" type="submit" />
            </div>
            <div className="flex justify-center text-sm hover:text-blue-400 pt-6">
              <Link href="signup">
                <p>アカウント作成はこちら</p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
