export const PrintManager = {
    modal: null,
    
    init() {
        this.modal = document.getElementById('print-options-modal');
        const openBtn = document.getElementById('print-options-btn');
        const closeBtn = document.getElementById('close-print-modal');
        const printBtn = document.getElementById('print-form-btn');
        
        if (!this.modal || !openBtn || !closeBtn || !printBtn) return;
        
        openBtn.addEventListener('click', () => this.showModal());
        closeBtn.addEventListener('click', () => this.hideModal());
        printBtn.addEventListener('click', () => this.printForm());
        
        window.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.hideModal();
            }
        });
    },
    
    showModal() {
        this.populateSectionChecklist();
        this.modal.classList.add('show');
    },
    
    hideModal() {
        this.modal.classList.remove('show');
    },
    
    populateSectionChecklist() {
        const checklistContainer = document.getElementById('print-section-checklist');
        const sections = document.querySelectorAll('#inspection-form > fieldset');
        let checklistHtml = '';
        
        const visibilityState = JSON.parse(localStorage.getItem('form_section_visibility') || '{}');
        
        sections.forEach(section => {
            const sectionId = section.dataset.sectionId;
            const legend = section.querySelector('legend');
            const title = legend ? legend.textContent.trim() : `Section ${sectionId}`;
            
            if (sectionId) {
                const isChecked = visibilityState[sectionId] !== false;
                checklistHtml += `
                    <div class="print-section-item">
                        <label>
                            <input type="checkbox" data-section-id="${sectionId}" ${isChecked ? 'checked' : ''}>
                            ${title}
                        </label>
                    </div>
                `;
            }
        });
        
        checklistContainer.innerHTML = checklistHtml;
    },
    
    printForm() {
        const hideEmpty = document.getElementById('print-opt-empty-fields').checked;
        if (hideEmpty) {
            this.prepareForCompactPrint();
        }
        this.prepareImagesForPrint();

        const printStyles = this.generatePrintStyles();
        const styleEl = document.createElement('style');
        styleEl.id = 'print-override-styles';
        styleEl.innerHTML = `@media print { ${printStyles} }`;
        document.head.appendChild(styleEl);
        
        this.hideModal();
        
        setTimeout(() => {
            window.print();
            
            // Cleanup after print dialog
            document.head.removeChild(styleEl);
            if (hideEmpty) {
                this.cleanupAfterCompactPrint();
            }
        }, 200);
    },

    prepareForCompactPrint() {
        document.querySelectorAll('table tbody tr').forEach(tr => {
            if (tr.classList.contains('section-header')) return;
            let isEmpty = true;
            tr.querySelectorAll('input, textarea').forEach(input => {
                if ((input.type === 'checkbox' || input.type === 'radio') && input.checked) {
                    isEmpty = false;
                } else if (input.type !== 'checkbox' && input.type !== 'radio' && input.value.trim() !== '') {
                    isEmpty = false;
                }
            });

            if (tr.querySelectorAll('input, textarea').length === 0 && tr.textContent.trim() !== '') {
                isEmpty = false;
            }

            if (isEmpty) {
                tr.classList.add('print-hide');
            }
        });

        document.querySelectorAll('.form-group').forEach(group => {
            let isEmpty = true;
            group.querySelectorAll('input, textarea, select').forEach(input => {
                if ((input.type === 'checkbox' || input.type === 'radio') && input.checked) {
                    isEmpty = false;
                } else if (input.type !== 'checkbox' && input.type !== 'radio' && input.value && input.value.trim() !== '') {
                    isEmpty = false;
                }
            });
            if (isEmpty) {
                group.classList.add('print-hide');
            }
        });
    },

    cleanupAfterCompactPrint() {
        document.querySelectorAll('.print-hide').forEach(el => {
            el.classList.remove('print-hide');
        });
    },

    prepareImagesForPrint() {
        const includeImages = document.getElementById('print-opt-images').checked;
        if (!includeImages) return;

        document.querySelectorAll('.image-preview-item').forEach(item => {
            const title = item.querySelector('.title-input').value;
            const comment = item.querySelector('.comment-input').value;
            const detailsDiv = item.querySelector('.image-details');
            if (detailsDiv) {
                detailsDiv.setAttribute('data-title', title || '');
                detailsDiv.setAttribute('data-comment', comment || '');
            }
        });
    },
    
    generatePrintStyles() {
        let styles = '';
        
        const sectionCheckboxes = document.querySelectorAll('#print-section-checklist input[type="checkbox"]');
        sectionCheckboxes.forEach(checkbox => {
            if (!checkbox.checked) {
                styles += `fieldset[data-section-id="${checkbox.dataset.sectionId}"] { display: none !important; }`;
            }
        });
        
        const includeImages = document.getElementById('print-opt-images').checked;
        if (!includeImages) {
            styles += `fieldset[data-section-id="image-attachments"] { display: none !important; }`;
        } else {
             styles += `
                #image-attachments-controls,
                #image-upload-container .drop-zone, 
                #image-upload-container .upload-notes { display: none !important; }
                #image-upload-container { padding: 0 !important; }
                .image-previews-container { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
                .image-preview-item { page-break-inside: avoid !important; border: 1px solid #ccc; }
                .image-preview-item img { height: auto !important; max-height: 200px; }
                .image-preview-item .image-details { padding: 5px !important; }
                .image-preview-item .image-filename,
                .image-preview-item .title-input,
                .image-preview-item .comment-input,
                .image-preview-item .image-controls { display: none !important; }
                
                .image-preview-item .image-details::before { 
                    content: attr(data-title); 
                    font-weight: bold; 
                    display: block; 
                    margin-bottom: 5px;
                }
                .image-preview-item .image-details::after { 
                    content: attr(data-comment); 
                    display: block; 
                    white-space: pre-wrap; 
                    font-size: 0.9em;
                }
             `;
        }
        
        const hideEmpty = document.getElementById('print-opt-empty-fields').checked;
        if (hideEmpty) {
            styles += `.print-hide { display: none !important; }`;
        }
        
        return styles;
    }
};