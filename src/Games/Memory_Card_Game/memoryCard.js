import React from 'react';
import './memoryCard.css';

class memoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movesCount: 0,
      seconds: 0,
      minutes: 0,
      winCount: 0,
      cards: [],
      firstCard: null,
      secondCard: null,
      interval: null,
    };
  }

  componentDidMount() {
    this.initializeGame();
  }

  initializeGame = () => {
    const cardValues = this.generateRandom();
    this.matrixGenerator(cardValues);
  };

  generateRandom = (size = 4) => {
    const items = [
      { name: 'bee', image: './images/bee.png' },
      { name: 'crocodile', image: './images/crocodile.png' },
      { name: 'macaw', image: './images/macaw.png' },
      { name: 'gorilla', image: './images/gorilla.png' },
      { name: 'tiger', image: './images/tiger.png' },
      { name: 'monkey', image: './images/monkey.png' },
      { name: 'chameleon', image: './images/chameleon.png' },
      { name: 'piranha', image: './images/piranha.png' },
      { name: 'anaconda', image: './images/anaconda.png' },
      { name: 'sloth', image: './images/sloth.png' },
      { name: 'cockatoo', image: './images/cockatoo.png' },
      { name: 'toucan', image: './images/toucan.png' },
    ];

    let tempArray = [...items];
    let cardValues = [];

    size = (size * size) / 2;

    for (let i = 0; i < size; i++) {
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      cardValues.push(tempArray[randomIndex]);
      tempArray.splice(randomIndex, 1);
    }

    return cardValues;
  };

  matrixGenerator = (cardValues, size = 4) => {
    this.setState({ cards: [] }, () => {
      const gameContainer = document.querySelector('.game-container');
      gameContainer.innerHTML = '';

      cardValues = [...cardValues, ...cardValues];
      cardValues.sort(() => Math.random() - 0.5);

      for (let i = 0; i < size * size; i++) {
        const card = cardValues[i];
        const cardContainer = document.createElement('div');
        cardContainer.className = 'card-container';
        cardContainer.dataset.cardValue = card.name;

        const cardBefore = document.createElement('div');
        cardBefore.className = 'card-before';
        cardBefore.innerHTML = '?';

        const cardAfter = document.createElement('div');
        cardAfter.className = 'card-after';

        const cardImage = document.createElement('img');
        cardImage.src = card.image;
        cardImage.className = 'image';

        cardAfter.appendChild(cardImage);
        cardContainer.appendChild(cardBefore);
        cardContainer.appendChild(cardAfter);

        gameContainer.appendChild(cardContainer);
      }

      gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

      const cards = document.querySelectorAll('.card-container');
      cards.forEach((card) => {
        card.addEventListener('click', () => {
          this.cardClickHandler(card);
        });
      });

      this.setState({ cards });
    });
  };

  cardClickHandler = (card) => {
    const { firstCard, secondCard, movesCount, winCount } = this.state;

    if (!card.classList.contains('matched')) {
      card.classList.add('flipped');

      if (!firstCard) {
        this.setState({ firstCard: card });
      } else {
        this.setState({ secondCard: card });
        this.movesCounter();

        const firstCardValue = firstCard.getAttribute('data-card-value');
        const secondCardValue = card.getAttribute('data-card-value');

        if (firstCardValue === secondCardValue) {
          firstCard.classList.add('matched');
          card.classList.add('matched');

          this.setState(
            (prevState) => ({ winCount: prevState.winCount + 1 }),
            () => {
              const { winCount, cards } = this.state;
              if (winCount === Math.floor(cards.length / 2)) {
                this.stopGame();
              }
            }
          );
        } else {
          const tempFirst = firstCard;
          const tempSecond = card;

          setTimeout(() => {
            tempFirst.classList.remove('flipped');
            tempSecond.classList.remove('flipped');
          }, 900);
        }

        this.setState({ firstCard: null, secondCard: null });
      }
    }
  };

  movesCounter = () => {
    this.setState((prevState) => ({ movesCount: prevState.movesCount + 1 }));
  };

  timeGenerator = () => {
    this.setState((prevState) => {
      let { seconds, minutes } = prevState;

      seconds += 1;

      if (seconds >= 60) {
        minutes += 1;
        seconds = 0;
      }

      return { seconds, minutes };
    });
  };

  startGame = () => {
    this.setState(
      { movesCount: 0, seconds: 0, minutes: 0, winCount: 0 },
      () => {
        this.initializeGame();
        this.setState({
          interval: setInterval(this.timeGenerator, 1000),
        });
      }
    );
  };

  stopGame = () => {
    clearInterval(this.state.interval);
  };

  render() {
    const { movesCount, minutes, seconds } = this.state;

    return (
      <div className="memoryCard">
        <div className="wrapper">
          <div className="stats-container">
            <div id="moves-count">
              <span>Moves:</span> {movesCount}
            </div>
            <div id="time">
              <span>Time:</span> {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </div>
          </div>
          <div className="game-container"></div>
          <button id="stop" className="hide" onClick={this.stopGame}>
            Stop Game
          </button>
        </div>

        <div className="controls-container">
          <p id="result"></p>
          <button id="start" onClick={this.startGame}>
            Start Game
          </button>
        </div>
      </div>
    );
  }
}

export default memoryCard;
