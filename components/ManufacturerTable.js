import React from 'react';
import htm from 'htm';
import { TrashIcon } from './Icons.js';

const html = htm.bind(React.createElement);

const ManufacturerTableRow = ({ item, onUpdateItem, onDeleteItem }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onUpdateItem({ ...item, [name]: value });
        if (e.target.tagName.toLowerCase() === 'textarea') {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const approvalStatuses = ['Approved', 'Probationary', 'Pending', 'Disqualified'];

    return html`
        <tr className="audit-item-row">
            <td><textarea name="name" rows="1" value=${item.name} onInput=${handleInputChange} className="form-control" placeholder="Name" aria-label=${`Name for ${item.id}`}></textarea></td>
            <td>
                <select name="approvalStatus" value=${item.approvalStatus} onChange=${handleInputChange} className="form-control" aria-label=${`Approval status for ${item.name}`}>
                    ${approvalStatuses.map(status => html`<option key=${status} value=${status}>${status}</option>`)}
                </select>
            </td>
            <td><textarea name="materials" rows="1" value=${item.materials} onInput=${handleInputChange} className="form-control" placeholder="Materials Offered" aria-label=${`Materials for ${item.name}`}></textarea></td>
            <td><textarea name="region" rows="1" value=${item.region} onInput=${handleInputChange} className="form-control" placeholder="Region" aria-label=${`Region for ${item.name}`}></textarea></td>
            <td><textarea name="country" rows="1" value=${item.country} onInput=${handleInputChange} className="form-control" placeholder="Country" aria-label=${`Country for ${item.name}`}></textarea></td>
            <td><textarea name="location" rows="1" value=${item.location} onInput=${handleInputChange} className="form-control" placeholder="City, State/Province" aria-label=${`Location for ${item.name}`}></textarea></td>
            <td><textarea name="capabilities" rows="1" value=${item.capabilities} onInput=${handleInputChange} className="form-control" placeholder="Capabilities" aria-label=${`Capabilities for ${item.name}`}></textarea></td>
            <td><input type="date" name="lastAuditDate" value=${item.lastAuditDate} onInput=${handleInputChange} className="form-control" aria-label=${`Last audit date for ${item.name}`} /></td>
            <td><textarea name="notes" value=${item.notes} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Audit/Inspection Notes..." aria-label=${`Notes for ${item.name}`}></textarea></td>
            <td>
                <button type="button" className="delete-item-btn" onClick=${() => onDeleteItem(item.id)} aria-label=${`Delete manufacturer ${item.name}`}>
                    <${TrashIcon} />
                </button>
            </td>
        </tr>
    `;
};


export const ManufacturerTable = ({ manufacturers, onUpdateItem, onDeleteItem }) => {
    if (!manufacturers || manufacturers.length === 0) {
        return html`
            <div className="empty-state">
                <h4>No Manufacturers Found</h4>
                <p>Add a new manufacturer or adjust your filters.</p>
            </div>
        `;
    }

    return html`
        <div className="audit-table-container">
            <table className="audit-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Materials</th>
                        <th>Region</th>
                        <th>Country</th>
                        <th>Location</th>
                        <th>Capabilities</th>
                        <th>Last Audit</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${manufacturers.map(item => html`
                        <${ManufacturerTableRow}
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