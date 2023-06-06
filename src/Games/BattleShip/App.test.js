import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { randomNum } from './App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});
it('returns numbers between inputs', () => {
  expect(randomNum(10, 20)).toBeLessThan(20);
  expect(randomNum(10, 20)).toBeGreaterThanOrEqual(10);
});
