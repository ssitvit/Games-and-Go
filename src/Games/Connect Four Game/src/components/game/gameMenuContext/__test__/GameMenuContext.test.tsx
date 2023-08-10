import { fireEvent, screen } from '@testing-library/react';
import { renderWithProviders } from '../../../../helpers/test-utils';

import GameMenuContext from '../GameMenuContext';
import { BrowserRouter } from 'react-router-dom';
import { setupStore } from '../../../../store/store';

describe('Game Menu context component testing', () => {
  test('should render component', () => {
    renderWithProviders(
      <BrowserRouter>
        <GameMenuContext />
      </BrowserRouter>
    );
    const menu = screen.queryByText('pause');
    expect(menu).not.toBeNull();
  });

  test('should render continue btn', () => {
    renderWithProviders(
      <BrowserRouter>
        <GameMenuContext />
      </BrowserRouter>
    );
    const continueBtn = screen.queryByText('continue game');
    expect(continueBtn).not.toBeNull();
  });
  test('should render restart btn', () => {
    renderWithProviders(
      <BrowserRouter>
        <GameMenuContext />
      </BrowserRouter>
    );
    const restartBtn = screen.queryByText('restart');
    expect(restartBtn).not.toBeNull();
  });
  test('should render quit btn', () => {
    renderWithProviders(
      <BrowserRouter>
        <GameMenuContext />
      </BrowserRouter>
    );
    const quitBtn = screen.queryByText('quit game');
    expect(quitBtn).not.toBeNull();
  });
  test('should continue game after click', () => {
    const preloadedStore = setupStore();
    const { game, modal } = preloadedStore.getState();

    const { store } = renderWithProviders(
      <BrowserRouter>
        <GameMenuContext />
      </BrowserRouter>,
      {
        preloadedState: {
          game: { ...game, gameIsPaused: true },
          modal: {
            ...modal,
            isModalOpened: { mainMenu: false, gameMenu: true },
          },
        },
      }
    );

    const continueBtn = screen.getByText('continue game');
    fireEvent.click(continueBtn);
    const { isGamePaused } = store.getState().game;
    const { gameMenu } = store.getState().modal.isModalOpened;
    expect(isGamePaused).toBe(false);
    expect(gameMenu).toBe(false);
  });
  test('should restart game after click', () => {
    const preloadedStore = setupStore();
    const { game, modal } = preloadedStore.getState();

    const { store } = renderWithProviders(
      <BrowserRouter>
        <GameMenuContext />
      </BrowserRouter>,
      {
        preloadedState: {
          game: { ...game, gameIsPaused: true, winner: 'p1' },
          modal: {
            ...modal,
            isModalOpened: { mainMenu: false, gameMenu: true },
          },
        },
      }
    );

    const restartBtn = screen.getByText('restart');
    fireEvent.click(restartBtn);
    const { isGamePaused, winner } = store.getState().game;
    const { gameMenu } = store.getState().modal.isModalOpened;
    expect(isGamePaused).toBe(false);
    expect(winner).toBeNull();
    expect(gameMenu).toBe(false);
  });
  test('should quit game after click', () => {
    const preloadedStore = setupStore();
    const { game, modal } = preloadedStore.getState();

    const { store } = renderWithProviders(
      <BrowserRouter>
        <GameMenuContext />
      </BrowserRouter>,
      {
        preloadedState: {
          game: { ...game, gameIsRunning: true },
          modal: {
            ...modal,
            isModalOpened: { mainMenu: false, gameMenu: true },
          },
        },
      }
    );

    const quitBtn = screen.getByText('quit game');
    fireEvent.click(quitBtn);
    const { gameIsRunning } = store.getState().game;
    const { gameMenu } = store.getState().modal.isModalOpened;
    expect(gameIsRunning).toBe(false);
    expect(gameMenu).toBe(false);
  });
});
