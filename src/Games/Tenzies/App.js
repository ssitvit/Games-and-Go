import React from 'react'
import './App.css'
import Dia from './Dia'
import {nanoid} from "nanoid"
import Confetti from "react-confetti"
export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
     const [tenzies, setTenzies] = React.useState(false)
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
            console.log("You won!")
        }
    }, [dice])


    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    
      function rollDice() {
        if(!tenzies) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        } else {
            setTenzies(false)
            setDice(allNewDice())
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Dia 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
         {tenzies && <Confetti />}
            <h1 className="title">{tenzies ? "Coagulation 🔥" : "Tenzies"}</h1>
            <p className="instructions">
            {tenzies ? "You Won The Game 😎" : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
            
            </p>
            <div className="dice-container">
                {diceElements}
            </div>
             <button 
                className="roll-dice" 
                onClick={rollDice}
            >
                {tenzies ? "New Game" : "Roll"}
            </button>

            <footer>   {tenzies ? "Created By Nishitbaria" : ""}  </footer>
        </main>
    )
}