import React from "react";
import "./Homepage.css";
import { Link } from "react-router-dom";
import { data1 } from "../Data/data";
import GoToTop from "./GoToTop";
import MusicButton from "./MusicButton";
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
  return (
    <React.Fragment>
      <GoToTop />
      <MusicButton />

      {/* Pacman Landing Container */}
      <div className="container_landing">
        <div className="pacman"></div>
          <div className="ghost"></div>
          <div className="ghost"></div>
          <div className="ghost"></div>
          <div className="ghost"></div>
          <div className="text"></div>
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
                <div>
                  <h2>{row.serial_number}</h2>
                  <h3>{row.main_heading}</h3>
                  <p>{row.about} </p>
                </div>
                {/* Create a route for your game and add it in AllRoutes.js in Routes folder then add the link in data1 in Data Folder */}
                <Link to={row.link_game}>Play now !!!</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="copyright">
        <h3>&copy;Copyright IEEE-SSIT {new Date().getFullYear()}</h3>
      </div>
    </React.Fragment>
  );
}

export default Homepage;
