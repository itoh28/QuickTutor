'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/app/_components/Header';
import EscButton from '@/app/_components/EscButton';
import Axios from '@/app/_utils/axiosSetup';
import ImageModal from '@/app/_components/ImageModal';
import { EnlargeIcon } from '@/app/_components/_icons/EnlargeIcon';

const ViewManual = () => {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState([]);
  const [tags, setTags] = useState([]);
  const [media, setMedia] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');

  useEffect(() => {
    const fetchManual = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await Axios.get(`/api/manuals/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const manual = response.data.data;

        setTitle(manual.manualTitle);
        const stepsData = manual.steps.map((step, index) => ({
          id: step.id,
          subtitle: step.stepSubtitle,
          comment: step.stepComment,
          media: step.media
            ? {
                type: step.media.stepImageUrl ? 'image' : 'video',
                url: step.media.stepImageUrl || step.media.stepVideoUrl,
                id: step.media.id,
              }
            : null,
          number: index + 1,
        }));
        setSteps(stepsData);
        setTags(manual.genres.map((genre) => genre.genreName));
        setMedia(
          manual.media
            ? {
                type: manual.media.stepImageUrl ? 'image' : 'video',
                url: manual.media.stepImageUrl || manual.media.stepVideoUrl,
                id: manual.media.id,
              }
            : null,
        );
      } catch (error) {
        console.error('Error fetching manual:', error);
      }
    };

    fetchManual();
  }, [id]);

  const handleImageClick = (imageSrc) => {
    setModalImageSrc(imageSrc);
    setShowImageModal(true);
  };

  const closeModal = () => {
    setShowImageModal(false);
    setModalImageSrc('');
  };

  return (
    <div className="w-full h-screen bg-baseColor flex flex-col items-center overflow-y-auto">
      <Header />
      <div className="w-4/5 rounded-t bg-main text-2xl font-bold mt-12 p-6">
        <div className="flex">
          <div className="relative mr-4 w-1/4">
            {media && (
              <>
                <img
                  src={media.url}
                  alt="Main media"
                  className="w-full h-auto max-h-48 object-contain"
                />
                <div className="absolute bottom-1 right-6">
                  <EnlargeIcon onClick={() => handleImageClick(media.url)} />
                </div>
              </>
            )}
          </div>
          <div className="flex-grow flex flex-col ml-6">
            <div className="flex justify-between mb-4">
              <div className="flex flex-wrap">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="mr-2 my-3 bg-gray-200 text-sm font-bold text-black rounded-full px-3 py-1 flex items-center justify-center"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <EscButton />
            </div>
            <div className="bg-white rounded p-2 text-lg max-w-md">{title}</div>
          </div>
        </div>
      </div>
      <div className="w-4/5 mb-12 bg-white rounded-b p-6">
        {steps.map((step, index) => (
          <div key={index} className="mb-6 flex border-b-2 pb-4">
            <div className="relative mr-4 w-1/4">
              {step.media && (
                <>
                  <img
                    src={step.media.url}
                    alt={`Step ${step.number} media`}
                    className="w-full h-auto max-h-48 object-contain"
                  />
                  <div className="absolute bottom-1 right-6">
                    <EnlargeIcon
                      onClick={() => handleImageClick(step.media.url)}
                    />
                  </div>
                </>
              )}
            </div>
            <div className="flex-grow flex flex-col bg-white rounded">
              <div className="flex items-center mb-2">
                <input
                  type="text"
                  value={step.subtitle}
                  readOnly
                  className="p-2 w-full border border-gray-300 rounded bg-transparent"
                />
              </div>
              <textarea
                value={step.comment}
                readOnly
                className="p-2 flex-1 border border-gray-300 rounded bg-transparent"
              />
            </div>
          </div>
        ))}
      </div>
      {showImageModal && (
        <ImageModal imageSrc={modalImageSrc} onClose={closeModal} />
      )}
    </div>
  );
};

export default ViewManual;
