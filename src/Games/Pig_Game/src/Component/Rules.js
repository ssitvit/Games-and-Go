import React, { useState, useEffect } from "react";
import "./style.css";

function Rules() {
  return (
    <div className="head-container">
      <h2>Created A Simple Pig Game : Rules</h2>
      <ol>
        <li>
          The game has 2 players, playing in rounds In each turn, a player rolls
          a dice as many times as he whishes. Each result get added to his ROUND
          score
        </li>
        <li>
          {" "}
          BUT, if the player rolls a 1, all his ROUND score gets lost. After
          that, it's the next player's turn{" "}
        </li>
        <li>
          The player can choose to 'Hold', which means that his ROUND score gets
          added to his GLBAL score. After that, it's the next player's turn{" "}
        </li>
        <li>
          The first player to reach default 20 points on GLOBAL score wins the
          game
        </li>
        <li>if roll dice comes two times 6 round score and totalscore = 0</li>
      </ol>
    </div>
  );
}

export default Rules;
