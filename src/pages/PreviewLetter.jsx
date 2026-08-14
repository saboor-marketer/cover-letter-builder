import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LetterPreview from '../components/LetterPreview';
import { formatDate } from '../utils/helpers';

const PreviewLetter = ({ letters }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const letter = letters.find(l => l.id === id);

  const handlePrint = () => {
    window.print();
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (!letter) {
    return (
      <div className="text-center py-5 no-print">
        <i className="bi bi-exclamation-circle fs-1 text-muted"></i>
        <h2 className="mt-3">Cover Letter Not Found</h2>
        <p className="text-muted">The cover letter you're looking for doesn't exist.</p>
        <button className="btn btn-primary" onClick={handleBack}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="preview-letter">
      <div className="row mb-4 no-print">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center">
            <button className="btn btn-outline-secondary" onClick={handleBack}>
              <i className="bi bi-arrow-left me-2"></i>Back
            </button>
            <div>
              <h4 className="mb-0">{letter.name}</h4>
              <small className="text-muted">
                {letter.jobInfo?.company} • {letter.jobInfo?.jobTitle}
              </small>
            </div>
            <button className="btn btn-primary" onClick={handlePrint}>
              <i className="bi bi-printer me-2"></i>Print / Save as PDF
            </button>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <LetterPreview letter={letter} onPrint={handlePrint} />
        </div>
      </div>
    </div>
  );
};

export default PreviewLetter;
