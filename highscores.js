const highScoresList = document.querySelector('#highscores-list');
const highScores = JSON.parse(localStorage.getItem('high-scores')) || [];

highScoresList.innerHTML = 
highScores.map(score => {
    return `<li class="highscore">${score.name} - ${score.score}</li>`
}).join('')
