import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import { Provider } from 'react-redux';
import { store } from '../../../../store/store';
import Board from '../Board';

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <Board />
    </Provider>
  );
};

jest.mock('../../../../helpers/getWorker.ts', () => ({
  getWebWorker: jest.fn(),
}));

window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'));
};

describe('board component testing', () => {
  test('should render component', () => {
    renderComponent();
    const board = screen.getByTestId('board');
    expect(board).toBeInTheDocument();
  });

  test('should render large layout on big screens', () => {
    renderComponent();
    const largeWhite = screen.getByTestId('largeWhite');
    const largeBlack = screen.getByTestId('largeBlack');
    expect(largeWhite).toBeInTheDocument();
    expect(largeBlack).toBeInTheDocument();
  });
  test('should render small layout on big screens', () => {
    act(() => {
      window.resizeTo(500, 500);
    });
    renderComponent();
    const smallWhite = screen.getByTestId('smallWhite');
    const smallBlack = screen.getByTestId('smallBlack');
    expect(smallWhite).toBeInTheDocument();
    expect(smallBlack).toBeInTheDocument();
  });
});
