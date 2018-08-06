/*
 * Create a list that holds all of your cards
 * I was able to do this programatically, however, I could not figure out how to
 * re-add them to the DOM after removing them so I created the list manually
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

console.log('test message');

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

const deck = document.querySelector('.deck');
let openCards = [];

deck.addEventListener('click', function() {
  const clickTarget = event.target;
  if (isClickValid(clickTarget)) {
    toggleCard(clickTarget);
    addToggleCard(clickTarget);
    if (openCards.length === 2) {
      console.log('2 cards are now opened');
      doCardsMatch(clickTarget);
    }
  }
});
