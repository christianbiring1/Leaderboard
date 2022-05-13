// import refresher from './refresh.js';

const scoreContainer = document.querySelector('.palmares');
const form = document.querySelector('.form');
const inputName = document.querySelector('.name');
const inputScore = document.querySelector('.score');

class Score {
  constructor(user, score) {
    this.user = user;
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

const clearField = () => {
  const name = inputName;
  const score = inputScore;
  name.value = '';
  score.value = '';
};

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/';
const gameId = () => {
  fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: 'christian game' }),
  }).then((response) => response.json()).then((data) => {
    localStorage.setItem('gameId', JSON.stringify(data));
  });
};
gameId(url);

const urlExample = `${url}TmfTBSDlBvHPPY995ITG/scores`;

const addGame = async (urlExample, newGame) => {
  await fetch(urlExample, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newGame),
  }).then((response) => response.json());
};

const getData = async (url) => {
  const a = await fetch(url);
  const b = await a.json();
  recentScore = b.result;
  recentScore.forEach((score) => {
    palmares(score);
  });
  localStorage.setItem('scores', JSON.stringify(recentScore));
};

const addButton = document.querySelector('.add');
addButton.addEventListener('click', () => {
  const user = inputName.value;
  const score = inputScore.value;
  if (user === '' || score === '') {
    return;
  }
  const newGame = new Score(user, score);
  recentScore.unshift(newGame);
  scoreContainer.style.border = '2px solid #000';
  clearField();
  addGame(urlExample, newGame);
});
const refreshBtn = document.querySelector('.refresh');

refreshBtn.addEventListener('click', () => {
  getData(`${url}TmfTBSDlBvHPPY995ITG/scores/`);
});

window.onload = () => {
  recentScore.forEach((score) => palmares(score));
  scoreContainer.style.border = '2px solid #000';
};
