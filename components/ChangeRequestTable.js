import React from 'react';
import htm from 'htm';
import { TrashIcon } from './Icons.js';

const html = htm.bind(React.createElement);

const ChangeRequestTableRow = ({ item, onUpdateItem, onDeleteItem }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onUpdateItem({ ...item, [name]: value });
        if (e.target.tagName.toLowerCase() === 'textarea') {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const statuses = ['Draft', 'Under Review', 'Approved', 'Rejected', 'Implemented'];
    const priorities = ['Low', 'Medium', 'High', 'Critical'];

    return html`
        <tr className="audit-item-row">
            <td><textarea name="requestTitle" rows="1" value=${item.requestTitle} onInput=${handleInputChange} className="form-control" placeholder="Request Title" aria-label=${`Title for ${item.id}`}></textarea></td>
            <td><textarea name="description" value=${item.description} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Description" aria-label=${`Description for ${item.id}`}></textarea></td>
            <td><textarea name="requestor" rows="1" value=${item.requestor} onInput=${handleInputChange} className="form-control" placeholder="Requestor" aria-label=${`Requestor for ${item.id}`}></textarea></td>
            <td><input type="date" name="dateSubmitted" value=${item.dateSubmitted} onInput=${handleInputChange} className="form-control" aria-label=${`Date Submitted for ${item.id}`} /></td>
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
            <td><textarea name="impactAnalysis" value=${item.impactAnalysis} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Impact Analysis" aria-label=${`Impact Analysis for ${item.id}`}></textarea></td>
            <td><textarea name="businessJustification" value=${item.businessJustification} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Business Justification" aria-label=${`Business Justification for ${item.id}`}></textarea></td>
            <td><textarea name="approvalHistory" value=${item.approvalHistory} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Approval History" aria-label=${`Approval History for ${item.id}`}></textarea></td>
            <td><input type="date" name="implementationDate" value=${item.implementationDate} onInput=${handleInputChange} className="form-control" aria-label=${`Implementation Date for ${item.id}`} /></td>
            <td><textarea name="notes" value=${item.notes} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Notes..." aria-label=${`Notes for ${item.id}`}></textarea></td>
            <td>
                <button type="button" className="delete-item-btn" onClick=${() => onDeleteItem(item.id)} aria-label=${`Delete change request ${item.requestTitle}`}>
                    <${TrashIcon} />
                </button>
            </td>
        </tr>
    `;
};

export const ChangeRequestTable = ({ changeRequests, onUpdateItem, onDeleteItem }) => {
    if (!changeRequests || changeRequests.length === 0) {
        return html`
            <div className="empty-state">
                <h4>No Change Requests Found</h4>
                <p>Add a new change request or adjust your filters.</p>
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
                        <th>Requestor</th>
                        <th>Date Submitted</th>
                        <th>Status</th>
                        <th>Priority</th>
                        <th>Impact Analysis</th>
                        <th>Business Justification</th>
                        <th>Approval History</th>
                        <th>Implementation Date</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${changeRequests.map(item => html`
                        <${ChangeRequestTableRow}
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