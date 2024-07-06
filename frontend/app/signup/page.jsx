'use client';

import React, { useState } from 'react';
import Header from '../_components/Header';
import Button from '../_components/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Axios from '../_utils/axiosSetup';

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    group_name: 'お試し用',
    username: '',
    password: '',
    passwordConfirm: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (formData.password !== formData.passwordConfirm) {
      setErrors({ passwordConfirm: ['パスワードが一致しません'] });
      return;
    }

    try {
      const response = await Axios.post('/api/register', {
        group_name: formData.group_name,
        username: formData.username,
        password: formData.password,
        password_confirmation: formData.passwordConfirm,
      });

      const { user, token } = response.data;
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', token);

      const loginResponse = await Axios.post('/api/login', {
        group_name: formData.group_name,
        username: formData.username,
        password: formData.password,
      });

      const { user: loginUser, token: loginToken } = loginResponse.data;
      localStorage.setItem('user', JSON.stringify(loginUser));
      localStorage.setItem('token', loginToken);

      router.push('/view-manual-list');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors(error.response.data.errors);
      } else {
        console.error('アカウントを登録できませんでした', error);
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
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.group_name ? 'border-red-500' : ''}`}
                id="group_name"
                type="text"
                placeholder="例）株式会社マニュアル"
                value={formData.group_name}
                onChange={handleChange}
              />
              {errors.group_name && (
                <p className="text-red-500 text-xs italic">
                  {errors.group_name[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                ユーザー名
              </label>
              <input
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`}
                id="username"
                type="text"
                placeholder="例）田中太郎"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && (
                <p className="text-red-500 text-xs italic">
                  {errors.username[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                パスワード
              </label>
              <input
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
                id="password"
                type="password"
                placeholder="8文字以上の英数字"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && (
                <p className="text-red-500 text-xs italic">
                  {errors.password[0]}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="passwordConfirm"
              >
                パスワード（確認用）
              </label>
              <input
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.passwordConfirm ? 'border-red-500' : ''}`}
                id="passwordConfirm"
                type="password"
                placeholder="パスワード再入力"
                value={formData.passwordConfirm}
                onChange={handleChange}
              />
              {errors.passwordConfirm && (
                <p className="text-red-500 text-xs italic">
                  {errors.passwordConfirm[0]}
                </p>
              )}
            </div>
            <div className="flex justify-center mt-6">
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
