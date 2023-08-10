import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import EightQueens from './EightQueens';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<EightQueens />, document.getElementById('root'));

// Offline-first Progressive Web App
//  - uses serverWorker for faster page loads and offline play
//  - See https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app
//serviceWorker.register();

serviceWorker.unregister();
