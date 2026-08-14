// Validation functions

export const validators = {
  // Required field validation
  required: (value) => {
    if (value === null || value === undefined) return false;
    if (typeof value === 'string') return value.trim().length > 0;
    if (Array.isArray(value)) return value.length > 0;
    return true;
  },

  // Email validation
  email: (value) => {
    if (!value) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
  },

  // URL validation (optional)
  url: (value) => {
    if (!value || value.trim() === '') return true; // URLs are optional
    try {
      new URL(value.trim());
      return true;
    } catch (error) {
      return false;
    }
  },

  // Phone validation (optional, basic format)
  phone: (value) => {
    if (!value || value.trim() === '') return true; // Phone is optional
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(value.trim());
  },

  // Min length validation
  minLength: (value, min) => {
    if (!value) return false;
    return value.trim().length >= min;
  },

  // Max length validation
  maxLength: (value, max) => {
    if (!value) return true;
    return value.trim().length <= max;
  }
};

// Validation error messages
export const errorMessages = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  url: 'Please enter a valid URL',
  phone: 'Please enter a valid phone number',
  minLength: (min) => `Minimum ${min} characters required`,
  maxLength: (max) => `Maximum ${max} characters allowed`
};

// Validate personal info
export const validatePersonalInfo = (personalInfo) => {
  const errors = {};
  
  if (!validators.required(personalInfo.fullName)) {
    errors.fullName = errorMessages.required;
  }
  
  if (!validators.required(personalInfo.email)) {
    errors.email = errorMessages.required;
  } else if (!validators.email(personalInfo.email)) {
    errors.email = errorMessages.email;
  }
  
  if (personalInfo.phone && !validators.phone(personalInfo.phone)) {
    errors.phone = errorMessages.phone;
  }
  
  if (personalInfo.linkedin && !validators.url(personalInfo.linkedin)) {
    errors.linkedin = errorMessages.url;
  }
  
  if (personalInfo.portfolio && !validators.url(personalInfo.portfolio)) {
    errors.portfolio = errorMessages.url;
  }
  
  return errors;
};

// Validate job info
export const validateJobInfo = (jobInfo) => {
  const errors = {};
  
  if (!validators.required(jobInfo.jobTitle)) {
    errors.jobTitle = errorMessages.required;
  }
  
  if (!validators.required(jobInfo.company)) {
    errors.company = errorMessages.required;
  }
  
  if (jobInfo.jobUrl && !validators.url(jobInfo.jobUrl)) {
    errors.jobUrl = errorMessages.url;
  }
  
  return errors;
};

// Validate letter content
export const validateContent = (content) => {
  const errors = {};
  
  if (!validators.required(content.opening)) {
    errors.opening = errorMessages.required;
  }
  
  if (!validators.required(content.background)) {
    errors.background = errorMessages.required;
  }
  
  if (!validators.required(content.closing)) {
    errors.closing = errorMessages.required;
  }
  
  return errors;
};

// Validate complete letter
export const validateLetter = (letter) => {
  const personalErrors = validatePersonalInfo(letter.personalInfo);
  const jobErrors = validateJobInfo(letter.jobInfo);
  const contentErrors = validateContent(letter.content);
  
  return {
    personalInfo: personalErrors,
    jobInfo: jobErrors,
    content: contentErrors,
    isValid: Object.keys(personalErrors).length === 0 && 
              Object.keys(jobErrors).length === 0 && 
              Object.keys(contentErrors).length === 0
  };
};

// Check if field has error
export const hasError = (errors, field) => {
  return errors && errors[field] !== undefined;
};
