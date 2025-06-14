import React from 'react';
import htm from 'htm';
import { TrashIcon } from './Icons.js';

const html = htm.bind(React.createElement);

/**
 * AuditChecklistTableRow Component (Table View)
 */
const AuditChecklistTableRow = ({ item, onUpdate, onDelete, displayReferenceColumn }) => {
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        onUpdate({ ...item, [name]: newValue });
        if (e.target.tagName.toLowerCase() === 'textarea') {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    return html`
        <tr className="audit-item-row">
            <td>
                <input
                    type="checkbox"
                    id=${`item-checkbox-table-${item.id}`}
                    name="completed"
                    checked=${item.completed}
                    onChange=${handleInputChange}
                    aria-label=${item.text}
                />
            </td>
            <td>${item.text}</td>
             ${displayReferenceColumn && html`
                <td>
                    ${item.hasOwnProperty('reference') ? html`
                        <textarea
                            rows="1"
                            id=${`item-reference-table-${item.id}`}
                            name="reference"
                            className="form-control"
                            value=${item.reference}
                            onInput=${handleInputChange}
                            placeholder="e.g., ISO 9001: 7.1.5"
                        ></textarea>
                    ` : ''}
                </td>
            `}
            <td>
                 <select
                    id=${`item-status-table-${item.id}`}
                    name="status"
                    className="form-control"
                    value=${item.status}
                    onChange=${handleInputChange}
                >
                    <option value="not-started">Not Started</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="needs-review">Needs Review</option>
                </select>
            </td>
            <td>
                <textarea
                    id=${`item-comments-table-${item.id}`}
                    name="comments"
                    className="form-control"
                    rows="1"
                    value=${item.comments}
                    onInput=${handleInputChange}
                    placeholder="Observations..."
                ></textarea>
            </td>
            <td>
                 <textarea
                    id=${`item-actions-table-${item.id}`}
                    name="actions"
                    className="form-control"
                    rows="1"
                    value=${item.actions}
                    onInput=${handleInputChange}
                    placeholder="Actions..."
                ></textarea>
            </td>
            <td>
                <button
                    type="button"
                    className="delete-item-btn"
                    onClick=${() => onDelete(item.id)}
                    aria-label=${`Delete item: ${item.text}`}
                >
                    <${TrashIcon} />
                </button>
            </td>
        </tr>
    `;
};

/**
 * AuditChecklistTable Component (Presentational Table View)
 */
export const AuditChecklistTable = ({ items, onUpdate, onDelete }) => {
    if (!items || items.length === 0) {
        return html`
            <div className="empty-state">
                <h4>No Audit Items</h4>
                <p>Add an item to get started.</p>
            </div>
        `;
    }

    const displayReferenceColumn = items.length > 0 && items.some(i => i.hasOwnProperty('reference'));

    return html`
        <div className="audit-table-container">
            <table className="audit-table">
                <thead>
                    <tr>
                        <th>Done</th>
                        <th>Checklist Item</th>
                        ${displayReferenceColumn && html`<th>Reference</th>`}
                        <th>Status</th>
                        <th>Comments</th>
                        <th>Corrective Actions</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${items.map(item => html`
                        <${AuditChecklistTableRow}
                            key=${item.id}
                            item=${item}
                            onUpdate=${onUpdate}
                            onDelete=${onDelete}
                            displayReferenceColumn=${displayReferenceColumn}
                        />
                    `)}
                </tbody>
            </table>
        </div>
    `;
};