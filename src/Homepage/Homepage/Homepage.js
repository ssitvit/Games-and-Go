import React from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";
import { data1 } from "../Data/data";
import music1 from "../Homepage/music1.mp3";
import { useRef } from "react";
import GoToTop from "./GoToTop";
import { useState } from "react";

function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data1);

  const handleSearch = (e) => {
    const inputValue = e.target.value;
    setSearchQuery(inputValue);

    const filtered =
      inputValue === ''
        ? data1 // Show all values if search query is empty
        : data1.filter((item) =>
            item.main_heading.toLowerCase().includes(inputValue.toLowerCase())
          );
    setFilteredData(filtered);
  };
  const audioref = useRef();
  const runMusic = () => {
    audioref.current.play();
  };
  const pauseMusic = () => {
    audioref.current.pause();
  };
  return (
    <React.Fragment>
      <GoToTop />

      {/* Pacman Landing Container */}
      <audio
        ref={audioref}
        loop
      >
        <source
          src={music1}
          type="audio/mp3"
        />
      </audio>
      <div className="container_landing">
        <div className="pacman"></div>
        <div className="ghost"></div>
        <div className="ghost"></div>
        <div className="ghost"></div>
        <div className="ghost"></div>
        <div className="text"></div>
      </div>

      <div className="music-btn">
        <div
          className="start-btn"
          id="on"
          onClick={runMusic}
        >
          music on
        </div>
        <div
          className="start-btn"
          id="off"
          onClick={pauseMusic}
        >
          music off
        </div>
      </div>
      {/* Heading of Cards */}
      <div className="header_homepage">
        <h1> Game on!!</h1>
      </div>
      {/* The content in the cards came from mapping data1, if you want to contribute a game kindly add it to data1 in the Data folder first*/}
      <input
        type="text"
        className="search-input"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Search..."
      />
      <div className="body_card">
        <div className="container_card">
          {filteredData.map((row) => (
            <div className="card" key={row.serial_number}>
              <div className="content">
                <h2>{row.serial_number}</h2>
                <h3>{row.main_heading}</h3>
                <p>{row.about} </p>
                {/* Create a route for your game and add it in AllRoutes.js in Routes folder then add the link in data1 in Data Folder */}
                <Link to={row.link_game}>Play now !!!</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
}

export default Homepage;
