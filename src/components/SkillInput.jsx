import React, { useState } from 'react';

const SkillInput = ({ skills, onChange }) => {
  const [newSkill, setNewSkill] = useState('');

  const handleAddSkill = () => {
    const trimmedSkill = newSkill.trim();
    if (trimmedSkill && !skills.includes(trimmedSkill)) {
      onChange([...skills, trimmedSkill]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onChange(skills.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  return (
    <div className="form-section">
      <h5><i className="bi bi-tools me-2"></i>Skills</h5>
      <div className="mb-3">
        <label htmlFor="skillInput" className="form-label">Add a skill</label>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            id="skillInput"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="React, JavaScript, UI/UX..."
            aria-label="Add skill"
          />
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={handleAddSkill}
            disabled={!newSkill.trim() || skills.includes(newSkill.trim())}
          >
            Add
          </button>
        </div>
      </div>
      {skills.length > 0 ? (
        <div className="skills-container">
          {skills.map((skill, index) => (
            <span key={index} className="skill-tag">
              {skill}
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                aria-label={`Remove ${skill}`}
              >
                <i className="bi bi-x"></i>
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-muted">No skills added yet.</p>
      )}
    </div>
  );
};

export default SkillInput;
