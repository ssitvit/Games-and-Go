import { act, screen, waitFor } from '@testing-library/react';

import { renderWithProviders } from '../../../../helpers/test-utils';
import { setupStore } from '../../../../store/store';
import Timer from '../Timer';
import { useAppDispatch } from '../../../../store/hooks';
import { updateTimer } from '../../../../store/gameSlice';

jest.mock('../../../../store/hooks', () => ({
  ...jest.requireActual('../../../../store/hooks'),
  useAppDispatch: jest.fn(),
}));

describe('Timer componet testing', () => {
  test('should render your turn if current player is player and it is cpu v p mode', () => {
    const preloadedStore = setupStore();
    const { game } = preloadedStore.getState();

    renderWithProviders(<Timer />, {
      preloadedState: {
        game: {
          ...game,
          p1: { name: 'You', score: 0, color: 'red' },
          currentPlayer: 'p1',
          gameMode: 'CPUvP',
        },
      },
    });
    const name = screen.getByRole('heading', { level: 4 });
    expect(name).toHaveTextContent('your turn');
  });
  test("should render cpu's turn if current player is cpu and it is cpu v p mode", () => {
    const preloadedStore = setupStore();
    const { game } = preloadedStore.getState();

    renderWithProviders(<Timer />, {
      preloadedState: {
        game: {
          ...game,
          p2: { name: 'CPU', score: 0, color: 'yellow' },
          currentPlayer: 'p2',
          gameMode: 'CPUvP',
        },
      },
    });
    const name = screen.getByRole('heading', { level: 4 });
    expect(name).toHaveTextContent("CPU's turn");
  });

  test('should render 30s iniialy', () => {
    renderWithProviders(<Timer />);
    const name = screen.getByRole('heading', { level: 2 });
    expect(name).toHaveTextContent('30s');
  });

  test('should render 29s after 1s', () => {
    const { store } = renderWithProviders(<Timer />);
    act(() => {
      store.dispatch(updateTimer(29));
    });
    const name = screen.getByRole('heading', { level: 2 });
    expect(name).toHaveTextContent('29s');
  });
  test('should change turn at 0s', async () => {
    jest.useFakeTimers();
    const dispatch = jest.fn();
    // @ts-ignore
    useAppDispatch.mockReturnValue(dispatch);
    const preloadedStore = setupStore();
    const { game } = preloadedStore.getState();

    const { store } = renderWithProviders(<Timer />, {
      preloadedState: {
        game: {
          ...game,
          timer: 1,
          turn: 'red',
          currentPlayer: 'p1',
          p1: { name: 'You', score: 0, color: 'red' },
          isGamePaused: false,
        },
      },
    });
    act(() => {
      store.dispatch(updateTimer(0));
    });

    await waitFor(() => {
      expect(dispatch).toBeCalled();
    });
  });
});
