import React from 'react';
import { calculateCompletion } from '../utils/helpers';

const CompletionIndicator = ({ letter }) => {
  const completion = calculateCompletion(letter);
  const { completed, total, percentage } = completion;

  const isComplete = percentage === 100;

  return (
    <div className={`completion-indicator ${isComplete ? 'completed' : ''}`}>
      <i className={`bi ${isComplete ? 'bi-check-circle-fill' : 'bi-circle'} me-2`}></i>
      {completed}/{total} sections complete ({percentage}%)
    </div>
  );
};

export default CompletionIndicator;
