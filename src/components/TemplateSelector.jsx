import React from 'react';

const TemplateSelector = ({ selectedTemplate, onChange }) => {
  const templates = [
    {
      id: 'classic',
      name: 'Classic',
      description: 'Traditional professional layout'
    },
    {
      id: 'modern',
      name: 'Modern',
      description: 'Clean contemporary layout'
    },
    {
      id: 'minimal',
      name: 'Minimal',
      description: 'Simple typography and spacing'
    }
  ];

  return (
    <div className="form-section">
      <h5><i className="bi bi-layout-text-window me-2"></i>Template</h5>
      <div className="row">
        {templates.map((template) => (
          <div key={template.id} className="col-md-4 mb-3">
            <div
              className={`template-preview ${selectedTemplate === template.id ? 'selected' : ''}`}
              onClick={() => onChange(template.id)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  onChange(template.id);
                }
              }}
              aria-pressed={selectedTemplate === template.id}
            >
              <h6>{template.name}</h6>
              <p className="small text-muted mb-0">{template.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
