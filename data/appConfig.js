// Module Groups Definition
export const MODULE_GROUPS = {
    core: {
        title: "Core QMS",
        modules: ['documentControl', 'changeRequests', 'actionItems', 'trainingRecords']
    },
    audits: {
        title: "Audit Management",
        modules: ['internalAuditScheduler', 'auditFindings', 'internal', 'supplier', 'advancedAudit', 'auditChecklistGenerator']
    },
    capa: {
        title: "CAPA",
        modules: ['car', 'par', 'eightDChecklist']
    },
    suppliers: {
        title: "Supplier Management",
        modules: ['aml', 'supplierScorecard', 'purchasingChecklist']
    },
    risk: {
        title: "Risk Management",
        modules: ['risk']
    },
    qc: {
        title: "Quality Control",
        modules: ['qcTestResults', 'controlChart', 'inspectionChecklistGenerator', 'receivingChecklist']
    },
    processChecklists: {
        title: "Process Checklists",
        modules: ['salesChecklist', 'preDeliveryChecklist', 'pdcaChecklist']
    }
};

// Core QMS Modules
const CORE_QMS_MODULES = {
    documentControl: {
        title: "Document Version Control",
        component: 'DocumentVersionControl',
        storageKey: "qms-document-control",
        category: "core",
        initialData: [
            { id: 'doc-1', documentName: 'Quality Manual', version: '3.2', status: 'Approved', documentType: 'Manual', author: 'Quality Manager', dateCreated: '2023-01-15', dateModified: '2024-03-10', approvalDate: '2024-03-15', nextReviewDate: '2025-03-15', changeSummary: 'Updated section 4.1 to align with new organizational chart', filePath: '/docs/quality/QM-v3.2.pdf', notes: 'Distributed to all department heads' },
            { id: 'doc-2', documentName: 'Calibration Procedure', version: '2.1', status: 'Under Review', documentType: 'Procedure', author: 'Lab Supervisor', dateCreated: '2023-06-01', dateModified: '2024-05-20', approvalDate: '', nextReviewDate: '2024-07-01', changeSummary: 'Added new equipment calibration requirements', filePath: '/docs/procedures/CAL-PROC-v2.1.docx', notes: 'Pending technical review by Engineering' },
            { id: 'doc-3', documentName: 'Supplier Evaluation Form', version: '1.5', status: 'Approved', documentType: 'Form', author: 'Procurement Lead', dateCreated: '2022-10-12', dateModified: '2024-01-08', approvalDate: '2024-01-15', nextReviewDate: '2025-01-15', changeSummary: 'Added environmental compliance criteria', filePath: '/docs/forms/SUPP-EVAL-v1.5.xlsx', notes: '' },
        ]
    },
    changeRequests: {
        title: "Change Request Form",
        component: 'ChangeRequestForm',
        storageKey: "qms-change-requests",
        category: "core",
        initialData: [
            { id: 'cr-1', requestTitle: 'Update Quality Manual Section 4.2', description: 'Update document control procedures to align with new ISO requirements', requestor: 'Quality Manager', dateSubmitted: '2024-05-20', status: 'Under Review', priority: 'High', impactAnalysis: 'Will affect all document control processes. Training required for all staff.', businessJustification: 'Required for ISO compliance and certification maintenance.', approvalHistory: 'Submitted for technical review - Quality Committee', implementationDate: '2024-07-15', notes: 'Coordination with IT department required for system updates' },
            { id: 'cr-2', requestTitle: 'New Supplier Evaluation Process', description: 'Implement enhanced supplier evaluation criteria including environmental compliance', requestor: 'Procurement Lead', dateSubmitted: '2024-05-18', status: 'Approved', priority: 'Medium', impactAnalysis: 'Will extend supplier qualification timeline by 2-3 weeks. Additional resources needed for environmental assessments.', businessJustification: 'Improves supply chain sustainability and reduces compliance risks.', approvalHistory: 'Approved by Management Review Committee on 2024-05-25', implementationDate: '2024-08-01', notes: 'Training materials being developed for procurement team' },
            { id: 'cr-3', requestTitle: 'Calibration Schedule Optimization', description: 'Revise calibration intervals for precision measuring equipment based on historical data', requestor: 'Lab Supervisor', dateSubmitted: '2024-05-10', status: 'Implemented', priority: 'Low', impactAnalysis: 'Reduced calibration frequency for stable equipment. Cost savings of ~$5000/year.', businessJustification: 'Data-driven approach to optimize maintenance costs while maintaining accuracy.', approvalHistory: 'Approved by Technical Committee on 2024-05-15. Implemented on 2024-06-01.', implementationDate: '2024-06-01', notes: 'Monitoring performance for first 6 months to validate changes' },
        ]
    },
    actionItems: {
        title: "Action Item List",
        component: 'ActionItemList',
        storageKey: "qms-action-items",
        category: "core",
        initialData: [
            { id: 'ai-1', title: 'Update quality manual section 4.2', description: 'Revise document control procedures per new ISO requirements', assignedTo: 'Alice Johnson', priority: 'High', status: 'Open', dueDate: '2024-07-20', category: 'Documentation', completedDate: '', notes: 'Coordinate with legal team for compliance review' },
            { id: 'ai-2', title: 'Calibrate measurement equipment', description: 'Annual calibration of precision measuring tools in Lab C', assignedTo: 'Bob Smith', priority: 'Medium', status: 'In Progress', dueDate: '2024-06-25', category: 'Maintenance', completedDate: '', notes: 'Waiting for external calibration service appointment' },
            { id: 'ai-3', title: 'Conduct supplier training session', description: 'Training on new quality requirements for key suppliers', assignedTo: 'Carol Brown', priority: 'Medium', status: 'Completed', dueDate: '2024-05-30', category: 'Training', completedDate: '2024-05-28', notes: 'All 12 key suppliers attended. Follow-up assessments scheduled.' },
        ]
    },
    trainingRecords: {
        title: "Training Records",
        component: "TrainingRecords",
        storageKey: "qms-training-records",
        category: "core",
        initialData: [
            { id: 'tr-1', employeeName: 'John Doe', courseTitle: 'ISO 9001:2015 Awareness', trainingDate: '2024-01-15', expirationDate: '2026-01-14', status: 'Completed', trainer: 'QMS Academy', certificatePath: '/certs/jd-iso.pdf', notes: 'Scored 95% on assessment.' },
            { id: 'tr-2', employeeName: 'Jane Smith', courseTitle: 'Internal Auditor Training', trainingDate: '2023-09-01', expirationDate: '2025-08-31', status: 'Completed', trainer: 'Internal (John Doe)', certificatePath: '/certs/js-ia.pdf', notes: '' },
            { id: 'tr-3', employeeName: 'Peter Jones', courseTitle: 'Forklift Operation Safety', trainingDate: '2024-06-10', expirationDate: '2027-06-09', status: 'Completed', trainer: 'Safety First Inc.', certificatePath: '/certs/pj-forklift.pdf', notes: 'Practical exam passed.' },
            { id: 'tr-4', employeeName: 'Alice Johnson', courseTitle: 'Advanced Welding Techniques', trainingDate: '2024-07-25', expirationDate: '', status: 'Scheduled', trainer: 'Welders Guild', certificatePath: '', notes: 'Scheduled for next month.' },
        ]
    }
};

// Audit Management Modules
const AUDIT_MODULES = {
    internalAuditScheduler: {
        title: "Internal Audit Scheduler",
        component: 'InternalAuditScheduler',
        storageKey: "qms-audit-scheduler",
        category: "audits",
        initialData: [
            { id: 'ias-1', auditTitle: 'Q1 Engineering Process Audit', auditType: 'Process', department: 'Engineering', leadAuditor: 'John Doe', auditTeam: 'Jane Smith, Peter Jones', scheduledStartDate: '2024-07-25', scheduledEndDate: '2024-07-26', status: 'Planned', notes: 'Focus on new design control process.' },
            { id: 'ias-2', auditTitle: 'Annual ISO 9001 Surveillance Audit Prep', auditType: 'System', department: 'All', leadAuditor: 'Alice Johnson', auditTeam: 'Bob Smith', scheduledStartDate: '2024-08-10', scheduledEndDate: '2024-08-12', status: 'Planned', notes: '' },
            { id: 'ias-3', auditTitle: 'Supplier XYZ On-site Audit', auditType: 'Supplier', department: 'Procurement', leadAuditor: 'Carol Brown', auditTeam: '', scheduledStartDate: '2024-06-20', scheduledEndDate: '2024-06-20', status: 'Completed', notes: 'Audit report filed under SR-XYZ-2024-01.' },
            { id: 'ias-4', auditTitle: 'Production Line 3 Welding Process Audit', auditType: 'Process', department: 'Production', leadAuditor: 'John Doe', auditTeam: 'Mike Wilson', scheduledStartDate: '2024-07-05', scheduledEndDate: '2024-07-05', status: 'In Progress', notes: 'Day 1 of 1 completed, report pending.' },
        ]
    },
    auditFindings: {
        title: "Audit Findings",
        component: 'AuditFindingsList',
        storageKey: "qms-audit-findings",
        category: "audits",
        initialData: [
            { id: 'af-1', finding: 'Procedure for document control not consistently followed.', auditType: 'Internal Process Audit', department: 'Engineering', severity: 'Major', status: 'Open', carId: 'car-4', dateFound: '2024-05-10', notes: 'See audit report IA-2024-03 for details.' },
            { id: 'af-2', finding: 'Calibration records for calipers in lab B are expired.', auditType: 'Internal Process Audit', department: 'Quality Lab', severity: 'Minor', status: 'In Progress', carId: 'car-5', dateFound: '2024-05-12', notes: 'CAR has been issued.' },
            { id: 'af-3', finding: 'Supplier XYZ has not provided material traceability certificates for last 3 shipments.', auditType: 'Supplier Audit', department: 'Procurement', severity: 'Critical', status: 'Open', carId: '', dateFound: '2024-04-28', notes: 'Immediate action required.' }
        ]
    },
    internal: {
        title: "Internal Process Audit",
        component: 'ChecklistWrapper',
        storageKey: "qms-checklist-internal",
        category: "audits",
        initialData: [
            { id: 'ia-1', text: "Are quality objectives established and communicated?", completed: false, comments: "", actions: "", status: "not-started" },
            { id: 'ia-2', text: "Is the Quality Policy available, understood, and applied?", completed: false, comments: "", actions: "", status: "not-started" },
            { id: 'ia-3', text: "Are processes for the QMS defined and documented?", completed: true, comments: "Process maps are available on the intranet.", actions: "N/A", status: "completed" },
            { id: 'ia-4', text: "Are records of management reviews maintained?", completed: false, comments: "Last review meeting minutes need to be uploaded.", actions: "Follow up with management team.", status: "in-progress" },
        ]
    },
    supplier: {
        title: "Supplier Audit",
        component: 'ChecklistWrapper',
        storageKey: "qms-checklist-supplier",
        category: "audits",
        initialData: [
            { id: 'sa-1', text: "Does the supplier have a documented quality management system?", completed: false, comments: "", actions: "", status: "not-started" },
            { id: 'sa-2', text: "Are supplier's calibration records for equipment up to date?", completed: false, comments: "", actions: "", status: "not-started" },
        ]
    },
    advancedAudit: {
        title: "Advanced Audit",
        component: 'ChecklistWrapper',
        storageKey: "qms-checklist-advanced",
        category: "audits",
        initialData: [
            { id: 'aa-1', text: "Is there a process for determining and providing necessary resources?", completed: false, comments: "", actions: "", status: "not-started", reference: "ISO 9001: 7.1" },
            { id: 'aa-2', text: "Are monitoring and measuring resources suitable and maintained?", completed: false, comments: "", actions: "", status: "not-started", reference: "ISO 9001: 7.1.5" },
        ]
    },
    auditChecklistGenerator: {
        title: "Audit Checklist Generator",
        component: 'ChecklistGenerator',
        storageKey: "qms-checklist-audit-generator",
        category: "audits",
        initialData: []
    }
};

// CAPA Modules
const CAPA_MODULES = {
    car: {
        title: "Corrective Action Requests",
        component: 'CorrectiveActionRequest',
        storageKey: "qms-car-tracker",
        category: "capa",
        initialData: [
            { id: 'car-1', description: 'Audit finding A-123 requires action', status: 'Open', assignedTo: 'Peter Pan', dueDate: '2024-07-15', correctiveAction: '', notes: 'Related to supplier audit #55' },
            { id: 'car-2', description: 'Customer complaint about product finish', status: 'In Progress', assignedTo: 'Wendy Darling', dueDate: '2024-06-30', correctiveAction: 'Reviewing polishing process parameters.', notes: '' },
            { id: 'car-3', description: 'Late delivery from vendor XYZ', status: 'Pending Verification', assignedTo: 'Captain Hook', dueDate: '2024-05-20', correctiveAction: 'Alternate shipping route established and tested.', notes: 'First shipment with new route arrived on time.' },
        ]
    },
    par: {
        title: "Preventive Action Requests",
        component: 'PreventiveActionRequest',
        storageKey: "qms-par-tracker",
        category: "capa",
        initialData: [
            { id: 'par-1', title: 'Equipment Maintenance Schedule Review', description: 'Review and update preventive maintenance schedules for critical production equipment to prevent failures', status: 'Open', priority: 'High', assignedTo: 'Maintenance Manager', dueDate: '2024-08-15', rootCauseAnalysis: 'Analysis of recent equipment downtime shows maintenance intervals may be inadequate for high-usage equipment.', preventiveActionPlan: 'Implement condition-based monitoring and adjust maintenance frequencies based on actual usage patterns.', implementationDate: '', effectivenessVerification: '', notes: 'Coordinate with production planning to minimize disruption' },
            { id: 'par-2', title: 'Supplier Quality Training Program', description: 'Develop comprehensive training program for suppliers to prevent quality issues before they occur', status: 'In Progress', priority: 'Medium', assignedTo: 'Quality Engineer', dueDate: '2024-07-30', rootCauseAnalysis: 'Trend analysis shows recurring quality issues from suppliers lacking adequate quality systems understanding.', preventiveActionPlan: 'Create standardized training modules covering quality requirements, inspection procedures, and documentation standards.', implementationDate: '', effectivenessVerification: 'Monitor supplier quality metrics for 6 months post-training', notes: 'Pilot program with top 5 suppliers first' },
            { id: 'par-3', title: 'Document Control System Enhancement', description: 'Upgrade document management system to prevent obsolete document usage', status: 'Implemented', priority: 'Medium', assignedTo: 'Document Controller', dueDate: '2024-06-01', rootCauseAnalysis: 'Several instances of obsolete procedures being used due to inadequate version control and notification systems.', preventiveActionPlan: 'Implement automated notifications for document updates and enhanced access controls to prevent obsolete document access.', implementationDate: '2024-05-25', effectivenessVerification: 'No obsolete document incidents in past 3 months. System usage compliance at 98%.', notes: 'Training completed for all staff. System performance excellent.' },
        ]
    },
    eightDChecklist: {
        title: "8D Checklist",
        component: 'ChecklistGenerator',
        storageKey: "qms-checklist-8d",
        category: "capa",
        initialData: []
    }
};

// Supplier Management Modules
const SUPPLIER_MODULES = {
    aml: {
        title: "Approved Manufacturer List",
        component: 'ApprovedManufacturerList',
        storageKey: "qms-aml",
        category: "suppliers",
        initialData: [
            { id: 'mfg-1668113261783', name: 'Global Components Inc.', approvalStatus: 'Approved', materials: 'Valves, Flanges', region: 'North America', country: 'USA', location: 'Houston, TX', capabilities: 'Casting, Forging', lastAuditDate: '2023-05-15', notes: 'Excellent performance in last audit.' },
            { id: 'mfg-1668113261784', name: 'Euro-Spec Forgings', approvalStatus: 'Probationary', materials: 'Fittings', region: 'Europe', country: 'Germany', location: 'Düsseldorf', capabilities: 'Precision Forging', lastAuditDate: '2023-09-01', notes: 'New supplier, requires follow-up on corrective actions.' },
            { id: 'mfg-1668113261785', name: 'Asia Pacific Metals', approvalStatus: 'Approved', materials: 'Pipes, Tubing', region: 'APAC', country: 'South Korea', location: 'Busan', capabilities: 'Extrusion, Welding', lastAuditDate: '2022-11-20', notes: '' },
        ]
    },
    supplierScorecard: {
        title: "Supplier Quality Scorecard",
        component: "SupplierScorecard",
        storageKey: "qms-supplier-scorecard",
        category: "suppliers",
        initialData: [
            { id: 'sc-1', supplierName: 'Global Components Inc.', period: '2024-Q2', onTimeDelivery: 98.5, qualityAcceptance: 99.8, carResponseTime: 5, overallScore: '99.28', notes: 'Top performer.' },
            { id: 'sc-2', supplierName: 'Euro-Spec Forgings', period: '2024-Q2', onTimeDelivery: 92.0, qualityAcceptance: 95.5, carResponseTime: 12, overallScore: '94.10', notes: 'Quality issues on batch #E456.' },
            { id: 'sc-3', supplierName: 'Asia Pacific Metals', period: '2024-Q2', onTimeDelivery: 100, qualityAcceptance: 98.0, carResponseTime: 7, overallScore: '98.80', notes: '' },
        ]
    },
    purchasingChecklist: {
        title: "Purchasing Checklist",
        component: 'ChecklistGenerator',
        storageKey: "qms-checklist-purchasing",
        category: "suppliers",
        initialData: []
    }
};

// Risk Management Modules
const RISK_MODULES = {
    risk: {
        title: "Risk Assessment",
        component: 'RiskAssessment',
        storageKey: "qms-risk-assessment",
        category: "risk",
        initialData: {
            risks: [
                { id: `risk-${Date.now()}-1`, description: 'Server failure due to hardware malfunction', likelihood: 'Possible', severity: 'Major', mitigation: 'Implement redundant servers and daily backups.'},
                { id: `risk-${Date.now()}-2`, description: 'Data breach from external attack', likelihood: 'Unlikely', severity: 'Catastrophic', mitigation: 'Strengthen firewall, use multi-factor authentication, conduct regular security audits.'},
                { id: `risk-${Date.now()}-3`, description: 'Supplier fails to deliver critical components', likelihood: 'Possible', severity: 'Moderate', mitigation: 'Qualify alternative suppliers.'}
            ],
            likelihoodLevels: ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'],
            severityLevels: ['Insignificant', 'Minor', 'Moderate', 'Major', 'Catastrophic'],
        }
    }
};

// Quality Control Modules
const QC_MODULES = {
    qcTestResults: {
        title: "QC Test Results",
        component: 'QcTestResultsList',
        storageKey: "qms-qc-test-results",
        category: "qc",
        initialData: [
            { id: 'qc-1', sampleId: 'S-2024-001', testDate: '2024-05-15', product: 'Steel Pipe DN100', testParameter: 'Tensile Strength', specificationLimit: '≥415 MPa', actualResult: '425 MPa', status: 'Pass', operator: 'Jane Smith', equipment: 'Universal Testing Machine UTM-200', notes: 'Test completed per ASTM A106 standard' },
            { id: 'qc-2', sampleId: 'S-2024-002', testDate: '2024-05-16', product: 'Carbon Steel Flange', testParameter: 'Chemical Composition', specificationLimit: 'C ≤0.25%', actualResult: 'C 0.23%', status: 'Pass', operator: 'Bob Johnson', equipment: 'Optical Emission Spectrometer OES-300', notes: 'Meets ASTM A105 requirements' },
            { id: 'qc-3', sampleId: 'S-2024-003', testDate: '2024-05-17', product: 'Stainless Steel Valve', testParameter: 'Hardness Test', specificationLimit: '150-200 HV', actualResult: '145 HV', status: 'Fail', operator: 'Alice Brown', equipment: 'Vickers Hardness Tester VHT-100', notes: 'Below specification limit. CAR raised.' },
            { id: 'qc-4', sampleId: 'S-2024-004', testDate: '2024-05-18', product: 'Alloy Steel Fitting', testParameter: 'Dimensional Check', specificationLimit: '±0.5mm', actualResult: '0.3mm', status: 'Pass', operator: 'Mike Wilson', equipment: 'CMM Coordinate Measuring Machine', notes: 'All dimensions within tolerance' },
        ]
    },
    controlChart: {
        title: "Control Chart",
        component: "ControlChart",
        storageKey: "qms-control-chart",
        category: "qc",
        initialData: {
            processName: "Shaft Diameter (mm)",
            dataPoints: [10.02, 10.01, 9.98, 10.00, 9.99, 10.03, 10.01, 9.97, 9.99, 10.00, 10.01, 10.04, 9.98, 9.99, 10.02]
        }
    },
    inspectionChecklistGenerator: {
        title: "Inspection Checklist Generator",
        component: 'ChecklistGenerator',
        storageKey: "qms-checklist-inspection-generator",
        category: "qc",
        initialData: []
    },
    receivingChecklist: {
        title: "Receiving Checklist",
        component: 'ChecklistGenerator',
        storageKey: "qms-checklist-receiving",
        category: "qc",
        initialData: []
    }
};

// Process Checklist Modules
const PROCESS_CHECKLIST_MODULES = {
    salesChecklist: {
        title: "Sales Checklist",
        component: 'ChecklistGenerator',
        storageKey: "qms-checklist-sales",
        category: "processChecklists",
        initialData: []
    },
    preDeliveryChecklist: {
        title: "Pre-Delivery Checklist",
        component: 'ChecklistGenerator',
        storageKey: "qms-checklist-pre-delivery",
        category: "processChecklists",
        initialData: []
    },
    pdcaChecklist: {
        title: "PDCA Checklist",
        component: 'ChecklistGenerator',
        storageKey: "qms-checklist-pdca",
        category: "processChecklists",
        initialData: []
    }
};

// Special/Empty Modules
const SPECIAL_MODULES = {
    empty: {
        title: "Empty Checklist Example",
        component: 'ChecklistWrapper',
        storageKey: "qms-checklist-empty",
        category: "examples",
        initialData: []
    }
};

// Custom Modules Storage
const CUSTOM_MODULES_STORAGE_KEY = 'qms-custom-modules';

// Load custom modules from localStorage
const loadCustomModules = () => {
    try {
        const stored = localStorage.getItem(CUSTOM_MODULES_STORAGE_KEY);
        return stored ? JSON.parse(stored) : {};
    } catch (error) {
        console.error('Failed to load custom modules', error);
        return {};
    }
};

// Save custom modules to localStorage
export const saveCustomModules = (customModules) => {
    try {
        localStorage.setItem(CUSTOM_MODULES_STORAGE_KEY, JSON.stringify(customModules));
    } catch (error) {
        console.error('Failed to save custom modules', error);
    }
};

// Available component types for custom modules
export const AVAILABLE_COMPONENT_TYPES = {
    'ChecklistWrapper': {
        name: 'Checklist',
        description: 'Interactive checklist with completion tracking',
        defaultData: [],
        dataTemplate: {
            id: 'item-{timestamp}',
            text: 'Sample checklist item',
            completed: false,
            comments: '',
            actions: '',
            status: 'not-started'
        }
    },
    'ManufacturerTable': {
        name: 'Table (Manufacturer Style)',
        description: 'Table for managing manufacturers/suppliers',
        defaultData: [],
        dataTemplate: {
            id: 'item-{timestamp}',
            name: 'New Item',
            status: 'Active',
            notes: ''
        }
    },
    'ActionItemList': {
        name: 'Action Items',
        description: 'Task management with priorities and due dates',
        defaultData: [],
        dataTemplate: {
            id: 'item-{timestamp}',
            title: 'New Action Item',
            description: '',
            assignedTo: '',
            priority: 'Medium',
            status: 'Open',
            dueDate: '',
            category: '',
            completedDate: '',
            notes: ''
        }
    },
    'DocumentVersionControl': {
        name: 'Document Management',
        description: 'Document version control and tracking',
        defaultData: [],
        dataTemplate: {
            id: 'doc-{timestamp}',
            documentName: 'New Document',
            version: '1.0',
            status: 'Draft',
            documentType: '',
            author: '',
            dateCreated: '{today}',
            dateModified: '{today}',
            approvalDate: '',
            nextReviewDate: '',
            changeSummary: '',
            filePath: '',
            notes: ''
        }
    },
    'RiskAssessment': {
        name: 'Risk Assessment',
        description: 'Risk matrix and assessment tool',
        defaultData: {
            risks: [],
            likelihoodLevels: ['Rare', 'Unlikely', 'Possible', 'Likely', 'Almost Certain'],
            severityLevels: ['Insignificant', 'Minor', 'Moderate', 'Major', 'Catastrophic']
        },
        dataTemplate: {
            id: 'risk-{timestamp}',
            description: 'New risk',
            severity: 'Minor',
            likelihood: 'Possible',
            mitigation: ''
        }
    }
};

// Create a new custom module
export const createCustomModule = (moduleData) => {
    const customModules = loadCustomModules();
    const moduleKey = `custom_${moduleData.key}`;
    
    const componentType = AVAILABLE_COMPONENT_TYPES[moduleData.componentType];
    if (!componentType) {
        throw new Error('Invalid component type');
    }

    const newModule = {
        title: moduleData.title,
        component: moduleData.componentType,
        storageKey: `qms-custom-${moduleData.key}`,
        category: moduleData.category || 'custom',
        initialData: componentType.defaultData,
        isCustom: true,
        createdDate: new Date().toISOString(),
        description: moduleData.description || '',
        fields: moduleData.fields || []
    };

    customModules[moduleKey] = newModule;
    saveCustomModules(customModules);
    
    return { moduleKey, module: newModule };
};

// Get all custom modules
export const getCustomModules = () => {
    return loadCustomModules();
};

// Delete a custom module
export const deleteCustomModule = (moduleKey) => {
    const customModules = loadCustomModules();
    delete customModules[moduleKey];
    saveCustomModules(customModules);
    
    // Also clear the module's data from localStorage
    const moduleConfig = customModules[moduleKey];
    if (moduleConfig && moduleConfig.storageKey) {
        localStorage.removeItem(moduleConfig.storageKey);
    }
};

// Export custom modules
export const exportCustomModules = () => {
    const customModules = loadCustomModules();
    const exportData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        modules: customModules
    };
    return JSON.stringify(exportData, null, 2);
};

// Import custom modules
export const importCustomModules = (jsonData) => {
    try {
        const importData = JSON.parse(jsonData);
        if (!importData.modules) {
            throw new Error('Invalid import format');
        }
        
        const customModules = loadCustomModules();
        Object.assign(customModules, importData.modules);
        saveCustomModules(customModules);
        
        return Object.keys(importData.modules);
    } catch (error) {
        throw new Error(`Failed to import modules: ${error.message}`);
    }
};

// Combined Configuration Export (now includes custom modules)
export const getAllModules = () => {
    const customModules = getCustomModules();
    return { ...APP_CONFIG, ...customModules };
};

// Combined Configuration Export
export const APP_CONFIG = {
    ...CORE_QMS_MODULES,
    ...AUDIT_MODULES,
    ...CAPA_MODULES,
    ...SUPPLIER_MODULES,
    ...RISK_MODULES,
    ...QC_MODULES,
    ...PROCESS_CHECKLIST_MODULES,
    ...SPECIAL_MODULES
};

// Helper Functions
export const getModulesByCategory = (category) => {
    return Object.entries(APP_CONFIG)
        .filter(([key, config]) => config.category === category)
        .reduce((acc, [key, config]) => {
            acc[key] = config;
            return acc;
        }, {});
};

export const getAllCategories = () => {
    const categories = new Set();
    Object.values(APP_CONFIG).forEach(config => {
        if (config.category) categories.add(config.category);
    });
    return Array.from(categories);
};

export const getModuleConfig = (moduleKey) => {
    return APP_CONFIG[moduleKey] || null;
};