document.addEventListener('DOMContentLoaded', () => {

    function initializeCustomSelect(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const trigger = container.querySelector('.select-trigger');
        const options = container.querySelector('.options-container');
        const checkboxes = container.querySelectorAll('input[type="checkbox"]');
        const originalText = trigger.textContent;
        
        // --- ОБНОВЛЕННАЯ ЛОГИКА ---
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = options.style.display === 'block';

            // Закрываем все другие списки
            document.querySelectorAll('.custom-select-container').forEach(c => {
                c.querySelector('.options-container').style.display = 'none';
                c.classList.remove('is-open'); // Убираем класс у всех
            });
            
            // Переключаем текущий список и класс для анимации стрелки
            if (isOpen) {
                options.style.display = 'none';
                container.classList.remove('is-open');
            } else {
                options.style.display = 'block';
                container.classList.add('is-open');
            }
        });
        
        options.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const selected = Array.from(checkboxes)
                    .filter(i => i.checked)
                    .map(i => i.parentElement.innerText.trim());

                if (selected.length === 0) {
                    trigger.textContent = originalText;
                } else if (selected.length > 2) {
                    trigger.textContent = `${selected.length} נבחרו`;
                } else {
                    trigger.textContent = selected.join(', ');
                }
            });
        });
    }

    // Инициализируем все кастомные селекты
    initializeCustomSelect('deal-type-select');
    initializeCustomSelect('area-select');
    initializeCustomSelect('property-type-select');

    // --- ОБНОВЛЕННАЯ ЛОГИКА ---
    // Закрываем все списки и убираем класс is-open
    window.addEventListener('click', () => {
        document.querySelectorAll('.custom-select-container').forEach(c => {
            c.querySelector('.options-container').style.display = 'none';
            c.classList.remove('is-open');
        });
    });

    // Обработка отправки формы (без изменений)
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

        console.log('Данные для отправки на сервер:', formData);
    });
});