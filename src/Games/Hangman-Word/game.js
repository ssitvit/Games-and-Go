const wordContainer = document.getElementById('wordContainer');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const guessesRemaining = document.getElementById('guessesRemaining');
const guessedLetters = document.getElementById('guessedLetters');
const message = document.getElementById('message');

let word;
let guessedWord;
let remainingGuesses;
let guessedLettersSet;

// Initialize the game
function initGame() {
  word = generateWord();
  guessedWord = Array(word.length).fill('_');
  remainingGuesses = 6;
  guessedLettersSet = new Set();

  render();
  guessButton.addEventListener('click', handleGuess);
}

// Generate a random word
function generateWord() {
  const words = ['hangman', 'javascript', 'programming', 'openai', 'developer'];
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

// Handle user's guess
function handleGuess() {
  const guess = guessInput.value.toLowerCase().trim();

  if (guess.length !== 1 || !guess.match(/[a-z]/)) {
    showMessage('Please enter a single letter.');
    return;
  }

  if (guessedLettersSet.has(guess)) {
    showMessage('You already guessed that letter.');
    return;
  }

  guessedLettersSet.add(guess);
  if (word.includes(guess)) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] === guess) {
        guessedWord[i] = guess;
      }
    }
    if (!guessedWord.includes('_')) {
      endGame(true);
    }
  } else {
    remainingGuesses--;
    if (remainingGuesses === 0) {
      endGame(false);
    }
  }

  render();
  guessInput.value = '';
}

// Render the game state
function render() {
  wordContainer.textContent = guessedWord.join(' ');
  guessesRemaining.textContent = `Guesses remaining: ${remainingGuesses}`;
  guessedLetters.textContent = `Guessed letters: ${[...guessedLettersSet].join(', ')}`;
}

// Show a message to the player
function showMessage(msg) {
  message.textContent = msg;
  setTimeout(() => {
    message.textContent = '';
  }, 2000);
}

// End the game
function endGame(isWin) {
  guessButton.removeEventListener('click', handleGuess);
  if (isWin) {
    showMessage('Congratulations! You won!');
  } else {
    showMessage(`Game over! The word was "${word}".`);
  }
  setTimeout(initGame, 3000);
}

// Start the game
initGame();
