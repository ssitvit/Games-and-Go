import React from "react";
import { useContext } from "react";
import { GameContext } from "../Helpers/Context";


export const MainMenu = () => {

const {gameState, setgameState} = useContext(GameContext)
  return (
    <div className="fancy">
<h1 className="h"> Whack-a-Mole</h1>
<h2 className="h">Hit pop-ups to earn points</h2>
<button onClick={() => setgameState("playing")}>Play </button>
    </div>
  )
}
export default MainMenu;