import React from 'react';
import { useState } from 'react';
import {GameContext} from './Helpers/Context'
import MainMenu from './components/MainMenu'
import PlayGame from './components/PlayGame'
import EndScreen from './components/EndScreen'


export const Whackamole = () => {

const [gameState, setgameState] = useState("menu")
const [score, setScore] = useState(0)
  return (
    <div className='fancy'>
<GameContext.Provider value={{gameState, setgameState, score, setScore}}>
{gameState==="menu" && <MainMenu/>}
{gameState==="playing" && <PlayGame/>}
{gameState==="endscreen" && <EndScreen/>}
</GameContext.Provider>
    </div>
  )
}


export default Whackamole;