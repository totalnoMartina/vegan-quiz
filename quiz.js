const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progress-text');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-bar-full');

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [{
        question: 'Which one of these is in fact a berry?',
        choice1: 'Cherry',
        choice2: 'Strawberry',
        choice3: 'Cantaloupe',
        choice4: 'Raspberry',
        answer: 3,
    },
    {
        question: 'Which vegetable contains more protein per calorie than animal based protein?',
        choice1: 'Carrot',
        choice2: 'Leek',
        choice3: 'Broccolli',
        choice4: 'Spinach',
        answer: 3,
    },
    {
        question: 'Which one of these is in fact a fruit?',
        choice1: 'Pecan Nut',
        choice2: 'Pistachio',
        choice3: 'Walnut',
        choice4: 'Almond',
        answer: 2,
    },
    {
        question: 'Which fruit has better effect on your energy level than coffee?',
        choice1: 'Apple',
        choice2: 'Orange',
        choice3: 'Grapes',
        choice4: 'Nectarine',
        answer: 1,
    },
    {
        question: 'Which nut butter helps in type 2 diabetes prevention, aids weigh-loss and glows in dark after exposed to intense light?',
        choice1: 'Almond Butter',
        choice2: 'Cashew Butter',
        choice3: 'Hazelnut Butter',
        choice4: 'Peanut Butter',
        answer: 4,
    },
    {
        question: 'Which one of these lowers blood pressure and also can improve your mood?',
        choice1: 'Lemon',
        choice2: 'Grape',
        choice3: 'Banana',
        choice4: 'Melon',
        answer: 3,
    },
    {
        question: 'Which vegetable is declared the "most hated vegetable" according to many studies?',
        choice1: 'Cabbage',
        choice2: 'Broccolli',
        choice3: 'Brussel Sprouts',
        choice4: 'Kale',
        answer: 3,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 7;

function startGame() {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

function getNewQuestion() {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score);

        return window.location.assign('/end.html');
    }

    questionCounter++;
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionsIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset['number'];
        choice.innerText = currentQuestion['choice' + number];
    })

    availableQuestions.splice(questionsIndex, 1);

    acceptingAnswers = true;
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score += num;
    scoreText.innerText = score;
}

startGame()