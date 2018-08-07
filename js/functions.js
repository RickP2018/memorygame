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

function startTheClock() {
  time = 0;
  clockId = setInterval(() => {
    time = time + 1
    displayTheTime();
  }, 1000);
}

startTheClock();

//This code belongs to Matthew Cranford
//FEND Resources
//https://matthewcranford.com/memory-game-walkthrough-part-6-the-clock/
function displayTheTime() {
  const clock = document.querySelector('.clock');
  //console.log(clock.innerHTML);
  clock.interval = time;
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  //this is supposed to displays the time
  // in minutes and seconds
  //but it doesn't work.  It never converts the minutes
  if (seconds < 10) {
        clock.innerHTML = `${minutes}:0${seconds}`;
  } else {
      clock.innerHTML = `${minutes}:${seconds}`;
  }
  //console.log(clock);
  //clock.innerHTML = time;
}

displayTheTime();

//this is used as part of the modal
function stopClock() {
  clearInterval(clockId);
}
