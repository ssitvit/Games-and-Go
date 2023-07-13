import React, { useState } from "react";
import styled from "styled-components";
import { MdSunny, MdBrightness2 } from "react-icons/md";


export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Update the CSS styles dynamically based on the isDarkMode state
  const themeStyles = `
    body {
      background-color: ${isDarkMode ? "#222222" : "#ffffff"};
      color: ${isDarkMode ? "#ffffff" : "#000000"};
    }

    .copyright h3 {
      color: #222;
    }
  `;

  return (
    <Wrapper>
      <style>{themeStyles}</style>
      <div className="theme-toggle">
        <button onClick={toggleTheme}>
          {isDarkMode ? <MdSunny/>: <MdBrightness2/>}
        </button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  .theme-toggle {
    position: fixed;
    bottom: 1500px;
    left: 40px;
    z-index: 9999;
  }

  .theme-toggle button {
    font-size: 2.4rem;
    width: 4rem;
    height: 4rem;
    color: #fff;
    background-color: black;
    box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 15px 5px;
    border-radius: 50%;
    position: fixed;
    bottom: 200px;
    left: 40px;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: white;

  }
`;

