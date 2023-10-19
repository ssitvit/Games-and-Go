import React, { useState } from "react";
import styled from "styled-components";
import { MdSunny, MdBrightness2 } from "react-icons/md";
import audio_light_on  from "./audio_light-on.mp3"
import audio_light_off  from "./audio_light-off.mp3"

export default function ThemeSwitcher() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
      setIsDarkMode((prevMode) => {

        const audio = new Audio(prevMode ? audio_light_on : audio_light_off)
        audio.play()
  
        return !prevMode;
    });
  };

  // Update the CSS styles dynamically based on the isDarkMode state
  const themeStyles = `
    body {
      background-color: ${isDarkMode ? "#222222" : "#ffffff"};
      color: ${isDarkMode ? "#ffffff" : "#000000"};
    }

    .copyright h3 {
      color: ${isDarkMode ? "white" : "#222"};
    }

    .header_homepage{
       color: ${isDarkMode ? "white" : "#222"};
    }

    .social-icons a i{
      color:${isDarkMode ? "white" : "#222"}
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
    font-size: 2.2rem;
    width: 4rem;
    height: 4rem;
    color: #fff;
    background-color:#000033;
    box-shadow: rgba(255, 255, 255, 0.2) 0px 0px 15px 5px;
    border-radius: 50%;
    position: fixed;
    bottom: 200px;
    left: 36px;
    z-index: 999;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #e0e0ff;
    transition:1.2s;
  
&:hover{
  transform:rotate(60deg);
}
  

  }

  @media (max-width: 768px) {
    .theme-toggle button {
      bottom: 10rem;
      left: 2rem;
    }

  
`;

