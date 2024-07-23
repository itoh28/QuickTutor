import React from 'react';
import Link from 'next/link';
import Header from './_components/Header';

const Home = () => {
  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center"
      style={{ backgroundImage: "url('/top_page_picture.jpg')" }}
    >
      <Header showUserInfo={false} isHomePage={true} />
      <div className="flex-grow flex flex-col items-center justify-center text-white">
        <h1 className="text-7xl mt-16 mb-28">マニュアルをもっと身近に</h1>
        <div className="flex space-x-32">
          <Link href="/signup">
            <button className="bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white text-2xl py-6 px-10 rounded">
              新規登録
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-gray-800 bg-opacity-50 hover:bg-opacity-75 text-white text-2xl py-6 px-10 rounded">
              ログイン
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
