
// Importing required files/libraries
import React, { useEffect, useState } from 'react'
import {Tooltip} from "react-tooltip";
import RestartButton from './restart.js';
import "./Wordle.css"
import "./words.js"
import randomWords from './words.js';

// Main export function
export default function Wordle () {

    // Hooks

    // Stores user guessed word
    const [guess, setGuess] = useState("");

    // Stores randomly generated word
    const [targetWord, setTargetWord] = useState("");

    // Stores Attempts
    const [remainingAttempts, setRemainingAttempts] = useState(5);

    // Stores previous guesses by user in an array
    const [previousGuesses, setPreviousGuesses] = useState([]);

    // Object for storing letter which have not been guessed yet and it's position
    const [hintLetter, setHintLetter] = useState({letter:'', position:-1});

    // Stores currently correct guesses. (Required for HINTS Feature) 
    const [correctGuesses, setCorrectGuesses] = useState([]);

    // Marks if the hint button is clicked or not and displays the tooltip acc.
    const [hintClicks, setHintClicks] = useState(0);

    // Hooks for game won or lost
    const [gameWon, setGameWon] = useState(false);
    const [gameLost, setGameLost] = useState(false);

    // On first render generates a random word.
    useEffect(()=>{

        if(!targetWord){
            const wordIndex = Math.floor(Math.random()*randomWords.length);
            const fetchedRandomWord = randomWords[wordIndex];
            setTargetWord(fetchedRandomWord);
        }
        
         
    }, [targetWord])


    // Resetting all the useState hooks to default
    const restartGame = () => {
        setGuess("");
        setTargetWord("");
        setRemainingAttempts(5);
        setPreviousGuesses([]);
        setHintLetter({ letter: '', position: -1 });
        setCorrectGuesses([])
        setHintClicks(0);
        setGameWon(false);
        setGameLost(false);
      };


    // Handling user guessed word
    const handleInputChange = (event)=>{
        //console.log(targetWord);
        setGuess(event.target.value);
    }

    
    // Handling main logic i.e comparison with target word
    const handleGuess = (event)=>{

        event.preventDefault();

        // Edge case
        if(guess.length!==5){
            alert("Please enter a word of length 5");
            return;
        }
        //console.log(targetWord);

        // Checking correctness of the guess w.r.t target word
        const checkCharPosition = guess.split('').map((char,index)=>{
            if(char===targetWord.charAt(index)){

                // Store correct guess. (Required for HINTS)
                setCorrectGuesses((prevCorrectGuesses) => [...prevCorrectGuesses, char]);
                return "previous-guesses-table-correctPosition";
            }
            else if(targetWord.includes(char)){
                return "previous-guesses-table-wrongPosition";
            }
            else{
                return "previous-guesses-table-missing";
            }
        })

        // Storing the guessed word along with the marking if it is at correct position or not as an object. 
        setPreviousGuesses([...previousGuesses, {guessedWord:guess, check:checkCharPosition}]);

        // Winning condition
        if (guess === targetWord) {
            //console.log("You win");
            setGameWon(true);
        } 
        else {

            // If not correct reducing attempts by 1
            setRemainingAttempts((prevAttempts) => prevAttempts - 1);

            // If attempts exhausted GAME LOST
            if(remainingAttempts===1){
                setGameLost(true);
            }
        }

        // Clearing input field
        setGuess("");

    }


    // Handling hints
    const handleHints = (event)=>{

        // If chosen for hint reduce attempt by 1
        setRemainingAttempts((prevAttempts) => prevAttempts - 1);

        if(remainingAttempts===1){
            setGameLost(true);
        }
        event.preventDefault();

        // Check for remmaining not guessed letters using basic logic
        for(let i=0;i<targetWord.length;i++){
            if(!correctGuesses.includes(targetWord.charAt(i))){
                setHintLetter({letter:targetWord.charAt(i), position:i+1});
                setHintClicks((prevClicks)=> prevClicks+1);
                break;
            }
        }
    }



    return (

        <div className="wordleStart">

            {/* If guessed correctly display congratulations and restart else lost */}
            {gameWon && (
                    <div className="wordle-congratulations-message">
                        <h1>Congratulations! 🎉</h1>
                        <p>You have guessed the word correctly!</p>
                        <RestartButton onClick={restartGame} />
                    </div>
            )}

            {gameLost && (
                    <div className="wordle-gameLost-message">
                    <h1>Better Luck Next Time!</h1>
                    <p>The correct word was: '{targetWord}'</p>
                    <RestartButton onClick={restartGame} />
                    </div>
            )}

            {/* Handling User Interaction */}
            {!gameWon && !gameLost && (
            <div className='gameStart'>
                <div className="wordle-game">
                    <h1 className="wordle-game-h1">Wordle Game</h1>
                    <p className="wordle-game-paragraph">Guess a 5-letter word:</p>
                    <form className="wordle-game-wordInput" onSubmit={handleGuess}>
                        <input type="text" id="guess" onChange={handleInputChange} value={guess} placeholder="Enter your guess" maxLength="5" autoComplete='off'/>

                        {/*  Check guess button */}
                        <button className="wordle-game-submit-btn">Check</button>

                        {/* Handling hint button and tooltip */}
                        <a className="my-anchor-element"><button className="wordle-game-submit-btn" onClick={handleHints}>💡Hint</button></a>
                        <Tooltip anchorSelect=".my-anchor-element" place="right" className="wordle-game-tooltip">
                            {hintClicks >= 1 ? (
                                <>
                                    Letter '{hintLetter.letter}' is at position {hintLetter.position}
                                </>
                            ) : (
                                <>
                                    Click to reveal hint
                                </>
                            )}
                        </Tooltip>
                        

                    </form>
                    
                
                    <p className='wordle-game-paragraph'>Remaining attempts: {remainingAttempts}</p>
                </div>

                {/* Handling previous guesses container */}
                <div className="previous-guesses">
                    <h2 style={{ textAlign: 'center' }} className='previous-guesses-h2'>Previous Guesses</h2>
                    <hr/>
                    <table className="previous-guesses-table">
                        <tbody>
                            {previousGuesses.map((guessObj, index) => (
                                <tr key={index}>
                                {guessObj.guessedWord.split('').map((char, charIndex)=>{
                                    return <td key={charIndex} className={guessObj.check[charIndex]}>{char}</td>
                                })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                </div>
            )}
        
        </div>
    )
}