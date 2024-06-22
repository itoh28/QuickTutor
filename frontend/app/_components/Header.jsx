'use client';

import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Axios from '../_utils/axiosSetup';

const fetcher = async (url) => {
  const token = localStorage.getItem('token');
  const response = await Axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const Header = ({ showUserInfo = 'true' }) => {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { data: response, error } = useSWR(
    showUserInfo ? '/api/user' : null,
    fetcher,
  );

  if (error) {
    console.error('Error fetching user:', error);
    return (
      <div className="w-screen text-white bg-main p-5 flex justify-between items-center">
        <div className="text-2xl font-bold ml-2">
          <Link href={'/'}>
            <button>QuickTutor</button>
          </Link>
        </div>
        <div className="text-normal">ユーザーデータを取得できませんでした</div>
      </div>
    );
  }

  if (showUserInfo && !response) {
    return (
      <div className="w-screen text-white bg-main p-5 flex justify-between items-center">
        <div className="text-2xl font-bold ml-2">
          <Link href={'/'}>
            <button>QuickTutor</button>
          </Link>
        </div>
        <div className="text-normal">Loading...</div>
      </div>
    );
  }

  const user = response ? response.data : null;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    try {
      await Axios.post(
        '/api/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      router.push('/login');
    } catch (error) {
      console.error('Failed to logout', error);
    }
  };

  return (
    <div className="w-screen text-white bg-main p-5 flex justify-between items-center">
      <div className="text-2xl font-bold ml-2">
        <Link href={'/'}>
          <button>QuickTutor</button>
        </Link>
      </div>
      {showUserInfo && user && (
        <div className="text-xl font-bold flex space-x-12 mr-4">
          <span>{user.role}</span>
          <div>
            <button onClick={toggleDropdown}>{user.username} ▼</button>
            {isDropdownOpen && (
              <div className="absolute right-4 mt-2 w-40 text-black text-base bg-white border border-main">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-center hover:bg-gray-200 border-b border-main"
                >
                  ログアウト
                </button>
                <button className="w-full px-4 py-2 text-center bg-white hover:bg-gray-200 border-b border-main">
                  ユーザー名変更
                </button>
                <button className="w-full px-4 py-2 text-center hover:bg-gray-200">
                  ユーザー管理
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
