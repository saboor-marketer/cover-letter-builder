import React from 'react';
import { safeValue } from '../../utils/helpers';

const ModernTemplate = ({ letter }) => {
  const { personalInfo, jobInfo, content } = letter;
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="modern-template">
      {/* Header with modern styling */}
      <div className="letter-header-modern mb-4 pb-3" style={{ borderBottom: '2px solid #0d6efd' }}>
        <h2 className="mb-3" style={{ color: '#0d6efd' }}>{safeValue(personalInfo.fullName)}</h2>
        <div className="contact-info row">
          {safeValue(personalInfo.email) && (
            <div className="col-md-6 mb-2">
              <i className="bi bi-envelope me-2 text-primary"></i>
              {safeValue(personalInfo.email)}
            </div>
          )}
          {safeValue(personalInfo.phone) && (
            <div className="col-md-6 mb-2">
              <i className="bi bi-telephone me-2 text-primary"></i>
              {safeValue(personalInfo.phone)}
            </div>
          )}
          {safeValue(personalInfo.location) && (
            <div className="col-md-6 mb-2">
              <i className="bi bi-geo-alt me-2 text-primary"></i>
              {safeValue(personalInfo.location)}
            </div>
          )}
          {safeValue(personalInfo.linkedin) && (
            <div className="col-md-6 mb-2">
              <i className="bi bi-linkedin me-2 text-primary"></i>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                LinkedIn
              </a>
            </div>
          )}
          {safeValue(personalInfo.portfolio) && (
            <div className="col-md-6 mb-2">
              <i className="bi bi-globe me-2 text-primary"></i>
              <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                Portfolio
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Date and Recipient */}
      <div className="letter-meta mb-4" style={{ backgroundColor: '#f8f9fa', padding: '15px', borderRadius: '8px' }}>
        <div className="row">
          <div className="col-md-6 mb-2">
            <strong>Date:</strong> {today}
          </div>
          <div className="col-md-6 mb-2">
            <strong>To:</strong>
          </div>
          <div className="col-md-6">
            {safeValue(jobInfo.hiringManager) && <div>{safeValue(jobInfo.hiringManager)}</div>}
            {safeValue(jobInfo.company) && <div>{safeValue(jobInfo.company)}</div>}
            {safeValue(jobInfo.location) && <div>{safeValue(jobInfo.location)}</div>}
          </div>
        </div>
      </div>

      {/* Subject */}
      <div className="letter-subject mb-4">
        <h4 style={{ color: '#0d6efd' }}>
          Application for {safeValue(jobInfo.jobTitle)} Position
        </h4>
      </div>

      {/* Salutation */}
      <div className="letter-salutation mb-4">
        <p>Dear {safeValue(jobInfo.hiringManager) || 'Hiring Manager'},</p>
      </div>

      {/* Body */}
      <div className="letter-body">
        {/* Opening */}
        {safeValue(content.opening) && (
          <p className="mb-3" style={{ fontSize: '1.05rem' }}>{safeValue(content.opening)}</p>
        )}

        {/* Professional Background */}
        {safeValue(content.background) && (
          <p className="mb-3">{safeValue(content.background)}</p>
        )}

        {/* Skills */}
        {content.skills && content.skills.length > 0 && (
          <div className="mb-3">
            <h5 style={{ color: '#0d6efd' }}>Skills</h5>
            <div className="d-flex flex-wrap gap-2">
              {content.skills.map((skill, index) => (
                <span key={index} className="badge bg-primary">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {/* Achievements */}
        {content.achievements && content.achievements.length > 0 && (
          <div className="mb-3">
            <h5 style={{ color: '#0d6efd' }}>Achievements</h5>
            {content.achievements.map((achievement, index) => (
              <div key={index} className="mb-2" style={{ backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px' }}>
                <strong>{achievement.title}</strong>
                <p className="mb-0 mt-1">{achievement.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Why Company */}
        {safeValue(content.whyCompany) && (
          <div className="mb-3">
            <h5 style={{ color: '#0d6efd' }}>Why {safeValue(jobInfo.company)}?</h5>
            <p>{safeValue(content.whyCompany)}</p>
          </div>
        )}

        {/* Why Fit */}
        {safeValue(content.whyFit) && (
          <div className="mb-3">
            <h5 style={{ color: '#0d6efd' }}>Why I'm a Good Fit</h5>
            <p>{safeValue(content.whyFit)}</p>
          </div>
        )}

        {/* Closing */}
        {safeValue(content.closing) && (
          <p className="mb-4">{safeValue(content.closing)}</p>
        )}
      </div>

      {/* Signature */}
      <div className="letter-signature mt-4 pt-3" style={{ borderTop: '1px solid #dee2e6' }}>
        <p className="mb-2">Best regards,</p>
        <p className="mb-0" style={{ fontWeight: '600', color: '#0d6efd' }}>{safeValue(personalInfo.fullName)}</p>
      </div>
    </div>
  );
};

export default ModernTemplate;
