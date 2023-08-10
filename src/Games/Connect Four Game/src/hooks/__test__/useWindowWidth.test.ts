import { renderHook } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import useWindowWidth from '../useWindowWidth';

window.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height,
  }).dispatchEvent(new this.Event('resize'));
};

describe('useWindowWidth hook testing', () => {
  test('should have initial value of 1024', () => {
    const { result } = renderHook(() => useWindowWidth());
    expect(result.current).toEqual(1024);
  });

  test('should change value to 650 due to window resize', async () => {
    const { result } = renderHook(() => useWindowWidth());
    await act(() => {
      window.resizeTo(650, 650);
    });

    expect(result.current).toEqual(650);
  });
});
