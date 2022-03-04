const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let firstCard, secondCard;
let matchedCard = document.getElementsByClassName('match');
let restart_btn = document.getElementById('restart');

function shuffleDeck() {
  cards.forEach((card) => (card.style.order = Math.floor(Math.random() * 16)));
}

function flip() {
  if (this === firstCard) return;

  this.classList.add('flipped');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    console.log('first:' + firstCard.getAttribute('data-id'));
    return;
  }

  secondCard = this;
  console.log('second:' + secondCard.getAttribute('data-id'));
  checkMatch();
}

function removeFlip() {
  setTimeout(() => {
    firstCard.classList.remove('flipped');
    secondCard.classList.remove('flipped');
    reset();
  }, 1300);
}

function lockCard() {
  firstCard.removeEventListener('click', flip);
  secondCard.removeEventListener('click', flip);

  reset();
}

function reset() {
  hasFlippedCard = false;
  firstCard = null;
  secondCard = null;
}

function checkMatch() {
  let isMatch =
    firstCard.getAttribute('data-id') === secondCard.getAttribute('data-id');

  if (isMatch === true) {
    firstCard.classList.add('match');
    secondCard.classList.add('match');
    lockCard();
    console.log('match');
    console.log(matchedCard);
  } else {
    removeFlip();

    console.log('not a match');
  }
}

function endOfGame() {
  console.log(matchedCard);
  if (matchedCard.length === 16) {
    console.log('all match');
    restart_btn.style.removeProperty('display');
    restart_btn.style.display = 'flex';
  }
}

function restartGame() {
  cards.forEach((card) => card.classList.remove('flipped'));
  cards.forEach((card) => card.classList.remove('match'));
  reset();
  shuffleDeck();
  console.log('restart');
  restart_btn.style.display = 'none';
}

shuffleDeck();

cards.forEach((card) => card.addEventListener('click', flip));
cards.forEach((card) => card.addEventListener('click', endOfGame));
