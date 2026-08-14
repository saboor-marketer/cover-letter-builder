import React from 'react';
import { countCharacters } from '../utils/helpers';

const CharacterCount = ({ text, recommendedMin, recommendedMax }) => {
  const count = countCharacters(text);
  
  let statusClass = '';
  if (recommendedMin && count < recommendedMin) {
    statusClass = 'warning';
  }
  if (recommendedMax && count > recommendedMax) {
    statusClass = 'danger';
  }

  let recommendation = '';
  if (recommendedMin && recommendedMax) {
    recommendation = `Recommended: ${recommendedMin}–${recommendedMax} characters`;
  } else if (recommendedMin) {
    recommendation = `Recommended: ${recommendedMin}+ characters`;
  } else if (recommendedMax) {
    recommendation = `Recommended: ${recommendedMax} characters max`;
  }

  return (
    <div className={`character-count ${statusClass}`}>
      {count} characters {recommendation && `• ${recommendation}`}
    </div>
  );
};

export default CharacterCount;
