let randomNumber = parseInt(Math.random() * 100 + 1);

const div = document.querySelector('.container');
const submit = document.querySelector('#subt');
const userInput = document.querySelector('#feild');
const guessSlot = document.querySelector('.Pre-Guess');
const remaining = document.querySelector('.lifelines');
const lowOrHi = document.querySelector('.feed');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;

let playGame = true;

if (playGame) {
  submit.addEventListener('click', function (e) {
    e.preventDefault();
    
    const guess = parseInt(userInput.value);

    
    
    validateGuess(guess);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('PLease enter a valid number');
  } else if (guess < 1 || guess > 100 ) {
    alert('PLease enter a number between 1-100');
  }  else {
    prevGuess.push(guess);
    if (numGuess === 10) {
      displayGuess(guess);
      displayMessage(`Game Over. Random number was ${randomNumber}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage(`You guessed it right`,0);
    endGame();
  } else if (guess - randomNumber <=5 && guess - randomNumber > -5)  {
    displayMessage(`Too Close`, 1);
  } else if (guess - randomNumber <=10 && guess - randomNumber > 5 ||guess - randomNumber >=-10 && guess - randomNumber <= -5) {
    displayMessage(`Close`, 2);
  } else if (guess - randomNumber <=20 && guess - randomNumber > 10 ||guess - randomNumber >=-20 && guess - randomNumber <= -10) {
    displayMessage(`Far`, 3);
  }else if (guess - randomNumber > 20 ||guess - randomNumber < -20 ) {
    displayMessage(`Too Far`, 4);
  }
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.innerHTML += `${guess}, `;
  numGuess++;
  remaining.innerHTML = `${11 - numGuess} `;
}

function displayMessage(message , color) {
  lowOrHi.innerHTML = `<span>${message}</span>`;
  if (color == 0) {
    lowOrHi.style.color =  "green"
  }
  else if(color == 1){
    lowOrHi.style.color =  "lightgreen"
  }
  else if(color == 2){
    lowOrHi.style.color =  "yellow"
  }
  else if(color == 3){
    lowOrHi.style.color =  "orange"
  }
   else {
    lowOrHi.style.color =  "red"
  }
  
}

function endGame() {
  userInput.value = '';
  userInput.setAttribute('disabled', '');
  p.classList.add('button');
  p.innerHTML = `<h2 id="newGame">Start new Game</h2>`;
  startOver.appendChild(p);
  playGame = false;
  div.style.backgroundColor ="grey"
  submit.style.display ="none";
  newGame();
}

function newGame() {
  const newGameButton = document.querySelector('#newGame');
  newGameButton.addEventListener('click', function (e) {
    randomNumber = parseInt(Math.random() * 100 + 1);
    prevGuess = [];
    numGuess = 1;
    guessSlot.innerHTML = '';
    remaining.innerHTML = `${10 - numGuess} `;
    userInput.removeAttribute('disabled');
    div.style.background ="slateblue";
    submit.style.display ="inline-block";
    startOver.removeChild(p);

    playGame = true;
  });
}