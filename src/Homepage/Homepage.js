import React from 'react';
import './Homepage.css';
import { Link } from 'react-router-dom';
import Tictactoe from '../Tictactoe/tictactoe';

function Homepage() {
  return (

     <React.Fragment>
    <div className="container">
        <div className="pacman"></div>
        <div className="ghost"></div>
        <div className="ghost"></div>
        <div className="ghost"></div>
        <div className="ghost"></div>
        <div className="text"></div>
    </div>
 <div className="header1">
   
  <h1 className="head1"> Game on!!</h1>
  </div>
      <div className="body">
    <div className="container1">
        <div className="card">
            <div className="content">
                <h2>01</h2>
                <h3>TIC-TAC-TOE</h3>
                <p>A fun and interesting tic tac toe game to take us back to the good old childhood days!
                </p>
                
                <Link to="/Tic">Play now !!!</Link>
                
             
            </div>
        </div>
        <div className="card">
            <div className="content">
                <h2>02</h2>
                <h3>Add another game here</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Doloribus excepturi reiciendis facere, officiis ullam. 
                    Illum iusto, repellendus itaque corrupti suscipit at!
                </p>
                <a href="#">Read More</a>
            </div>
        </div>
        <div className="card">
            <div className="content">
                <h2>03</h2>
                <h3>Add another game here</h3>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. 
                    Doloribus excepturi reiciendis facere, officiis ullam. 
                    Illum iusto, repellendus itaque corrupti suscipit at!
                </p>
                <a href="#">Read More</a>
            </div>
        </div>
    </div>
  </div>
</React.Fragment>

  
  );
}

export default Homepage;
