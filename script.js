// Це твій нікнейм в телеграмі без @. Заміни на свій.
const telegramUsername = 'TвійНікнейм'; 

// === ГОЛОВНИЙ СЛУХАЧ: Чекаємо, поки вся сторінка завантажиться ===
document.addEventListener('DOMContentLoaded', () => {

    // === 1. Універсальні кнопки "Замовити" (з .order-btn) ===
    const orderButtons = document.querySelectorAll('.order-btn');
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const serviceName = button.dataset.service;
            const message = `Привіт! Цікавить послуга: "${serviceName}"`;
            const encodedMessage = encodeURIComponent(message);
            const telegramUrl = `https://t.me/${telegramUsername}?text=${encodedMessage}`;
            window.open(telegramUrl, '_blank');
        });
    });

    // === 2. Логіка для Акордеону (extras-list.html) ===
    
    // --- Інфо-блок ---
    const infoToggle = document.getElementById('info-toggle');
    const infoContent = document.getElementById('info-content');
    if (infoToggle && infoContent) {
        infoToggle.addEventListener('click', () => {
            infoToggle.classList.toggle('open');
            if (infoContent.classList.contains('hidden')) {
                infoContent.classList.remove('hidden');
            }
            infoContent.classList.toggle('open');
        });
    }

    // --- Сам Акордеон ---
    const accordions = document.querySelectorAll('.accordion-toggle');
    const stickyFooter = document.getElementById('sticky-footer');
    const stickyBtn = document.getElementById('sticky-order-btn');

    if (accordions.length > 0) { // Запускаємо логіку, тільки якщо акордеон є на сторінці
        accordions.forEach(button => {
            button.addEventListener('click', () => {
                const panel = button.nextElementSibling;
                const wasOpen = button.classList.contains('open');

                document.querySelectorAll('.accordion-toggle').forEach(btn => {
                    btn.classList.remove('open');
                    btn.nextElementSibling.classList.remove('open');
                });
                
                if (!wasOpen) {
                    button.classList.add('open');
                    panel.classList.add('open');
                    panel.classList.remove('hidden');

                    const serviceName = button.querySelector('span').textContent.trim();
                    stickyBtn.dataset.service = `Нативна реклама: ${serviceName}`;
                    
                    if (serviceName === 'ДІАЛОГ У ЧАТІ' || serviceName === 'КРУЖЕЧОК' || serviceName === 'РОЗІГРАШ') {
                        stickyBtn.classList.add('disabled');
                        stickyBtn.textContent = 'Замовити (як додаток)';
                    } else {
                        stickyBtn.classList.remove('disabled');
                        stickyBtn.textContent = 'Замовити';
                    }
                    
                    stickyFooter.classList.add('visible');
                    
                    setTimeout(() => {
                        button.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }, 200);

                } else {
                    stickyFooter.classList.remove('visible');
                }
            });
        });
    }
    
    // --- Логіка для "липкої" кнопки ---
    if (stickyBtn) {
        stickyBtn.addEventListener('click', () => {
            if (stickyBtn.classList.contains('disabled')) {
                alert('Спочатку оберіть основний тип реклами, наприклад, «СТАНДАРТ+». Ця послуга є лише додатковою.');
                return;
            }
            // Якщо кнопка не "disabled", вона автоматично спрацює 
            // як '.order-btn', бо в неї є цей клас (якщо ми його додали)
            // Або ми дублюємо логіку, як тут:
            const serviceName = stickyBtn.dataset.service;
            const message = `Привіт! Цікавить послуга: "${serviceName}"`;
            const encodedMessage = encodeURIComponent(message);
            const telegramUrl = `https://t.me/${telegramUsername}?text=${encodedMessage}`;
            window.open(telegramUrl, '_blank');
        });
    }

    // === 3. Логіка для POP-UP (Modal) (stats.html + extras-list.html) ===

    // Знаходимо всі елементи поп-апу
    const modalOverlay = document.getElementById('modal-overlay');
    const modalContent = document.getElementById('modal-content');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // Функція, що відкриває вікно
    function openModal(content) {
        if (modalOverlay && content && modalContent) {
            modalContent.innerHTML = content;
            modalOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Функція, що закриває вікно
    function closeModal() {
        if (modalOverlay) {
            modalOverlay.classList.add('hidden');
            modalContent.innerHTML = '';
            document.body.style.overflow = '';
        }
    }

    // Вішаємо слухачі на закриття (вони є на обох сторінках)
    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closeModal);
    }
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // --- Кнопки для "Чому у нас" (stats.html) ---
    const whyUsBtn = document.getElementById('why-us-btn');
    const clientsBtn = document.getElementById('clients-btn');
    if (whyUsBtn) { // Якщо ми на сторінці stats.html
        const whyUsContent = document.getElementById('why-us-content')?.innerHTML;
        const clientsContent = document.getElementById('clients-content')?.innerHTML;

        if (whyUsBtn && whyUsContent) {
            whyUsBtn.addEventListener('click', () => openModal(whyUsContent));
        }
        if (clientsBtn && clientsContent) {
            clientsBtn.addEventListener('click', () => openModal(clientsContent));
        }
    }

    // --- Кнопки для "Переглянути приклад" (extras-list.html) ---
    const exampleButtons = document.querySelectorAll('.btn-view-example');
    if (exampleButtons.length > 0) { // Якщо ми на сторінці extras-list.html
        exampleButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.stopPropagation(); // Не даємо акордеону закритись
                
                const targetId = button.dataset.modalTarget;
                const contentHtml = document.getElementById(targetId)?.innerHTML;
                
                if (contentHtml) {
                    openModal(contentHtml); 
                } else {
                    console.error('Не знайдено контент для модального вікна: ' + targetId);
                }
            });
        });
    }

}); // <-- КІНЕЦЬ ГОЛОВНОГО СЛУХАЧА DOMContentLoaded
