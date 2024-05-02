import React from 'react';
import Header from '../_components/Header.jsx';
import Button from '../_components/Button.jsx';
import Link from 'next/link.js';

const logIn = () => {
  return (
    <div className="min-h-screen bg-base flex flex-col">
      <Header />
      <div className="flex-grow flex justify-center  mt-20">
        <div className="w-full max-w-md">
          <div className="text-center py-4 rounded-t bg-main text-white text-2xl font-bold">
            Log in
          </div>
          <form className="bg-white shadow-md rounded-b px-8 py-6">
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
            <div className="flex justify-center my-8">
              <Link href="/home">
                <Button text="ログイン" />
              </Link>
            </div>
            <div className="flex justify-center text-sm hover:text-blue-400 ">
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

export default logIn;
