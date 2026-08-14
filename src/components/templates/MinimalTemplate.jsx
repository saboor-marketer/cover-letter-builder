import React from 'react';
import { safeValue } from '../../utils/helpers';

const MinimalTemplate = ({ letter }) => {
  const { personalInfo, jobInfo, content } = letter;
  const today = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="minimal-template" style={{ fontFamily: 'Georgia, serif' }}>
      {/* Minimal Header */}
      <div className="letter-header-minimal mb-5">
        <h1 className="mb-3" style={{ fontWeight: '400', letterSpacing: '0.5px' }}>
          {safeValue(personalInfo.fullName)}
        </h1>
        <div className="contact-info" style={{ fontSize: '0.9rem', color: '#666' }}>
          <div className="mb-1">
            {safeValue(personalInfo.email) && <span>{safeValue(personalInfo.email)}</span>}
            {safeValue(personalInfo.email) && safeValue(personalInfo.phone) && <span> • </span>}
            {safeValue(personalInfo.phone) && <span>{safeValue(personalInfo.phone)}</span>}
          </div>
          <div className="mb-1">
            {safeValue(personalInfo.location) && <span>{safeValue(personalInfo.location)}</span>}
            {safeValue(personalInfo.location) && safeValue(personalInfo.linkedin) && <span> • </span>}
            {safeValue(personalInfo.linkedin) && (
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" style={{ color: '#666' }}>
                LinkedIn
              </a>
            )}
          </div>
          {safeValue(personalInfo.portfolio) && (
            <div>
              <a href={personalInfo.portfolio} target="_blank" rel="noopener noreferrer" style={{ color: '#666' }}>
                {personalInfo.portfolio}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Date and Recipient - minimal styling */}
      <div className="letter-meta mb-4" style={{ fontSize: '0.9rem', color: '#666' }}>
        <div className="mb-3">{today}</div>
        <div className="mb-1">
          {safeValue(jobInfo.hiringManager) && <div>{safeValue(jobInfo.hiringManager)}</div>}
          {safeValue(jobInfo.company) && <div>{safeValue(jobInfo.company)}</div>}
          {safeValue(jobInfo.location) && <div>{safeValue(jobInfo.location)}</div>}
        </div>
      </div>

      {/* Subject - minimal */}
      <div className="letter-subject mb-4">
        <p style={{ fontStyle: 'italic' }}>
          Re: Application for {safeValue(jobInfo.jobTitle)} Position
        </p>
      </div>

      {/* Salutation */}
      <div className="letter-salutation mb-4">
        <p>Dear {safeValue(jobInfo.hiringManager) || 'Hiring Manager'},</p>
      </div>

      {/* Body - clean paragraphs */}
      <div className="letter-body" style={{ lineHeight: '1.8' }}>
        {/* Opening */}
        {safeValue(content.opening) && (
          <p className="mb-4">{safeValue(content.opening)}</p>
        )}

        {/* Professional Background */}
        {safeValue(content.background) && (
          <p className="mb-4">{safeValue(content.background)}</p>
        )}

        {/* Skills - simple list */}
        {content.skills && content.skills.length > 0 && (
          <p className="mb-4">
            My skills include: {content.skills.join(', ')}.
          </p>
        )}

        {/* Achievements - simple format */}
        {content.achievements && content.achievements.length > 0 && (
          <p className="mb-4">
            Some of my key achievements include:
            {content.achievements.map((achievement, index) => (
              <span key={index}>
                {index > 0 && '; '}
                <strong>{achievement.title}</strong> ({achievement.description})
              </span>
            ))}.
          </p>
        )}

        {/* Why Company */}
        {safeValue(content.whyCompany) && (
          <p className="mb-4">{safeValue(content.whyCompany)}</p>
        )}

        {/* Why Fit */}
        {safeValue(content.whyFit) && (
          <p className="mb-4">{safeValue(content.whyFit)}</p>
        )}

        {/* Closing */}
        {safeValue(content.closing) && (
          <p className="mb-4">{safeValue(content.closing)}</p>
        )}
      </div>

      {/* Signature - minimal */}
      <div className="letter-signature mt-5">
        <p className="mb-2">Sincerely,</p>
        <p className="mb-0">{safeValue(personalInfo.fullName)}</p>
      </div>
    </div>
  );
};

export default MinimalTemplate;
