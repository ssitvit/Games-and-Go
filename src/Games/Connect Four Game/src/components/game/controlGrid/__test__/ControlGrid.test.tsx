import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import { Provider } from 'react-redux';
import { store } from '../../../../store/store';
import { changeTurn } from '../../../../store/gameSlice';
import ControlGrid from '../ControlGrid';
import { useAppDispatch } from '../../../../store/hooks';
import { renderWithProviders } from '../../../../helpers/test-utils';
import { setupStore } from '../../../../store/store';

import { act } from 'react-dom/test-utils';

const renderComponent = () => {
  return render(
    <Provider store={store}>
      <ControlGrid />
    </Provider>
  );
};

jest.mock('../../../../helpers/getWorker.ts', () => ({
  getWebWorker: jest.fn(),
}));
jest.mock('../../../../store/hooks', () => ({
  ...jest.requireActual('../../../../store/hooks'),
  useAppDispatch: jest.fn(),
}));
jest.mock('../../../../helpers/aiMove', () => ({
  maximizePlay: jest.fn(),
}));

describe('Control Grid component testing', () => {
  test('should render component', () => {
    renderComponent();
    const control = screen.getByTestId('control');
    expect(control).toBeInTheDocument();
  });

  test('should render 7 columns', () => {
    renderComponent();
    const columns = screen.getAllByTestId(/column/i);
    expect(columns).toHaveLength(7);
  });

  test('should call dispatch after clicking on one of columns', () => {
    const dispatch = jest.fn();
    // @ts-ignore
    useAppDispatch.mockReturnValue(dispatch);
    renderComponent();
    const column = screen.getByTestId(/column0/i);
    fireEvent.click(column);
    expect(dispatch).toBeCalled();
  });

  test('should call dispatch on cpu turn', async () => {
    const dispatch = jest.fn();
    // @ts-ignore
    useAppDispatch.mockReturnValue(dispatch);
    const preLoadedstore = setupStore();
    const { game } = preLoadedstore.getState();
    const { store } = renderWithProviders(<ControlGrid />, {
      preloadedState: {
        game: {
          ...game,
          gameMode: 'CPUvP',
          turn: 'red',
          p2: { name: 'CPU', color: 'yellow', score: 0 },
        },
      },
    });
    await act(() => {
      store.dispatch(changeTurn());
    });

    await waitFor(() => {
      expect(dispatch).toBeCalled();
    });
  });
});
