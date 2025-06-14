import React from 'react';
import htm from 'htm';
import { TrashIcon } from './Icons.js';

const html = htm.bind(React.createElement);

const FindingTableRow = ({ item, onUpdateItem, onDeleteItem }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onUpdateItem({ ...item, [name]: value });
        if (e.target.tagName.toLowerCase() === 'textarea') {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const statuses = ['Open', 'In Progress', 'Pending Verification', 'Closed'];
    const severities = ['Minor', 'Major', 'Critical'];

    return html`
        <tr className="audit-item-row">
            <td><textarea name="finding" value=${item.finding} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Finding Description" aria-label=${`Finding for ${item.id}`}></textarea></td>
            <td><textarea name="auditType" rows="1" value=${item.auditType} onInput=${handleInputChange} className="form-control" placeholder="e.g. Internal" aria-label=${`Audit Type for ${item.id}`}></textarea></td>
            <td><textarea name="department" rows="1" value=${item.department} onInput=${handleInputChange} className="form-control" placeholder="e.g. Engineering" aria-label=${`Department for ${item.id}`}></textarea></td>
            <td>
                <select name="severity" value=${item.severity} onChange=${handleInputChange} className="form-control" aria-label=${`Severity for ${item.id}`}>
                    ${severities.map(s => html`<option key=${s} value=${s}>${s}</option>`)}
                </select>
            </td>
            <td>
                <select name="status" value=${item.status} onChange=${handleInputChange} className="form-control" aria-label=${`Status for ${item.id}`}>
                    ${statuses.map(s => html`<option key=${s} value=${s}>${s}</option>`)}
                </select>
            </td>
            <td><textarea name="carId" rows="1" value=${item.carId} onInput=${handleInputChange} className="form-control" placeholder="CAR-ID" aria-label=${`CAR ID for ${item.id}`}></textarea></td>
            <td><input type="date" name="dateFound" value=${item.dateFound} onInput=${handleInputChange} className="form-control" aria-label=${`Date Found for ${item.id}`} /></td>
            <td><textarea name="notes" value=${item.notes} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Notes..." aria-label=${`Notes for ${item.id}`}></textarea></td>
            <td>
                <button type="button" className="delete-item-btn" onClick=${() => onDeleteItem(item.id)} aria-label=${`Delete Finding ${item.id}`}>
                    <${TrashIcon} />
                </button>
            </td>
        </tr>
    `;
};


export const AuditFindingsTable = ({ findings, onUpdateItem, onDeleteItem }) => {
    if (!findings || findings.length === 0) {
        return html`
            <div className="empty-state">
                <h4>No Audit Findings Found</h4>
                <p>Add a new finding or adjust your filters.</p>
            </div>
        `;
    }

    return html`
        <div className="audit-table-container">
            <table className="audit-table">
                <thead>
                    <tr>
                        <th>Finding</th>
                        <th>Audit Type</th>
                        <th>Department</th>
                        <th>Severity</th>
                        <th>Status</th>
                        <th>CAR ID</th>
                        <th>Date Found</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${findings.map(item => html`
                        <${FindingTableRow}
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