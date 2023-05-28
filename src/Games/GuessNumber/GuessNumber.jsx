import React, { useState } from 'react';
import './GuessNumber.css'; //
const GuessNumber = () => {
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [targetNumber] = useState(Math.floor(Math.random() * 100) + 1);

  const handleGuessChange = (event) => {
    setGuess(event.target.value);
  };

  const handleGuessSubmit = (event) => {
    event.preventDefault();

    if (guess === '') {
      setMessage('Please enter a number.');
      return;
    }

    const guessedNumber = parseInt(guess);

    if (isNaN(guessedNumber)) {
      setMessage('Please enter a valid number.');
      return;
    }

    if (guessedNumber === targetNumber) {
      setMessage('Congratulations! You guessed the correct number!');
    } else if (guessedNumber < targetNumber) {
      setMessage('The target number is greater than your guess.');
    } else {
      setMessage('The target number is lesser than your guess.');
    }

    setGuess('');


  };

  return (
    <div className="pageWrapper">
      <h1 className="h1">Guess the Number Game</h1>
      <form onSubmit={handleGuessSubmit}>
        <input
          type="number"
          value={guess}
          onChange={handleGuessChange}
          placeholder="Enter your guess"
          className='for-input'
        />
        <br />
        <br />
        <button type="submit">Submit</button>
      </form>
      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default GuessNumber;
