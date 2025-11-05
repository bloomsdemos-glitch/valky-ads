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

    // === 2. Логіка для Акордеону (ТІЛЬКИ ІНФО-БЛОК) ===
    
    // --- Інфо-блок ("Шо це взагалі таке?") ---
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

    // --- Логіку для .accordion-toggle та .sticky-footer ВИДАЛЕНО ---


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
    // (Перевіряємо, чи ми на сторінці stats.html)
    if (whyUsBtn) { 
        const clientsBtn = document.getElementById('clients-btn');
        const whyUsContent = document.getElementById('why-us-content')?.innerHTML;
        const clientsContent = document.getElementById('clients-content')?.innerHTML;

        if (whyUsBtn && whyUsContent) {
            whyUsBtn.addEventListener('click', () => openModal(whyUsContent));
        }
        if (clientsBtn && clientsContent) {
            clientsBtn.addEventListener('click', () => openModal(clientsContent));
        }
    }

// === ОНОВЛЕНИЙ БЛОК (v2 - з фіксом "поп-ап в поп-апі") ===

// 1. Слухач для кнопок ОПИСУ (ті, що на головній сторінці)
const descButtons = document.querySelectorAll('.quiz-option[data-modal-target]');
descButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetId = button.dataset.modalTarget;
        const contentHtml = document.getElementById(targetId)?.innerHTML;

        // === МАГІЯ ПОЧИНАЄТЬСЯ ===
        // 1. Беремо текст (назву) з самої кнопки
        const titleText = button.querySelector('span').textContent.trim();
        // 2. Створюємо для нього красивий HTML-заголовок
        const titleHtml = `<h3 class="modal-service-title">${titleText}</h3>`;
        // === МАГІЯ КІНЕЦЬ ===
        
        if (contentHtml) {
            // 3. З'єднуємо заголовок + контент і ВІДПРАВЛЯЄМО в поп-ап
            openModal(titleHtml + contentHtml); // <== ЗМІНЕНО
        } else {
            console.error('Не знайдено контент для модального вікна: ' + targetId);
        }
    });
});

// 2. Слухач для кнопок ПРИКЛАДУ (ті, що ВЖЕ всередині поп-апу)
// Ми не можемо повісити 'click' на кнопки, яких ще немає в HTML.
// Замість цього, ми вішаємо ОДИН слухач на .modal-content, який ВЖЕ існує.
if (modalContent) {
    modalContent.addEventListener('click', (e) => {
        // Перевіряємо, чи був клік *саме* по кнопці "Переглянути приклад"
        const exampleButton = e.target.closest('.btn-view-example[data-modal-target]');

        if (exampleButton) {
            e.stopPropagation(); // Важливо! Щоб клік не "сплив" до .modal-overlay

            const targetId = exampleButton.dataset.modalTarget;
            const contentHtml = document.getElementById(targetId)?.innerHTML;

            if (contentHtml) {
                // Ми НЕ викликаємо openModal(). 
                // Ми просто ЗАМІНЮЄМО вміст ВЖЕ відкритого вікна.
                modalContent.innerHTML = contentHtml;
                // Прокручуємо новий вміст нагору
                modalContent.scrollTop = 0; 
            } else {
                console.error('Не знайдено контент для "Прикладу": ' + targetId);
            }
        }
    });
}

}); // <-- КІНЕЦЬ ГОЛОВНОГО СЛУХАЧА DOMContentLoaded
