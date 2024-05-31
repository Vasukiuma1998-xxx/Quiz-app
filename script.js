const startpage = document.getElementById("start-page");
const instructpage = document.getElementById("instruct-page");
const quizpage = document.getElementById("quiz-page");
const scorePage = document.getElementById("score-page");
const questioncontainer = document.getElementById("question");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const submitBtn = document.getElementById("submit-btn");
const scoreElement = document.getElementById("score");
const restartBtn = document.getElementById("restart-btn");
const result=document.getElementById("result");
const resultpage=document.getElementById("result-page")

const playerNameInput = document.getElementById('player-name-input');
const playerEmailInput = document.getElementById('player-email-input');
let playerName = '';
let playerEmail = '';

document.getElementById("start-form").addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent the form from submitting the default way
    playerName = playerNameInput.value.trim();
    playerEmail = playerEmailInput.value.trim();

    startpage.classList.add('hidden');
    instructpage.classList.remove('hidden');
});

document.getElementById("goto-btn").addEventListener('click', () => {
    startTimer();
    instructpage.classList.add('hidden');
    quizpage.classList.remove('hidden');
    showquestions();
    
});

nextBtn.addEventListener('click', () => {
    saveAnswer();
    currentquestionIndex++;
    showquestions();
});

prevBtn.addEventListener('click', () => {
    saveAnswer();
    currentquestionIndex--;
    showquestions();
});

// Fixed typo here
submitBtn.addEventListener('click', () => {
    saveAnswer();
    submitQuiz();
});
result.addEventListener('click',()=>{
    scorePage.classList.add('hidden')
    resultpage.classList.remove('hidden');
})
restartBtn.addEventListener('click', () => {
    score = 0;
    currentquestionIndex = 0;
    userAnswers.fill(null);
    scorePage.classList.add('hidden');
    startpage.classList.remove('hidden');
});

const questions = [
    {
        question: "What does HTML stand for?",
        answer: [
            "Hyperlinks and Text Markup Language",
            "Hyper Text Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 1
    },
    {
        question: "Who is making the Web standards?",
        answer: ["Mozilla", "Microsoft", "Google", "The World Wide Web Consortium"],
        correct: 3
    },
    {
        question: "Which character is used to indicate an end tag? ",
        answer: ["/","*","^",">"],
        correct: 1
    },
    {
        question:'HTML program is saved using _________ extension.',
        answer:[".htl",".html",".hml",".htlm"],
        correct:1
    },
    {
        question:"Which of the following is used increase the col width?",
        answer:["cellspacing","cellpadding","Row span","Col span"],
        correct:3
    }
];

let currentquestionIndex = 0;
let score = 0;
const userAnswers = new Array(questions.length).fill(null);

function showquestions() {
    const question = questions[currentquestionIndex];
    questioncontainer.innerHTML = `
        <h2>${question.question}</h2>
        ${question.answer.map((answer, index) => `
        <div>
            <input type="radio" id="answer${index}" name="answer" value="${index}" ${userAnswers[currentquestionIndex] === index ? 'checked' : ''}>
            <label for="answer${index}">${answer}</label>
        </div>
        `).join('')}
    `;
    prevBtn.classList.toggle('hidden', currentquestionIndex === 0);
    nextBtn.classList.toggle('hidden', currentquestionIndex === questions.length - 1);
    submitBtn.classList.toggle('hidden', currentquestionIndex !== questions.length - 1);
   
}

function saveAnswer() {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (selectedAnswer) {
        userAnswers[currentquestionIndex] = parseInt(selectedAnswer.value);
    }
}

function calculateScore() {
    score = userAnswers.reduce((total, answer, index) => {
        return total + (answer === questions[index].correct ? 1 : 0);
    }, 0);
}

const timerElement = document.getElementById('timer');
const totalTimeInSeconds = 300; // 5 minutes

let timeRemaining = totalTimeInSeconds;
let timerInterval;

function startTimer() {
    timerInterval = setInterval(() => {
        timeRemaining--;
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            timeRemaining = 0;
            // Auto-submit the quiz when time runs out
            submitQuiz();
        }
        updateTimerDisplay();
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    timerElement.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function stopTimer() {
    clearInterval(timerInterval);
}

function submitQuiz() {
    stopTimer();
    saveAnswer();
    calculateScore();

    // Display the player's name, email, score, and answers on the score page
    document.getElementById('player-name').textContent = playerName;
    document.getElementById('player-email').textContent = playerEmail;
    scoreElement.textContent = `${score} / ${questions.length}`;
    

    quizpage.classList.add('hidden');
    scorePage.classList.remove('hidden');
    
}
