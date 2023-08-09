import React, { useEffect, useState } from 'react';
import './style.css';
import music from './images/music.mp3';
import gameover from './images/gameover.mp3';

const Game = () => {
  const [score, setScore] = useState(0);
  const [cross, setCross] = useState(true);

  useEffect(() => {
    const audio = new Audio(music);
    const audiogo = new Audio(gameover);
    audio.play();

    const handleKeyDown = (e) => {
      console.log('key code is:', e.keyCode);
      if (e.keyCode === 38) {
        const dino = document.querySelector('.dino');
        dino.classList.add('animateDino');
        setTimeout(() => {
          dino.classList.remove('animateDino');
        }, 700);
      }

      if (e.keyCode === 39) {
        const dino = document.querySelector('.dino');
        const dinoX = parseInt(
          window.getComputedStyle(dino, null).getPropertyValue('left')
        );
        dino.style.left = dinoX + 112 + 'px';
      }

      if (e.keyCode === 37) {
        const dino = document.querySelector('.dino');
        const dinoX = parseInt(
          window.getComputedStyle(dino, null).getPropertyValue('left')
        );
        dino.style.left = dinoX - 112 + 'px';
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      audio.pause();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const dino = document.querySelector('.dino');
      const gameOver = document.querySelector('.gameOver');
      const obstacle = document.querySelector('.obstacle');

      const dx = parseInt(
        window.getComputedStyle(dino, null).getPropertyValue('left')
      );
      const dy = parseInt(
        window.getComputedStyle(dino, null).getPropertyValue('top')
      );

      const ox = parseInt(
        window.getComputedStyle(obstacle, null).getPropertyValue('left')
      );
      const oy = parseInt(
        window.getComputedStyle(obstacle, null).getPropertyValue('top')
      );

      const offsetX = Math.abs(dx - ox);
      const offsetY = Math.abs(dy - oy);

      if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = 'Game over play it again';
        obstacle.classList.remove('obstacleAni');
        const audiogo = new Audio(gameover);
        audiogo.play();
        setTimeout(() => {
          audiogo.pause();
        }, 1000);
      } else if (offsetX < 145 && cross) {
        setScore((prevScore) => prevScore + 1);
        setCross(false);
        setTimeout(() => {
          setCross(true);
        }, 1000);
        setTimeout(() => {
          const aniDur = parseFloat(
            window.getComputedStyle(obstacle, null).getPropertyValue(
              'animation-duration'
            )
          );
          const newDur = aniDur - 0.1;
          obstacle.style.animationDuration = newDur + 's';
          console.log('New Animation Duration', newDur);
        }, 500);
      }
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, [cross]);

  const updateScore = (score) => {
    const scoreCard = document.getElementById('scoreCard');
    if (scoreCard) {
      scoreCard.innerHTML = 'Your Score:' + score;
    }
  };

  useEffect(() => {
    updateScore(score);
  }, [score]);

  return (
    <div className="gameContainer">
      <div className="gameOver">Welcome to the Dragon game</div>
      <div className="dino"></div>
      <div id="scoreCard">Your Score is: {score}</div>
      <div className="obstacle obstacleAni"></div>
    </div>
  );
};

export default Game;
