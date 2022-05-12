/* eslint-disable prefer-const */

import refresher from './refresh.js';

const scoreContainer = document.querySelector('.palmares');
const form = document.querySelector('.form');
const inputName = document.querySelector('.name');
const inputScore = document.querySelector('.score');

class Score {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

let recentScore = JSON.parse(localStorage.getItem('scores')) || [];
form.addEventListener('submit', (e) => {
  e.preventDefault();
});

function palmares(data) {
  scoreContainer.innerHTML += `<li class="stat"><span class="player-name">${data.user}:</span>
                                   <span class="player-score">${data.score}</span></li>`;
}

function clearField() {
  const name = inputName;
  const score = inputScore;
  name.value = '';
  score.value = '';
}

function addScore() {
  const addButton = document.querySelector('.add');
  addButton.addEventListener('click', () => {
    const name = inputName.value;
    const score = inputScore.value;
    if (name === '' || score === '') {
      return;
    }
    const data = new Score(name, score);
    recentScore.push(data);
    localStorage.setItem('scores', JSON.stringify(recentScore));
    palmares(data);
    scoreContainer.style.border = '2px solid #000';
    clearField();
    refresher();
  });
}
addScore();

recentScore.forEach((score) => {
  palmares(score);
  scoreContainer.style.border = '2px solid #000';
});

refresher();

const baseUrl = fetch('https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/:id/scores/');

async function getData() {
  try {
    const data = await baseUrl;
    const response = await data.json();
    const recentScore = response.result.map((item) => item);
    recentScore.forEach((game) => {
      palmares(game);
    });
    console.log(recentScore);
  } catch (error) {
    // return 'error';
  }
}
getData();

// async function addGame() {
//   const user = inputName.value;
//   const score = inputScore.value;
//   try {
//     const newGame = new Score(user, score);
//     const config = {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(newGame),
//     };

//     const data = await fetch(baseUrl, config);
//     recentScore.push(newGame);
//     palmares();
//   } catch (error) {
//     return error;
//   }
// }

// addGame();
