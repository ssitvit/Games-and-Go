import { screen, render, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import { store } from '../../../../store/store';
import { setWinner } from '../../../../store/gameSlice';
import GameInfo from '../GameInfo';

describe('GameInfo component testing', () => {
  test('should render component', () => {
    render(
      <Provider store={store}>
        <GameInfo />
      </Provider>
    );

    const gameInfo = screen.queryByTestId('gameInfo');
    expect(gameInfo).not.toBeNull();
  });
  test('should render timer component iniitaly', () => {
    render(
      <Provider store={store}>
        <GameInfo />
      </Provider>
    );

    const timer = screen.getByTestId('timer');
    expect(timer).toBeInTheDocument();
  });

  test('should render winner component if there is winner', async () => {
    render(
      <Provider store={store}>
        <GameInfo />
      </Provider>
    );
    await waitFor(() => {
      store.dispatch(setWinner('p1'));
    });
    const winner = screen.getByTestId('winner');
    expect(winner).toBeInTheDocument();
  });
});
