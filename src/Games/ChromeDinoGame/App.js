import React from "react";
import "./Dino.css";
import dinoStationary from "./images/dino-stationary.png"
import cactus_img from "./images/cactus.png"
import ground from "./images/ground.png"

class DinoGame extends React.Component {

  componentDidMount() {
    const dino = document.getElementById("dino");
    const cactus = document.getElementById("cactus");

    function jump() {
      if (dino.classList !== "jump") {
        dino.classList.add("jump");

        setTimeout(function () {
          dino.classList.remove("jump");
        }, 300);
      }
    }

    let score = 0;
    setInterval(() => {
      score++;
      document.querySelector(".score").textContent = score;
    }, 1)

     setInterval(function () {
      // get current dino Y position
      let dinoTop = parseInt(window.getComputedStyle(dino).getPropertyValue("top"));

      // get current cactus X position
      let cactusLeft = parseInt(
        window.getComputedStyle(cactus).getPropertyValue("left")
      );

      // detect collision
      if (cactusLeft < 40 && cactusLeft > 0 && dinoTop >= 200) {
        // collision
        let finalScore = score;
        score = 0;
        document.querySelector(".score").innerHTML = 0;
        alert("GAME OVER \nYOUR SCORE:" + finalScore);
      }
    }, 10);
    document.addEventListener("keydown", function (event) {
      jump();
    });
  }

  render() {
    return (
      <>
        <h1>Press Space Bar To Jump</h1>
        <div className="game">
          <div className="score">0</div>
          <img id="dino" src={dinoStationary} alt="Dino"></img>
          <img id="cactus" src={cactus_img} alt ="Cactus"></img>
          <img src={ground} id="ground" alt="Ground"></img>
        </div>
      </>
    )
  }
}

export default DinoGame;