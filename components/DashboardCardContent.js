import React from 'react';
import htm from 'htm';
import { DashboardChart } from './DashboardChart.js';

const html = htm.bind(React.createElement);
const { useMemo } = React;

// Helper function to calculate risk level, mirrors logic from RiskMatrix
const getRiskLevel = (sevIndex, likeIndex) => {
    const score = (sevIndex + 1) * (likeIndex + 1);
    if (score > 15) return { key: 'risk-extreme', name: 'Extreme' };
    if (score > 9) return { key: 'risk-high', name: 'High' };
    if (score > 4) return { key: 'risk-medium', name: 'Medium' };
    return { key: 'risk-low', name: 'Low' };
};

// Chart configuration helpers
const createDoughnutChart = (labels, data, colors, theme, options = {}) => {
    const style = getComputedStyle(document.documentElement);
    const componentBg = style.getPropertyValue('--component-bg').trim();
    
    return {
        type: 'doughnut',
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: colors,
                borderColor: componentBg,
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'right' } },
            cutout: '60%',
            ...options
        }
    };
};

const createBarChart = (labels, data, colors, theme, options = {}) => {
    return {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: options.label || 'Count',
                data,
                backgroundColor: colors,
                barThickness: 'flex',
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { 
                y: { ticks: { stepSize: 1 } },
                ...(options.indexAxis === 'y' && { x: options.scaleOptions || {} })
            },
            ...options
        }
    };
};

const createPieChart = (labels, data, colors, theme, options = {}) => {
    const style = getComputedStyle(document.documentElement);
    const componentBg = style.getPropertyValue('--component-bg').trim();
    
    return {
        type: 'pie',
        data: {
            labels,
            datasets: [{
                data,
                backgroundColor: colors,
                borderColor: componentBg,
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { position: 'right' } },
            ...options
        }
    };
};

const createLineChart = (labels, data, borderColor, theme, options = {}) => {
    return {
        type: 'line',
        data: {
            labels,
            datasets: [{
                label: options.label || 'Data',
                data,
                borderColor,
                tension: 0.1,
                pointRadius: 2,
                ...options.datasetOptions
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { display: false },
                x: { display: false }
            },
            ...options
        }
    };
};

// Status color mapping utilities
const getStatusColors = (themeColors) => ({
    status: {
        'Draft': themeColors.border,
        'Under Review': themeColors.mediumRisk,
        'Approved': themeColors.primary,
        'Rejected': themeColors.extremeRisk,
        'Implemented': themeColors.accent,
        'Open': themeColors.extremeRisk,
        'In Progress': themeColors.mediumRisk,
        'Pending Review': themeColors.highRisk,
        'Completed': themeColors.accent,
        'Cancelled': themeColors.border,
        'Closed': themeColors.accent,
        'Planned': themeColors.primary,
        'Postponed': themeColors.highRisk,
        'Pass': themeColors.accent,
        'Fail': themeColors.extremeRisk,
        'Pending': themeColors.mediumRisk,
        'Retest': themeColors.highRisk,
        'Scheduled': themeColors.primary,
        'Expired': themeColors.extremeRisk,
        'Obsolete': '#6c757d'
    },
    severity: {
        'Critical': themeColors.extremeRisk,
        'Major': themeColors.highRisk,
        'Minor': themeColors.mediumRisk,
        'N/A': themeColors.border
    },
    approval: {
        'Approved': themeColors.accent,
        'Probationary': '#ffc107',
        'Pending': themeColors.primary,
        'Disqualified': '#6c757d'
    }
});

// Calculation utilities
const calculateOverdue = (items, dateField, statusExclusions = []) => {
    return items.filter(item => 
        item[dateField] && 
        new Date(item[dateField]) < new Date() && 
        !statusExclusions.includes(item.status)
    ).length;
};

const calculateUpcoming = (items, dateField, statusInclusions = []) => {
    return items.filter(item => 
        item[dateField] && 
        new Date(item[dateField]) > new Date() && 
        statusInclusions.includes(item.status)
    ).length;
};

const calculateExpiringSoon = (items, dateField, days = 90, statusRequirement = 'Completed') => {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + days);

    return items.filter(item => 
        item[dateField] &&
        item.status === statusRequirement &&
        new Date(item[dateField]) > now &&
        new Date(item[dateField]) <= futureDate
    ).length;
};

const countByField = (items, field) => {
    return items.reduce((acc, item) => {
        const value = item[field] || 'N/A';
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});
};

// Component renderers
const renderMetricsWithChart = (summary, chartConfig, theme, hasData) => html`
    <div className="dashboard-card-metrics">
        <p className="dashboard-metric-summary">${summary}</p>
        ${hasData && chartConfig ? 
            html`<${DashboardChart} chartConfig=${chartConfig} theme=${theme} />` : 
            html`<p>No data available yet.</p>`
        }
    </div>
`;

export const DashboardCardContent = ({ config, data, theme }) => {
    const style = useMemo(() => getComputedStyle(document.documentElement), [theme]);
    
    const themeColors = useMemo(() => ({
        primary: style.getPropertyValue('--primary-color').trim(),
        accent: style.getPropertyValue('--accent-color').trim(),
        border: style.getPropertyValue('--border-color').trim(),
        componentBg: style.getPropertyValue('--component-bg').trim(),
        mediumRisk: '#ffc107', // orange-yellow
        highRisk: '#fd7e14', // orange
        extremeRisk: '#dc3545', // red
    }), [theme]);

    const colorMaps = useMemo(() => getStatusColors(themeColors), [themeColors]);

    switch (config.component) {
        case 'ChecklistGenerator':
        case 'ChecklistWrapper': {
            const total = data.length;
            const completed = data.filter(i => i.completed).length;
            const chartConfig = createDoughnutChart(
                ['Completed', 'Pending'],
                [completed, total - completed],
                [themeColors.accent, themeColors.border],
                theme
            );

            return renderMetricsWithChart(
                html`Status: <strong>${completed} / ${total}</strong> items completed.`,
                chartConfig,
                theme,
                total > 0
            );
        }

        case 'RiskAssessment': {
            const { risks = [], severityLevels = [], likelihoodLevels = [] } = data;
            const riskCounts = { Low: 0, Medium: 0, High: 0, Extreme: 0 };
            
            risks.forEach(risk => {
                const sevIndex = severityLevels.indexOf(risk.severity);
                const likeIndex = likelihoodLevels.indexOf(risk.likelihood);
                if (sevIndex !== -1 && likeIndex !== -1) {
                    const level = getRiskLevel(sevIndex, likeIndex);
                    riskCounts[level.name]++;
                }
            });

            const chartConfig = createBarChart(
                ['Low', 'Medium', 'High', 'Extreme'],
                Object.values(riskCounts),
                [themeColors.accent, themeColors.mediumRisk, themeColors.highRisk, themeColors.extremeRisk],
                theme,
                { indexAxis: 'y' }
            );
            
            return renderMetricsWithChart(
                html`<strong>${risks.length}</strong> total risks identified.`,
                chartConfig,
                theme,
                risks.length > 0
            );
        }

        case 'ApprovedManufacturerList': {
            const statusCounts = countByField(data, 'approvalStatus');
            const chartConfig = createPieChart(
                Object.keys(statusCounts),
                Object.values(statusCounts),
                Object.keys(statusCounts).map(status => colorMaps.approval[status] || themeColors.primary),
                theme
            );
            
            return renderMetricsWithChart(
                html`<strong>${data.length}</strong> total manufacturers tracked.`,
                chartConfig,
                theme,
                data.length > 0
            );
        }

        case 'CorrectiveActionRequest': {
            const statusCounts = countByField(data, 'status');
            const chartConfig = createBarChart(
                Object.keys(statusCounts),
                Object.values(statusCounts),
                Object.keys(statusCounts).map(status => colorMaps.status[status] || themeColors.primary),
                theme,
                { label: 'CAR Count' }
            );

            return renderMetricsWithChart(
                html`<strong>${data.length}</strong> total CARs tracked.`,
                chartConfig,
                theme,
                data.length > 0
            );
        }

        case 'AuditFindingsList': {
            const severityCounts = countByField(data, 'severity');
            const chartConfig = createPieChart(
                Object.keys(severityCounts),
                Object.values(severityCounts),
                Object.keys(severityCounts).map(severity => colorMaps.severity[severity] || themeColors.accent),
                theme
            );
            
            return renderMetricsWithChart(
                html`<strong>${data.length}</strong> total findings recorded.`,
                chartConfig,
                theme,
                data.length > 0
            );
        }

        case 'ActionItemList': {
            const statusCounts = countByField(data, 'status');
            const overdue = calculateOverdue(data, 'dueDate', ['Completed', 'Cancelled']);
            const chartConfig = createDoughnutChart(
                Object.keys(statusCounts),
                Object.values(statusCounts),
                Object.keys(statusCounts).map(status => colorMaps.status[status] || themeColors.primary),
                theme
            );
            
            return renderMetricsWithChart(
                html`<strong>${data.length}</strong> total action items. <strong>${overdue}</strong> overdue.`,
                chartConfig,
                theme,
                data.length > 0
            );
        }

        case 'DocumentVersionControl': {
            const statusCounts = countByField(data, 'status');
            const overdue = calculateOverdue(data, 'nextReviewDate', ['Obsolete']);
            const chartConfig = createPieChart(
                Object.keys(statusCounts),
                Object.values(statusCounts),
                Object.keys(statusCounts).map(status => colorMaps.status[status] || themeColors.primary),
                theme
            );
            
            return renderMetricsWithChart(
                html`<strong>${data.length}</strong> total documents tracked. <strong>${overdue}</strong> overdue for review.`,
                chartConfig,
                theme,
                data.length > 0
            );
        }

        case 'QcTestResultsList': {
            const statusCounts = countByField(data, 'status');
            const passRate = data.length > 0 ? ((statusCounts.Pass || 0) / data.length * 100).toFixed(1) : 0;
            const chartConfig = createDoughnutChart(
                Object.keys(statusCounts),
                Object.values(statusCounts),
                Object.keys(statusCounts).map(status => colorMaps.status[status] || themeColors.border),
                theme
            );
            
            return renderMetricsWithChart(
                html`<strong>${data.length}</strong> test results recorded. <strong>${passRate}%</strong> pass rate.`,
                chartConfig,
                theme,
                data.length > 0
            );
        }

        case 'ChangeRequestForm': {
            const statusCounts = countByField(data, 'status');
            const implemented = statusCounts.Implemented || 0;
            const approved = statusCounts.Approved || 0;
            const chartConfig = createPieChart(
                Object.keys(statusCounts),
                Object.values(statusCounts),
                Object.keys(statusCounts).map(status => colorMaps.status[status] || themeColors.border),
                theme
            );
            
            return renderMetricsWithChart(
                html`<strong>${data.length}</strong> change requests tracked. <strong>${implemented}</strong> implemented, <strong>${approved}</strong> pending implementation.`,
                chartConfig,
                theme,
                data.length > 0
            );
        }

        case 'PreventiveActionRequest': {
            const statusCounts = countByField(data, 'status');
            const overdue = calculateOverdue(data, 'dueDate', ['Implemented', 'Closed']);
            const completed = (statusCounts.Implemented || 0) + (statusCounts.Closed || 0);
            const chartConfig = createDoughnutChart(
                Object.keys(statusCounts),
                Object.values(statusCounts),
                Object.keys(statusCounts).map(status => colorMaps.status[status] || themeColors.border),
                theme
            );
            
            return renderMetricsWithChart(
                html`<strong>${data.length}</strong> PARs tracked. <strong>${completed}</strong> completed, <strong>${overdue}</strong> overdue.`,
                chartConfig,
                theme,
                data.length > 0
            );
        }

        case 'InternalAuditScheduler': {
            const statusCounts = countByField(data, 'status');
            const upcoming = calculateUpcoming(data, 'scheduledStartDate', ['Planned', 'Postponed']);
            const chartConfig = createBarChart(
                Object.keys(statusCounts),
                Object.values(statusCounts),
                Object.keys(statusCounts).map(status => colorMaps.status[status] || themeColors.border),
                theme,
                { scales: { y: { ticks: { stepSize: 1 } } } }
            );
            
            return renderMetricsWithChart(
                html`<strong>${data.length}</strong> total audits scheduled. <strong>${upcoming}</strong> upcoming.`,
                chartConfig,
                theme,
                data.length > 0
            );
        }

        case 'SupplierScorecard': {
            const sortedData = [...data].sort((a, b) => b.overallScore - a.overallScore).slice(0, 5);
            const chartConfig = createBarChart(
                sortedData.map(s => s.supplierName),
                sortedData.map(s => s.overallScore),
                sortedData.map(s => s.overallScore).map(score => {
                    if (score >= 95) return themeColors.accent;
                    if (score >= 85) return themeColors.primary;
                    if (score >= 75) return themeColors.mediumRisk;
                    return themeColors.extremeRisk;
                }),
                theme,
                { 
                    indexAxis: 'y',
                    label: 'Overall Score',
                    scaleOptions: { min: 60, max: 100 }
                }
            );
            
            return renderMetricsWithChart(
                html`Top 5 of <strong>${data.length}</strong> supplier scorecards.`,
                chartConfig,
                theme,
                data.length > 0
            );
        }

        case 'ControlChart': {
            const dataPoints = data.dataPoints || [];
            if (dataPoints.length < 2) {
                return renderMetricsWithChart(
                    html`<strong>${data.processName || 'Process'}</strong>`,
                    null,
                    theme,
                    false
                );
            }
            
            const mean = dataPoints.reduce((a, b) => a + b, 0) / dataPoints.length;
            const lastPoint = dataPoints[dataPoints.length - 1];
            const chartConfig = createLineChart(
                dataPoints.map((_, i) => i + 1),
                dataPoints,
                themeColors.primary,
                theme,
                { label: data.processName }
            );

            return renderMetricsWithChart(
                html`<strong>${data.processName || 'Process'}</strong>: ${dataPoints.length} points. Last: ${lastPoint}, Mean: ${mean.toFixed(2)}`,
                chartConfig,
                theme,
                dataPoints.length > 0
            );
        }

        case 'TrainingRecords': {
            const expiringSoonCount = calculateExpiringSoon(data, 'expirationDate', 90, 'Completed');
            const expiredCount = calculateOverdue(data.filter(tr => tr.status === 'Completed'), 'expirationDate', []);
            
            // Enhance status counting to include expired status
            const enhancedData = data.map(tr => {
                if (tr.status === 'Completed' && tr.expirationDate && new Date(tr.expirationDate) < new Date()) {
                    return { ...tr, enhancedStatus: 'Expired' };
                }
                return { ...tr, enhancedStatus: tr.status };
            });
            
            const statusCounts = countByField(enhancedData, 'enhancedStatus');
            const chartConfig = createDoughnutChart(
                Object.keys(statusCounts),
                Object.values(statusCounts),
                Object.keys(statusCounts).map(status => colorMaps.status[status] || themeColors.border),
                theme
            );
            
            return renderMetricsWithChart(
                html`<strong>${data.length}</strong> records. <strong>${expiringSoonCount}</strong> expiring soon. <strong>${expiredCount}</strong> expired.`,
                chartConfig,
                theme,
                data.length > 0
            );
        }

        default:
            return html`<div className="dashboard-card-metrics"><p>No dashboard summary available for this module.</p></div>`;
    }
};