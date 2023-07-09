import React, { useState } from 'react';
import './Guessword.css';

const words = ['apple', 'banana', 'cherry', 'orange', 'grape'];

const GuessWord = () => {
  const [randomWord, setRandomWord] = useState(words[Math.floor(Math.random() * words.length)]);
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  const handleGuess = () => {
    if (guess.length === 0) {
      setMessage('Please enter a letter or the whole word.');
      return;
    }

    if (guessedLetters.includes(guess)) {
      setMessage('You already guessed that letter.');
      return;
    }

    setGuessedLetters([...guessedLetters, guess]);

    if (randomWord.includes(guess)) {
      setMessage('Correct guess!');
    } else {
      setMessage('Wrong guess.');
    }

    setGuess('');
  };

  const displayWord = () => {
    let wordDisplay = '';
    for (let i = 0; i < randomWord.length; i++) {
      if (guessedLetters.includes(randomWord[i])) {
        wordDisplay += randomWord[i] + ' ';
      } else {
        wordDisplay += '_ ';
      }
    }
    return wordDisplay;
  };

  return (
    <div className='for-game'>
      <h1 className='for-heading'>Guess the Word</h1>
      <div className='for'>{displayWord()}</div>
      <input className='for-inputfield' type="text" value={guess} onChange={(e) => setGuess(e.target.value.toLowerCase())} placeholder="Enter a letter or the whole word" />
      <div>
        <button className="button" onClick={handleGuess}>Guess</button>
      </div>
      <div className='for-answer'>{message}</div>
    </div>
  );
};

export default GuessWord;
