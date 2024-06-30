'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/app/_components/Header';
import EscButton from '@/app/_components/EscButton';
import Button from '@/app/_components/Button';
import Axios from '@/app/_utils/axiosSetup';

const ChangeUsername = () => {
  const [currentUsername, setCurrentUsername] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    try {
      await Axios.put(
        '/api/user/username',
        { currentUsername, newUsername },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      router.push('/');
    } catch (error) {
      console.error('Failed to change username', error);
    }
  };

  return (
    <div className="w-full h-screen bg-baseColor flex flex-col items-center overflow-y-auto relative">
      <Header />
      <div className="absolute top-24 right-8">
        <EscButton />
      </div>
      <div className="w-1/3 bg-white rounded-lg shadow-lg p-8 mt-12">
        <h2 className="text-3xl font-bold mb-10 text-center">ユーザー名変更</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-8">
            <label className="block text-gray-700 font-bold mb-2">
              現在のユーザー名
            </label>
            <input
              type="text"
              value={currentUsername}
              onChange={(e) => setCurrentUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-14">
            <label className="block text-gray-700 font-bold mb-2">
              新しいユーザー名
            </label>
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="flex items-center justify-center">
            <Button text="確定" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangeUsername;
