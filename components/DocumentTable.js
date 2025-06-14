import React from 'react';
import htm from 'htm';
import { TrashIcon } from './Icons.js';

const html = htm.bind(React.createElement);

const DocumentTableRow = ({ item, onUpdateItem, onDeleteItem }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onUpdateItem({ ...item, [name]: value });
        if (e.target.tagName.toLowerCase() === 'textarea') {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const statuses = ['Draft', 'Under Review', 'Approved', 'Obsolete'];

    return html`
        <tr className="audit-item-row">
            <td><textarea name="documentName" rows="1" value=${item.documentName} onInput=${handleInputChange} className="form-control" placeholder="Document Name" aria-label=${`Document Name for ${item.id}`}></textarea></td>
            <td><textarea name="version" rows="1" value=${item.version} onInput=${handleInputChange} className="form-control" placeholder="1.0" aria-label=${`Version for ${item.id}`}></textarea></td>
            <td>
                <select name="status" value=${item.status} onChange=${handleInputChange} className="form-control" aria-label=${`Status for ${item.id}`}>
                    ${statuses.map(status => html`<option key=${status} value=${status}>${status}</option>`)}
                </select>
            </td>
            <td><textarea name="documentType" rows="1" value=${item.documentType} onInput=${handleInputChange} className="form-control" placeholder="e.g. Policy, Procedure" aria-label=${`Document Type for ${item.id}`}></textarea></td>
            <td><textarea name="author" rows="1" value=${item.author} onInput=${handleInputChange} className="form-control" placeholder="Author Name" aria-label=${`Author for ${item.id}`}></textarea></td>
            <td><input type="date" name="dateCreated" value=${item.dateCreated} onInput=${handleInputChange} className="form-control" aria-label=${`Date Created for ${item.id}`} /></td>
            <td><input type="date" name="dateModified" value=${item.dateModified} onInput=${handleInputChange} className="form-control" aria-label=${`Date Modified for ${item.id}`} /></td>
            <td><input type="date" name="approvalDate" value=${item.approvalDate} onInput=${handleInputChange} className="form-control" aria-label=${`Approval Date for ${item.id}`} /></td>
            <td><input type="date" name="nextReviewDate" value=${item.nextReviewDate} onInput=${handleInputChange} className="form-control" aria-label=${`Next Review Date for ${item.id}`} /></td>
            <td><textarea name="changeSummary" value=${item.changeSummary} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Change Summary" aria-label=${`Change Summary for ${item.id}`}></textarea></td>
            <td><textarea name="filePath" rows="1" value=${item.filePath} onInput=${handleInputChange} className="form-control" placeholder="File Path/Location" aria-label=${`File Path for ${item.id}`}></textarea></td>
            <td><textarea name="notes" value=${item.notes} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Notes..." aria-label=${`Notes for ${item.id}`}></textarea></td>
            <td>
                <button type="button" className="delete-item-btn" onClick=${() => onDeleteItem(item.id)} aria-label=${`Delete document ${item.documentName}`}>
                    <${TrashIcon} />
                </button>
            </td>
        </tr>
    `;
};

export const DocumentTable = ({ documents, onUpdateItem, onDeleteItem }) => {
    if (!documents || documents.length === 0) {
        return html`
            <div className="empty-state">
                <h4>No Documents Found</h4>
                <p>Add a new document or adjust your filters.</p>
            </div>
        `;
    }

    return html`
        <div className="audit-table-container">
            <table className="audit-table">
                <thead>
                    <tr>
                        <th>Document Name</th>
                        <th>Version</th>
                        <th>Status</th>
                        <th>Type</th>
                        <th>Author</th>
                        <th>Date Created</th>
                        <th>Date Modified</th>
                        <th>Approval Date</th>
                        <th>Next Review</th>
                        <th>Change Summary</th>
                        <th>File Path</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${documents.map(item => html`
                        <${DocumentTableRow}
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