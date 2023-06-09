import React, { Component } from 'react';
import './App.css';

const ROWS_COLORS = ["#ff9999","#b399ff","#9999ff","#b399ff","#0066ff","","#0052cc","#0047b3","#003d99"]

const COLORS = ["#ff9999","#ffb399","#ffcc99","#ffe699","#ffff99","#e6ff99","#ccff99","#b3ff99","#99ff99","#99ffb3","#99ffcc","#99ffe6"
,"#99ffff","#99e6ff","#99ccff","#99b3ff","#9999ff","#b399ff","#cc99ff","#e699ff","#ff99ff","#ff99e6","#ff99cc","#ff99b3","#ff9999"];

const BOARD_WIDTH        = 800;
const BOARD_HEIGHT       = 500;

const PADDLE_WIDTH       = 100;
const PADDLE_HEIGHT      = 15;
const PADDLE_STEP_SIZE   = 30;
const PADDLE_TOP         = 500*0.9;
const PADDLE_LEFT        = (BOARD_WIDTH/2)-(PADDLE_WIDTH/2);

const PLATE_HEIGHT       = 15;
const PLATE_WIDTH        = window.innerWidth*0.15;

const DEFAULT_BALL_COLOR = '#ccff99';
const BALL_SIZE  = 20;
const DEFAULT_BALL_LEFT  = (BOARD_WIDTH/4)-(BALL_SIZE/2);
const DEFAULT_BALL_TOP   = (BOARD_HEIGHT/4)-(BALL_SIZE/2);

const BALL_STEP_SIZE = 1.5;

const START_TEXT = 'Welcome! Here'

class Arkanoid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paddleLeft: PADDLE_LEFT,
      paddleTop: PADDLE_TOP,
      ballTop: DEFAULT_BALL_TOP,
      ballLeft: DEFAULT_BALL_LEFT,
      leftStepSize: BALL_STEP_SIZE,
      topStepSize: BALL_STEP_SIZE,
      ballSize: BALL_SIZE,
      ballColor: DEFAULT_BALL_COLOR,
      plateWidth: PLATE_WIDTH,
      plateHeight: PLATE_HEIGHT,
      platePositions: [],
      buttonDisplay: 'inline-block',
      ballDisplay: 'block',
      buttonText: 'Start',
      text: START_TEXT,
      textDisplay: 'inline-block',
      score: 0
    };
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.startGame = this.startGame.bind(this);
    this.gameLoop = this.gameLoop.bind(this);
    this.pickColor = this.pickColor.bind(this);
    this.toggelY = this.toggelY.bind(this);
    this.toggelX = this.toggelX.bind(this);
    this.calculatePlatePositions = this.calculatePlatePositions.bind(this);
    this.checkWon = this.checkWon.bind(this);
    this.checkFail = this.checkFail.bind(this);
  }

  componentDidMount(){
    document.addEventListener("keydown", this.handleKeyDown, false);
    this.calculatePlatePositions();
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown, false);
  }

  handleKeyDown = (event) => {
    if (event.keyCode === 39 && (this.state.paddleLeft + PADDLE_STEP_SIZE) <= BOARD_WIDTH - PADDLE_WIDTH){
      this.setState({paddleLeft: (this.state.paddleLeft + PADDLE_STEP_SIZE)})
    } else if (event.keyCode === 37 && (this.state.paddleLeft - PADDLE_STEP_SIZE) >= 0) {
      this.setState({paddleLeft: (this.state.paddleLeft - PADDLE_STEP_SIZE)})
    }
  }

  startGame(text) {
    if (this.state.buttonText === 'Restart') {
      this.setState({
        ballTop: DEFAULT_BALL_TOP,
        ballLeft: DEFAULT_BALL_LEFT,
        ballDisplay: 'block',
        score: 0,
        buttonDisplay: 'none',
        textDisplay: 'none'
      });
  
      this.calculatePlatePositions();
      this.gameLoop();
    } else if (this.state.buttonText === 'Start') {
      this.setState({
        buttonDisplay: 'none',
        textDisplay: 'none'
      });
  
      this.gameLoop();
    }
  }
  
  pickColor() {
    return COLORS[Math.floor(Math.random() * COLORS.length)];
  }

  toggelY() {
    this.setState({topStepSize: -this.state.topStepSize})
    this.setState({ballColor: this.pickColor()})
  }

  toggelX() {
    this.setState({leftStepSize: -this.state.leftStepSize})
    this.setState({ballColor: this.pickColor()})
  }

  calculatePlatePositions() {
    const amount = Math.floor(BOARD_WIDTH/(PLATE_WIDTH+2))
    const rows = Math.floor((BOARD_HEIGHT/4)/(PLATE_HEIGHT+2))/2
    const arr = [];
    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < amount; j++) {
        arr.push([(i*(PLATE_HEIGHT+2) + PLATE_HEIGHT), (j*(PLATE_WIDTH+2) + ((BOARD_WIDTH - (amount*PLATE_WIDTH))/2)), ROWS_COLORS[i]])
      }
    }
    this.setState({platePositions: arr})
  }

  checkWon() {
    return this.state.platePositions.length === 0 ? true : false
  }
  checkFail() {
    return this.state.ballTop + BALL_SIZE >= (PADDLE_TOP + PADDLE_HEIGHT) ? true : false
  }

  gameLoop() {
    for (var i = 0; i < this.state.platePositions.length; i++) {
      if ((this.state.ballTop + BALL_SIZE + BALL_STEP_SIZE) >= (this.state.platePositions[i][0] - 1) && (this.state.ballTop) <= (this.state.platePositions[i][0] + PLATE_HEIGHT + 1)
      && (this.state.ballLeft + BALL_SIZE + BALL_STEP_SIZE) >= this.state.platePositions[i][1] && this.state.ballLeft <= (this.state.platePositions[i][1] + PLATE_WIDTH)) {
        this.state.platePositions.splice(i, 1);
        this.setState({score: this.state.score + 100})
        this.toggelY()
      }
    }

    if (this.checkWon()) {
      console.log('won')
      this.setState({ballDisplay: 'none'})
      this.setState({buttonDisplay: 'inline-block'})
      this.setState({textDisplay: 'inline-block'})
      this.setState({text: 'You Won!'})
      this.setState({buttonText: 'Restart'})
    } else if (this.checkFail()) {
      console.log('fail')
      this.setState({ballDisplay: 'none'})
      this.setState({buttonDisplay: 'inline-block'})
      this.setState({textDisplay: 'inline-block'})
      this.setState({text: 'GAME OVER'})
      this.setState({buttonText: 'Restart'})
    } else {

      if (this.state.ballLeft >= (BOARD_WIDTH - BALL_SIZE - BALL_STEP_SIZE) || this.state.ballLeft <= 0){
        this.toggelX()
      }

      if (this.state.ballTop <= 0){
        this.toggelY()
      }

      if ((this.state.ballTop + BALL_STEP_SIZE + BALL_SIZE) > PADDLE_TOP && (this.state.ballTop + BALL_STEP_SIZE + BALL_SIZE) > PADDLE_TOP + PADDLE_HEIGHT/4
      && (this.state.ballLeft + BALL_STEP_SIZE + BALL_SIZE) >= this.state.paddleLeft + 1
      && (this.state.ballLeft + BALL_STEP_SIZE) <= (this.state.paddleLeft + PADDLE_WIDTH + 2)){
        this.toggelY()
        this.toggelX()
      } else if ((this.state.ballTop + BALL_STEP_SIZE + BALL_SIZE) >= PADDLE_TOP
      && (this.state.ballLeft + BALL_STEP_SIZE + BALL_SIZE) >= this.state.paddleLeft + 1
      && (this.state.ballLeft + BALL_STEP_SIZE) <= (this.state.paddleLeft + PADDLE_WIDTH + 2)){
        this.toggelY()
      }

      this.setState({ballTop: (this.state.ballTop + this.state.topStepSize)})
      this.setState({ballLeft: (this.state.ballLeft + this.state.leftStepSize)})
      setTimeout(function() { this.gameLoop(); }.bind(this), 0);
    }
  }
  render() {
    return (
      <div className="App">
        <div className="Arkanoid-Board" style={{width: `${BOARD_WIDTH}px`, height: `${BOARD_HEIGHT}px`}}>
          <Text className="Text" display={this.state.textDisplay}>{this.state.text}</Text>
          <Paddle className="Paddle" leftPosition={this.state.paddleLeft} topPosition={this.state.paddleTop}></Paddle>
          <Plate
            className="Plate"
            platePositions={this.state.platePositions}
            plateWidth={this.state.plateWidth}
            plateHeight={this.state.plateHeight}
            >
          </Plate>
          <Ball
            className="Ball"
            ballTop={this.state.ballTop}
            ballLeft={this.state.ballLeft}
            onClick={this.state.gameLoop}
            ballSize={this.state.ballSize}
            ballColor={this.state.ballColor}
            display={this.state.ballDisplay}>
          </Ball>
          <Button
            onClick={() => { this.startGame(); } }
            className="Button"
            display={this.state.buttonDisplay}
          >
            {this.state.buttonText}
          </Button>
          <div className='Signature' style={{position: 'absolute', top: `${BOARD_HEIGHT-20}px`, left: `${BOARD_WIDTH - 210}px`,color: 'white'}}>Arkanoid Game Play Hard!</div>
          <div className='Score' style={{position: 'absolute', top: `${BOARD_HEIGHT-20}px`, left: '5px',color: 'white'}}>Your score: {this.state.score}</div>
        </div>
      </div>
    );
  }
}

const Text = ({className, children, display}) => {  return (
  <div className={className}
    style={{position: 'absolute', textAlign: 'center',left: '0', width: '100%', marginTop: `${(window.innerHeight/2) - 100}px`, fontSize: '60px', display: `${display}`, color: 'white'}}
    >
    {children}
  </div>);
}
const Paddle = ({className, leftPosition, topPosition}) => {  return (<div className={className} style={{left: `${leftPosition}px`, top: `${topPosition}px`}}></div>); }
const Plate = ({className, platePositions, plateWidth, plateHeight}) => {
  return (
    <div>
      {platePositions.map((item, index) =>
      <div className={className} key={index} style={{left: `${item[1]}px`, top: `${item[0]}px`, width: `${plateWidth}px`, height: `${plateHeight}px`, backgroundColor: `${item[2]}`}}></div>
    )}
    </div>
  )
}
const Ball = ({className, ballLeft, ballTop, onClick, ballSize, ballColor, display}) => {
  return (<div className={className}
    style={{left: `${ballLeft}px`, top: `${ballTop}px`, width: `${ballSize}px`, height: `${ballSize}px`, backgroundColor: `${ballColor}`, display: `${display}`}}
    onClick={onClick}>
    </div>);
}
const Button = ({onClick, className, display, children}) => {
  return (
    <div style={{position: 'absolute', textAlign: 'center',left: '0',width: '100%', marginTop: `${window.innerHeight/2}px`, display: `${display}`}}>
      <button
        onClick={onClick}
        className={className}
        type="button"
        style={{fontSize: '30px'}}
      >
        {children}
      </button>
    </div>
  );
}

export default Arkanoid;
