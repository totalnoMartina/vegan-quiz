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

let questions = [
    {
        question: 'Which one of these is in fact a berry?',
        choice1: 'cherry',
        choice2: 'strawberry',
        choice3: 'cantaloupe',
        choice4: 'raspberry',
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
        question: 'Which one of these is in fact a berry?',
        choice1: 'cherry',
        choice2: 'strawberry',
        choice3: 'cantaloupe',
        choice4: 'raspberry',
        answer: 2,
    }, 
    {
        question: 'Which one of these is in fact a berry?',
        choice1: 'cherry',
        choice2: 'strawberry',
        choice3: 'cantaloupe',
        choice4: 'raspberry',
        answer: 4,
    },
    {
        question: 'Which one of these is not a berry?',
        choice1: 'cherry',
        choice2: 'blackberry',
        choice3: 'cantaloupe',
        choice4: 'blueberry',
        answer: 1,
    },
    {
        question: 'Which one of these is in fact a berry?',
        choice1: 'cherry',
        choice2: 'strawberry',
        choice3: 'cantaloupe',
        choice4: 'raspberry',
        answer: 3,
    },
    {
        question: 'Which one of these is in fact a berry?',
        choice1: 'cherry',
        choice2: 'strawberry',
        choice3: 'cantaloupe',
        choice4: 'raspberry',
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
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
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
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
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