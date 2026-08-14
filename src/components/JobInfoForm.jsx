import React from 'react';
import { hasError } from '../utils/validation';

const JobInfoForm = ({ data, onChange, errors }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="form-section">
      <h5><i className="bi bi-briefcase me-2"></i>Job Information</h5>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="jobTitle" className="form-label">
            Job Title <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${hasError(errors, 'jobTitle') ? 'is-invalid' : ''}`}
            id="jobTitle"
            value={data.jobTitle || ''}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            placeholder="Frontend Developer"
            required
            aria-invalid={hasError(errors, 'jobTitle')}
            aria-describedby={hasError(errors, 'jobTitle') ? 'jobTitleError' : undefined}
          />
          {hasError(errors, 'jobTitle') && (
            <div id="jobTitleError" className="invalid-feedback">
              {errors.jobTitle}
            </div>
          )}
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="company" className="form-label">
            Company Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${hasError(errors, 'company') ? 'is-invalid' : ''}`}
            id="company"
            value={data.company || ''}
            onChange={(e) => handleChange('company', e.target.value)}
            placeholder="Tech Company"
            required
            aria-invalid={hasError(errors, 'company')}
            aria-describedby={hasError(errors, 'company') ? 'companyError' : undefined}
          />
          {hasError(errors, 'company') && (
            <div id="companyError" className="invalid-feedback">
              {errors.company}
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="hiringManager" className="form-label">Hiring Manager Name</label>
          <input
            type="text"
            className="form-control"
            id="hiringManager"
            value={data.hiringManager || ''}
            onChange={(e) => handleChange('hiringManager', e.target.value)}
            placeholder="Sarah Chen"
          />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="employmentType" className="form-label">Employment Type</label>
          <select
            className="form-select"
            id="employmentType"
            value={data.employmentType || 'full-time'}
            onChange={(e) => handleChange('employmentType', e.target.value)}
          >
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="contract">Contract</option>
            <option value="internship">Internship</option>
            <option value="freelance">Freelance</option>
            <option value="remote">Remote</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="jobUrl" className="form-label">Job Posting URL</label>
          <input
            type="url"
            className={`form-control ${hasError(errors, 'jobUrl') ? 'is-invalid' : ''}`}
            id="jobUrl"
            value={data.jobUrl || ''}
            onChange={(e) => handleChange('jobUrl', e.target.value)}
            placeholder="https://company.com/careers/job"
            aria-invalid={hasError(errors, 'jobUrl')}
            aria-describedby={hasError(errors, 'jobUrl') ? 'jobUrlError' : undefined}
          />
          {hasError(errors, 'jobUrl') && (
            <div id="jobUrlError" className="invalid-feedback">
              {errors.jobUrl}
            </div>
          )}
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="jobLocation" className="form-label">Job Location</label>
          <input
            type="text"
            className="form-control"
            id="jobLocation"
            value={data.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
      </div>
    </div>
  );
};

export default JobInfoForm;
