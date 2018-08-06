function toggleCard(clickTarget) {
  clickTarget.classList.toggle('open');
  clickTarget.classList.toggle('show');
}

function addToggleCard(clickTarget) {
  openCards.push(clickTarget);
  console.log(openCards);
  if (openCards.length == 1) {
    console.log('Toggled cards length is ' + openCards.length + ' card');
  } else {
    console.log('Toggled cards length is ' + openCards.length + ' cards');
  }
}

function doCardsMatch() {
  if (openCards[0].firstElementChild.className === openCards[1].firstElementChild.className) {
    console.log('Cards match!');
    openCards[0].classList.toggle('match');
    openCards[1].classList.toggle('match');
    openCards = [];
    console.log('openCards length is ' + openCards.length);
  } else {
      console.log('Cards do not match!');
      console.log('openCards length is ' + openCards.length);
      //openCards = [];
      setTimeout(() => {
        toggleCard(openCards[0]);
        toggleCard(openCards[1]);
        openCards = [];
      }, 700);
  }
}

function isClickValid(clickTarget) {
  return (
    clickTarget.classList.contains('card') &&
    !clickTarget.classList.contains('match') &&
     openCards.length < 2 &&
     !openCards.includes(clickTarget)
   );
}

function totalMoves() {
  moves = moves + 1;
  const moveCounter = document.querySelector('.moves');
  moveCounter.innerHTML = moves;
}

function checkMovesCount() {
  if (moves === 14 || moves === 20  || moves === 27) {
    minusOneStar();
    if (moves === 27) {
      alert('Braap, thanks for playing');
    }
  }
}

checkMovesCount();

function minusOneStar() {
  const numStars = document.querySelectorAll('.stars li');
  for (star of numStars) {
    if (star.style.display !== 'none') {
      star.style.display = 'none';
      break;
    }
  }
}

// minusOneStar();
// minusOneStar();
