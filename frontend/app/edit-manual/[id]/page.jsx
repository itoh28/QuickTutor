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
  const [lastUpdatedBy, setLastUpdatedBy] = useState('');
  const [lastUpdatedAt, setLastUpdatedAt] = useState('');
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
        setLastUpdatedBy(manual.lastUpdatedBy || manual.users[0].username);
        setLastUpdatedAt(manual.lastUpdatedAt || manual.createdAt);
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
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      let mediaId = media ? media.id : null;

      if (media && media.file) {
        const mediaFormData = new FormData();
        mediaFormData.append('file', media.file);

        try {
          const mediaResponse = await Axios.post(
            '/api/media/upload',
            mediaFormData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
              },
            },
          );
          mediaId = mediaResponse.data.data.id;
        } catch (error) {
          console.error('Error uploading main media:', error);
          throw new Error('Failed to upload media');
        }
      }

      const stepsWithMedia = await Promise.all(
        steps.map(async (step) => {
          let stepMediaId = step.media ? step.media.id : null;

          if (step.media && step.media.file) {
            const stepMediaFormData = new FormData();
            stepMediaFormData.append('file', step.media.file);

            try {
              const stepMediaResponse = await Axios.post(
                '/api/media/upload',
                stepMediaFormData,
                {
                  headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                  },
                },
              );
              stepMediaId = stepMediaResponse.data.data.id;
            } catch (error) {
              console.error(
                `Error uploading media for step ${step.number}:`,
                error,
              );
              throw new Error(`Failed to upload media for step ${step.number}`);
            }
          }

          return {
            id: step.id,
            step_subtitle: step.subtitle,
            step_comment: step.comment,
            media_id: stepMediaId,
          };
        }),
      );

      const data = {
        manual_title: title,
        is_draft: isDraft ? '1' : '0',
        media_id: mediaId,
        genres: tags,
        steps: stepsWithMedia,
      };

      console.log('FormData:', data);

      const response = await Axios.put(`/api/manuals/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // 更新後のレスポンスデータをコンソールに出力
      const updatedManual = response.data.data;
      console.log('Updated Manual:', updatedManual);

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
              <MediaUpload
                setMedia={setMedia}
                initialMedia={media}
                allowOnlyImages={true}
              />
              {media && media.type === 'image' && (
                <div className="absolute bottom-0 right-8">
                  <button onClick={() => handleImageClick(media.url)}>
                    <EnlargeIcon />
                  </button>
                </div>
              )}
            </div>
            <div>
              <p className="text-white text-xs italic ml-6">
                *トップ画像の設定（必須）
              </p>
              {errors.media_id && (
                <p className="text-red-500 text-xs italic ml-6">
                  {errors.media_id[0]}
                </p>
              )}
            </div>
          </div>
          <div className="flex-grow flex flex-col my-2">
            <div className="flex w-full justify-between items-start relative">
              <div className="mt-6">
                <TagGenerator setTags={setTags} initialTags={tags} />
                <div>
                  <p className="text-white text-xs italic mt-1">
                    *ジャンルの設定（必須）
                  </p>
                  {errors.genres && (
                    <p className="text-red-500 text-xs italic">
                      {errors.genres[0]}
                    </p>
                  )}
                </div>
              </div>
              <div className="absolute top-6 right-0 flex flex-col items-end">
                <EscButton />
                <div className="text-sm text-white mt-32 ml-6 mr-6">
                  <p>最終更新者: {lastUpdatedBy}</p>
                  <p>
                    最終更新日時: {new Date(lastUpdatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onKeyDown={handleKeyPress}
              placeholder="タイトルを入力(最大30文字)"
              maxLength={30}
              className={`mt-6 mb-2 mr-4 p-2 max-w-xl text-lg bg-white rounded focus:outline-none ${
                errors.manual_title ? 'border-red-500' : ''
              }`}
              ref={titleInputRef}
            />
            <div>
              <p className="text-white text-xs italic">
                *タイトルの設定（必須）
              </p>
              {errors.manual_title && (
                <p className="text-red-500 text-xs italic">
                  {errors.manual_title[0]}
                </p>
              )}
            </div>
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
