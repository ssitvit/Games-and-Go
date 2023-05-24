import React from 'react'
import { useContext } from 'react'
import { GameContext } from '../Helpers/Context'

export const EndScreen = () => {

const {gameState, setgameState, score, setScore} = useContext(GameContext);

const handleRestart = () => {
setScore(0)
setgameState("menu")
}

  return (
    <div className='fancy'>
<h1>Whack-a-Mole </h1>
<h2 className='h'> Game Over </h2>

<h3>Your score is : {score} </h3>
<button onClick={handleRestart}>Play Again</button>
 </div>
  )
}

export default EndScreen;