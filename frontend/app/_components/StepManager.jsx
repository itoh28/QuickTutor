import React, { useEffect, useState } from 'react';
import { TrashCanIcon } from './_icons/TrashCanIcon';
import MediaUpload from './MediaUpload';
import { EnlargeIcon } from './_icons/EnlargeIcon';

const StepManager = ({ setSteps, initialSteps = [], onImageClick }) => {
  const [steps, setLocalSteps] = useState(initialSteps);

  useEffect(() => {
    setLocalSteps(initialSteps);
  }, [initialSteps]);

  useEffect(() => {
    setSteps(steps);
  }, [steps, setSteps]);

  const addStep = () => {
    setLocalSteps((prevSteps) => [
      ...prevSteps,
      {
        id:
          prevSteps.length > 0
            ? Math.max(...prevSteps.map((s) => s.id)) + 1
            : 0,
        media: null,
        subtitle: '',
        comment: '',
        number: prevSteps.length + 1,
        focusedOnce: false,
      },
    ]);
  };

  const removeStep = (id) => {
    setLocalSteps((prevSteps) => {
      const filteredSteps = prevSteps.filter((step) => step.id !== id);
      const updatedSteps = filteredSteps.map((step, index) => ({
        ...step,
        number: index + 1,
        subtitle: step.subtitle.replace(/^\d+\.\s*/, `${index + 1}. `),
      }));
      return updatedSteps;
    });
  };

  const handleMediaChange = (id, media) => {
    setLocalSteps((prevSteps) =>
      prevSteps.map((step) => (step.id === id ? { ...step, media } : step)),
    );
  };

  const handleSubtitleChange = (id, value) => {
    setLocalSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === id ? { ...step, subtitle: value } : step,
      ),
    );
  };

  const handleCommentChange = (id, value) => {
    setLocalSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === id ? { ...step, comment: value } : step,
      ),
    );
  };

  const handleFocus = (id) => {
    setLocalSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === id ? { ...step, focusedOnce: true } : step,
      ),
    );
  };

  return (
    <div className="w-full bg-gray-50 font-bold border-x-2 border-main">
      {steps.map((step) => (
        <div key={step.id} className="flex py-6 pr-6 border-b-2">
          <div className="flex items-stretch w-full">
            <div className="relative">
              <MediaUpload
                setMedia={(file) => handleMediaChange(step.id, file)}
                initialMedia={step.media}
              />
              {step.media && (
                <div className="absolute bottom-3 right-8">
                  <EnlargeIcon onClick={() => onImageClick(step.media.url)} />
                </div>
              )}
            </div>
            <div className="flex-grow flex flex-col">
              <div className="flex items-center w-full">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={step.subtitle}
                    onFocus={() => handleFocus(step.id)}
                    onChange={(e) =>
                      handleSubtitleChange(step.id, e.target.value)
                    }
                    placeholder={`${step.number}. サブタイトルを入力(最大25文字)`}
                    maxLength={28}
                    className="mt-2 p-2 w-full border border-gray-300 rounded focus:outline-none"
                  />
                </div>
                {steps.length > 1 && (
                  <button
                    onClick={() => removeStep(step.id)}
                    className="mt-2 ml-3 mr-6"
                  >
                    <TrashCanIcon />
                  </button>
                )}
              </div>
              <textarea
                value={step.comment}
                onChange={(e) => handleCommentChange(step.id, e.target.value)}
                placeholder="コメントを入力(最大200文字)"
                maxLength={200}
                className="p-2 flex-1 font-normal border border-gray-300 rounded focus:outline-none my-2"
              />
            </div>
          </div>
        </div>
      ))}
      <button
        onClick={addStep}
        className="w-full p-3 bg-main text-white text-lg"
      >
        ＋新規ステップ追加
      </button>
    </div>
  );
};

export default StepManager;
