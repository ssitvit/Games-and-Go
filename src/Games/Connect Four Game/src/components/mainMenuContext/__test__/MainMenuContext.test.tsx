import { fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { renderWithProviders } from '../../../helpers/test-utils';
import MainMenuContext from '../MainMenuContext';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Main menu context testing', () => {
  test('should render pvp btn', () => {
    renderWithProviders(
      <BrowserRouter>
        <MainMenuContext />
      </BrowserRouter>
    );

    const pvpBtn = screen.queryByText('play vs player');
    expect(pvpBtn).not.toBeNull();
  });
  test('should render cpuvp btn', () => {
    renderWithProviders(
      <BrowserRouter>
        <MainMenuContext />
      </BrowserRouter>
    );

    const cpuvpBtn = screen.queryByText('player vs cpu');
    expect(cpuvpBtn).not.toBeNull();
  });
  test('should render rules btn', () => {
    renderWithProviders(
      <BrowserRouter>
        <MainMenuContext />
      </BrowserRouter>
    );

    const rulesBtn = screen.queryByText('game rules');
    expect(rulesBtn).not.toBeNull();
  });

  test('should start game after clickin pvp btn', () => {
    const navigate = jest.fn();
    // @ts-ignore
    useNavigate.mockReturnValue(navigate);
    const { store } = renderWithProviders(
      <BrowserRouter>
        <MainMenuContext />
      </BrowserRouter>
    );

    const pvpBtn = screen.getByText('play vs player');
    fireEvent.click(pvpBtn);
    const { gameIsRunning } = store.getState().game;
    expect(gameIsRunning).toBe(true);
    expect(navigate).toBeCalled();
  });
  test('should open modal after clicking cpuvp btn', () => {
    const { store } = renderWithProviders(
      <BrowserRouter>
        <MainMenuContext />
      </BrowserRouter>
    );

    const cpuBtn = screen.getByText('player vs cpu');
    fireEvent.click(cpuBtn);
    const { mainMenu } = store.getState().modal.isModalOpened;
    expect(mainMenu).toBe(true);
  });
  test('should call navigate after clicking game rules btn', () => {
    const navigate = jest.fn();
    // @ts-ignore
    useNavigate.mockReturnValue(navigate);
    renderWithProviders(
      <BrowserRouter>
        <MainMenuContext />
      </BrowserRouter>
    );

    const rulesBtn = screen.getByText('game rules');
    fireEvent.click(rulesBtn);
    expect(navigate).toBeCalled();
  });
});
