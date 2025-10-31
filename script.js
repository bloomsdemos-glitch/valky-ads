// Це твій нікнейм в телеграмі без @. Заміни на свій.
const telegramUsername = 'TвійНікнейм'; 

// Знаходимо всі кнопки з класом 'order-btn'
const orderButtons = document.querySelectorAll('.order-btn');

// Тепер для кожної знайденої кнопки ми додамо слухача подій
orderButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Коли на кнопку клікають, ми беремо назву послуги з атрибута 'data-service'
        const serviceName = button.dataset.service;

        // Формуємо текст повідомлення, який прийде тобі в ТГ
        const message = `Привіт! Цікавить послуга: "${serviceName}"`;

        // Кодуємо текст, щоб в посиланні не було пробілів та інших дивних символів
        const encodedMessage = encodeURIComponent(message);

        // Створюємо фінальне посилання на діалог з тобою в телеграмі
        const telegramUrl = `https://t.me/${telegramUsername}?text=${encodedMessage}`;

        // І, нарешті, відкриваємо це посилання в новій вкладці
        window.open(telegramUrl, '_blank');
    });
});

// === ЛОГІКА ДЛЯ АКОРДЕОНУ (extras-list.html) ===
document.addEventListener('DOMContentLoaded', () => {
    
    // --- Інфо-блок ---
const infoToggle = document.getElementById('info-toggle');
const infoContent = document.getElementById('info-content');
if (infoToggle && infoContent) {
    infoToggle.addEventListener('click', () => {
        infoToggle.classList.toggle('open');

        // НОВА ЛОГІКА:
        // 1. При першому кліку - прибрати .hidden
        if (infoContent.classList.contains('hidden')) {
            infoContent.classList.remove('hidden');
        }
        // 2. Тепер просто вмикати/вимикати .open
        infoContent.classList.toggle('open');
    });
}


    // --- Акордеон ---
    const accordions = document.querySelectorAll('.accordion-toggle');
    const stickyFooter = document.getElementById('sticky-footer');
    const stickyBtn = document.getElementById('sticky-order-btn');

    accordions.forEach(button => {
        button.addEventListener('click', () => {
            const panel = button.nextElementSibling;
            const wasOpen = button.classList.contains('open');

            // 1. Закрити всі панелі
            document.querySelectorAll('.accordion-toggle').forEach(btn => {
                btn.classList.remove('open');
                btn.nextElementSibling.classList.remove('open');

            });
            
            // 2. Відкрити/закрити поточну
            if (!wasOpen) {
                button.classList.add('open');
                panel.classList.add('open');
                panel.classList.remove('hidden');

                // 3. Налаштувати липку кнопку
                const serviceName = button.querySelector('span').textContent.trim();
                stickyBtn.dataset.service = `Нативна реклама: ${serviceName}`;
                
                // 4. Логіка для "сірих" кнопок
                if (serviceName === 'ДІАЛОГ У ЧАТІ' || serviceName === 'КРУЖЕЧОК' || serviceName === 'РОЗІГРАШ') {
                    stickyBtn.classList.add('disabled');
                    stickyBtn.textContent = 'Замовити (як додаток)';
                } else {
                    stickyBtn.classList.remove('disabled');
                    stickyBtn.textContent = 'Замовити';
                }
                
                // 5. Показати кнопку
                stickyFooter.classList.add('visible');
                
                // Плавний скрол до відкритого елементу
                setTimeout(() => {
                    button.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 200);

            } else {
                // Якщо закрили, ховаємо кнопку
                stickyFooter.classList.remove('visible');
            }
        });
    });
    
    // --- Логіка для самої "липкої" кнопки ---
    if (stickyBtn) {
        stickyBtn.addEventListener('click', () => {
            if (stickyBtn.classList.contains('disabled')) {
                alert('Спочатку оберіть основний тип реклами, наприклад, «СТАНДАРТ+». Ця послуга є лише додатковою.');
                return; // Не відправляти
            }
            
            // Якщо кнопка НЕ сіра, вона працює як звичайна кнопка замовлення
            // Логіка відправки вже є в quiz.js (який ми теж підключили)
            // або в script.js, якщо ти її туди додавав.
            
            // Давайте продублюємо логіку замовлення тут, щоб бути впевненим
            const serviceName = stickyBtn.dataset.service;
            const telegramUsername = 'TвійНікнейм'; // <--- ПЕРЕВІР СВІЙ НІК!
            const message = `Привіт! Цікавить послуга: "${serviceName}"`;
            const encodedMessage = encodeURIComponent(message);
            const telegramUrl = `https://t.me/${telegramUsername}?text=${encodedMessage}`;
            window.open(telegramUrl, '_blank');
        });
    }
});

