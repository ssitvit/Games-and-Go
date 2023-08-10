import React from 'react';
import ReactDOM from 'react-dom';
import EightQueens from './EightQueens';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<EightQueens />, div);
  ReactDOM.unmountComponentAtNode(div);
});
