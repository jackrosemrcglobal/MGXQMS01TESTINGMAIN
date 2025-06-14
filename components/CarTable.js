import React from 'react';
import htm from 'htm';
import { TrashIcon } from './Icons.js';

const html = htm.bind(React.createElement);

const CarTableRow = ({ item, onUpdateItem, onDeleteItem }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onUpdateItem({ ...item, [name]: value });
        if (e.target.tagName.toLowerCase() === 'textarea') {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const statuses = ['Open', 'In Progress', 'Pending Verification', 'Closed'];

    return html`
        <tr className="audit-item-row">
            <td><textarea name="description" value=${item.description} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Description" aria-label=${`Description for ${item.id}`}></textarea></td>
            <td>
                <select name="status" value=${item.status} onChange=${handleInputChange} className="form-control" aria-label=${`Status for ${item.id}`}>
                    ${statuses.map(status => html`<option key=${status} value=${status}>${status}</option>`)}
                </select>
            </td>
            <td><textarea name="assignedTo" rows="1" value=${item.assignedTo} onInput=${handleInputChange} className="form-control" placeholder="Assigned To" aria-label=${`Assigned to for ${item.id}`}></textarea></td>
            <td><input type="date" name="dueDate" value=${item.dueDate} onInput=${handleInputChange} className="form-control" aria-label=${`Due date for ${item.id}`} /></td>
            <td><textarea name="correctiveAction" value=${item.correctiveAction} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Corrective Action" aria-label=${`Corrective action for ${item.id}`}></textarea></td>
            <td><textarea name="notes" value=${item.notes} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Notes..." aria-label=${`Notes for ${item.id}`}></textarea></td>
            <td>
                <button type="button" className="delete-item-btn" onClick=${() => onDeleteItem(item.id)} aria-label=${`Delete CAR ${item.id}`}>
                    <${TrashIcon} />
                </button>
            </td>
        </tr>
    `;
};


export const CarTable = ({ cars, onUpdateItem, onDeleteItem }) => {
    if (!cars || cars.length === 0) {
        return html`
            <div className="empty-state">
                <h4>No Corrective Action Requests Found</h4>
                <p>Add a new CAR or adjust your filters.</p>
            </div>
        `;
    }

    return html`
        <div className="audit-table-container">
            <table className="audit-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Assigned To</th>
                        <th>Due Date</th>
                        <th>Corrective Action</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${cars.map(item => html`
                        <${CarTableRow}
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