$(document).ready(function() {
  let language = 'en';
  const translations = {
    en: {
      user: "User",
      level: "Level",
      coins: "Coins",
      course1: "Course 1: Python Basics",
      course2: "Course 2 (Coming Soon)",
      course3: "Course 3 (Coming Soon)",
      nextLesson: "Next Lesson",
      takeQuiz: "Take Quiz",
      quizCompleted: "Quiz completed! You earned",
      coinsEarned: "coins and advanced to level",
      tryAgain: "Try again",
      languageSelect: "Select Language",
    },
    ru: {
      user: "Пользователь",
      level: "Уровень",
      coins: "Монеты",
      course1: "Курс 1: Основы Python",
      course2: "Курс 2 (Скоро)",
      course3: "Курс 3 (Скоро)",
      nextLesson: "Следующий урок",
      takeQuiz: "Пройти тест",
      quizCompleted: "Тест завершен! Вы заработали",
      coinsEarned: "монет и достигли уровня",
      tryAgain: "Попробовать снова",
      languageSelect: "Выберите язык",
    }
  };

  const pythonTheory = {
    en: [
      { id: 1, title: "Introduction to Python", content: "Python is a high-level, interpreted programming language..." },
      { id: 2, title: "Variables and Data Types", content: "In Python, variables are created when you assign a value to them..." },
      { id: 3, title: "Control Structures", content: "Python uses indentation to define code blocks for control structures like if, for, and while..." },
    ],
    ru: [
      { id: 1, title: "Введение в Python", content: "Python - это высокоуровневый интерпретируемый язык программирования..." },
      { id: 2, title: "Переменные и типы данных", content: "В Python переменные создаются при присвоении им значения..." },
      { id: 3, title: "Управляющие конструкции", content: "Python использует отступы для определения блоков кода в управляющих конструкциях, таких как if, for и while..." },
    ]
  };

  let currentLesson = 0;
  let level = 1;
  let coins = 0;

  // Set default language content
  function updateContent() {
    $('#languageLabel').text(translations[language].languageSelect);
    $('#username').text(translations[language].user);
    $('#levelText').text(translations[language].level);
    $('#coinsText').text(translations[language].coins);
    $('#course1Btn').text(translations[language].course1);
    $('#courseContent .btn').text(translations[language].nextLesson);
    $('#quizTitle').text(translations[language].pythonQuiz);
  }

  // Toggle language
  $('#languageToggle').click(function() {
    language = (language === 'en') ? 'ru' : 'en';
    updateContent();
  });

  // Show course content
  $('#course1Btn').click(function() {
    $('#courseSection').addClass('d-none');
    $('#courseContent').removeClass('d-none');
    showLesson();
  });

  function showLesson() {
    const lesson = pythonTheory[language][currentLesson];
    $('#lessonTitle').text(lesson.title);
    $('#lessonContent').text(lesson.content);
  }

  // Next Lesson
  $('#nextLessonBtn').click(function() {
    if (currentLesson < pythonTheory[language].length - 1) {
      currentLesson++;
      showLesson();
    } else {
      // Trigger quiz section after the last lesson
      $('#courseContent').addClass('d-none');
      $('#quizSection').removeClass('d-none');
    }
  });

  // File upload
  $('#fileUpload').change(function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
      $('#avatar').html(`<img src="${e.target.result}" class="w-100 h-100 object-cover" />`);
    };
    reader.readAsDataURL(file);
  });

  // Initialize content for the first time
  updateContent();
});
