import React from 'react';
import ClassicTemplate from './templates/ClassicTemplate';
import ModernTemplate from './templates/ModernTemplate';
import MinimalTemplate from './templates/MinimalTemplate';

const LetterPreview = ({ letter, onPrint }) => {
  const renderTemplate = () => {
    const template = letter.template || 'classic';
    
    switch (template) {
      case 'modern':
        return <ModernTemplate letter={letter} />;
      case 'minimal':
        return <MinimalTemplate letter={letter} />;
      case 'classic':
      default:
        return <ClassicTemplate letter={letter} />;
    }
  };

  return (
    <div className="letter-preview-container">
      {renderTemplate()}
      {onPrint && (
        <div className="text-center mt-4 no-print">
          <button className="btn btn-primary" onClick={onPrint}>
            <i className="bi bi-printer me-2"></i>
            Print / Save as PDF
          </button>
        </div>
      )}
    </div>
  );
};

export default LetterPreview;
