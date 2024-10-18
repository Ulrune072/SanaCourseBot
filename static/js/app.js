// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    // Здесь можно добавить динамическую логику для кнопок
    const buttons = document.querySelectorAll('.course-btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            alert('Course Selected: ' + this.textContent);
        });
    });
});
