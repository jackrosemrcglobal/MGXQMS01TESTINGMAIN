import React from 'react';
import htm from 'htm';
import { TrashIcon } from './Icons.js';

const html = htm.bind(React.createElement);

const ParTableRow = ({ item, onUpdateItem, onDeleteItem }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onUpdateItem({ ...item, [name]: value });
        if (e.target.tagName.toLowerCase() === 'textarea') {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const statuses = ['Open', 'In Progress', 'Implemented', 'Closed'];
    const priorities = ['Low', 'Medium', 'High', 'Critical'];

    return html`
        <tr className="audit-item-row">
            <td><textarea name="title" rows="1" value=${item.title} onInput=${handleInputChange} className="form-control" placeholder="PAR Title" aria-label=${`Title for ${item.id}`}></textarea></td>
            <td><textarea name="description" value=${item.description} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Description" aria-label=${`Description for ${item.id}`}></textarea></td>
            <td>
                <select name="status" value=${item.status} onChange=${handleInputChange} className="form-control" aria-label=${`Status for ${item.id}`}>
                    ${statuses.map(status => html`<option key=${status} value=${status}>${status}</option>`)}
                </select>
            </td>
            <td>
                <select name="priority" value=${item.priority} onChange=${handleInputChange} className="form-control" aria-label=${`Priority for ${item.id}`}>
                    ${priorities.map(priority => html`<option key=${priority} value=${priority}>${priority}</option>`)}
                </select>
            </td>
            <td><textarea name="assignedTo" rows="1" value=${item.assignedTo} onInput=${handleInputChange} className="form-control" placeholder="Assigned To" aria-label=${`Assigned to for ${item.id}`}></textarea></td>
            <td><input type="date" name="dueDate" value=${item.dueDate} onInput=${handleInputChange} className="form-control" aria-label=${`Due date for ${item.id}`} /></td>
            <td><textarea name="rootCauseAnalysis" value=${item.rootCauseAnalysis} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Root Cause Analysis" aria-label=${`Root Cause Analysis for ${item.id}`}></textarea></td>
            <td><textarea name="preventiveActionPlan" value=${item.preventiveActionPlan} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Preventive Action Plan" aria-label=${`Preventive Action Plan for ${item.id}`}></textarea></td>
            <td><input type="date" name="implementationDate" value=${item.implementationDate} onInput=${handleInputChange} className="form-control" aria-label=${`Implementation date for ${item.id}`} /></td>
            <td><textarea name="effectivenessVerification" value=${item.effectivenessVerification} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Effectiveness Verification" aria-label=${`Effectiveness Verification for ${item.id}`}></textarea></td>
            <td><textarea name="notes" value=${item.notes} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Notes..." aria-label=${`Notes for ${item.id}`}></textarea></td>
            <td>
                <button type="button" className="delete-item-btn" onClick=${() => onDeleteItem(item.id)} aria-label=${`Delete PAR ${item.title}`}>
                    <${TrashIcon} />
                </button>
            </td>
        </tr>
    `;
};

export const ParTable = ({ pars, onUpdateItem, onDeleteItem }) => {
    if (!pars || pars.length === 0) {
        return html`
            <div className="empty-state">
                <h4>No Preventive Action Requests Found</h4>
                <p>Add a new PAR or adjust your filters.</p>
            </div>
        `;
    }

    return html`
        <div className="audit-table-container">
            <table className="audit-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Assigned To</th>
                        <th>Due Date</th>
                        <th>Root Cause Analysis</th>
                        <th>Preventive Action Plan</th>
                        <th>Implementation Date</th>
                        <th>Effectiveness Verification</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${pars.map(item => html`
                        <${ParTableRow}
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