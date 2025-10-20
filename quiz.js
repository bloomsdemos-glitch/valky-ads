// === МОЗОК ДЛЯ QUIZ ===

// ВАЖЛИВО! Заміни 'TвійНікнейм' на свій реальний нікнейм в Telegram
const telegramUsername = 'TвійНікнейм'; 

// Зберігаємо вибір користувача тут
let userChoices = {
    stepB_choice: '',
    budget: '1000',
    location: ''
};

// Чекаємо, поки вся сторінка завантажиться
document.addEventListener('DOMContentLoaded', () => {

    const allSteps = document.querySelectorAll('.quiz-step');
    const allOptions = document.querySelectorAll('.quiz-option');
    const allBackButtons = document.querySelectorAll('.quiz-back');
    const allOrderLinks = document.querySelectorAll('.order-link');
    const budgetSlider = document.getElementById('budget-slider');
    const budgetValueDisplay = document.getElementById('budget-value');

    // Функція, яка ховає всі кроки і показує один потрібний
    function showStep(stepId) {
        allSteps.forEach(step => {
            step.classList.add('hidden');
        });
        const nextStep = document.getElementById(stepId);
        if (nextStep) {
            nextStep.classList.remove('hidden');
            window.scrollTo(0, 0); // Прокрутка наверх сторінки
        }
    }

    // Додаємо логіку на всі кнопки-опції
    allOptions.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetStepId = e.currentTarget.dataset.target;
            if (targetStepId) {
                // Зберігаємо вибір для кроку B
                if (e.currentTarget.dataset.choice) {
                    userChoices.stepB_choice = e.currentTarget.dataset.choice;
                }
                showStep(targetStepId);
            }
        });
    });

    // Додаємо логіку на кнопки "Назад"
    allBackButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const targetStepId = e.currentTarget.dataset.target;
            showStep(targetStepId);
        });
    });

    // Оновлюємо цифри біля слайдера
    if (budgetSlider) {
        budgetSlider.addEventListener('input', (e) => {
            userChoices.budget = e.target.value;
            budgetValueDisplay.textContent = e.target.value;
        });
    }

    // ГЕНЕРАТОР ПОСИЛАНЬ ДЛЯ ЗАМОВЛЕННЯ
    allOrderLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Не даємо посиланню перейти
            
            let serviceName = e.currentTarget.dataset.service;
            const serviceType = e.currentTarget.dataset.serviceType;

            // Якщо це замовлення з кроку B (зі слайдером)
            if (serviceType === 'B') {
                userChoices.location = e.currentTarget.textContent.trim().replace('◽️ ', '');
                serviceName = `
Замовлення зі "Швидкого старту":
- Тип: ${userChoices.stepB_choice}
- Бюджет: ${userChoices.budget} грн
- Розміщення: ${userChoices.location}
`;
            }

            // Якщо це просте замовлення
            if (!serviceName) {
                serviceName = e.currentTarget.textContent.trim().replace('◽️ ', '');
            }

            const message = `Привіт! Мене цікавить послуга:\n${serviceName}`;
            const encodedMessage = encodeURIComponent(message);
            const telegramUrl = `https://t.me/${telegramUsername}?text=${encodedMessage}`;
            
            // Відкриваємо Телеграм
            window.open(telegramUrl, '_blank');
        });
    });

    // На старті показуємо тільки перший крок
    showStep('step-1');
});
