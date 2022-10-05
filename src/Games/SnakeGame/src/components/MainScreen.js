import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './MainScreen.css';

export default class MainScreen extends Component {
  easyhscore = localStorage.getItem('easyhscore');
  mediumhscore = localStorage.getItem('mediumhscore');
  hardhscore = localStorage.getItem('hardhscore');
  

  handleEasyReset() 
  {
    localStorage.setItem('easyhscore',0);
    window.location.reload(false);
  }
  handleMediumReset() 
  {
    localStorage.setItem('mediumhscore',0);
    window.location.reload(false);
  }
  handleHardReset()
  {
    localStorage.setItem('hardhscore',0);
    window.location.reload(false);
  }
  handleAllReset()
  {
    localStorage.setItem('easyhscore',0);
    localStorage.setItem('mediumhscore',0);
    localStorage.setItem('hardhscore',0);
    window.location.reload(false);
  }


  render() {
    return (
      <div className='mainscreen'>
        <div className='level'>
          <h2>Choose Level</h2>
          <Link to='/gameboardeasy' style={{ textDecoration: 'none' }}><p>Easy</p></Link>
          <Link to='/gameboardmedium' style={{ textDecoration: 'none' }}><p>Medium</p></Link>
          <Link to='/gameboardhard' style={{ textDecoration: 'none' }}><p>Hard</p></Link>
          <h3>Instructions</h3>
            <div className='instruction'>
              <br>
              </br>
              UP - Up arrow key or W 
              <br>
              </br>
              DOWN - Down arrow key or S
              <br></br>
              LEFT - Left arrow key or A
              <br></br>
              RIGHT - Right arrow key or D
              <br></br>
              Press P to Pause the game
            </div>
        </div>
        <div className='scorecard'>
          <h2>Highest Scores</h2>
          <div className='hscore-div'>
            <p className='levelinfo'>Easy level: {(this.easyhscore == null) ? 0 : (parseInt(JSON.parse(this.easyhscore)))}</p>
            <button className='resetbtn' onClick={this.handleEasyReset}>Reset this highscore</button>
          </div>
          <div className='hscore-div'>
            <p className='levelinfo'>Medium level: {(this.mediumhscore == null) ? 0 : (parseInt(JSON.parse(this.mediumhscore)))}</p>
            <button className='resetbtn' onClick={this.handleMediumReset}>Reset this highscore</button>
          </div>
          <div className='hscore-div'>
            <p className='levelinfo'>Hard level: {(this.hardhscore == null) ? 0 : (parseInt(JSON.parse(this.hardhscore)))}</p>
            <button className='resetbtn' onClick={this.handleHardReset}>Reset this highscore</button>
          </div>
          <div className='resetall'>
            <button className='resetallbtn' onClick={this.handleAllReset}>Reset all highscores</button>
          </div>
        </div>
      </div>
    )
  }
}
