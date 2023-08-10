import { screen } from '@testing-library/react';

import { renderWithProviders } from '../../../../helpers/test-utils';
import { setupStore } from '../../../../store/store';
import PlayerInfo from '../PlayerInfo';

describe('Player info component testing', () => {
  test('should render name you', () => {
    const preloadedStore = setupStore();
    const { game } = preloadedStore.getState();

    renderWithProviders(<PlayerInfo player="player1" />, {
      preloadedState: {
        game: { ...game, p1: { name: 'you', score: 0, color: 'red' } },
      },
    });

    const name = screen.getByRole('heading', { level: 3 });
    expect(name).toHaveTextContent('you');
  });
  test('should render score 23', () => {
    const preloadedStore = setupStore();
    const { game } = preloadedStore.getState();

    renderWithProviders(<PlayerInfo player="player1" />, {
      preloadedState: {
        game: { ...game, p1: { name: 'you', score: 23, color: 'red' } },
      },
    });

    const name = screen.getByRole('heading', { level: 2 });
    expect(name).toHaveTextContent('23');
  });
  test('should have right icon player', () => {
    const preloadedStore = setupStore();
    const { game } = preloadedStore.getState();

    renderWithProviders(<PlayerInfo player="player1" />, {
      preloadedState: {
        game: {
          ...game,
          gameMode: 'CPUvP',
          p1: { name: 'you', score: 23, color: 'red' },
        },
      },
    });

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveTextContent('you.svg');
  });
  test('should have right icon cpu', () => {
    const preloadedStore = setupStore();
    const { game } = preloadedStore.getState();

    renderWithProviders(<PlayerInfo player="player2" />, {
      preloadedState: {
        game: {
          ...game,
          gameMode: 'CPUvP',
          p2: { name: 'cpu', score: 23, color: 'red' },
        },
      },
    });

    const icon = screen.getByTestId('icon');
    expect(icon).toHaveTextContent('cpu.svg');
  });
});
