let scores, currentScore, activePlayer, playing;

const diceEl = document.getElementById('dice');
const btnRoll = document.getElementById('btn--roll');
const btnHold = document.getElementById('btn--hold');
const btnNew = document.getElementById('btn--new');

const init = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  document.getElementById('score--0').textContent = 0;
  document.getElementById('score--1').textContent = 0;
  document.getElementById('current--0').textContent = 0;
  document.getElementById('current--1').textContent = 0;
  diceEl.style.display = 'none';
  document.querySelector('.player--0').classList.add('player--active');
  document.querySelector('.player--1').classList.remove('player--active');
};

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector('.player--0').classList.toggle('player--active');
  document.querySelector('.player--1').classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (!playing) return;
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;
  diceEl.style.display = 'block';

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  if (!playing) return;
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

  if (scores[activePlayer] >= 100) {
    playing = false;
    diceEl.style.display = 'none';
    alert(`Player ${activePlayer + 1} wins!`);
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);

// Start the game initially
init();
