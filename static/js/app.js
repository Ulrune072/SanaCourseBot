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
    pythonQuiz: "Python Quiz",
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
    pythonQuiz: "Тест по Python",
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

const pythonQuiz = {
  en: [
    { question: "What is Python?", options: ["A snake", "A programming language", "A type of coffee", "A planet"], correctAnswer: 1 },
    { question: "Which of the following is a valid variable name in Python?", options: ["2variable", "_variable", "variable-name", "variable name"], correctAnswer: 1 },
    { question: "How do you create a comment in Python?", options: ["// This is a comment", "/* This is a comment */", "# This is a comment", "-- This is a comment"], correctAnswer: 2 },
  ],
  ru: [
    { question: "Что такое Python?", options: ["Змея", "Язык программирования", "Вид кофе", "Планета"], correctAnswer: 1 },
    { question: "Какое из следующих имен переменных допустимо в Python?", options: ["2переменная", "_переменная", "переменная-имя", "переменная имя"], correctAnswer: 1 },
    { question: "Как создать комментарий в Python?", options: ["// Это комментарий", "/* Это комментарий */", "# Это комментарий", "-- Это комментарий"], correctAnswer: 2 },
  ]
};

let currentLesson = 0;
let currentLevel = 1;
let currentCoins = 0;
let currentLanguage = 'en';
let answeredQuestions = new Set();

const usernameElem = document.getElementById("username");
const levelElem = document.getElementById("level");
const coinsElem = document.getElementById("coins");
const contentElem = document.getElementById("content");
const avatarElem = document.getElementById("avatar");
const fileInput = document.getElementById("file-upload");
const languageToggle = document.getElementById("language-toggle");

const t = translations[currentLanguage];

function updateProfile() {
  usernameElem.innerText = t.user;
  levelElem.innerText = currentLevel;
  coinsElem.innerText = currentCoins;
}

function loadLesson() {
  const lesson = pythonTheory[currentLanguage][currentLesson];
  contentElem.innerHTML = `
    <h3>${lesson.title}</h3>
    <p>${lesson.content}</p>
    <button onclick="nextLesson()">Next Lesson</button>
  `;
}

function nextLesson() {
  if (currentLesson < pythonTheory[currentLanguage].length - 1) {
    currentLesson++;
    loadLesson();
  } else {
    startQuiz();
  }
}

function startQuiz() {
  contentElem.innerHTML = `
    <h3>${t.pythonQuiz}</h3>
    ${pythonQuiz[currentLanguage].map((question, index) => `
      <div>
        <p>${question.question}</p>
        ${question.options.map((option, optionIndex) => `
          <button onclick="submitAnswer(${index}, ${optionIndex})">${option}</button>
        `).join('')}
      </div>
    `).join('')}
  `;
}

function submitAnswer(questionIndex, selectedAnswer) {
  if (!answeredQuestions.has(questionIndex)) {
    const correctAnswer = pythonQuiz[currentLanguage][questionIndex].correctAnswer;
    if (selectedAnswer === correctAnswer) {
      currentCoins += 10;
      levelElem.innerText = currentLevel;
    }
    answeredQuestions.add(questionIndex);

    if (answeredQuestions.size === pythonQuiz[currentLanguage].length) {
      alert(`${t.quizCompleted} ${currentCoins} ${t.coinsEarned} ${currentLevel}`);
      currentLevel++;
      loadLesson();
    }
  }
}

languageToggle.addEventListener("click", () => {
  currentLanguage = currentLanguage === 'en' ? 'ru' : 'en';
  updateProfile();
  loadLesson();
});

avatarElem.addEventListener("click", () => {
  fileInput.click();
});

fileInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onloadend = () => {
    avatarElem.style.backgroundImage = `url(${reader.result})`;
  };
  if (file) {
    reader.readAsDataURL(file);
  }
});

updateProfile();
loadLesson();
