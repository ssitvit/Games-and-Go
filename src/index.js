
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { BrowserRouter as Router } from "react-router-dom";
import WordSearch  from  './WordSearch.jsx';



ReactDOM.render(

    <React.StrictMode>
    <Router>
      <App />
      <WordSearch/>
     </Router>
   </React.StrictMode>

,
  document.getElementById('root')
);