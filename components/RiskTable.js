import React from 'react';
import htm from 'htm';
import { TrashIcon } from './Icons.js';

const html = htm.bind(React.createElement);

const RiskTableRow = ({ risk, data, onUpdateRisk, onDeleteRisk }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onUpdateRisk({ ...risk, [name]: value });
        if (e.target.tagName.toLowerCase() === 'textarea') {
            e.target.style.height = 'auto';
            e.target.style.height = `${e.target.scrollHeight}px`;
        }
    };

    return html`
        <tr className="audit-item-row">
            <td>
                 <textarea
                    name="description"
                    className="form-control"
                    rows="1"
                    value=${risk.description}
                    onInput=${handleInputChange}
                    placeholder="Risk Description"
                ></textarea>
            </td>
            <td>
                <select
                    name="severity"
                    className="form-control"
                    value=${risk.severity}
                    onChange=${handleInputChange}
                >
                    ${data.severityLevels.map(s => html`<option key=${s} value=${s}>${s}</option>`)}
                </select>
            </td>
            <td>
                <select
                    name="likelihood"
                    className="form-control"
                    value=${risk.likelihood}
                    onChange=${handleInputChange}
                >
                    ${data.likelihoodLevels.map(l => html`<option key=${l} value=${l}>${l}</option>`)}
                </select>
            </td>
            <td>
                <textarea
                    name="mitigation"
                    className="form-control"
                    rows="1"
                    value=${risk.mitigation}
                    onInput=${handleInputChange}
                    placeholder="Mitigation Plan..."
                ></textarea>
            </td>
            <td>
                <button
                    type="button"
                    className="delete-item-btn"
                    onClick=${() => onDeleteRisk(risk.id)}
                    aria-label=${`Delete risk: ${risk.description}`}
                >
                    <${TrashIcon} />
                </button>
            </td>
        </tr>
    `;
};

export const RiskTable = ({ data, onUpdateRisk, onDeleteRisk }) => {
    if (!data.risks || data.risks.length === 0) {
        return html`
            <div className="empty-state">
                <h4>No Risks Defined</h4>
                <p>Add a risk to get started.</p>
            </div>
        `;
    }

    return html`
        <div className="audit-table-container">
            <table className="audit-table">
                <thead>
                    <tr>
                        <th>Description</th>
                        <th>Severity</th>
                        <th>Likelihood</th>
                        <th>Mitigation Plan</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${data.risks.map(risk => html`
                        <${RiskTableRow}
                            key=${risk.id}
                            risk=${risk}
                            data=${data}
                            onUpdateRisk=${onUpdateRisk}
                            onDeleteRisk=${onDeleteRisk}
                        />
                    `)}
                </tbody>
            </table>
        </div>
    `;
};