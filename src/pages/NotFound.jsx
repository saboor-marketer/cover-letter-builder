import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found text-center py-5">
      <div className="container">
        <i className="bi bi-exclamation-triangle fs-1 text-warning mb-4"></i>
        <h1 className="display-4 mb-3">404</h1>
        <h2 className="mb-4">Page Not Found</h2>
        <p className="text-muted mb-4">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-primary" onClick={() => navigate(-1)}>
            <i className="bi bi-arrow-left me-2"></i>Go Back
          </button>
          <Link to="/" className="btn btn-outline-secondary">
            <i className="bi bi-house me-2"></i>Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
