'use client';

import React, { useState, useEffect } from 'react';
import Header from '../_components/Header';
import EditModeSidebar from '../_components/EditModeSidebar';
import Axios from '../_utils/axiosSetup';

const EditEducationProgramList = () => {
  const [programs, setPrograms] = useState([
    { id: 'plus', program_name: '', editing: false },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [isEditing, setIsEditing] = useState(null);

  useEffect(() => {
    const fetchPrograms = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }

      try {
        const response = await Axios.get('/api/programs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPrograms([
          { id: 'plus', program_name: '', editing: false },
          ...response.data,
        ]);
        console.log('Fetched programs:', response.data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      }
    };

    fetchPrograms();
  }, []);

  const addProgram = () => {
    setPrograms([...programs, { id: null, program_name: '', editing: true }]);
  };

  const handleInputChange = (id, value) => {
    setPrograms(
      programs.map((program) =>
        program.id === id || (id === null && program.editing)
          ? { ...program, program_name: value, editing: true }
          : program,
      ),
    );
  };

  const handleDeleteProgram = async (id, event) => {
    event.stopPropagation();
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    if (id !== null) {
      try {
        console.log('Deleting program with ID:', id);
        await Axios.delete(`/api/programs/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPrograms(programs.filter((program) => program.id !== id));
        console.log('Deleted program with ID:', id);
      } catch (error) {
        console.error('Error deleting program:', error);
      }
    } else {
      setPrograms(programs.filter((program) => program.editing !== true));
    }
  };

  const handleSubmit = async (program) => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      let response;
      if (program.id === null) {
        console.log('Creating new program:', program.program_name);
        response = await Axios.post(
          '/api/programs',
          { name: program.program_name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('Created new program:', response.data);
        setPrograms(
          programs.map((prog) =>
            prog.id === null && prog.editing
              ? {
                  ...response.data,
                  program_name: response.data.program_name,
                  editing: false,
                }
              : prog,
          ),
        );
      } else {
        console.log('Updating program with ID:', program.id);
        response = await Axios.put(
          `/api/programs/${program.id}`,
          { name: program.program_name },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        console.log('Updated program:', response.data);
        setPrograms(
          programs.map((prog) =>
            prog.id === program.id
              ? {
                  ...response.data,
                  program_name: response.data.program_name,
                  editing: false,
                }
              : prog,
          ),
        );
      }
    } catch (error) {
      console.error('Error saving program:', error);
    }
  };

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === 'next' ? prevPage + 1 : prevPage - 1,
    );
  };

  useEffect(() => {
    const updateItemsPerPage = () => {
      const height = window.innerHeight;
      const width = window.innerWidth;
      const itemsPerRow = Math.floor(width / 160); // 160は各ブロックの幅とマージンを考慮
      const itemsPerColumn = Math.floor((height - 250) / 160); // 250はヘッダーとページネーションの高さを考慮
      setItemsPerPage(itemsPerRow * itemsPerColumn);
    };

    updateItemsPerPage();
    window.addEventListener('resize', updateItemsPerPage);

    return () => {
      window.removeEventListener('resize', updateItemsPerPage);
    };
  }, []);

  const displayedPrograms = programs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="flex flex-col w-screen h-screen bg-baseColor overflow-hidden">
      <Header />
      <div className="flex flex-grow overflow-hidden">
        <div className="w-1/6 min-w-44 bg-main text-white">
          <EditModeSidebar />
        </div>
        <div className="py-10 px-20 flex-grow flex flex-col relative overflow-hidden">
          <div className="flex justify-end mb-4 absolute top-0 right-0 mr-20 mt-10">
            <button
              className={`px-4 py-2 bg-gray-300 hover:bg-main hover:text-white rounded-l ${
                currentPage === 1 ? 'cursor-not-allowed' : ''
              }`}
              onClick={() => handlePageChange('prev')}
              disabled={currentPage === 1}
            >
              前へ
            </button>
            <button
              className={`px-4 py-2 bg-gray-300 hover:bg-main hover:text-white rounded-r ${
                displayedPrograms.length < itemsPerPage
                  ? 'cursor-not-allowed'
                  : ''
              }`}
              onClick={() => handlePageChange('next')}
              disabled={displayedPrograms.length < itemsPerPage}
            >
              次へ
            </button>
          </div>
          <div className="flex flex-wrap gap-10 overflow-auto mt-20 pt-3">
            {displayedPrograms.map((program, index) =>
              program.id === 'plus' ? (
                <div
                  key={index}
                  className="relative font-bold bg-gray-200 flex items-center justify-center text-center h-40 w-40 cursor-pointer"
                  onClick={addProgram}
                >
                  <span className="text-4xl">+</span>
                </div>
              ) : (
                <div
                  key={program.id}
                  className="relative font-bold bg-blue-200 flex items-center justify-center text-center h-40 w-40"
                >
                  <textarea
                    value={program.program_name}
                    placeholder="教育プログラム名を入力"
                    onFocus={() => setIsEditing(program.id)}
                    onBlur={() => {
                      setIsEditing(null);
                      handleSubmit(program);
                    }}
                    onChange={(e) =>
                      handleInputChange(program.id, e.target.value)
                    }
                    onClick={(e) => e.stopPropagation()}
                    className={`bg-blue-200 text-center w-32 h-20 resize-none overflow-hidden ${
                      program.editing || !program.program_name
                        ? 'border border-gray-500'
                        : ''
                    } leading-tight flex items-center justify-center`}
                    rows={3}
                    maxLength={21}
                    style={{
                      lineHeight: '1.5',
                      paddingTop: '1rem',
                    }}
                  />
                  <button
                    className="absolute top-0 right-0 w-7 h-7 rounded-full bg-main text-white flex items-center justify-center"
                    onClick={(e) => handleDeleteProgram(program.id, e)}
                    style={{ top: '-10px', right: '-10px' }}
                  >
                    ×
                  </button>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditEducationProgramList;
