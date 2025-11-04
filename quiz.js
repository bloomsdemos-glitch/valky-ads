// === МОЗОК ДЛЯ QUIZ (v2.1 - Виправлено) ===

// ВАЖЛИВО! const telegramUsername ПРИБРАНО, бо він вже є в script.js

// Зберігаємо вибір користувача тут
let userChoices = {
    stepB_choice: '',
    budget: '1000',
    location: ''
};

// Чекаємо, поки вся сторінка завантажиться
document.addEventListener('DOMContentLoaded', () => {

    // === "ЗАПОБІЖНИК": Перевіряємо, чи ми на сторінці квізу ===
    const firstStep = document.getElementById('step-1');
    if (!firstStep) {
        // Якщо ми НЕ на сторінці квізу (бо #step-1 немає), 
        // то не виконуємо нічого з цього файлу.
        return; 
    }
    // === КІНЕЦЬ ЗАПОБІЖНИКА ===

    // Якщо ми тут, значить ми 100% на сторінці квізу.
    // Знаходимо всі елементи, які потрібні ТІЛЬКИ для квізу.
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

    // === ЛОГІКА ДЛЯ ІКОНОК ===
    function handleIconSelection(clickedButton) {
        const parentStep = clickedButton.closest('.quiz-step');
        if (!parentStep) return;

        const optionsInStep = parentStep.querySelectorAll('.quiz-option');

        optionsInStep.forEach(opt => {
            opt.classList.remove('selected');
            const icon = opt.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
            }
        });

        clickedButton.classList.add('selected');
        const clickedIcon = clickedButton.querySelector('i');
        if (clickedIcon) {
            clickedIcon.classList.remove('fa-regular');
            clickedIcon.classList.add('fa-solid');
        }
    }

    // Додаємо логіку на всі кнопки-опції
    allOptions.forEach(button => {
        button.addEventListener('click', (e) => {
            const clickedButton = e.currentTarget;
            
            handleIconSelection(clickedButton);

            const targetStepId = clickedButton.dataset.target;
            if (targetStepId) {
                if (clickedButton.dataset.choice) {
                    userChoices.stepB_choice = clickedButton.dataset.choice;
                }
                setTimeout(() => {
                    showStep(targetStepId);
                }, 200);
            }
        });
    });
    // ===============================

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
            e.preventDefault(); 
            
            handleIconSelection(e.currentTarget);

            let serviceName = e.currentTarget.dataset.service;
            const serviceType = e.currentTarget.dataset.serviceType;
            const linkText = e.currentTarget.querySelector('span')?.textContent.trim() || e.currentTarget.textContent.trim();

            if (serviceType === 'B') {
                userChoices.location = linkText;
                serviceName = `
Замовлення зі "Швидкого старту":
- Тип: ${userChoices.stepB_choice}
- Бюджет: ${userChoices.budget} грн
- Розміщення: ${userChoices.location}
`;
            }

            if (!serviceName) {
                serviceName = linkText;
            }

            const message = `Привіт! Мене цікавить послуга:\n${serviceName}`;
            const encodedMessage = encodeURIComponent(message);
            // Використовуємо 'telegramUsername', який ВЖЕ ІСНУЄ з 'script.js'
            const telegramUrl = `https://t.me/${telegramUsername}?text=${encodedMessage}`;
            
            setTimeout(() => {
                 window.open(telegramUrl, '_blank');
            }, 200); 
        });
    });

    // На старті показуємо тільки перший крок
    showStep('step-1');
});
