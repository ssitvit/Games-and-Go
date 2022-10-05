import React, { Component } from 'react';
import { Link} from 'react-router-dom';

import Food from './Food';
import Snake from './Snake';
import './GameBoard.css';
const getRandomCoordinates = () => {
  let min = 1;
  let max = 98;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
  return [x, y];
}

const val=0;
export default class GameBoard extends Component {

  constructor(props)
  {
    super(props);
    this.state={
      score:0,
      food:getRandomCoordinates(),
      initialSpeed:props.speed,
      speed:props.speed,
      level:props.level,
      direction:'RIGHT',
      snakeDots: [
        [0, 0],
        [2, 0],
        [4,0]
      ],
      h:(localStorage.getItem(`${props.level}hscore`)===null?localStorage.setItem(`${props.level}hscore`,JSON.stringify(val)):localStorage.getItem('highscore')),
      highScore:localStorage.getItem(`${props.level}hscore`),
    };
  }


  componentDidMount() 
  {
    setInterval(this.moveSnake,this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate()
  {
    this.checkIfOutOfBorders();
    this.checkIfCollapsed();
    this.checkIfFoodEaten();
  }

  onKeyDown = (e) => {
    e = e || window.event; 
    switch (e.keyCode) {
      case 38:
        this.setState({ direction: 'UP' });
        break;
      case 40:
        this.setState({ direction: 'DOWN' });
        break;
      case 37:
        this.setState({ direction: 'LEFT' });
        break;
      case 39:
        this.setState({ direction: 'RIGHT' });
        break;
      case 87:
        this.setState({ direction: 'UP' });
        break;
      case 83:
        this.setState({ direction: 'DOWN' });
        break;
      case 65:
        this.setState({ direction: 'LEFT' });
        break;
      case 68:
        this.setState({ direction: 'RIGHT' });
        break;
      case 80:
        alert('Game is Paused, Press OK or Enter Key to continue Playing !!');
        break;
      default:
    }
  }

  moveSnake = () => {
    let dots = [...this.state.snakeDots];
    let head = dots[dots.length - 1];


    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'UP':
        head = [head[0], head[1]-2];
        break;
      case 'DOWN':
        head = [head[0], head[1]+2];
        break;
      default:

    }
    dots.push(head);
    dots.shift();
    this.setState({snakeDots:dots})
  }
  checkIfOutOfBorders=()=>
  {
    let head=this.state.snakeDots[this.state.snakeDots.length-1];
    if(head[0]>=100 || head[1]>=100 || head[0]<0 || head[1]<0)
    {
      this.onGameOver();
    }
  }

  checkIfCollapsed()
  {
    let snake=[...this.state.snakeDots];
    let head=snake[snake.length-1];
    snake.pop();
    snake.forEach(dot=>
      {
        if(head[0]===dot[0] && head[1]===dot[1])
        {
          this.onGameOver();
        }
      })
  }

  checkIfFoodEaten()
  {
    let head=this.state.snakeDots[this.state.snakeDots.length-1];
    let food=this.state.food;
    if(head[0]===food[0] && head[1]===food[1])
    {
      this.setState(
        {
          food:getRandomCoordinates()
        }
      )
      this.enlargeSnake();
      this.increaseSpeed();
    }
  }
  enlargeSnake()
  {
    let newSnake=[...this.state.snakeDots];
    newSnake.unshift([]);
    this.setState(
      {
        snakeDots:newSnake,
        score:newSnake.length-3
      }
    );
    if(newSnake.length-3>=parseInt(JSON.parse(this.state.highScore)))
    {
      localStorage.setItem(`${this.state.level}hscore`,JSON.stringify(newSnake.length-3));
      this.setState({
        highScore:localStorage.getItem(`${this.state.level}hscore`)
      })
    }
  }
  increaseSpeed()
  {
    if(this.state.speed>10)
    {
      this.setState(
        {
          speed: this.state.speed-10
        }
      )
    }
  }

  onGameOver()
  {
    alert(`Game is OVER. Snake length is ${this.state.snakeDots.length -3}. Press Enter Key to replay at this level`);
    this.setState({
      food:getRandomCoordinates(),
      score:0,
      highScore:localStorage.getItem(`${this.state.level}hscore`),
      speed:this.initialSpeed,
      direction:'RIGHT',
      snakeDots: [
        [0, 0],
        [2, 0],
        [4,0]
      ]
    });
  }
  pauseGame()
  {
    alert('Game is Paused, Press OK or Enter Key to continue Playing !!');
  }
  restartGame()
  {
    window.location.reload(false);
  }

  render() {
    return (
      <div className='gameboard'>
        <div className='game-area'>
          <Snake snakeDots={this.state.snakeDots} />
          <Food dot={this.state.food} />
        </div>
        <div className='score-area'>
          <h2>Highest Score     {parseInt(JSON.parse(this.state.highScore))}</h2>
          <h2>Current Score   {this.state.score}</h2>
          <div className='container'>
            <div className='btn-container'>
              <Link to='/' style={{textDecoration:"none"}}>
                <button className='button'>Home</button>
              </Link>
              <button className='button' onClick={this.pauseGame}>Pause</button>
            </div>
          </div>
        </div>
      </div>
      
    )
  }
}
