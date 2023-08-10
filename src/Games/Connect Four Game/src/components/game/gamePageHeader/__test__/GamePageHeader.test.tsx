import { screen, fireEvent } from '@testing-library/react';

import { setupStore } from '../../../../store/store';
import { renderWithProviders } from '../../../../helpers/test-utils';
import GamePageHeader from '../GamePageHeader';

describe('Game page header testing', () => {
  test('should render menu button', () => {
    renderWithProviders(<GamePageHeader />);
    const menuBtn = screen.queryByText('Menu');
    expect(menuBtn).not.toBeNull();
  });
  test('should render restart button', () => {
    renderWithProviders(<GamePageHeader />);
    const restartBtn = screen.queryByText('Restart');
    expect(restartBtn).not.toBeNull();
  });

  test('should open modal and pause game after clicking menu btn', async () => {
    const preloadedStore = setupStore();
    const { game, modal } = preloadedStore.getState();

    const { store } = renderWithProviders(<GamePageHeader />, {
      preloadedState: {
        game: { ...game, isGamePaused: false },
        modal,
      },
    });

    const restartBtn = screen.getByText('Menu');

    fireEvent.click(restartBtn);

    const { isGamePaused } = store.getState().game;
    const { gameMenu } = store.getState().modal.isModalOpened;

    expect(isGamePaused).toBe(true);
    expect(gameMenu).toBe(true);
  });

  test('should restart game after clicking menu btn', async () => {
    const preloadedStore = setupStore();
    const { game } = preloadedStore.getState();

    const { store } = renderWithProviders(<GamePageHeader />, {
      preloadedState: {
        game: { ...game, gameIsPaused: true, winner: 'p1' },
      },
    });

    const restartBtn = screen.getByText('Restart');

    fireEvent.click(restartBtn);

    const { isGamePaused, winner } = store.getState().game;

    expect(isGamePaused).toBe(false);
    expect(winner).toBeNull();
  });
});
