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
