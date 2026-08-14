import React from 'react';

const StatusBadge = ({ status }) => {
  const statusClass = status === 'ready' ? 'ready' : 'draft';
  const displayText = status === 'ready' ? 'Ready' : 'Draft';

  return (
    <span className={`status-badge ${statusClass}`}>
      {displayText}
    </span>
  );
};

export default StatusBadge;
