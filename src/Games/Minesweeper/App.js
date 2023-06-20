import React from 'react';
import Board from './Components/Board';
import './App.css';

function App() {
  return (
    <div>
    <div className="heading">
    <h1>MineSweeper</h1>
    </div>
    <div className="aligned">   
      <Board/>
    </div>
  </div>
  );
}

export default App;
