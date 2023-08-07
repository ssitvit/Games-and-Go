import React from 'react';

const Mole = ({ isVisible, onHit }) => {
  return (
    <div
      className={`mole ${isVisible ? 'visible' : ''}`}
      onClick={() => onHit()}
    ></div>
  );
};

export default Mole;
