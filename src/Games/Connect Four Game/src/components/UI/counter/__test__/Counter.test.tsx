import { screen, render } from '@testing-library/react';

import Counter from '../Counter';

describe('counter component testing', () => {
  test('should have right color', () => {
    render(<Counter bg={'red'} row={5} isWin={false} />);
    const counter = screen.getByTestId('counter');
    expect(counter).toHaveStyle(`background-image: url("red")`);
  });
  test('should have right white circle is it is in win combo', () => {
    render(<Counter bg={'red'} row={5} isWin={true} />);
    const whiteCirlce = screen.getByTestId('winnigCounter');
    expect(whiteCirlce).toBeInTheDocument();
  });
});
