import React from 'react';
import htm from 'htm';
import { TrashIcon } from './Icons.js';

const html = htm.bind(React.createElement);

const ActionItemTableRow = ({ item, onUpdateItem, onDeleteItem }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onUpdateItem({ ...item, [name]: value });
        if (e.target.tagName.toLowerCase() === 'textarea') {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const priorities = ['Low', 'Medium', 'High', 'Critical'];
    const statuses = ['Open', 'In Progress', 'Pending Review', 'Completed', 'Cancelled'];

    const isOverdue = item.dueDate && new Date(item.dueDate) < new Date() && item.status !== 'Completed' && item.status !== 'Cancelled';

    return html`
        <tr className=${`audit-item-row ${isOverdue ? 'overdue' : ''}`}>
            <td><textarea rows="1" name="title" value=${item.title} onInput=${handleInputChange} className="form-control" placeholder="Action Title" aria-label=${`Title for ${item.id}`}></textarea></td>
            <td><textarea name="description" value=${item.description} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Description" aria-label=${`Description for ${item.id}`}></textarea></td>
            <td><textarea rows="1" name="assignedTo" value=${item.assignedTo} onInput=${handleInputChange} className="form-control" placeholder="Assigned To" aria-label=${`Assigned to for ${item.id}`}></textarea></td>
            <td>
                <select name="priority" value=${item.priority} onChange=${handleInputChange} className="form-control" aria-label=${`Priority for ${item.id}`}>
                    ${priorities.map(priority => html`<option key=${priority} value=${priority}>${priority}</option>`)}
                </select>
            </td>
            <td>
                <select name="status" value=${item.status} onChange=${handleInputChange} className="form-control" aria-label=${`Status for ${item.id}`}>
                    ${statuses.map(status => html`<option key=${status} value=${status}>${status}</option>`)}
                </select>
            </td>
            <td><input type="date" name="dueDate" value=${item.dueDate} onInput=${handleInputChange} className="form-control" aria-label=${`Due date for ${item.id}`} /></td>
            <td><textarea rows="1" name="category" value=${item.category} onInput=${handleInputChange} className="form-control" placeholder="Category" aria-label=${`Category for ${item.id}`}></textarea></td>
            <td><input type="date" name="completedDate" value=${item.completedDate} onInput=${handleInputChange} className="form-control" aria-label=${`Completed date for ${item.id}`} /></td>
            <td><textarea name="notes" value=${item.notes} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Notes..." aria-label=${`Notes for ${item.id}`}></textarea></td>
            <td>
                <button type="button" className="delete-item-btn" onClick=${() => onDeleteItem(item.id)} aria-label=${`Delete action item ${item.title}`}>
                    <${TrashIcon} />
                </button>
            </td>
        </tr>
    `;
};

export const ActionItemTable = ({ actionItems, onUpdateItem, onDeleteItem }) => {
    if (!actionItems || actionItems.length === 0) {
        return html`
            <div className="empty-state">
                <h4>No Action Items Found</h4>
                <p>Add a new action item or adjust your filters.</p>
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
                        <th>Assigned To</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Due Date</th>
                        <th>Category</th>
                        <th>Completed</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${actionItems.map(item => html`
                        <${ActionItemTableRow}
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