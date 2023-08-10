import React from 'react';
import { CounterElement, WhiteCircle } from './CounterStyles';

const Counter: React.FC<{ bg: string; row: number; isWin: boolean }> = ({
  bg,
  row,
  isWin,
}) => {
  return (
    <CounterElement
      bg={bg}
      // based of row number we have different initial start position for animation
      animate={{ y: [-(80 * row + 70), 0, -50, 0, -20, 0] }}
      transition={{
        duration: 0.4,
        times: [0, 0.4, 0.6, 0.7, 0.8, 1],
      }}
      data-testid="counter"
    >
      {/* if counter in wining combo white circle renders */}
      {isWin && (
        <WhiteCircle
          data-testid="winnigCounter"
          animate={{ scale: [0, 1.5, 1] }}
          transition={{
            duration: 0.4,
            times: [0, 0.5, 1],
          }}
        />
      )}
    </CounterElement>
  );
};

export default Counter;
