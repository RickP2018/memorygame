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
  };
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
