import React from 'react';
import htm from 'htm';
import { TrashIcon } from './Icons.js';

const html = htm.bind(React.createElement);

const InternalAuditSchedulerTableRow = ({ item, onUpdateItem, onDeleteItem }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onUpdateItem({ ...item, [name]: value });
        if (e.target.tagName.toLowerCase() === 'textarea') {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const statuses = ['Planned', 'In Progress', 'Completed', 'Cancelled', 'Postponed'];

    return html`
        <tr className="audit-item-row">
            <td><textarea name="auditTitle" rows="1" value=${item.auditTitle} onInput=${handleInputChange} className="form-control" placeholder="Audit Title" aria-label=${`Audit Title for ${item.id}`}></textarea></td>
            <td><textarea name="auditType" rows="1" value=${item.auditType} onInput=${handleInputChange} className="form-control" placeholder="e.g. Process, System" aria-label=${`Audit Type for ${item.id}`}></textarea></td>
            <td><textarea name="department" rows="1" value=${item.department} onInput=${handleInputChange} className="form-control" placeholder="Department" aria-label=${`Department for ${item.id}`}></textarea></td>
            <td><textarea name="leadAuditor" rows="1" value=${item.leadAuditor} onInput=${handleInputChange} className="form-control" placeholder="Lead Auditor" aria-label=${`Lead Auditor for ${item.id}`}></textarea></td>
            <td><textarea name="auditTeam" rows="1" value=${item.auditTeam} onInput=${handleInputChange} className="form-control" placeholder="Team members" aria-label=${`Audit Team for ${item.id}`}></textarea></td>
            <td><input type="date" name="scheduledStartDate" value=${item.scheduledStartDate} onInput=${handleInputChange} className="form-control" aria-label=${`Scheduled Start Date for ${item.id}`} /></td>
            <td><input type="date" name="scheduledEndDate" value=${item.scheduledEndDate} onInput=${handleInputChange} className="form-control" aria-label=${`Scheduled End Date for ${item.id}`} /></td>
            <td>
                <select name="status" value=${item.status} onChange=${handleInputChange} className="form-control" aria-label=${`Status for ${item.id}`}>
                    ${statuses.map(status => html`<option key=${status} value=${status}>${status}</option>`)}
                </select>
            </td>
            <td><textarea name="notes" value=${item.notes} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Notes..." aria-label=${`Notes for ${item.id}`}></textarea></td>
            <td>
                <button type="button" className="delete-item-btn" onClick=${() => onDeleteItem(item.id)} aria-label=${`Delete audit schedule ${item.auditTitle}`}>
                    <${TrashIcon} />
                </button>
            </td>
        </tr>
    `;
};

export const InternalAuditSchedulerTable = ({ schedules, onUpdateItem, onDeleteItem }) => {
    if (!schedules || schedules.length === 0) {
        return html`
            <div className="empty-state">
                <h4>No Audits Scheduled</h4>
                <p>Add a new scheduled audit or adjust your filters.</p>
            </div>
        `;
    }

    return html`
        <div className="audit-table-container">
            <table className="audit-table">
                <thead>
                    <tr>
                        <th>Audit Title</th>
                        <th>Type</th>
                        <th>Department/Area</th>
                        <th>Lead Auditor</th>
                        <th>Audit Team</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${schedules.map(item => html`
                        <${InternalAuditSchedulerTableRow}
                            key=${item.id}
                            item=${item}
                            onUpdateItem=${onUpdateItem}
                            onDeleteItem=${onDeleteItem}
                        />
                    `)}
                </tbody>
            </table>
        </div>
    `;
};