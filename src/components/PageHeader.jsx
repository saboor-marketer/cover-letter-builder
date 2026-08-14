import React from 'react';

const PageHeader = ({ title, subtitle, actions }) => {
  return (
    <div className="page-header no-print">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center flex-wrap">
          <div>
            <h1>{title}</h1>
            {subtitle && <p>{subtitle}</p>}
          </div>
          {actions && <div className="mt-3 mt-md-0">{actions}</div>}
        </div>
      </div>
    </div>
  );
};

export default PageHeader;
