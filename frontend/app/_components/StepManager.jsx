import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
import { TrashCanIcon } from './_icons/TrashCanIcon';

const StepManager = () => {
  const [steps, setSteps] = useState([
    { id: 0, subtitle: '', comment: '', number: 1, focusedOnce: false },
  ]);

  const addStep = () => {
    setSteps((prevSteps) => [
      ...prevSteps,
      {
        id:
          prevSteps.length > 0
            ? Math.max(...prevSteps.map((s) => s.id)) + 1
            : 0,
        subtitle: '',
        comment: '',
        number: prevSteps.length + 1,
        focusedOnce: false,
      },
    ]);
  };

  const removeStep = (id) => {
    setSteps((prevSteps) => {
      const filteredSteps = prevSteps.filter((step) => step.id !== id);
      const updatedSteps = filteredSteps.map((step, index) => ({
        ...step,
        number: index + 1,
      }));
      return updatedSteps;
    });
  };

  const handleSubtitleChange = (id, value) => {
    const newText = value.replace(/^\d+\.\s*/, '');
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, subtitle: newText } : step,
      ),
    );
  };

  const handleCommentChange = (id, value) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, comment: value } : step,
      ),
    );
  };

  const handleFocus = (id) => {
    setSteps(
      steps.map((step) =>
        step.id === id ? { ...step, focusedOnce: true } : step,
      ),
    );
  };

  return (
    <div className="w-full bg-gray-50 font-bold border-x-2 border-main">
      {steps.map((step) => (
        <div key={step.id} className="flex py-6 pr-6 border-b-2">
          <div className="flex items-stretch w-full">
            <div>
              <ImageUpload />
            </div>
            <div className="flex-grow flex flex-col">
              <div className="flex items-center w-full">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    value={
                      step.focusedOnce
                        ? `${step.number}. ${step.subtitle}`
                        : step.subtitle
                    }
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
