import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PersonalInfoForm from '../components/PersonalInfoForm';
import JobInfoForm from '../components/JobInfoForm';
import SkillInput from '../components/SkillInput';
import AchievementEditor from '../components/AchievementEditor';
import TemplateSelector from '../components/TemplateSelector';
import LetterPreview from '../components/LetterPreview';
import CharacterCount from '../components/CharacterCount';
import CompletionIndicator from '../components/CompletionIndicator';
import AutoSaveIndicator from '../components/AutoSaveIndicator';
import ToastNotification from '../components/ToastNotification';
import { generateId, generateLetterName, debounce, normalizeLetter } from '../utils/helpers';
import { validateLetter, validatePersonalInfo, validateJobInfo, validateContent } from '../utils/validation';

const LetterForm = ({ letters, onSave, existingLetter }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  const isEditing = !!id && !!existingLetter;

  const [letter, setLetter] = useState(() => {
    if (isEditing && existingLetter) {
      return normalizeLetter(existingLetter);
    }
    return {
      id: generateId(),
      name: '',
      status: 'draft',
      template: 'classic',
      personalInfo: {
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        portfolio: ''
      },
      jobInfo: {
        jobTitle: '',
        company: '',
        hiringManager: '',
        jobUrl: '',
        location: '',
        employmentType: 'full-time'
      },
      content: {
        opening: '',
        background: '',
        skills: [],
        achievements: [],
        whyCompany: '',
        whyFit: '',
        closing: ''
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  });

  const [errors, setErrors] = useState({});
  const [autoSaveStatus, setAutoSaveStatus] = useState('idle');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');

  // Auto-save with debounce
  const debouncedSave = debounce((letterToSave) => {
    setAutoSaveStatus('saving');
    const success = onSave(letterToSave);
    if (success) {
      setAutoSaveStatus('saved');
      setTimeout(() => setAutoSaveStatus('idle'), 2000);
    } else {
      setAutoSaveStatus('error');
      setTimeout(() => setAutoSaveStatus('idle'), 3000);
    }
  }, 1500);

  useEffect(() => {
    if (isEditing) {
      debouncedSave(letter);
    }
  }, [letter]);

  // Update letter name when job info changes
  useEffect(() => {
    if (!letter.name || letter.name === 'Untitled Cover Letter') {
      const autoName = generateLetterName(letter.jobInfo.jobTitle, letter.jobInfo.company);
      setLetter(prev => ({ ...prev, name: autoName }));
    }
  }, [letter.jobInfo.jobTitle, letter.jobInfo.company]);

  const handlePersonalInfoChange = (personalInfo) => {
    setLetter(prev => ({
      ...prev,
      personalInfo,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleJobInfoChange = (jobInfo) => {
    setLetter(prev => ({
      ...prev,
      jobInfo,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleContentChange = (field, value) => {
    setLetter(prev => ({
      ...prev,
      content: {
        ...prev.content,
        [field]: value
      },
      updatedAt: new Date().toISOString()
    }));
  };

  const handleSkillsChange = (skills) => {
    setLetter(prev => ({
      ...prev,
      content: {
        ...prev.content,
        skills
      },
      updatedAt: new Date().toISOString()
    }));
  };

  const handleAchievementsChange = (achievements) => {
    setLetter(prev => ({
      ...prev,
      content: {
        ...prev.content,
        achievements
      },
      updatedAt: new Date().toISOString()
    }));
  };

  const handleTemplateChange = (template) => {
    setLetter(prev => ({
      ...prev,
      template,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleStatusChange = (status) => {
    setLetter(prev => ({
      ...prev,
      status,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleNameChange = (name) => {
    setLetter(prev => ({
      ...prev,
      name,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleManualSave = () => {
    const personalErrors = validatePersonalInfo(letter.personalInfo);
    const jobErrors = validateJobInfo(letter.jobInfo);
    const contentErrors = validateContent(letter.content);

    if (Object.keys(personalErrors).length > 0 || 
        Object.keys(jobErrors).length > 0 || 
        Object.keys(contentErrors).length > 0) {
      setErrors({
        personalInfo: personalErrors,
        jobInfo: jobErrors,
        content: contentErrors
      });
      setToastMessage('Please fix the errors before saving');
      setToastType('error');
      setShowToast(true);
      return;
    }

    setErrors({});
    const success = onSave(letter);
    if (success) {
      setToastMessage('Cover letter saved successfully');
      setToastType('success');
      setShowToast(true);
    } else {
      setToastMessage('Failed to save cover letter');
      setToastType('error');
      setShowToast(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="letter-form">
      <div className="row mb-3">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center flex-wrap">
            <div>
              <input
                type="text"
                className="form-control form-control-lg"
                value={letter.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Cover Letter Name"
                style={{ maxWidth: '400px' }}
              />
            </div>
            <div className="d-flex align-items-center gap-3 mt-3 mt-md-0">
              <AutoSaveIndicator status={autoSaveStatus} />
              <select
                className="form-select"
                value={letter.status}
                onChange={(e) => handleStatusChange(e.target.value)}
                style={{ width: 'auto' }}
              >
                <option value="draft">Draft</option>
                <option value="ready">Ready</option>
              </select>
              <button className="btn btn-success" onClick={handleManualSave}>
                <i className="bi bi-save me-2"></i>Save
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-12">
          <CompletionIndicator letter={letter} />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-6">
          <PersonalInfoForm
            data={letter.personalInfo}
            onChange={handlePersonalInfoChange}
            errors={errors.personalInfo}
          />
          
          <JobInfoForm
            data={letter.jobInfo}
            onChange={handleJobInfoChange}
            errors={errors.jobInfo}
          />

          <div className="form-section">
            <h5><i className="bi bi-file-text me-2"></i>Opening</h5>
            <div className="mb-2">
              <label htmlFor="opening" className="form-label">
                Opening Paragraph <span className="text-danger">*</span>
              </label>
              <textarea
                className={`form-control ${errors.content?.opening ? 'is-invalid' : ''}`}
                id="opening"
                value={letter.content.opening}
                onChange={(e) => handleContentChange('opening', e.target.value)}
                placeholder="I am excited to apply for the [Job Title] position at [Company]."
                rows="4"
              />
              {errors.content?.opening && (
                <div className="invalid-feedback">{errors.content.opening}</div>
              )}
            </div>
            <CharacterCount 
              text={letter.content.opening} 
              recommendedMin={300} 
              recommendedMax={500} 
            />
          </div>

          <div className="form-section">
            <h5><i className="bi bi-person-workspace me-2"></i>Professional Background</h5>
            <div className="mb-2">
              <label htmlFor="background" className="form-label">
                Professional Background <span className="text-danger">*</span>
              </label>
              <textarea
                className={`form-control ${errors.content?.background ? 'is-invalid' : ''}`}
                id="background"
                value={letter.content.background}
                onChange={(e) => handleContentChange('background', e.target.value)}
                placeholder="Describe your relevant experience, professional background, and major strengths..."
                rows="5"
              />
              {errors.content?.background && (
                <div className="invalid-feedback">{errors.content.background}</div>
              )}
            </div>
            <CharacterCount 
              text={letter.content.background} 
              recommendedMin={500} 
              recommendedMax={900} 
            />
          </div>

          <SkillInput
            skills={letter.content.skills}
            onChange={handleSkillsChange}
          />

          <AchievementEditor
            achievements={letter.content.achievements}
            onChange={handleAchievementsChange}
          />

          <div className="form-section">
            <h5><i className="bi bi-building me-2"></i>Why This Company?</h5>
            <textarea
              className="form-control"
              value={letter.content.whyCompany}
              onChange={(e) => handleContentChange('whyCompany', e.target.value)}
              placeholder="Explain why you're interested in this company..."
              rows="4"
            />
          </div>

          <div className="form-section">
            <h5><i className="bi bi-check-circle me-2"></i>Why I'm a Good Fit</h5>
            <textarea
              className="form-control"
              value={letter.content.whyFit}
              onChange={(e) => handleContentChange('whyFit', e.target.value)}
              placeholder="Explain why your skills and experience match this job..."
              rows="4"
            />
          </div>

          <div className="form-section">
            <h5><i className="bi bi-envelope-paper me-2"></i>Closing</h5>
            <div className="mb-2">
              <label htmlFor="closing" className="form-label">
                Closing Paragraph <span className="text-danger">*</span>
              </label>
              <textarea
                className={`form-control ${errors.content?.closing ? 'is-invalid' : ''}`}
                id="closing"
                value={letter.content.closing}
                onChange={(e) => handleContentChange('closing', e.target.value)}
                placeholder="Thank you for considering my application. I look forward to hearing from you."
                rows="3"
              />
              {errors.content?.closing && (
                <div className="invalid-feedback">{errors.content.closing}</div>
              )}
            </div>
            <CharacterCount 
              text={letter.content.closing} 
              recommendedMin={200} 
              recommendedMax={400} 
            />
          </div>

          <TemplateSelector
            selectedTemplate={letter.template}
            onChange={handleTemplateChange}
          />

          <div className="mb-4">
            <button className="btn btn-primary btn-lg w-100" onClick={handleManualSave}>
              <i className="bi bi-save me-2"></i>Save Cover Letter
            </button>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="sticky-top" style={{ top: '20px' }}>
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Live Preview</h5>
                <button className="btn btn-sm btn-outline-secondary" onClick={handlePrint}>
                  <i className="bi bi-printer"></i>
                </button>
              </div>
              <div className="card-body">
                <LetterPreview letter={letter} />
              </div>
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

export default LetterForm;
