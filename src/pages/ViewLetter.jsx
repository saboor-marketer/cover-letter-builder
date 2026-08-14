import React from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import LetterPreview from '../components/LetterPreview';
import StatusBadge from '../components/StatusBadge';
import { formatDate } from '../utils/helpers';

const ViewLetter = ({ letters, onDelete, onDuplicate }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const letter = letters.find(l => l.id === id);

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this cover letter?')) {
      onDelete(id);
      navigate('/letters');
    }
  };

  const handleDuplicate = () => {
    onDuplicate(id);
  };

  const handlePrint = () => {
    window.print();
  };

  if (!letter) {
    return (
      <div className="text-center py-5">
        <i className="bi bi-exclamation-circle fs-1 text-muted"></i>
        <h2 className="mt-3">Cover Letter Not Found</h2>
        <p className="text-muted">The cover letter you're looking for doesn't exist.</p>
        <Link to="/letters" className="btn btn-primary">
          Back to Cover Letters
        </Link>
      </div>
    );
  }

  return (
    <div className="view-letter">
      <div className="row mb-4">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <h2 className="mb-1">{letter.name}</h2>
              <div className="d-flex align-items-center gap-3 text-muted">
                <span>
                  <i className="bi bi-building me-1"></i>
                  {letter.jobInfo?.company || 'N/A'}
                </span>
                <span>
                  <i className="bi bi-briefcase me-1"></i>
                  {letter.jobInfo?.jobTitle || 'N/A'}
                </span>
                <StatusBadge status={letter.status} />
              </div>
            </div>
            <div className="btn-group mt-3 mt-md-0">
              <Link
                to={`/letters/${letter.id}/edit`}
                className="btn btn-primary"
              >
                <i className="bi bi-pencil me-2"></i>Edit
              </Link>
              <button
                className="btn btn-outline-secondary"
                onClick={handleDuplicate}
              >
                <i className="bi bi-copy me-2"></i>Duplicate
              </button>
              <button
                className="btn btn-outline-info"
                onClick={handlePrint}
              >
                <i className="bi bi-printer me-2"></i>Print
              </button>
              <button
                className="btn btn-outline-danger"
                onClick={handleDelete}
              >
                <i className="bi bi-trash me-2"></i>Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <LetterPreview letter={letter} onPrint={handlePrint} />
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Letter Details</h5>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>Created:</strong> {formatDate(letter.createdAt)}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Last Updated:</strong> {formatDate(letter.updatedAt)}
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Template:</strong> <span className="text-capitalize">{letter.template}</span>
                </div>
                <div className="col-md-6 mb-2">
                  <strong>Status:</strong> <StatusBadge status={letter.status} />
                </div>
                {letter.jobInfo?.employmentType && (
                  <div className="col-md-6 mb-2">
                    <strong>Employment Type:</strong> <span className="text-capitalize">{letter.jobInfo.employmentType}</span>
                  </div>
                )}
                {letter.jobInfo?.hiringManager && (
                  <div className="col-md-6 mb-2">
                    <strong>Hiring Manager:</strong> {letter.jobInfo.hiringManager}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewLetter;
