import { fireEvent, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { renderWithProviders } from '../../../helpers/test-utils';

import RulesContext from '../RulesContext';
import { useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('Rules context component testing', () => {
  test('should render component', () => {
    renderWithProviders(
      <BrowserRouter>
        <RulesContext />
      </BrowserRouter>
    );
    const rules = screen.queryByText('Rules');
    expect(rules).not.toBeNull();
  });

  test('should call navigate after cliking btn', () => {
    const navigate = jest.fn();
    // @ts-ignore
    useNavigate.mockReturnValue(navigate);
    renderWithProviders(
      <BrowserRouter>
        <RulesContext />
      </BrowserRouter>
    );
    const btn = screen.getByTestId('confirm-button');
    fireEvent.click(btn);
    expect(navigate).toBeCalled();
  });
});
