import React from 'react';

const AutoSaveIndicator = ({ status }) => {
  const statusClass = status || 'idle';
  const displayText = status === 'saving' ? 'Saving...' : status === 'saved' ? 'Saved' : status === 'error' ? 'Save failed' : '';

  if (!displayText) return null;

  return (
    <span className={`auto-save-indicator ${statusClass}`}>
      {displayText}
    </span>
  );
};

export default AutoSaveIndicator;
