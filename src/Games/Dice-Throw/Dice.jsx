import React from "react";
import dice1 from './images/dice1.png';
import dice2 from './images/dice2.png';
import dice3 from './images/dice3.png';
import dice4 from './images/dice4.png';
import dice5 from './images/dice5.png';
import dice6 from './images/dice6.png';
import './dice.css';

function Dice() {
  const randomNumber1 = Math.floor(Math.random() * 6) + 1;
  const randomNumber2 = Math.floor(Math.random() * 6) + 1;
  let randomImagesource1;
  let randomImagesource2;

  switch (randomNumber1) {
    case 1:
      randomImagesource1 = dice1;
      break;
    case 2:
      randomImagesource1 = dice2;
      break;
    case 3:
      randomImagesource1 = dice3;
      break;
    case 4:
      randomImagesource1 = dice4;
      break;
    case 5:
      randomImagesource1 = dice5;
      break;
    case 6:
      randomImagesource1 = dice6;
      break;
    default:
      randomImagesource1 = dice1;
      break;
  }

  switch (randomNumber2) {
    case 1:
      randomImagesource2 = dice1;
      break;
    case 2:
      randomImagesource2 = dice2;
      break;
    case 3:
      randomImagesource2 = dice3;
      break;
    case 4:
      randomImagesource2 = dice4;
      break;
    case 5:
      randomImagesource2 = dice5;
      break;
    case 6:
      randomImagesource2 = dice6;
      break;
    default:
      randomImagesource2 = dice1;
      break;
  }

  const refreshPage = () => {
    window.location.reload();
  }

  let result;

  if (randomNumber1 > randomNumber2) {
    result = "Player 1 wins";
  } else if (randomNumber1 < randomNumber2) {
    result = "Player 2 wins";
  } else {
    result = "Draw";
  }

  return (
    <>
      <div className="container">
        <h1>Dicee game</h1>
        <p className="result">{result}</p>
        <div className="dice">
          <p>Player 1</p>
          <img src={randomImagesource1} alt="dice1" />
        </div>
        <div className="dice">
          <p>Player 2</p>
          <img src={randomImagesource2} alt="dice1" />
        </div>
        
        
      </div>
      <button onClick={refreshPage}>Refresh me</button>
      <footer>
        www.dicee.com
      </footer>
    </>
  );
}

export default Dice;
