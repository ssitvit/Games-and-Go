import React, { Component } from 'react';
import styled from 'styled-components';
import Board from './Board';
import ShipsRemaining from './ShipsRemaining';
import './App.css';

const BoardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
`;

const BoardDiv = styled.div`
  padding: 0 50px;
`;

const GameStatusDiv = styled.div`
  /* padding: 0 50px; */
`;

const DEFAULT_STATE = {
  winStatus: 0,
  hitStatus: 'No shots fired!',
  p1Board: Array.from({ length: 10 }, val => {
    return Array.from({ length: 10 }, val => 0);
  }),
  p2Board: Array.from({ length: 10 }, val => {
    return Array.from({ length: 10 }, val => 0);
  }),
  p1Ships: [
    { name: 'Carrier', num: 5, remainingHits: 5 },
    { name: 'Battleship', num: 4, remainingHits: 4 },
    { name: 'Destroyer', num: 3, remainingHits: 3 },
    { name: 'Submarine', num: 3.5, remainingHits: 3 },
    { name: 'Patrol Boat', num: 2, remainingHits: 2 }
  ],
  p2Ships: [
    { name: 'Carrier', num: 5, remainingHits: 5 },
    { name: 'Battleship', num: 4, remainingHits: 4 },
    { name: 'Destroyer', num: 3, remainingHits: 3 },
    { name: 'Submarine', num: 3.5, remainingHits: 3 },
    { name: 'Patrol Boat', num: 2, remainingHits: 2 }
  ]
};

//includes start, excludes end
export function randomNum(start, end) {
  const num = Math.floor(Math.random() * (end - start)) + start;
  return num;
}

class App extends Component {
  state = {
    ...JSON.parse(JSON.stringify(DEFAULT_STATE)),
    isPlayer1Start: true,
    isPlayer1Turn: true
  };

  componentDidMount() {
    this.setupBoard();
  }

  setupBoard = () => {
    //we're assuming state has been set to DEFAULT_STATE
    console.log('in setupBoard');
    this.setState(prevState => {
      const newp1Board = [...prevState.p1Board];
      const newp2Board = [...prevState.p2Board];
      this.addShipsToBoard(newp1Board, this.state.p1Ships);
      this.addShipsToBoard(newp2Board, this.state.p2Ships);
      return { p1Board: newp1Board, p2Board: newp2Board };
    });
  };

  addShipsToBoard = (board, ships) => {
    ships.forEach(ship => {
      let continueLoop = true;
      while (continueLoop) {
        const randomRow = randomNum(0, 8);
        const randomColumn = randomNum(0, 8);
        const isHorizontal = randomNum(0, 2) > 0;
        const shipLength = ship.remainingHits;
        if (isHorizontal) {
          if (randomColumn + shipLength >= 10) continue;
          let isPathClear = true;
          for (let i = randomColumn; i < randomColumn + shipLength; i++) {
            if (board[randomRow][i] !== 0) isPathClear = false;
          }
          if (!isPathClear) continue;
          for (let i = randomColumn; i < randomColumn + shipLength; i++) {
            board[randomRow][i] = ship.num;
          }
          continueLoop = false;
        } else {
          if (randomRow + shipLength >= 10) continue;
          let isPathClear = true;
          for (let i = randomRow; i < randomRow + shipLength; i++) {
            if (board[i][randomColumn] !== 0) isPathClear = false;
          }
          if (!isPathClear) continue;
          for (let i = randomRow; i < randomRow + shipLength; i++) {
            board[i][randomColumn] = ship.num;
          }
          continueLoop = false;
        }
      }
    });
    return board;
  };

  squareClicked = (isPlayer1Turn, boardId, position) => {
    console.log('in square clicked');
    const [targetRow, targetColumn] = position;
    this.setState(prevState => {
      if (prevState.winStatus !== 0) return prevState;
      if ((boardId === 1 && isPlayer1Turn) || (boardId === 2 && !isPlayer1Turn))
        return prevState;
      const newState = { ...prevState };
      const currentBoard = isPlayer1Turn
        ? [...newState.p2Board]
        : [...newState.p1Board];
      if (currentBoard[targetRow][targetColumn] >= 10) {
        return newState;
      }
      const currentShips = isPlayer1Turn
        ? [...newState.p2Ships]
        : [...newState.p1Ships];
      if (this.isHit(currentBoard, position)) {
        newState.hitStatus = 'Hit!';
        newState.ships = this.getUpdatedShips(
          currentBoard,
          position,
          currentShips
        );
        currentBoard[targetRow][targetColumn] = 100;
        newState.winStatus = this.checkWin(isPlayer1Turn, newState.ships);
      } else {
        newState.hitStatus = 'Miss!';
        currentBoard[targetRow][targetColumn] = 10;
      }
      newState.isPlayer1Turn = !newState.isPlayer1Turn;
      return newState;
    });
  };

  isHit = (board, position) => {
    console.log('in isHit');
    const square = board[position[0]][position[1]];
    if (square > 0 && square <= 5) {
      return true;
    } else return false;
  };

  getUpdatedShips = (board, position, ships) => {
    console.log('in processHit');
    const shipNum = board[position[0]][position[1]];
    const shipIndex = ships.findIndex(ship => ship.num === shipNum);
    ships[shipIndex].remainingHits -= 1;
    if (ships[shipIndex].remainingHits <= 0) {
      this.setState(prevState => {
        const newState = { ...prevState };
        newState.hitStatus = `${ships[shipIndex].name} sunk!`;
        return newState;
      });
      console.log('ship destroyed');
    }
    return ships;
  };

  checkWin = (isPlayer1Turn, ships) => {
    const isGameOver = ships.every(ship => ship.remainingHits === 0);
    if (isGameOver && isPlayer1Turn) return 1;
    if (isGameOver && !isPlayer1Turn) return 2;
    return 0;
  };

  playAgain = () => {
    this.setState(prevState => {
      const newState = JSON.parse(JSON.stringify(DEFAULT_STATE));
      newState.isPlayer1Start = !prevState.isPlayer1Start;
      newState.isPlayer1Turn = newState.isPlayer1Start;
      return newState;
    });
    this.setupBoard();
  };

  render() {
    let playStatus;
    switch (this.state.winStatus) {
      case 0:
        playStatus = 'Keep Playing!';
        break;
      case 1:
        playStatus = 'Player 1 Wins!';
        break;
      case 2:
        playStatus = 'Player 2 Wins!';
        break;
      default:
        playStatus = "You're both winners";
        break;
    }
    return (
      <div className="App text-center">
        <h1>Battleship</h1>
        <GameStatusDiv className="stat">
          <p>Your turn: {this.state.isPlayer1Turn ? 'Player 1' : 'Player 2'}</p>
          <p>Game Status: {playStatus}</p>
          <p>Hit Status: {this.state.hitStatus}</p>
          <button className="btn btn-primary" onClick={this.playAgain}>
            Play Again?
          </button>
        </GameStatusDiv>
        <BoardsContainer className="Bcont">
          <BoardDiv>
            <h2>Player 1 Ships</h2>
            <Board
              board={this.state.p1Board}
              boardId={1}
              squareClicked={this.squareClicked}
              currentTurn={this.state.isPlayer1Turn}
              playAgain={this.playAgain}
              winStatus={this.state.winStatus}
            />
            <ShipsRemaining ships={this.state.p1Ships} />
          </BoardDiv>
          <BoardDiv>
            <h2>Player 2 Ships</h2>
            <Board
              board={this.state.p2Board}
              boardId={2}
              squareClicked={this.squareClicked}
              currentTurn={this.state.isPlayer1Turn}
              playAgain={this.playAgain}
              winStatus={this.state.winStatus}
            />
            <ShipsRemaining ships={this.state.p2Ships} />
          </BoardDiv>
        </BoardsContainer>
      </div>
    );
  }
}

export default App;
