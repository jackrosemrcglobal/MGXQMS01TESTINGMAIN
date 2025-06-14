import React from 'react';
import htm from 'htm';
import { TrashIcon } from './Icons.js';

const html = htm.bind(React.createElement);

const QcTestResultsTableRow = ({ item, onUpdateItem, onDeleteItem }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onUpdateItem({ ...item, [name]: value });
        if (e.target.tagName.toLowerCase() === 'textarea') {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const statuses = ['Pass', 'Fail', 'Pending', 'Retest'];

    return html`
        <tr className="audit-item-row">
            <td><textarea name="sampleId" rows="1" value=${item.sampleId} onInput=${handleInputChange} className="form-control" placeholder="Sample ID" aria-label=${`Sample ID for ${item.id}`}></textarea></td>
            <td><input type="date" name="testDate" value=${item.testDate} onInput=${handleInputChange} className="form-control" aria-label=${`Test Date for ${item.id}`} /></td>
            <td><textarea name="product" rows="1" value=${item.product} onInput=${handleInputChange} className="form-control" placeholder="Product/Material" aria-label=${`Product for ${item.id}`}></textarea></td>
            <td><textarea name="testParameter" rows="1" value=${item.testParameter} onInput=${handleInputChange} className="form-control" placeholder="Test Parameter" aria-label=${`Test Parameter for ${item.id}`}></textarea></td>
            <td><textarea name="specificationLimit" rows="1" value=${item.specificationLimit} onInput=${handleInputChange} className="form-control" placeholder="Spec Limit" aria-label=${`Specification Limit for ${item.id}`}></textarea></td>
            <td><textarea name="actualResult" rows="1" value=${item.actualResult} onInput=${handleInputChange} className="form-control" placeholder="Actual Result" aria-label=${`Actual Result for ${item.id}`}></textarea></td>
            <td>
                <select name="status" value=${item.status} onChange=${handleInputChange} className="form-control" aria-label=${`Status for ${item.id}`}>
                    ${statuses.map(status => html`<option key=${status} value=${status}>${status}</option>`)}
                </select>
            </td>
            <td><textarea name="operator" rows="1" value=${item.operator} onInput=${handleInputChange} className="form-control" placeholder="Operator" aria-label=${`Operator for ${item.id}`}></textarea></td>
            <td><textarea name="equipment" rows="1" value=${item.equipment} onInput=${handleInputChange} className="form-control" placeholder="Equipment Used" aria-label=${`Equipment for ${item.id}`}></textarea></td>
            <td><textarea name="notes" value=${item.notes} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Notes..." aria-label=${`Notes for ${item.id}`}></textarea></td>
            <td>
                <button type="button" className="delete-item-btn" onClick=${() => onDeleteItem(item.id)} aria-label=${`Delete QC test result ${item.sampleId}`}>
                    <${TrashIcon} />
                </button>
            </td>
        </tr>
    `;
};

export const QcTestResultsTable = ({ testResults, onUpdateItem, onDeleteItem }) => {
    if (!testResults || testResults.length === 0) {
        return html`
            <div className="empty-state">
                <h4>No QC Test Results Found</h4>
                <p>Add a new test result or adjust your filters.</p>
            </div>
        `;
    }

    return html`
        <div className="audit-table-container">
            <table className="audit-table">
                <thead>
                    <tr>
                        <th>Sample ID</th>
                        <th>Test Date</th>
                        <th>Product/Material</th>
                        <th>Test Parameter</th>
                        <th>Spec Limit</th>
                        <th>Actual Result</th>
                        <th>Status</th>
                        <th>Operator</th>
                        <th>Equipment</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${testResults.map(item => html`
                        <${QcTestResultsTableRow}
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