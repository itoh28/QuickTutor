'use client';

import React, { useEffect, useState } from 'react';
import Header from '../_components/Header';
import EditModeSidebar from '../_components/EditModeSidebar';
import { useRouter } from 'next/navigation';
import Axios from '../_utils/axiosSetup';

const EditGenreList = () => {
  const [genres, setGenres] = useState([]);
  const router = useRouter();

  const fetchGenres = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      const response = await Axios.get('/api/genres', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  const handleDeleteGenre = async (id) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      await Axios.delete(`/api/genres/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setGenres(genres.filter((genre) => genre.id !== id));
    } catch (error) {
      console.error('Error deleting genre:', error);
    }
  };

  useEffect(() => {
    fetchGenres();
  }, []);

  const handleGenreClick = (id) => {
    router.push(`/genre/${id}`);
  };

  return (
    <div className="flex flex-col w-screen h-screen bg-baseColor">
      <Header />
      <div className="flex flex-grow">
        <div className="w-1/6 min-w-44 bg-main text-white">
          <EditModeSidebar />
        </div>
        <div className="py-10 px-20 flex-grow flex flex-wrap gap-10 align-content-start">
          {genres.map((genre) => (
            <div
              key={genre.id}
              className="relative font-bold bg-blue-200 flex items-center justify-center text-center h-40 w-40 cursor-pointer"
              onClick={() => handleGenreClick(genre.id)}
            >
              <span>{genre.genre_name}</span>
              <button
                className="absolute top-0 right-0 w-7 h-7 rounded-full bg-main text-white flex items-center justify-center transform translate-x-1/3 -translate-y-1/3"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteGenre(genre.id);
                }}
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditGenreList;
