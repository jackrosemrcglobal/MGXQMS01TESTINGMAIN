import React from 'react';
import htm from 'htm';
import { TrashIcon } from './Icons.js';

const html = htm.bind(React.createElement);

const ScorecardTableRow = ({ item, onUpdateItem, onDeleteItem }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onUpdateItem({ ...item, [name]: value });
        if (e.target.tagName.toLowerCase() === 'textarea') {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    const getScoreColor = (score) => {
        if (score >= 95) return 'score-excellent';
        if (score >= 85) return 'score-good';
        if (score >= 75) return 'score-average';
        return 'score-poor';
    };

    return html`
        <tr className="audit-item-row">
            <td><textarea name="supplierName" rows="1" value=${item.supplierName} onInput=${handleInputChange} className="form-control" placeholder="Supplier Name" aria-label=${`Supplier Name for ${item.id}`}></textarea></td>
            <td><textarea name="period" rows="1" value=${item.period} onInput=${handleInputChange} className="form-control" placeholder="e.g. 2024-Q3" aria-label=${`Period for ${item.id}`}></textarea></td>
            <td><input type="number" name="onTimeDelivery" value=${item.onTimeDelivery} onInput=${handleInputChange} className="form-control" min="0" max="100" step="0.1" placeholder="%" aria-label=${`On-Time Delivery for ${item.id}`} /></td>
            <td><input type="number" name="qualityAcceptance" value=${item.qualityAcceptance} onInput=${handleInputChange} className="form-control" min="0" max="100" step="0.1" placeholder="%" aria-label=${`Quality Acceptance for ${item.id}`} /></td>
            <td><input type="number" name="carResponseTime" value=${item.carResponseTime} onInput=${handleInputChange} className="form-control" min="0" placeholder="days" aria-label=${`CAR Response Time for ${item.id}`} /></td>
            <td className=${`score-cell ${getScoreColor(item.overallScore)}`}>
                <strong>${item.overallScore}</strong>
            </td>
            <td><textarea name="notes" value=${item.notes} onInput=${handleInputChange} className="form-control" rows="1" placeholder="Notes..." aria-label=${`Notes for ${item.id}`}></textarea></td>
            <td>
                <button type="button" className="delete-item-btn" onClick=${() => onDeleteItem(item.id)} aria-label=${`Delete scorecard ${item.supplierName}`}>
                    <${TrashIcon} />
                </button>
            </td>
        </tr>
    `;
};

export const SupplierScorecardTable = ({ scorecards, onUpdateItem, onDeleteItem }) => {
    if (!scorecards || scorecards.length === 0) {
        return html`
            <div className="empty-state">
                <h4>No Supplier Scorecards Found</h4>
                <p>Add a new scorecard entry or adjust your filters.</p>
            </div>
        `;
    }

    return html`
        <div className="audit-table-container">
            <table className="audit-table">
                <thead>
                    <tr>
                        <th>Supplier Name</th>
                        <th>Period</th>
                        <th>On-Time Delivery (%)</th>
                        <th>Quality Acceptance (%)</th>
                        <th>CAR Response Time (days)</th>
                        <th>Overall Score</th>
                        <th>Notes</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${scorecards.map(item => html`
                        <${ScorecardTableRow}
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