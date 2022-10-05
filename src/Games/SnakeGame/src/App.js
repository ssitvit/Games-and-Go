import React, { Component } from 'react';
import GameBoard from './components/GameBoard';
import { BrowserRouter, Route,Routes} from "react-router-dom";
import Header from './components/Header';
import MainScreen from './components/MainScreen';
import './App.css';
export default class App extends Component {
  render() {
    return (
      <div className='body'>
        <BrowserRouter>
        <Header/>
        <Routes>
          <Route exact path='/' element={<MainScreen/>}></Route>
          <Route path='/gameboardeasy' element={<GameBoard speed={200} level={'easy'}/>}></Route>
          <Route path='/gameboardmedium' element={<GameBoard speed={100} level={'medium'}/>}></Route>
          <Route path='/gameboardhard' element={<GameBoard speed={55} level={'hard'}/>}></Route>
        </Routes>
        </BrowserRouter>
      </div>
    )
  }
}
