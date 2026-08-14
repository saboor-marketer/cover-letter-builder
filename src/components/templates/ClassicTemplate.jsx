import React from 'react';
import { safeValue, formatDate } from '../../utils/helpers';

const ClassicTemplate = ({ letter }) => {
  const { personalInfo, jobInfo, content } = letter;
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="classic-template">
      {/* Header */}
      <div className="letter-header mb-4">
        <h2 className="mb-2">{safeValue(personalInfo.fullName)}</h2>
        <div className="contact-info">
          {safeValue(personalInfo.email) && (
            <div className="mb-1">
              <i className="bi bi-envelope me-2"></i>
              {safeValue(personalInfo.email)}
            </div>
          )}
          {safeValue(personalInfo.phone) && (
            <div className="mb-1">
              <i className="bi bi-telephone me-2"></i>
              {safeValue(personalInfo.phone)}
            </div>
          )}
          {safeValue(personalInfo.location) && (
            <div className="mb-1">
              <i className="bi bi-geo-alt me-2"></i>
              {safeValue(personalInfo.location)}
            </div>
          )}
          {safeValue(personalInfo.linkedin) && (
            <div className="mb-1">
              <i className="bi bi-linkedin me-2"></i>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">
                {personalInfo.linkedin}
              </a>
            </div>
          )}
          {safeValue(personalInfo.portfolio) && (
            <div className="mb-1">
              <i className="bi bi-globe me-2"></i>
              <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer">
                {personalInfo.portfolio}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Date */}
      <div className="letter-date mb-4">
        {today}
      </div>

      {/* Recipient */}
      <div className="letter-recipient mb-4">
        {safeValue(jobInfo.hiringManager) && (
          <div className="mb-1">{safeValue(jobInfo.hiringManager)}</div>
        )}
        {safeValue(jobInfo.company) && (
          <div className="mb-1">{safeValue(jobInfo.company)}</div>
        )}
        {safeValue(jobInfo.location) && (
          <div>{safeValue(jobInfo.location)}</div>
        )}
      </div>

      {/* Subject */}
      <div className="letter-subject mb-4">
        <strong>Subject: Application for {safeValue(jobInfo.jobTitle)} Position</strong>
      </div>

      {/* Salutation */}
      <div className="letter-salutation mb-4">
        Dear {safeValue(jobInfo.hiringManager) || 'Hiring Manager'},
      </div>

      {/* Body */}
      <div className="letter-body">
        {/* Opening */}
        {safeValue(content.opening) && (
          <p className="mb-3">{safeValue(content.opening)}</p>
        )}

        {/* Professional Background */}
        {safeValue(content.background) && (
          <p className="mb-3">{safeValue(content.background)}</p>
        )}

        {/* Skills */}
        {content.skills && content.skills.length > 0 && (
          <p className="mb-3">
            <strong>Key Skills:</strong> {content.skills.join(', ')}
          </p>
        )}

        {/* Achievements */}
        {content.achievements && content.achievements.length > 0 && (
          <div className="mb-3">
            <strong>Key Achievements:</strong>
            <ul className="mt-2">
              {content.achievements.map((achievement, index) => (
                <li key={index}>
                  <strong>{achievement.title}:</strong> {achievement.description}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Why Company */}
        {safeValue(content.whyCompany) && (
          <p className="mb-3">{safeValue(content.whyCompany)}</p>
        )}

        {/* Why Fit */}
        {safeValue(content.whyFit) && (
          <p className="mb-3">{safeValue(content.whyFit)}</p>
        )}

        {/* Closing */}
        {safeValue(content.closing) && (
          <p className="mb-4">{safeValue(content.closing)}</p>
        )}
      </div>

      {/* Signature */}
      <div className="letter-signature">
        <p className="mb-2">Sincerely,</p>
        <p className="mb-0">{safeValue(personalInfo.fullName)}</p>
      </div>
    </div>
  );
};

export default ClassicTemplate;
