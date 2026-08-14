import React, { useState, useEffect } from 'react';
import { normalizeProfile, normalizeSettings } from '../utils/helpers';
import { storage, STORAGE_KEYS } from '../utils/storage';
import { validatePersonalInfo } from '../utils/validation';
import ToastNotification from '../components/ToastNotification';

const Settings = ({ profile, settings, onProfileUpdate, onSettingsUpdate }) => {
  const [localProfile, setLocalProfile] = useState(normalizeProfile(profile));
  const [localSettings, setLocalSettings] = useState(normalizeSettings(settings));
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  const handleProfileChange = (field, value) => {
    setLocalProfile(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleSettingsChange = (field, value) => {
    setLocalSettings(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveProfile = () => {
    const validationErrors = validatePersonalInfo(localProfile);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setToastMessage('Please fix the errors before saving');
      setToastType('error');
      setShowToast(true);
      return;
    }

    setErrors({});
    onProfileUpdate(localProfile);
    setToastMessage('Profile saved successfully');
    setToastType('success');
    setShowToast(true);
  };

  const handleSaveSettings = () => {
    onSettingsUpdate(localSettings);
    setToastMessage('Settings saved successfully');
    setToastType('success');
    setShowToast(true);
  };

  const handleResetProfile = () => {
    if (window.confirm('Are you sure you want to reset your profile? This will clear all saved profile information.')) {
      const emptyProfile = {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        portfolio: ''
      };
      setLocalProfile(emptyProfile);
      onProfileUpdate(emptyProfile);
      setToastMessage('Profile reset successfully');
      setToastType('success');
      setShowToast(true);
    }
  };

  const handleResetSettings = () => {
    if (window.confirm('Are you sure you want to reset your settings to defaults?')) {
      const defaultSettings = {
        defaultTemplate: 'classic',
        defaultEmploymentType: 'full-time'
      };
      setLocalSettings(defaultSettings);
      onSettingsUpdate(defaultSettings);
      setToastMessage('Settings reset successfully');
      setToastType('success');
      setShowToast(true);
    }
  };

  return (
    <div className="settings">
      <div className="row">
        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Profile</h5>
              <button className="btn btn-sm btn-outline-danger" onClick={handleResetProfile}>
                Reset
              </button>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="fullName" className="form-label">Full Name</label>
                <input
                  type="text"
                  className={`form-control ${errors.fullName ? 'is-invalid' : ''}`}
                  id="fullName"
                  value={localProfile.fullName}
                  onChange={(e) => handleProfileChange('fullName', e.target.value)}
                  placeholder="John Doe"
                />
                {errors.fullName && <div className="invalid-feedback">{errors.fullName}</div>}
              </div>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  id="email"
                  value={localProfile.email}
                  onChange={(e) => handleProfileChange('email', e.target.value)}
                  placeholder="john@example.com"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>
              
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  value={localProfile.phone}
                  onChange={(e) => handleProfileChange('phone', e.target.value)}
                  placeholder="(555) 123-4567"
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="location" className="form-label">Location</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  value={localProfile.location}
                  onChange={(e) => handleProfileChange('location', e.target.value)}
                  placeholder="San Francisco, CA"
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="linkedin" className="form-label">LinkedIn URL</label>
                <input
                  type="url"
                  className={`form-control ${errors.linkedin ? 'is-invalid' : ''}`}
                  id="linkedin"
                  value={localProfile.linkedin}
                  onChange={(e) => handleProfileChange('linkedin', e.target.value)}
                  placeholder="https://linkedin.com/in/johndoe"
                />
                {errors.linkedin && <div className="invalid-feedback">{errors.linkedin}</div>}
              </div>
              
              <div className="mb-3">
                <label htmlFor="portfolio" className="form-label">Portfolio URL</label>
                <input
                  type="url"
                  className={`form-control ${errors.portfolio ? 'is-invalid' : ''}`}
                  id="portfolio"
                  value={localProfile.portfolio}
                  onChange={(e) => handleProfileChange('portfolio', e.target.value)}
                  placeholder="https://johndoe.dev"
                />
                {errors.portfolio && <div className="invalid-feedback">{errors.portfolio}</div>}
              </div>
              
              <button className="btn btn-primary" onClick={handleSaveProfile}>
                <i className="bi bi-save me-2"></i>Save Profile
              </button>
            </div>
          </div>
        </div>

        <div className="col-lg-6 mb-4">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Default Settings</h5>
              <button className="btn btn-sm btn-outline-danger" onClick={handleResetSettings}>
                Reset
              </button>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="defaultTemplate" className="form-label">Default Template</label>
                <select
                  className="form-select"
                  id="defaultTemplate"
                  value={localSettings.defaultTemplate}
                  onChange={(e) => handleSettingsChange('defaultTemplate', e.target.value)}
                >
                  <option value="classic">Classic</option>
                  <option value="modern">Modern</option>
                  <option value="minimal">Minimal</option>
                </select>
                <small className="form-text text-muted">
                  This template will be used when creating new cover letters.
                </small>
              </div>
              
              <div className="mb-3">
                <label htmlFor="defaultEmploymentType" className="form-label">Default Employment Type</label>
                <select
                  className="form-select"
                  id="defaultEmploymentType"
                  value={localSettings.defaultEmploymentType}
                  onChange={(e) => handleSettingsChange('defaultEmploymentType', e.target.value)}
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="internship">Internship</option>
                  <option value="freelance">Freelance</option>
                  <option value="remote">Remote</option>
                  <option value="other">Other</option>
                </select>
                <small className="form-text text-muted">
                  This employment type will be used when creating new cover letters.
                </small>
              </div>
              
              <button className="btn btn-primary" onClick={handleSaveSettings}>
                <i className="bi bi-save me-2"></i>Save Settings
              </button>
            </div>
          </div>

          <div className="card mt-4">
            <div className="card-header">
              <h5 className="mb-0">About</h5>
            </div>
            <div className="card-body">
              <p className="mb-0">
                <strong>Cover Letter Builder</strong><br />
                Version 1.0.0<br />
                A professional tool for creating customized cover letters.
              </p>
              <hr />
              <p className="mb-0 text-muted small">
                All your data is stored locally in your browser. No information is sent to external servers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <ToastNotification
        show={showToast}
        message={toastMessage}
        type={toastType}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default Settings;
