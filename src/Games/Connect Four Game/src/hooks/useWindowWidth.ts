import { useState, useEffect } from 'react';

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState<number>(1440);

  useEffect(() => {
    const changeWidth = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', changeWidth);

    changeWidth();

    return () => window.removeEventListener('resize', changeWidth);
  }, []);
  return windowWidth;
};

export default useWindowWidth;
