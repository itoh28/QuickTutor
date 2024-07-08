import React, { useEffect, useState, useRef } from 'react';
import { TrashCanIcon } from './_icons/TrashCanIcon';
import MediaUpload from './MediaUpload';
import { EnlargeIcon } from './_icons/EnlargeIcon';

const StepManager = ({
  setSteps,
  initialSteps = [],
  onImageClick,
  errors = [],
}) => {
  const [steps, setLocalSteps] = useState(initialSteps);
  const stepsRef = useRef(initialSteps);

  useEffect(() => {
    stepsRef.current = initialSteps;
    setLocalSteps(initialSteps);
  }, [initialSteps]);

  useEffect(() => {
    setSteps(stepsRef.current);
  }, [setSteps]);

  const addStep = () => {
    const newSteps = [
      ...stepsRef.current,
      {
        id: stepsRef.current.length,
        media: null,
        subtitle: '',
        comment: '',
        number: stepsRef.current.length + 1,
        focusedOnce: false,
      },
    ];
    stepsRef.current = newSteps;
    setLocalSteps(newSteps);
    setSteps(newSteps);
  };

  const removeStep = (id) => {
    if (
      confirm(
        '本当にマニュアルを削除しますか？削除したステップは復元できません。',
      )
    ) {
      const filteredSteps = stepsRef.current.filter((step) => step.id !== id);
      const updatedSteps = filteredSteps.map((step, index) => ({
        ...step,
        number: index + 1,
        subtitle: step.subtitle.replace(/^\d+\.\s*/, `${index + 1}. `),
      }));
      stepsRef.current = updatedSteps;
      setLocalSteps(updatedSteps);
      setSteps(updatedSteps);
    }
  };

  const handleMediaChange = (id, media) => {
    const updatedSteps = stepsRef.current.map((step) =>
      step.id === id ? { ...step, media } : step,
    );
    stepsRef.current = updatedSteps;
    setLocalSteps(updatedSteps);
    setSteps(updatedSteps);
  };

  const handleSubtitleChange = (id, value) => {
    const updatedSteps = stepsRef.current.map((step) =>
      step.id === id ? { ...step, subtitle: value } : step,
    );
    stepsRef.current = updatedSteps;
    setLocalSteps(updatedSteps);
    setSteps(updatedSteps);
  };

  const handleCommentChange = (id, value) => {
    const updatedSteps = stepsRef.current.map((step) =>
      step.id === id ? { ...step, comment: value } : step,
    );
    stepsRef.current = updatedSteps;
    setLocalSteps(updatedSteps);
    setSteps(updatedSteps);
  };

  const handleFocus = (id) => {
    const updatedSteps = stepsRef.current.map((step) =>
      step.id === id ? { ...step, focusedOnce: true } : step,
    );
    stepsRef.current = updatedSteps;
    setLocalSteps(updatedSteps);
    setSteps(updatedSteps);
  };

  return (
    <div className="w-full bg-gray-50 font-bold border-x-2 border-main">
      {steps.map((step, index) => (
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
              {errors[index]?.media_id && (
                <p className="text-red-500 text-xs italic">
                  {errors[index].media_id[0]}
                </p>
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
                  {errors[index]?.step_subtitle && (
                    <p className="text-red-500 text-xs italic">
                      {errors[index].step_subtitle[0]}
                    </p>
                  )}
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
              {errors[index]?.step_comment && (
                <p className="text-red-500 text-xs italic">
                  {errors[index].step_comment[0]}
                </p>
              )}
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
