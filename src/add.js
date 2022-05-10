/* eslint-disable no-use-before-define */
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

function palmares(data) {
  scoreContainer.innerHTML += `<li class="stat"><span class="player-name">${data.name}:</span>
                                   <span class="player-score">${data.score}</span></li>`;
}

recentScore.forEach((score) => {
  palmares(score);
  scoreContainer.style.border = '2px solid #000';
});

function clearField() {
  const name = inputName;
  const score = inputScore;
  name.value = '';
  score.value = '';
}

refresher();