import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDate, filterBySearch, filterByField, sortByDate, sortByField } from '../utils/helpers';
import StatusBadge from '../components/StatusBadge';
import EmptyState from '../components/EmptyState';

const AllLetters = ({ letters, onDelete, onDuplicate }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [templateFilter, setTemplateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('recentlyUpdated');
  const [showDeleteModal, setShowDeleteModal] = useState(null);

  // Apply filters and search
  let filteredLetters = filterBySearch(letters, searchTerm, [
    'name',
    'jobInfo.company',
    'jobInfo.jobTitle',
    'jobInfo.hiringManager',
    'content.skills'
  ]);

  filteredLetters = filterByField(filteredLetters, 'status', statusFilter);
  filteredLetters = filterByField(filteredLetters, 'template', templateFilter);

  // Apply sorting
  switch (sortBy) {
    case 'recentlyUpdated':
      filteredLetters = sortByDate(filteredLetters, 'updatedAt', 'desc');
      break;
    case 'oldestUpdated':
      filteredLetters = sortByDate(filteredLetters, 'updatedAt', 'asc');
      break;
    case 'newestCreated':
      filteredLetters = sortByDate(filteredLetters, 'createdAt', 'desc');
      break;
    case 'oldestCreated':
      filteredLetters = sortByDate(filteredLetters, 'createdAt', 'asc');
      break;
    case 'jobTitleAZ':
      filteredLetters = sortByField(filteredLetters, 'jobInfo.jobTitle', 'asc');
      break;
    case 'companyAZ':
      filteredLetters = sortByField(filteredLetters, 'jobInfo.company', 'asc');
      break;
    default:
      filteredLetters = sortByDate(filteredLetters, 'updatedAt', 'desc');
  }

  const handleDelete = (letterId) => {
    onDelete(letterId);
    setShowDeleteModal(null);
  };

  const handleDuplicate = (letterId) => {
    onDuplicate(letterId);
  };

  return (
    <div className="all-letters">
      {/* Search and Filter Bar */}
      <div className="search-filter-bar">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search by job title, company, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="ready">Ready</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={templateFilter}
              onChange={(e) => setTemplateFilter(e.target.value)}
            >
              <option value="all">All Templates</option>
              <option value="classic">Classic</option>
              <option value="modern">Modern</option>
              <option value="minimal">Minimal</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="recentlyUpdated">Recently Updated</option>
              <option value="oldestUpdated">Oldest Updated</option>
              <option value="newestCreated">Newest Created</option>
              <option value="oldestCreated">Oldest Created</option>
              <option value="jobTitleAZ">Job Title A-Z</option>
              <option value="companyAZ">Company A-Z</option>
            </select>
          </div>
          <div className="col-md-2">
            <Link to="/letters/new" className="btn btn-primary w-100">
              <i className="bi bi-plus-circle me-2"></i>
              New Letter
            </Link>
          </div>
        </div>
      </div>

      {/* Letters List */}
      {filteredLetters.length > 0 ? (
        <div className="row">
          {filteredLetters.map(letter => (
            <div key={letter.id} className="col-md-6 col-lg-4 mb-4">
              <div className="card letter-card h-100">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <h5 className="card-title mb-0">{letter.name}</h5>
                    <StatusBadge status={letter.status} />
                  </div>
                  <p className="company mb-2">
                    <i className="bi bi-building me-1"></i>
                    {letter.jobInfo?.company || 'N/A'}
                  </p>
                  <div className="meta mb-3">
                    <div className="mb-1">
                      <i className="bi bi-briefcase me-1"></i>
                      {letter.jobInfo?.jobTitle || 'N/A'}
                    </div>
                    <div className="mb-1">
                      <i className="bi bi-calendar me-1"></i>
                      Updated: {formatDate(letter.updatedAt)}
                    </div>
                    <div>
                      <i className="bi bi-layout-text-window me-1"></i>
                      Template: <span className="text-capitalize">{letter.template}</span>
                    </div>
                  </div>
                  <div className="actions">
                    <Link
                      to={`/letters/${letter.id}`}
                      className="btn btn-sm btn-outline-primary"
                    >
                      <i className="bi bi-eye me-1"></i>View
                    </Link>
                    <Link
                      to={`/letters/${letter.id}/edit`}
                      className="btn btn-sm btn-outline-secondary"
                    >
                      <i className="bi bi-pencil me-1"></i>Edit
                    </Link>
                    <Link
                      to={`/letters/${letter.id}/preview`}
                      className="btn btn-sm btn-outline-info"
                    >
                      <i className="bi bi-printer me-1"></i>Preview
                    </Link>
                    <button
                      className="btn btn-sm btn-outline-warning"
                      onClick={() => handleDuplicate(letter.id)}
                    >
                      <i className="bi bi-copy me-1"></i>Duplicate
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => setShowDeleteModal(letter.id)}
                    >
                      <i className="bi bi-trash me-1"></i>Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          icon="bi-search"
          title="No letters found"
          message={searchTerm ? "No cover letters match your search." : "No cover letters yet."}
          action={() => setSearchTerm('')}
          actionText={searchTerm ? "Clear Search" : undefined}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Delete Cover Letter</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(null)}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this cover letter? This action cannot be undone.</p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(null)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleDelete(showDeleteModal)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllLetters;
