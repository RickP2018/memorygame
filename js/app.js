

/*
 * Create a list that holds all of your cards
 * I was able to do this programatically, however, I could not figure out how to
 * re-add them to the DOM after removing them
 *
 * var allCards = document.querySelectorAll('.card');
 *
 * //turns "allCards" Nodelist to an array
 * var cardsList = Array.from(allCards);
 *
 * //tells me the inner values of each card
 * var x = $(cardsList).children();
 * var y = $(cardsList).children();
 */

//remove the classes from all of the cards before making the list
$('li.card').removeClass('open show match');

//global variables
const deck = document.querySelector('.deck');
const totalPairs = 8;
let openCards = [];
let moves = 0;
let clockOff = true;
let time = 0;
let clockId;
let matched = 0;


//TODO maybe? need to develop and add this with the click event
// and/or put the startTheClock function call
var initialClick = false;

//modal - TESTS
time = 121;
displayTheTime(); // 2:01
moves = 16;
checkMovesCount(); // 2 Stars

writeModalStats();  // Write data to modal
toggleModal();  // Open modal

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

const shuffleDeck = Array.from(document.querySelectorAll('.deck li'));
shuffle(shuffleDeck);
for (card of shuffleDeck) {
  deck.appendChild(card);
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

deck.addEventListener('click', function () {
  const clickTarget = event.target;
  if (isClickValid(clickTarget)) {
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    if (openCards.length === 2) {
      console.log('2 cards are now opened');
      doCardsMatch(clickTarget);
      totalMoves();
      console.log('totalMoves', moves);
      checkMovesCount();
    }
  }
});

deck.addEventListener('click', event => {
  const clickTarget = event.target;
  if (isClickValid(clickTarget)) {
    if (clockOff) {
      startTheClock();
      clockOff = false;
    }
  }
});

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
    //console.log('Cards match!');
    openCards[0].classList.toggle('match');
    openCards[1].classList.toggle('match');
    openCards = [];
    matched = matched + 1;

    //console.log('openCards length is ' + openCards.length);
  } else {
    //console.log('Cards do not match!');
    //console.log('openCards length is ' + openCards.length);
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
    time = time + 1;
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

  //this is supposed to display the time
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

function toggleModal() {
  const modal = document.querySelector('.modal_background');
  modal.classList.toggle('hide');
}

toggleModal();  //open modal
toggleModal();  //close modal

function writeModalStats() {
  const timeStat = document.querySelector('.modal_time');
  const clockTime = document.querySelector('.clock').innerHTML;
  const movesStat = document.querySelector('.modal_moves');
  const starsStat = document.querySelector('.modal_stars');
  const stars = getStars;

  timeStat.innerHTML = `Time = ${clockTime}`;
  movesStat.innerHTML = `Moves = ${moves}`;
  starsStat.innerHTML = `Stars = ${stars}`;
}

function getStars() {
  stars = document.querySelectorAll('.stars li');
  starCount = 0;
  for (star of stars) {
    if (star.style.display !== 'none') {
      starCount = starCount + 1;
    }
  }

  console.log(starCount);  //2
  return starCount;
}

function resetGame() {
  resetClockAndTime();
  resetMoves();
  resetStars();
  shuffleDeck();
}

document.querySelector('.restart').addEventListener('click', resetGame);
document.querySelector('.modal_replay').addEventListener('click', resetGame);

function resetClockAndTime() {
  stopClock();
  clockOff = true;
  time = 0;
  displayTheTime();
}

function resetMoves() {
  moves = 0;
  document.querySelector('.moves').innerHTML = moves;
}

function resetStars() {
  stars = 0;
  const starList = document.querySelectorAll('.stars li');
  for (star of starList) {
    star.style.display = 'inline';
  }
}

if (matched === totalPairs) {
  gameOver();
}

function gameOver() {
  stopClock();
  writeModalStats();
  toggleModal();
}

function replayGame() {
  resetGame();
  toggleModal();
}

document.querySelector('.modal_cancel').addEventListener('click', () => {
  toggleModal();
});

document.querySelector('.modal_replay').addEventListener('click', (replayGame));

//commented this out.  Not needed? 1/2 way down page in walk thru 8
//  => {
//   // TODO: Call reset game HERE.  Might be done here with adding replayGame above
// });

function resetCards() {
  const cards = document.querySelectorAll('.deck li');
  for (let card of cards) {
    card.className = 'card';
  }
}
