document.addEventListener('DOMContentLoaded', () => {

    /**
     * Function to initialize a custom dropdown with checkboxes.
     * @param {string} containerId - The ID of the main container for the select component.
     */
    function initializeCustomSelect(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const trigger = container.querySelector('.select-trigger');
        const options = container.querySelector('.options-container');
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        const originalText = trigger.querySelector('svg').previousSibling.textContent.trim();
        
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = options.style.display === 'block';

            // Close all other dropdowns
            document.querySelectorAll('.custom-select-container').forEach(c => {
                c.querySelector('.options-container').style.display = 'none';
                c.classList.remove('is-open');
            });
            
            // Toggle the current dropdown and the class for the arrow animation
            if (isOpen) {
                options.style.display = 'none';
                container.classList.remove('is-open');
            } else {
                options.style.display = 'block';
                container.classList.add('is-open');
            }
        });
        
        // Stop click propagation from the options container to prevent it from closing.
        options.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const selected = Array.from(checkboxes)
                    .filter(i => i.checked)
                    .map(i => i.parentElement.innerText.trim());

                // Clear the trigger text content before adding new text or the SVG
                trigger.childNodes.forEach(node => {
                    if (node.nodeType === 3) { // Node.TEXT_NODE
                        node.textContent = '';
                    }
                });

                if (selected.length === 0) {
                    trigger.prepend(originalText);
                } else if (selected.length > 2) {
                    trigger.prepend(`${selected.length} selected`);
                } else {
                    trigger.prepend(selected.join(', '));
                }
            });
        });
    }

    // Initialize all custom selects
    initializeCustomSelect('deal-type-select');
    initializeCustomSelect('area-select');
    initializeCustomSelect('property-type-select');

    // Close all dropdowns when clicking outside of them
    window.addEventListener('click', () => {
        document.querySelectorAll('.custom-select-container').forEach(c => {
            c.querySelector('.options-container').style.display = 'none';
            c.classList.remove('is-open');
        });
    });

    // Handle form submission
    const searchForm = document.getElementById('property-search-form');
    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const getSelectedValues = (containerId) => {
            return Array.from(document.querySelectorAll(`#${containerId} input[type="checkbox"]:checked`))
                        .map(cb => cb.value);
        };

        const formData = {
            dealTypes: getSelectedValues('deal-type-select'),
            areas: getSelectedValues('area-select'),
            propertyTypes: getSelectedValues('property-type-select'),
            roomsFrom: document.getElementById('rooms-from').value,
            roomsTo: document.getElementById('rooms-to').value,
            maxPrice: document.getElementById('price-max').value
        };

        console.log('Data to be sent to the server:', formData);
    });
});