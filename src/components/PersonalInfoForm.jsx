import React from 'react';
import { hasError } from '../utils/validation';

const PersonalInfoForm = ({ data, onChange, errors, showCharacterCounts = false }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="form-section">
      <h5><i className="bi bi-person me-2"></i>Personal Information</h5>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="fullName" className="form-label">
            Full Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className={`form-control ${hasError(errors, 'fullName') ? 'is-invalid' : ''}`}
            id="fullName"
            value={data.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            placeholder="John Doe"
            required
            aria-invalid={hasError(errors, 'fullName')}
            aria-describedby={hasError(errors, 'fullName') ? 'fullNameError' : undefined}
          />
          {hasError(errors, 'fullName') && (
            <div id="fullNameError" className="invalid-feedback">
              {errors.fullName}
            </div>
          )}
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="email" className="form-label">
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className={`form-control ${hasError(errors, 'email') ? 'is-invalid' : ''}`}
            id="email"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="john@example.com"
            required
            aria-invalid={hasError(errors, 'email')}
            aria-describedby={hasError(errors, 'email') ? 'emailError' : undefined}
          />
          {hasError(errors, 'email') && (
            <div id="emailError" className="invalid-feedback">
              {errors.email}
            </div>
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="phone" className="form-label">Phone</label>
          <input
            type="tel"
            className={`form-control ${hasError(errors, 'phone') ? 'is-invalid' : ''}`}
            id="phone"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="(555) 123-4567"
            aria-invalid={hasError(errors, 'phone')}
            aria-describedby={hasError(errors, 'phone') ? 'phoneError' : undefined}
          />
          {hasError(errors, 'phone') && (
            <div id="phoneError" className="invalid-feedback">
              {errors.phone}
            </div>
          )}
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="location" className="form-label">Location</label>
          <input
            type="text"
            className="form-control"
            id="location"
            value={data.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="linkedin" className="form-label">LinkedIn URL</label>
          <input
            type="url"
            className={`form-control ${hasError(errors, 'linkedin') ? 'is-invalid' : ''}`}
            id="linkedin"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/johndoe"
            aria-invalid={hasError(errors, 'linkedin')}
            aria-describedby={hasError(errors, 'linkedin') ? 'linkedinError' : undefined}
          />
          {hasError(errors, 'linkedin') && (
            <div id="linkedinError" className="invalid-feedback">
              {errors.linkedin}
            </div>
          )}
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="portfolio" className="form-label">Portfolio URL</label>
          <input
            type="url"
            className={`form-control ${hasError(errors, 'portfolio') ? 'is-invalid' : ''}`}
            id="portfolio"
            value={data.portfolio || ''}
            onChange={(e) => handleChange('portfolio', e.target.value)}
            placeholder="https://johndoe.dev"
            aria-invalid={hasError(errors, 'portfolio')}
            aria-describedby={hasError(errors, 'portfolio') ? 'portfolioError' : undefined}
          />
          {hasError(errors, 'portfolio') && (
            <div id="portfolioError" className="invalid-feedback">
              {errors.portfolio}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
