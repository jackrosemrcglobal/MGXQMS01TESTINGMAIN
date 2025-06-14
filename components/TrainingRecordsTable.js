import React from 'react';
import htm from 'htm';
import { TrashIcon } from './Icons.js';

const html = htm.bind(React.createElement);

const TrainingRecordsTableRow = ({ item, onUpdateItem, onDeleteItem }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onUpdateItem({ ...item, [name]: value });
        if (e.target.tagName.toLowerCase() === 'textarea') {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const statuses = ['Completed', 'Scheduled', 'In Progress', 'Cancelled'];

    return html`
        <tr className="audit-item-row">
            <td><textarea name="employeeName" rows="1" value=${item.employeeName} onInput=${handleInputChange} className="form-control" placeholder="Employee Name" aria-label=${`Employee Name for ${item.id}`}></textarea></td>
            <td><textarea name="courseTitle" rows="1" value=${item.courseTitle} onInput=${handleInputChange} className="form-control" placeholder="Course Title" aria-label=${`Course Title for ${item.id}`}></textarea></td>
            <td><input type="date" name="trainingDate" value=${item.trainingDate} onInput=${handleInputChange} className="form-control" aria-label=${`Training Date for ${item.id}`} /></td>
            <td><input type="date" name="expirationDate" value=${item.expirationDate} onInput=${handleInputChange} className="form-control" aria-label=${`Expiration Date for ${item.id}`} /></td>
            <td>
                <select name="status" value=${item.status} onChange=${handleInputChange} className="form-control" aria-label=${`Status for ${item.id}`}>
                    ${statuses.map(status => html`<option key=${status} value=${status}>${status}</option>`)}
                </select>
            </td>
            <td><textarea name="trainer" rows="1" value=${item.trainer} onInput=${handleInputChange} className="form-control" placeholder="Trainer" aria-label=${`Trainer for ${item.id}`}></textarea></td>
            <td><textarea name="certificatePath" rows="1" value=${item.certificatePath} onInput=${handleInputChange} className="form-control" placeholder="Path/Link" aria-label=${`Certificate Path for ${item.id}`}></textarea></td>
            <td><textarea name="notes" value=${item.notes} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Notes..." aria-label=${`Notes for ${item.id}`}></textarea></td>
            <td>
                <button type="button" className="delete-item-btn" onClick=${() => onDeleteItem(item.id)} aria-label=${`Delete training record ${item.courseTitle} for ${item.employeeName}`}>
                    <${TrashIcon} />
                </button>
            </td>
        </tr>
    `;
};

export const TrainingRecordsTable = ({ records, onUpdateItem, onDeleteItem }) => {
    if (!records || records.length === 0) {
        return html`
            <div className="empty-state">
                <h4>No Training Records Found</h4>
                <p>Add a new record or adjust your filters.</p>
            </div>
        `;
    }

    return html`
        <div className="audit-table-container">
            <table className="audit-table">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Course Title</th>
                        <th>Training Date</th>
                        <th>Expiration Date</th>
                        <th>Status</th>
                        <th>Trainer</th>
                        <th>Certificate</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${records.map(item => html`
                        <${TrainingRecordsTableRow}
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