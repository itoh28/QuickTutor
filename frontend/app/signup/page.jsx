import React from 'react';
import Header from '../_components/Header.jsx';
import Button from '../_components/Button.jsx';
import Link from 'next/link.js';

const signUp = () => {
  return (
    <div className="min-h-screen bg-base flex flex-col">
      <Header />
      <div className="flex-grow flex justify-center mt-20">
        <div className="w-full max-w-md">
          <div className="text-center py-4 rounded-t bg-main text-white text-2xl font-bold">
            Sign up
          </div>
          <form className="bg-white shadow-md rounded-b px-8 py-6">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                会社/団体名
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
                placeholder="例）株式会社マニュアル"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="user-name"
              >
                ユーザー名
              </label>
              <input
                className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="user-name"
                type="text"
                placeholder="例）田中太郎"
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
                placeholder="***********"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password-confirm"
              >
                パスワード（確認用）
              </label>
              <input
                className="shadow order rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password-confirm"
                type="password"
                placeholder="***********"
              />
            </div>
            <div className="flex justify-center">
              <Link href="/signup-success">
                <Button text="登録" />
              </Link>
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

export default signUp;
