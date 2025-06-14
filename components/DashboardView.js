import React from 'react';
import htm from 'htm';
import { DownloadIcon } from './Icons.js';
import { DashboardCardContent } from './DashboardCardContent.js';

const html = htm.bind(React.createElement);

// removed helper function getRiskLevel() - moved to DashboardCardContent.js

// removed DashboardChart component - moved to DashboardChart.js

// removed DashboardCardContent component - moved to DashboardCardContent.js

/**
 * DashboardView Component
 */
export const DashboardView = ({ dashboardData, setActiveTab, onExport, theme }) => {
    const hasData = Object.keys(dashboardData).length > 0;
    
    return html`
        <div>
            <h2>Dashboard</h2>
            <p>Welcome to the MRC Global Quality Management System. Here's an overview of your enabled modules.</p>
            ${!hasData ? html`
                <div className="empty-state">
                    <h4>No Modules Enabled</h4>
                    <p>Enable some modules in the settings to see them here.</p>
                </div>
            ` : html`
                <div className="dashboard-grid">
                    ${Object.entries(dashboardData).map(([key, entryData]) => {
                        if (!entryData || !entryData.data) return null;
                        return html`
                            <div key=${key} className="dashboard-card">
                                <h3>${entryData.config.title}</h3>
                                <${DashboardCardContent} config=${entryData.config} data=${entryData.data} theme=${theme} />
                                <div className="dashboard-card-actions">
                                    <button className="btn" onClick=${() => setActiveTab(key)}>
                                        View Details
                                    </button>
                                     <button className="control-btn" onClick=${() => onExport(key)} title="Export summary to XLSX">
                                        <${DownloadIcon} /> XLSX
                                    </button>
                                </div>
                            </div>
                        `;
                    })}
                </div>
            `}
        </div>
    `;
};

