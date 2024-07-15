'use client';

import React, { useEffect, useState } from 'react';
import Header from '../_components/Header';
import ViewModeSidebar from '../_components/ViewModeSidebar';
import Link from 'next/link';
import Axios from '../_utils/axiosSetup';
import Button from '../_components/Button';

const ViewManualList = () => {
  const [manuals, setManuals] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalManuals: 0,
    totalPages: 0,
    from: 0,
    to: 0,
  });

  const fetchData = async (page = 1) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await Axios.get(`/api/manuals?page=${page}`, {
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

  return (
    <div className="flex flex-col w-screen h-screen bg-baseColor">
      <Header />
      <div className="flex flex-grow">
        <div className="w-1/6 max-w-48 bg-main text-white">
          <ViewModeSidebar />
        </div>
        <div className="mt-2 py-6 px-20 flex-grow">
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
              style={{ maxHeight: 'calc(100vh - 200px)' }}
            >
              <table className="table-fixed min-w-full border font-semibold border-gray-300">
                <thead className="sticky top-0 bg-main text-white">
                  <tr>
                    <th className="w-1/6 min-w-20">トップ画像</th>
                    <th className="w-1/3">タイトル</th>
                    <th className="w-1/3">ジャンル</th>
                    <th className="w-1/12">作成者</th>
                    <th className="w-1/6 min-w-36">最終更新日時</th>
                    <th className="py-4 w-1/12 min-w-10">閲覧</th>
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
                      <td className="border border-gray-300 px-4 min-w-36 w-1/6 whitespace-normal overflow-visible">
                        {new Date(
                          manual.lastUpdatedAt || manual.createdAt,
                        ).toLocaleString()}
                      </td>
                      <td className="border border-gray-300 px-4 w-1/12 min-w-24 text-center whitespace-normal overflow-visible">
                        <Link href={`/view-manual/${manual.id}`}>
                          <Button
                            text="閲覧"
                            type="button"
                            fontSize="text-sm"
                            py="py-2"
                            px="px-3"
                          />
                        </Link>
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

export default ViewManualList;
