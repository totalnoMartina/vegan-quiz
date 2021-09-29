const username = document.querySelector('#username');
const saveScoreBtn = document.querySelector('#save-score-btn');
const finalScore = document.querySelector('#final-score');
const mostRecentScore = document.querySelector('#most-recent-score');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const MAX_HIGHSCORES = 7;

finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
});
saveHighScore = e => {
    e.preventDefault();

    const score = {
        score: mostRecentScore,
        name: username.value
    }

        highScores.push(score);

        highScores.saveScoreBtn((a,b) => {
            return b.score = a.score;
        }),

        highScores.splice(8)

        localStorage.setItem('highScores', JSON.stringify(highScores));
        window.location.assign('/')
}
