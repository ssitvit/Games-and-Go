import { fireEvent, screen } from '@testing-library/react';

import { renderWithProviders } from '../../../../helpers/test-utils';
import { setupStore } from '../../../../store/store';
import Winner from '../Winner';

describe('Winner component', () => {
  test('should render name of winner', () => {
    const preloadedStore = setupStore();
    const { game } = preloadedStore.getState();

    renderWithProviders(<Winner />, {
      preloadedState: {
        game: {
          ...game,
          winner: 'p2',
          p2: { name: 'Cpu', color: 'yellow', score: 1 },
        },
      },
    });

    const name = screen.getByRole('heading', { level: 4 });
    expect(name).toHaveTextContent('Cpu');
  });

  test('should render tie text if it is tie', () => {
    const preloadedStore = setupStore();
    const { game } = preloadedStore.getState();

    renderWithProviders(<Winner />, {
      preloadedState: {
        game: {
          ...game,
          winner: 'tie',
          p2: { name: 'Cpu', color: 'yellow', score: 1 },
        },
      },
    });

    const winText = screen.getByRole('heading', { level: 2 });
    expect(winText).toHaveTextContent('tie');
  });
  test('should restart game after clicking play again btn', () => {
    const preloadedStore = setupStore();
    const { game } = preloadedStore.getState();

    const { store } = renderWithProviders(<Winner />, {
      preloadedState: {
        game: {
          ...game,
          winner: 'tie',
          p2: { name: 'Cpu', color: 'yellow', score: 1 },
        },
      },
    });

    const playAgaintBtn = screen.getByText('Play Again');
    fireEvent.click(playAgaintBtn);
    const { winner } = store.getState().game;
    expect(winner).toBeNull();
  });
});
