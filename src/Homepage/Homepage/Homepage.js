import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { data1 } from "../Data/data";
import GoToTop from "./GoToTop";
import MusicButton from "./MusicButton";
import { useState } from "react";

function Homepage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data1);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    // Add your login check logic here
    // Example: Check if the user is logged in
    const userLoggedIn = true; // Replace with your actual login check logic

    setIsLoggedIn(userLoggedIn);
  }, []);

  const handleLogout = () => {
    // Add your logout logic here
    // For example, clear the session or token, reset state, etc.
    setIsLoggedIn(false);
    navigate("/login"); // Redirect to the login page after logout
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
      <div className="about-section">
        <h2>About</h2>
        <p>Games-And-Go is a website that offers a diverse collection of online games to entertain and engage users of all ages. With a user-friendly interface, the website provides easy access to a wide range of games, including puzzles, arcade classics, strategy games, and more. Users can explore different game categories, choose their favorites, and start playing instantly without the need for downloads or installations. The website aims to provide a fun and immersive gaming experience, allowing players to relax, challenge themselves, and enjoy their leisure time. Whether you're a casual gamer or a dedicated gaming enthusiast, Games-And-Go has something to offer for everyone.</p>

      </div>

      <div className="header_homepage">
        <h1>Game on!!</h1>
      </div>

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
                {isLoggedIn ? (
                  <Link to={row.link_game}>Play now !!!</Link>
                ) : (
                  <Link to="/login">Login to play</Link>
                )}

            <div className="content">
              {/* Addition of Flip card feature */}
              <div class="flip-card">
                <div class="flip-card-inner">
                  <div class="flip-card-front">
                    <div>
                      <h2>{row.serial_number}</h2>
                      <h3>{row.main_heading}</h3>
                      
                    </div>
                    
                  </div>
                  <div class="flip-card-back">
                    <div class="rule_heading">{row.rule_heading}</div>
                    <div class="step">{row.step1}</div>
                    <div class="step">{row.step2}</div>
                    <div class="step">{row.step3}</div>
                  </div>
                </div>

              </div>
              {/* Flip card feature ends here. */}
              <p>{row.about} </p>
              {/* Create a route for your game and add it in AllRoutes.js in Routes folder then add the link in data1 in Data Folder */}
              <Link to={row.link_game}>Play now !!!</Link>
            </div>
          </div>
          ))}
        </div>
      </div>

      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}

      <div className="copyright">
        <h3>&copy; Copyright IEEE-SSIT {new Date().getFullYear()}</h3>
      </div>
    </React.Fragment>
  );
}

export default Homepage;
