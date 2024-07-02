'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Header from '@/app/_components/Header';
import EscButton from '@/app/_components/EscButton';
import Button from '@/app/_components/Button';
import MediaUpload from '@/app/_components/MediaUpload';
import TagGenerator from '@/app/_components/TagGenerator';
import StepManager from '@/app/_components/StepManager';
import Axios from '@/app/_utils/axiosSetup';
import ImageModal from '@/app/_components/ImageModal';
import { EnlargeIcon } from '@/app/_components/_icons/EnlargeIcon';

const EditManual = () => {
  const router = useRouter();
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState([]);
  const [tags, setTags] = useState([]);
  const [media, setMedia] = useState(null);
  const [showImageModal, setShowImageModal] = useState(false);
  const [modalImageSrc, setModalImageSrc] = useState('');
  const [errors, setErrors] = useState({});
  const titleInputRef = useRef(null);

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

        console.log('Fetched Manual Data:', manual);

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
          focusedOnce: false,
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

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      titleInputRef.current?.blur();
    }
  };

  const handleSubmit = async (isDraft) => {
    try {
      const data = {
        manual_title: title,
        is_draft: isDraft ? '1' : '0',
        media_id: media ? media.id : null,
        genres: tags,
        steps: steps.map((step) => ({
          id: step.id,
          step_subtitle: step.subtitle,
          step_comment: step.comment,
          media_id: step.media ? step.media.id : null,
        })),
      };

      console.log('FormData:', data);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      await Axios.put(`/api/manuals/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const prevPage = localStorage.getItem('prevPage');
      if (prevPage) {
        router.push(prevPage);
      } else {
        router.push('/edit-manual-list');
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        const validationErrors = error.response.data.errors;
        const stepErrors = [];
        for (const key in validationErrors) {
          if (key.startsWith('steps.')) {
            const [_, index, field] = key.split('.');
            if (!stepErrors[index]) {
              stepErrors[index] = {};
            }
            stepErrors[index][field] = validationErrors[key];
          }
        }
        setErrors({ ...validationErrors, steps: stepErrors });
      } else {
        console.error('Error updating manual:', error);
      }
    }
  };

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
      <div className="w-4/5 rounded-t bg-main text-2xl font-bold mt-12">
        <div className="relative flex">
          <div className="relative mr-4 py-6">
            <div className="relative">
              <MediaUpload setMedia={setMedia} initialMedia={media} />
              {media && (
                <div className="absolute bottom-1 right-8">
                  <EnlargeIcon onClick={() => handleImageClick(media.url)} />
                </div>
              )}
            </div>
            {errors.media_id && (
              <p className="text-red-500 text-xs italic">
                {errors.media_id[0]}
              </p>
            )}
          </div>
          <div className="flex-grow flex flex-col my-2">
            <div className="flex w-full justify-between">
              <div className="mt-6">
                <TagGenerator setTags={setTags} initialTags={tags} />
                {errors.genres && (
                  <p className="text-red-500 text-xs italic">
                    {errors.genres[0]}
                  </p>
                )}
              </div>
              <div className="mt-3">
                <EscButton />
              </div>
            </div>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onKeyDown={handleKeyPress}
              placeholder="タイトルを入力(最大30文字)"
              maxLength={30}
              className={`my-6 mr-4 p-2 max-w-xl text-lg bg-white rounded focus:outline-none ${
                errors.manual_title ? 'border-red-500' : ''
              }`}
              ref={titleInputRef}
            />
            {errors.manual_title && (
              <p className="text-red-500 text-xs italic">
                {errors.manual_title[0]}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="w-4/5 mb-12">
        <StepManager
          setSteps={setSteps}
          initialSteps={steps}
          onImageClick={handleImageClick}
          errors={errors.steps || []}
        />
      </div>
      <div className="flex justify-evenly w-full mb-12">
        <Button
          text="下書き保存"
          type="button"
          fontSize="text-xl"
          py="py-3"
          onClick={() => handleSubmit(true)}
        />
        <Button
          text="修正"
          type="button"
          fontSize="text-xl"
          py="py-3"
          onClick={() => handleSubmit(false)}
        />
      </div>
      {showImageModal && (
        <ImageModal imageSrc={modalImageSrc} onClose={closeModal} />
      )}
    </div>
  );
};

export default EditManual;
