'use client';

import React, { useEffect, useState } from 'react';
import Header from '@/app/_components/Header';
import EditModeSidebar from '@/app/_components/EditModeSidebar';
import Link from 'next/link';
import Button from '@/app/_components/Button';
import Axios from '@/app/_utils/axiosSetup';
import { TrashCanIcon } from '@/app/_components/_icons/TrashCanIcon';
import { useRouter } from 'next/navigation';

const EditGenreManualList = ({ params }) => {
  const [manuals, setManuals] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalManuals: 0,
    totalPages: 0,
    from: 0,
    to: 0,
  });

  const router = useRouter();

  const fetchData = async (page = 1) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await Axios.get(
        `/api/genres/${params.id}/manuals?page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
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

  const handleDeleteManual = async (id) => {
    if (
      confirm(
        '本当にマニュアルを削除しますか？削除したマニュアルはごみ箱から復元できます。',
      )
    ) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        await Axios.delete(`/api/manuals/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setManuals(manuals.filter((manual) => manual.id !== id));
        fetchData(pagination.currentPage);
      } catch (error) {
        console.error('Error deleting manual:', error);
      }
    }
  };

  const handleEditClick = (id) => {
    localStorage.setItem('prevPage', `/edit-genre/${params.id}`);
    router.push(`/edit-manual/${id}`);
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-baseColor">
      <Header />
      <div className="flex flex-grow">
        <div className="w-1/6 max-w-48 bg-main text-white">
          <EditModeSidebar />
        </div>
        <div className="py-6 px-20 flex-grow">
          <div className="flex justify-between items-center">
            <Link href="/create-manual">
              <Button
                text="＋ 新規作成"
                type="button"
                fontSize="text-xl"
                py="py-3"
              />
            </Link>
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
                    <th className="w-1/6 min-w-20">トップ画像</th>
                    <th className="w-1/3">タイトル</th>
                    <th className="w-1/3">ジャンル</th>
                    <th className="w-1/12">作成者</th>
                    <th className="w-1/6 min-w-36">最終更新日時</th>
                    <th className="w-1/12 min-w-10">削除</th>
                    <th className="py-4 w-1/12 min-w-10">編集</th>
                  </tr>
                </thead>
                <tbody>
                  {manuals.map((manual) => (
                    <tr
                      key={manual.id}
                      className="bg-white border border-gray-300"
                    >
                      <td className="border border-gray-300 px-4 w-1/6 whitespace-normal overflow-visible">
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
                        {manual.isDraft === 1 && (
                          <span className="ml-2 inline-block rounded-full bg-gray-400 text-white px-2 py-1 text-xs">
                            下書き
                          </span>
                        )}
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
                        {new Date(
                          manual.lastUpdatedAt || manual.createdAt,
                        ).toLocaleString()}
                      </td>
                      <td className="border border-gray-300 px-4 w-1/12 text-center whitespace-normal overflow-visible">
                        <TrashCanIcon
                          onClick={() => handleDeleteManual(manual.id)}
                          className="mx-auto"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 w-1/12 min-w-24 text-center whitespace-normal overflow-visible">
                        <Button
                          text="編集"
                          type="button"
                          fontSize="text-sm"
                          py="py-2"
                          px="px-3"
                          onClick={() => handleEditClick(manual.id)}
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

export default EditGenreManualList;
