import React from 'react';
import Header from '../_components/Header';
import Button from '../_components/Button';
import Link from 'next/link';

const signUpSuccess = () => {
  return (
    <div className="min-h-screen bg-base flex flex-col">
      <Header />
      <h1 className="text-center text-2xl font-bold my-10">登録内容</h1>
      <div className="flex flex-col items-center">
        <div className="w-full max-w-sm bg-white shadow-md rounded-lg py-6">
          <table className="w-full  table-fixed">
            <tbody>
              <tr className="border-b">
                <th className="py-3 font-normal">会社/団体名</th>
                <td className="py-3">株式会社マニュアル</td>
              </tr>
              <tr className="border-b">
                <th className="py-3 font-normal">ユーザー名</th>
                <td className="py-3">田中太郎</td>
              </tr>
              <tr>
                <th className="py-3 font-normal">パスワード</th>
                <td className="py-3">**********</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full max-w-md flex justify-evenly mt-12">
          <Link href="/signup">
            <Button text="戻る" />
          </Link>

          <Button text="確定" />
        </div>
      </div>
    </div>
  );
};

export default signUpSuccess;
