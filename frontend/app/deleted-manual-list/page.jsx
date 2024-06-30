'use client';

import React, { useEffect, useState } from 'react';
import Header from '../_components/Header';
import EditModeSidebar from '../_components/EditModeSidebar';
import Link from 'next/link';
import Button from '../_components/Button';
import Axios from '../_utils/axiosSetup';
import { RestoreIcon } from '../_components/_icons/RestoreIcon';

const DeletedManualList = () => {
  const [manuals, setManuals] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalManuals: 0,
    totalPages: 0,
    from: 0,
    to: 0,
  });

  const fetchData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await Axios.get('/api/trashed', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data, meta } = response.data;
      console.log(data);
      setManuals(data);
      setPagination({
        currentPage: meta.current_page[0],
        totalManuals: meta.total[0],
        totalPages: meta.last_page[0],
        from: meta.from[0],
        to: meta.to[0],
      });
    } catch (error) {
      console.error('Error fetching manuals:', error);
    }
  };

  useEffect(() => {
    fetchData(pagination.currentPage);
  }, [pagination.currentPage]);

  const handleNextPage = () => {
    if (pagination.currentPage < pagination.totalPages) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };

  const handlePreviousPage = () => {
    if (pagination.currentPage > 1) {
      setPagination((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  const handleRestoreManual = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await Axios.post(
        `/api/trashed/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setManuals(manuals.filter((manual) => manual.id !== id));
    } catch (error) {
      console.error('Error restoring manual:', error);
    }
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-baseColor">
      <Header />
      <div className="flex flex-grow">
        <div className="w-1/6 min-w-44 bg-main text-white">
          <EditModeSidebar />
        </div>
        <div className="py-6 px-20 flex-grow">
          <div className="flex justify-between items-center mb-4">
            <Link href="/create-manual">
              <Button
                text="＋ 新規作成"
                type="button"
                fontSize="text-xl"
                py="py-3"
              />
            </Link>
            <div className="flex items-center">
              <input
                type="text"
                placeholder="マニュアルのタイトルを入力"
                className="border-2 border-main focus:outline-none rounded-l pl-4 pr-40 py-2"
              />
              <Button text="検索" type="button" rounded="rounded-r" px="px-8" />
            </div>
          </div>
          <div className="flex justify-end items-center mb-4">
            <span>{`${pagination.from}-${pagination.to}件/${pagination.totalManuals}件`}</span>
            <div className="flex ml-4">
              <button
                onClick={handlePreviousPage}
                disabled={pagination.currentPage === 1}
                className="px-4 py-1 bg-gray-300 hover:bg-main hover:text-white rounded-l"
              >
                前へ
              </button>
              <button
                onClick={handleNextPage}
                disabled={pagination.currentPage === pagination.totalPages}
                className="px-4 py-1 bg-gray-300 hover:bg-main hover:text-white rounded-r"
              >
                次へ
              </button>
            </div>
          </div>
          <div className="flex flex-col">
            <div
              className="overflow-auto"
              style={{ maxHeight: 'calc(100vh - 250px)' }}
            >
              <table className="table-fixed min-w-full border font-semibold border-gray-300">
                <thead className="sticky top-0 bg-main text-white">
                  <tr>
                    <th className="w-1/6">トップ画像</th>
                    <th className="w-1/3">タイトル</th>
                    <th className="w-1/3">ジャンル</th>
                    <th className="w-1/12">作成者</th>
                    <th className="w-1/6 min-w-36">最終更新日時</th>
                    <th className="py-4 w-1/12">復元</th>
                  </tr>
                </thead>
                <tbody>
                  {manuals.map((manual) => (
                    <tr
                      key={manual.id}
                      className="bg-white border border-gray-300"
                    >
                      <td className="border border-gray-300 px-4 py-3 w-1/6 whitespace-normal overflow-visible">
                        {manual.media && manual.media.stepImageUrl && (
                          <img
                            src={manual.media.stepImageUrl}
                            alt="Top Image"
                            className="w-auto h-auto"
                          />
                        )}
                      </td>
                      <td className="border border-gray-300 px-4 w-1/3 whitespace-normal overflow-visible">
                        {manual.manualTitle}
                      </td>
                      <td className="border border-gray-300 px-4 w-1/3 whitespace-normal overflow-visible">
                        {manual.genres
                          .map((genre) => genre.genreName)
                          .join(', ')}
                      </td>
                      <td className="border border-gray-300 px-4 min-w-28 w-1/12 whitespace-normal overflow-visible">
                        {manual.users.map((user) => user.username).join(', ')}
                      </td>
                      <td className="border border-gray-300 px-4 w-1/6 min-w-36 whitespace-normal overflow-visible">
                        {manual.updatedAt}
                      </td>
                      <td className="border border-gray-300 px-4 w-1/12 text-center whitespace-normal overflow-visible">
                        <RestoreIcon
                          onClick={() => handleRestoreManual(manual.id)}
                          className="mx-auto"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeletedManualList;
