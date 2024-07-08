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
  const [isSlideMode, setIsSlideMode] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [lastUpdatedBy, setLastUpdatedBy] = useState('');
  const [lastUpdatedAt, setLastUpdatedAt] = useState('');

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
        setLastUpdatedBy(manual.lastUpdatedBy);
        setLastUpdatedAt(manual.lastUpdatedAt);
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

  const handleSlideModeToggle = () => {
    setIsSlideMode(!isSlideMode);
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    }
  };

  if (isSlideMode) {
    const currentStep = steps[currentStepIndex];
    return (
      <div className="w-full h-screen bg-black flex flex-col items-center overflow-y-auto text-white relative">
        <Header />
        <div className="absolute top-28 right-6">
          <EscButton onClick={handleSlideModeToggle} />
        </div>
        <div className="flex flex-grow items-center justify-center">
          <button
            onClick={handlePreviousStep}
            disabled={currentStepIndex === 0}
            className="absolute left-0 ml-4 text-4xl text-white"
          >
            &lt;
          </button>
          <div className="flex flex-col items-center w-4/5">
            <div className="relative w-[80vw] h-[60vh] max-w-7xl">
              {currentStep.media && currentStep.media.type === 'image' && (
                <div className="relative w-full h-full">
                  <img
                    src={currentStep.media.url}
                    alt={`Step ${currentStep.number} media`}
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              {currentStep.media && currentStep.media.type === 'video' && (
                <div className="relative w-full h-full">
                  <video
                    src={currentStep.media.url}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
            <div className="text-center w-[80vw] max-w-7xl">
              <h2 className="mt-6 text-2xl">{currentStep.subtitle}</h2>
              <p className="mt-6 whitespace-pre-wrap overflow-auto max-h-[calc(100vh-80vh)]">
                {currentStep.comment}
              </p>
            </div>
          </div>
          <button
            onClick={handleNextStep}
            disabled={currentStepIndex === steps.length - 1}
            className="absolute right-0 mr-4 text-4xl text-white"
          >
            &gt;
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-baseColor flex flex-col items-center overflow-y-auto">
      <Header />
      <div className="w-4/5 rounded-t bg-main text-2xl font-bold mt-12 p-6">
        <div className="flex">
          <div className="relative mr-4 w-[350px] h-[197px]">
            {media && media.type === 'image' && (
              <div className="relative w-full h-full">
                <img
                  src={media.url}
                  alt="Main media"
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-0 right-4">
                  <button onClick={() => handleImageClick(media.url)}>
                    <EnlargeIcon />
                  </button>
                </div>
              </div>
            )}
            {media && media.type === 'video' && (
              <div className="relative w-full h-full">
                <video
                  src={media.url}
                  controls
                  className="w-full h-full object-contain"
                />
              </div>
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
            <div className="flex items-center mt-14">
              <button
                onClick={handleSlideModeToggle}
                className="max-w-36 mr-8 text-sm text-white bg-green-500 p-1 rounded-lg"
              >
                スライドモードへ
              </button>
              <div className="ml-auto text-sm text-white">
                <p>最終更新者: {lastUpdatedBy}</p>
                <p>最終更新日時: {new Date(lastUpdatedAt).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/5 mb-12 bg-white rounded-b p-6">
        {steps.map((step, index) => (
          <div key={index} className="mb-6 flex border-b-2 pb-4">
            <div className="relative mr-4 w-[350px] h-[197px]">
              {step.media && step.media.type === 'image' && (
                <div className="relative w-full h-full">
                  <img
                    src={step.media.url}
                    alt={`Step ${step.number} media`}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute bottom-0 right-2">
                    <button onClick={() => handleImageClick(step.media.url)}>
                      <EnlargeIcon />
                    </button>
                  </div>
                </div>
              )}
              {step.media && step.media.type === 'video' && (
                <div className="relative w-full h-full">
                  <video
                    src={step.media.url}
                    controls
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
            </div>
            <div className="flex-grow flex flex-col bg-white rounded px-4">
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
                style={{
                  whiteSpace: 'pre-wrap',
                  overflow: 'auto',
                  height: 'auto',
                }}
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
