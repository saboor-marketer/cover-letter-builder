import React, { useState } from 'react';
import { generateId } from '../utils/helpers';

const AchievementEditor = ({ achievements, onChange }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });

  const handleStartEdit = (achievement) => {
    setEditingId(achievement.id);
    setEditForm({
      title: achievement.title,
      description: achievement.description
    });
  };

  const handleSaveEdit = () => {
    if (!editForm.title.trim()) return;

    const updatedAchievements = achievements.map(ach => {
      if (ach.id === editingId) {
        return {
          ...ach,
          title: editForm.title,
          description: editForm.description
        };
      }
      return ach;
    });

    onChange(updatedAchievements);
    setEditingId(null);
    setEditForm({ title: '', description: '' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ title: '', description: '' });
  };

  const handleAddAchievement = () => {
    const newAchievement = {
      id: generateId(),
      title: '',
      description: ''
    };
    onChange([...achievements, newAchievement]);
    setEditingId(newAchievement.id);
    setEditForm({ title: '', description: '' });
  };

  const handleDeleteAchievement = (id) => {
    onChange(achievements.filter(ach => ach.id !== id));
  };

  return (
    <div className="form-section">
      <h5><i className="bi bi-trophy me-2"></i>Achievements</h5>
      {achievements.length === 0 ? (
        <p className="text-muted">No achievements added yet.</p>
      ) : (
        <div className="achievements-list">
          {achievements.map((achievement) => (
            <div key={achievement.id} className="achievement-item">
              {editingId === achievement.id ? (
                <div className="edit-form">
                  <div className="mb-3">
                    <label className="form-label">Achievement Title</label>
                    <input
                      type="text"
                      className="form-control"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      placeholder="Achievement title"
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      value={editForm.description}
                      onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                      placeholder="Describe your achievement..."
                      rows="3"
                    />
                  </div>
                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={handleSaveEdit}
                      disabled={!editForm.title.trim()}
                    >
                      Save
                    </button>
                    <button
                      className="btn btn-sm btn-secondary"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h5>{achievement.title}</h5>
                  <p className="mb-2">{achievement.description}</p>
                  <div className="btn-group">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => handleStartEdit(achievement)}
                    >
                      <i className="bi bi-pencil me-1"></i>Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteAchievement(achievement.id)}
                    >
                      <i className="bi bi-trash me-1"></i>Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      <button
        className="btn btn-outline-primary mt-3"
        onClick={handleAddAchievement}
      >
        <i className="bi bi-plus-circle me-1"></i>Add Achievement
      </button>
    </div>
  );
};

export default AchievementEditor;
