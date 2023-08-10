import { screen, render } from '@testing-library/react';
import GameBoard from '../GameBoard';
import { Provider } from 'react-redux';
import { store } from '../../../../store/store';

jest.mock('../../../../helpers/getWorker.ts', () => ({
  getWebWorker: jest.fn(),
}));

describe('Game board component testing', () => {
  test('should render component', () => {
    render(
      <Provider store={store}>
        <GameBoard />
      </Provider>
    );
    const gameBaord = screen.queryByTestId('gameBoard');
    expect(gameBaord).not.toBeNull();
  });
});
