import React from 'react';
import htm from 'htm';
import { CloseIcon } from './Icons.js';
import { ModuleCreator } from './ModuleCreator.js';
import { getAllModules, getCustomModules, deleteCustomModule } from '../data/appConfig.js';

const html = htm.bind(React.createElement);
const { useState } = React;

export const AdminSidebar = ({ isOpen, onClose, appConfig, enabledModules, onToggleModule, groups }) => {
    const [isModuleCreatorOpen, setModuleCreatorOpen] = useState(false);
    const [allModules, setAllModules] = useState(getAllModules());

    const handleModuleCreated = (moduleKey, module) => {
        // Refresh the modules list
        const updatedModules = getAllModules();
        setAllModules(updatedModules);
        
        // If a specific module was created, enable it
        if (moduleKey && !enabledModules.includes(moduleKey)) {
            onToggleModule(moduleKey);
        }
        
        setModuleCreatorOpen(false);
    };

    const handleDeleteCustomModule = (moduleKey) => {
        if (window.confirm('Are you sure you want to delete this custom module? This action cannot be undone.')) {
            try {
                deleteCustomModule(moduleKey);
                const updatedModules = getAllModules();
                setAllModules(updatedModules);
                
                // If the module was enabled, disable it
                if (enabledModules.includes(moduleKey)) {
                    onToggleModule(moduleKey);
                }
                
                alert('Module deleted successfully');
            } catch (error) {
                alert(`Failed to delete module: ${error.message}`);
            }
        }
    };

    return html`
        <div className=${`admin-sidebar ${isOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="sidebar-title">
            <div className="sidebar-header">
                <h3 id="sidebar-title">Settings</h3>
                <button onClick=${onClose} className="close-sidebar-btn" aria-label="Close settings">
                    <${CloseIcon} />
                </button>
            </div>
            <div className="sidebar-content">
                <div className="module-management-section">
                    <h4>Module Management</h4>
                    <button 
                        className="btn create-module-btn" 
                        onClick=${() => setModuleCreatorOpen(true)}
                    >
                        Create New Module
                    </button>
                </div>

                <h4>Enabled Modules</h4>
                <p>Select which modules are available in the application.</p>
                
                ${Object.entries(groups).map(([groupKey, group]) => {
                    // Check if there are any modules to render for this group
                    const visibleModules = group.modules.filter(moduleKey => allModules[moduleKey]);
                    if (visibleModules.length === 0) return null;

                    return html`
                        <div key=${groupKey} className="module-group">
                            <h5>${group.title}</h5>
                            <ul className="module-toggle-list">
                                ${visibleModules.map(moduleKey => {
                                    const config = allModules[moduleKey];
                                    return html`
                                        <li key=${moduleKey}>
                                           <label className="module-toggle-label">
                                                <input 
                                                    type="checkbox" 
                                                    checked=${enabledModules.includes(moduleKey)}
                                                    onChange=${() => onToggleModule(moduleKey)}
                                                />
                                                <span className="module-title">${config.title}</span>
                                                ${config.isCustom && html`
                                                    <button
                                                        type="button"
                                                        className="delete-custom-module-btn"
                                                        onClick=${(e) => {
                                                            e.preventDefault();
                                                            e.stopPropagation();
                                                            handleDeleteCustomModule(moduleKey);
                                                        }}
                                                        title="Delete custom module"
                                                        aria-label=${`Delete ${config.title}`}
                                                    >
                                                        ×
                                                    </button>
                                                `}
                                           </label>
                                        </li>
                                    `;
                                })}
                            </ul>
                        </div>
                    `;
                })}

                ${/* Custom modules group if any exist */
                (() => {
                    const customModules = getCustomModules();
                    const customKeys = Object.keys(customModules);
                    if (customKeys.length === 0) return null;

                    return html`
                        <div className="module-group">
                            <h5>Custom Modules</h5>
                            <ul className="module-toggle-list">
                                ${customKeys.map(moduleKey => {
                                    const config = customModules[moduleKey];
                                    return html`
                                        <li key=${moduleKey}>
                                           <label className="module-toggle-label">
                                                <input 
                                                    type="checkbox" 
                                                    checked=${enabledModules.includes(moduleKey)}
                                                    onChange=${() => onToggleModule(moduleKey)}
                                                />
                                                <span className="module-title">${config.title}</span>
                                                <button
                                                    type="button"
                                                    className="delete-custom-module-btn"
                                                    onClick=${(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleDeleteCustomModule(moduleKey);
                                                    }}
                                                    title="Delete custom module"
                                                    aria-label=${`Delete ${config.title}`}
                                                >
                                                    ×
                                                </button>
                                           </label>
                                        </li>
                                    `;
                                })}
                            </ul>
                        </div>
                    `;
                })()}
            </div>
        </div>
        ${isOpen && html`<div className="sidebar-overlay" onClick=${onClose}></div>`}
        <${ModuleCreator}
            isOpen=${isModuleCreatorOpen}
            onClose=${() => setModuleCreatorOpen(false)}
            onModuleCreated=${handleModuleCreated}
        />
    `;
};