'use client';

import React, { useRef, useState } from 'react';
import Header from '../_components/Header';
import EscButton from '../_components/EscButton';
import Button from '../_components/Button';
import MediaUpload from '../_components/MediaUpload';
import TagGenerator from '../_components/TagGenerator';
import StepManager from '../_components/StepManager';
import { useRouter } from 'next/navigation';
import Axios from '../_utils/axiosSetup';

const CreateManual = () => {
  const [title, setTitle] = useState('');
  const [steps, setSteps] = useState([]);
  const [tags, setTags] = useState([]);
  const [media, setMedia] = useState(null);
  const titleInputRef = useRef(null);
  const router = useRouter();

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
      const formData = new FormData();
      formData.append('manual_title', title);
      formData.append('is_draft', isDraft ? '1' : '0');

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      let mediaId = null;
      if (media) {
        const mediaFormData = new FormData();
        mediaFormData.append('file', media);

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
          throw new Error('Failed to upload media');
        }
      }

      if (!mediaId) {
        return;
      }

      formData.append('media_id', mediaId);

      tags.forEach((tag, index) => formData.append(`genres[${index}]`, tag));

      const stepsData = [];
      for (const step of steps) {
        let stepMediaId = null;
        if (step.media) {
          const stepMediaFormData = new FormData();
          stepMediaFormData.append('file', step.media);

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
            throw new Error(`Failed to upload media for step ${step.number}`);
          }
        }

        stepsData.push({
          step_subtitle: step.subtitle,
          step_comment: step.comment,
          media_id: stepMediaId,
        });
      }

      stepsData.forEach((step, index) => {
        formData.append(`steps[${index}][step_subtitle]`, step.step_subtitle);
        formData.append(`steps[${index}][step_comment]`, step.step_comment);
        formData.append(`steps[${index}][media_id]`, step.media_id);
      });

      await Axios.post('/api/manuals', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.push('/edit-manuals');
    } catch (error) {
      if (error.response && error.response.status === 422) {
        console.error('Validation Error:', error.response.data.errors);
      } else {
        console.error('Error creating manual:', error);
      }
    }
  };

  return (
    <div className="w-full h-screen bg-baseColor flex flex-col items-center overflow-hidden">
      <Header />
      <div className="w-4/5 rounded-t bg-main text-2xl font-bold mt-12">
        <div className="flex">
          <div className="mr-4 py-6">
            <MediaUpload setMedia={setMedia} />
          </div>
          <div className="flex-grow flex flex-col my-2">
            <div className="flex w-full justify-between">
              <div className="mt-6">
                <TagGenerator setTags={setTags} />
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
              className="my-6 mr-4 p-2 max-w-xl text-lg bg-white rounded focus:outline-none"
              ref={titleInputRef}
            />
          </div>
        </div>
      </div>
      <div className="w-4/5 mb-12">
        <StepManager setSteps={setSteps} />
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
          text="作成"
          type="button"
          fontSize="text-xl"
          py="py-3"
          onClick={() => handleSubmit(false)}
        />
      </div>
    </div>
  );
};

export default CreateManual;
