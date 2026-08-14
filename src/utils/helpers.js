// Utility helper functions

// Generate unique ID
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

// Format date for display
export const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return 'N/A';
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return 'N/A';
  }
};

// Format date for storage (ISO string)
export const formatDateForStorage = (date) => {
  if (!date) return null;
  try {
    return new Date(date).toISOString();
  } catch (error) {
    console.error('Error formatting date for storage:', error);
    return null;
  }
};

// Validate email
export const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
};

// Validate URL
export const isValidUrl = (url) => {
  if (!url) return true; // URLs are optional
  try {
    new URL(url.trim());
    return true;
  } catch (error) {
    return false;
  }
};

// Count words in text
export const countWords = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

// Count characters in text
export const countCharacters = (text) => {
  if (!text) return 0;
  return text.length;
};

// Count paragraphs in text
export const countParagraphs = (text) => {
  if (!text) return 0;
  return text.split(/\n\n+/).filter(para => para.trim().length > 0).length;
};

// Truncate text
export const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

// Debounce function
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Sort array by field
export const sortByField = (array, field, direction = 'asc') => {
  return [...array].sort((a, b) => {
    const aVal = a[field] || '';
    const bVal = b[field] || '';
    
    if (direction === 'asc') {
      return aVal.localeCompare(bVal);
    } else {
      return bVal.localeCompare(aVal);
    }
  });
};

// Sort by date
export const sortByDate = (array, field, direction = 'desc') => {
  return [...array].sort((a, b) => {
    const aDate = new Date(a[field] || 0);
    const bDate = new Date(b[field] || 0);
    
    if (direction === 'asc') {
      return aDate - bDate;
    } else {
      return bDate - aDate;
    }
  });
};

// Filter array by search term
export const filterBySearch = (array, searchTerm, fields) => {
  if (!searchTerm || searchTerm.trim() === '') return array;
  
  const term = searchTerm.toLowerCase().trim();
  
  return array.filter(item => {
    return fields.some(field => {
      const value = item[field];
      if (typeof value === 'string') {
        return value.toLowerCase().includes(term);
      }
      if (Array.isArray(value)) {
        return value.some(v => v.toLowerCase().includes(term));
      }
      return false;
    });
  });
};

// Filter array by field value
export const filterByField = (array, field, value) => {
  if (!value || value === 'all') return array;
  return array.filter(item => item[field] === value);
};

// Generate letter name from job info
export const generateLetterName = (jobTitle, company) => {
  if (jobTitle && company) {
    return `${jobTitle} — ${company}`;
  }
  if (jobTitle) {
    return jobTitle;
  }
  if (company) {
    return company;
  }
  return 'Untitled Cover Letter';
};

// Calculate completion percentage
export const calculateCompletion = (letter) => {
  const requiredFields = [
    letter.personalInfo?.fullName,
    letter.personalInfo?.email,
    letter.jobInfo?.jobTitle,
    letter.jobInfo?.company,
    letter.content?.opening,
    letter.content?.background,
    letter.content?.closing
  ];
  
  const completed = requiredFields.filter(field => field && field.trim().length > 0).length;
  return {
    completed,
    total: requiredFields.length,
    percentage: Math.round((completed / requiredFields.length) * 100)
  };
};

// Safe fallback for missing values
export const safeValue = (value, fallback = '') => {
  if (value === null || value === undefined || value === 'undefined' || value === 'null') {
    return fallback;
  }
  return value;
};

// Normalize letter data
export const normalizeLetter = (letter) => {
  if (!letter || typeof letter !== 'object') return null;
  
  return {
    id: letter.id || generateId(),
    name: letter.name || generateLetterName(letter.jobInfo?.jobTitle, letter.jobInfo?.company),
    status: letter.status || 'draft',
    template: letter.template || 'classic',
    personalInfo: {
      fullName: letter.personalInfo?.fullName || '',
      email: letter.personalInfo?.email || '',
      phone: letter.personalInfo?.phone || '',
      location: letter.personalInfo?.location || '',
      linkedin: letter.personalInfo?.linkedin || '',
      portfolio: letter.personalInfo?.portfolio || ''
    },
    jobInfo: {
      jobTitle: letter.jobInfo?.jobTitle || '',
      company: letter.jobInfo?.company || '',
      hiringManager: letter.jobInfo?.hiringManager || '',
      jobUrl: letter.jobInfo?.jobUrl || '',
      location: letter.jobInfo?.location || '',
      employmentType: letter.jobInfo?.employmentType || 'full-time'
    },
    content: {
      opening: letter.content?.opening || '',
      background: letter.content?.background || '',
      skills: Array.isArray(letter.content?.skills) ? letter.content.skills : [],
      achievements: Array.isArray(letter.content?.achievements) ? letter.content.achievements : [],
      whyCompany: letter.content?.whyCompany || '',
      whyFit: letter.content?.whyFit || '',
      closing: letter.content?.closing || ''
    },
    createdAt: letter.createdAt || new Date().toISOString(),
    updatedAt: letter.updatedAt || new Date().toISOString()
  };
};

// Normalize letters array
export const normalizeLetters = (letters) => {
  if (!Array.isArray(letters)) return [];
  return letters.map(normalizeLetter).filter(letter => letter !== null);
};

// Normalize profile data
export const normalizeProfile = (profile) => {
  if (!profile || typeof profile !== 'object') {
    return {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      portfolio: ''
    };
  }
  
  return {
    fullName: profile.fullName || '',
    email: profile.email || '',
    phone: profile.phone || '',
    location: profile.location || '',
    linkedin: profile.linkedin || '',
    portfolio: profile.portfolio || ''
  };
};

// Normalize settings data
export const normalizeSettings = (settings) => {
  if (!settings || typeof settings !== 'object') {
    return {
      defaultTemplate: 'classic',
      defaultEmploymentType: 'full-time'
    };
  }
  
  return {
    defaultTemplate: settings.defaultTemplate || 'classic',
    defaultEmploymentType: settings.defaultEmploymentType || 'full-time'
  };
};
