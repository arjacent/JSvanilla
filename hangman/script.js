const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');

const figureParts = document.querySelectorAll('.figure-part');

// list of random words
const words = ['application', 'programming', 'interface', 'wizard'];
let selectedWord = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

// Display word on screen
function displayWord() {
  wordEl.innerHTML = `
  ${selectedWord
    .split('')
    .map(letter => `
    <span class=letter> 
      ${correctLetters.includes(letter) ? letter : ''} 
    </span>
    `)
    .join('')
  }`;

  // did user win?
  const innerWord = wordEl.innerText.replace(/\n/g, '');

  if (innerWord === selectedWord) {
    finalMessage.innerText = 'Congratulations! You won!';
    popup.style.display = 'flex';
  }
}

// update wrong letters
function updateWrongLettersEl() {
  // Display wrong letters
  wrongLettersEl.innerHTML = `
    ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span>${letter}</span>`)}
  `;

  // Display parts of man
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;

    if (index < errors) {
      part.style.dispaly = 'block';
    } else {
      part.style.dispaly = 'none';
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = 'Unfortunately you lost.';
    popup.style.display = 'flex';
  }
}

// show notifications
function showNotification() {
  notification.classList.add('show');

  setTimeout(()=> {
    notification.classList.remove('show');
  }, 3000);
}


// Event listener

// key down letter press
window.addEventListener('keydown', e => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
      
    }
  }
});

// Restart game and play again
playAgainBtn.addEventListener('click', () => {
  // empty arrays
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWord = words[Math.floor(Math.random() * words.length)];

  displayWord();

  updateWrongLettersEl();

  popup.style.display = 'none';

});


displayWord();
