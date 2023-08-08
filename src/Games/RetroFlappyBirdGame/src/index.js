import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { store, updateFrame, birdjump, game, states, rungame } from './store/store';

ReactDOM.render(
  <App store={store} updateFrame={updateFrame} game={game}/>,
  document.getElementById('root')
);

function onpress(evt) {

    switch (game.currentstate) {
    default:
    case states.Splash:
      rungame()
      birdjump(store.bird)
      break
    case states.Game:
      birdjump(store.bird)
      break
    case states.Score:
      break
  }

}

document.addEventListener('mousedown', onpress);
