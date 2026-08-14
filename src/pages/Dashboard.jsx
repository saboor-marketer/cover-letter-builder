import React from 'react';
import { Link } from 'react-router-dom';
import { formatDate } from '../utils/helpers';
import StatusBadge from '../components/StatusBadge';

const Dashboard = ({ letters }) => {
  const stats = {
    total: letters.length,
    draft: letters.filter(l => l.status === 'draft').length,
    ready: letters.filter(l => l.status === 'ready').length,
    recentlyUpdated: letters.length > 0 ? letters.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))[0] : null,
    recentlyCreated: letters.length > 0 ? letters.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0] : null
  };

  const recentLetters = letters
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .slice(0, 5);

  return (
    <div className="dashboard">
      {/* Stats Cards */}
      <div className="row mb-4">
        <div className="col-md-3 mb-3">
          <div className="card stats-card primary h-100">
            <div className="card-body">
              <h6 className="card-title text-muted">Total Letters</h6>
              <h2 className="card-text">{stats.total}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card stats-card warning h-100">
            <div className="card-body">
              <h6 className="card-title text-muted">Drafts</h6>
              <h2 className="card-text">{stats.draft}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card stats-card success h-100">
            <div className="card-body">
              <h6 className="card-title text-muted">Ready</h6>
              <h2 className="card-text">{stats.ready}</h2>
            </div>
          </div>
        </div>
        <div className="col-md-3 mb-3">
          <div className="card stats-card info h-100">
            <div className="card-body">
              <h6 className="card-title text-muted">Completion Rate</h6>
              <h2 className="card-text">
                {stats.total > 0 ? Math.round((stats.ready / stats.total) * 100) : 0}%
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Quick Actions</h5>
              <div className="d-flex gap-2 flex-wrap">
                <Link to="/letters/new" className="btn btn-primary">
                  <i className="bi bi-plus-circle me-2"></i>
                  Create Cover Letter
                </Link>
                <Link to="/letters" className="btn btn-outline-secondary">
                  <i className="bi bi-list me-2"></i>
                  View All Letters
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Letters */}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Recent Letters</h5>
              <Link to="/letters" className="btn btn-sm btn-outline-primary">
                View All
              </Link>
            </div>
            <div className="card-body">
              {recentLetters.length > 0 ? (
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th>Template</th>
                        <th>Last Updated</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentLetters.map(letter => (
                        <tr key={letter.id}>
                          <td>
                            <strong>{letter.name}</strong>
                          </td>
                          <td>{letter.jobInfo?.company || 'N/A'}</td>
                          <td><StatusBadge status={letter.status} /></td>
                          <td className="text-capitalize">{letter.template}</td>
                          <td>{formatDate(letter.updatedAt)}</td>
                          <td>
                            <div className="btn-group btn-group-sm">
                              <Link
                                to={`/letters/${letter.id}`}
                                className="btn btn-outline-secondary"
                                title="View"
                              >
                                <i className="bi bi-eye"></i>
                              </Link>
                              <Link
                                to={`/letters/${letter.id}/edit`}
                                className="btn btn-outline-primary"
                                title="Edit"
                              >
                                <i className="bi bi-pencil"></i>
                              </Link>
                              <Link
                                to={`/letters/${letter.id}/preview`}
                                className="btn btn-outline-info"
                                title="Preview"
                              >
                                <i className="bi bi-printer"></i>
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4">
                  <i className="bi bi-inbox fs-1 text-muted"></i>
                  <p className="text-muted mt-2">No cover letters yet</p>
                  <Link to="/letters/new" className="btn btn-primary">
                    Create Your First Cover Letter
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
