import React, { useEffect } from 'react';

const ToastNotification = ({ show, message, type = 'success', onClose, duration = 3000 }) => {
  useEffect(() => {
    if (show && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const bgClass = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-info';

  return (
    <div
      className={`toast show position-fixed bottom-0 end-0 m-3 ${bgClass} text-white`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast-body d-flex justify-content-between align-items-center">
        <span>{message}</span>
        <button
          type="button"
          className="btn-close btn-close-white ms-2"
          onClick={onClose}
          aria-label="Close"
        ></button>
      </div>
    </div>
  );
};

export default ToastNotification;
