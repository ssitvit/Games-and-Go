import React, { useState } from 'react';
import './guessthenumber.css';

const App = () => {
  const [guess, setGuess] = useState('');
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 100) + 1);
  const [message, setMessage] = useState('');

  const handleChange = (event) => {
    setGuess(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (guess === '') {
      setMessage('Please enter a number.');
    } else {
      const parsedGuess = parseInt(guess);

      if (parsedGuess === randomNumber) {
        setMessage('Congratulations! You guessed the correct number!');
      } else if (parsedGuess < randomNumber) {
        setMessage('Too low! Try a higher number.');
      } else if (parsedGuess > randomNumber) {
        setMessage('Too high! Try a lower number.');
      }

      setGuess('');
    }
  };

  return (
    <div className="container">
      <h1>Guess the Number Game</h1>
      <p>{message}</p>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <input type="number" value={guess} onChange={handleChange} />
        </div>
        <button type="submit">Guess</button>
      </form>
    </div>
  );
};

export default App;


