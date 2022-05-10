let recentScore = JSON.parse(localStorage.getItem('scores')) || [];
const scoreContainer = document.querySelector('.palmares');

const refreshBtn = document.querySelector('.refresh');
export default function refresher() {
  refreshBtn.addEventListener('click', () => {
    scoreContainer.style.display = 'none';
    recentScore = [];
    localStorage.setItem('scores', JSON.stringify(recentScore));
  });
}