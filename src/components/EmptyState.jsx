import React from 'react';

const EmptyState = ({ icon = 'bi-inbox', title, message, action, actionText }) => {
  return (
    <div className="empty-state">
      <i className={`bi ${icon}`}></i>
      <h3>{title}</h3>
      <p>{message}</p>
      {action && (
        <button className="btn btn-primary" onClick={action}>
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
