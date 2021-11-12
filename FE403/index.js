const cards = document.querySelectorAll('.card');

let hasFlippedCard = false;
let firstCard, secondCard;
let matchedCard = document.getElementsByClassName("match");

function shuffleDeck() {
    cards.forEach(card =>
    {
        var randomNumber = Math.floor(Math.random() * 16);
        card.style.order = randomNumber;
    });
}

function flip() {
    if (this === firstCard) return;
  
    this.classList.add('flipped');
  
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        console.log("first:" + firstCard.getAttribute('data-id'));
        return;
    }
    
    secondCard = this;
    console.log("second:" + secondCard.getAttribute('data-id'));
    ifMatch();
}

function unFlip() {
    setTimeout(()=>
        {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            reset();
        }, 1300
    );
}

function disable() {
    firstCard.removeEventListener('click', flip);
    secondCard.removeEventListener('click', flip);
    
    reset();
}

function reset() {
    hasFlippedCard = false;
    firstCard = null;
    secondCard = null;
}

function ifMatch() {
    let isMatch = firstCard.getAttribute("data-id") === secondCard.getAttribute("data-id");

    if (isMatch === true) {
        firstCard.classList.add('match');
        secondCard.classList.add('match');
        disable();
        console.log('match');
        console.log(matchedCard);
    }else{
        unFlip();
        
        console.log('not a match');
    }
}

function restart() {
    let restart_btn = document.getElementById('restart');
    console.log(matchedCard);
    if (matchedCard.length === 16){
        console.log('all match')
        restart_btn.style.removeProperty("display");
        restart_btn.style.display = "flex";
    };
}

function restartGame() {
    location.reload();
}

console.log(matchedCard);
shuffleDeck();

cards.forEach(card => card.addEventListener('click', flip));
cards.forEach(card => card.addEventListener('click', restart));