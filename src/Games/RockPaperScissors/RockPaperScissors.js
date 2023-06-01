import React, { useEffect, useState } from 'react'
import "./RockPaperScissors.css"

const RockPaperScissors = () => {
    const [userChoice, setUserChoice] = useState('rock');
    const [computerChoice, setComputerChoice] = useState('rock');
    const [userPoints, setUserPoints] = useState(0);
    const [computerPoints, setComputerPoints] = useState(0);
    const [turnResult, setTurnResult] = useState(null);
    const [finalResult, setFinalResult] = useState("Let's see who wins");
    const [gameOver, setGameOver] = useState(false);
    const [userGotPoint, setUserGotPoint] = useState(false);
    const choices = ['rock', 'paper', 'scissors'];


    const handleClick = (choice) => {
        setUserChoice(choice);
        const randomChoice = choices[Math.floor(Math.random() * choices.length)];
        setComputerChoice(randomChoice);
    };

    const reset = () => {
        window.location.reload();
    };


    useEffect(() => {
        const comboMoves = userChoice + computerChoice;
        if (userPoints <= 4 && computerPoints <= 4) {
            //when user gets a point
            if (comboMoves === 'rockscissors' || comboMoves === 'paperrock' || comboMoves === 'scissorspaper') {
                const updatedUserPoints = userPoints + 1;
                setUserPoints(updatedUserPoints);
                setTurnResult('You got the point');
                setUserGotPoint(true);
                if (updatedUserPoints === 5) {
                    setGameOver(true);
                    setFinalResult('You won!');
                }
            }
            //when computer gets a point
            if (comboMoves === 'scissorsrock' || comboMoves === 'rockpaper' || comboMoves === 'paperscissors') {
                const updatedComputerPoints = computerPoints + 1;
                setComputerPoints(updatedComputerPoints);
                setTurnResult('Computer got the point');
                setUserGotPoint(false);
                if (updatedComputerPoints === 5) {
                    setGameOver(true);
                    setFinalResult('Computer wins!');
                }
            }
            //when no one gets a point
            if (comboMoves === 'rockrock' || comboMoves === 'paperpaper' || comboMoves === 'scissorsscissors') {
                setTurnResult('No one got the point!');
                setUserGotPoint(false);
            }
        }
    }, [userChoice, computerChoice]);

    return (
        <div className='rock-paper-scissors'>
            <h1>Rock Paper Scissors</h1>
            <p>Who gets 5 points first wins the game!</p>
            <div className="rps-container">
                <div className="user">
                    <h3 className='for-score'>You: {userPoints}</h3>
                    <img src={require(`./assets/${userChoice}.png`)} alt={userChoice} />
                    {
                        !gameOver &&
                        <div className="user-choice-btns">
                            {
                                choices.map((item, index) => {
                                    return <button key={index} onClick={() => handleClick(item)}>{item}</button>
                                })
                            }
                        </div>
                    }
                </div>

                <div className="computer">
                    <h3 className='for-score'>Computer: {computerPoints}</h3>
                    <img src={require(`./assets/${computerChoice}.png`)} alt={computerChoice} />
                </div>
            </div>
            <div className="rps-result">
                <h3 style={userGotPoint ? { color: "green" } : { color: "red" }}>{turnResult}</h3>
                <h1>{finalResult}</h1>
            </div>

            <div className="rps-button-div">
                {
                    gameOver &&
                    <button className="button restart" onClick={() => reset()}>Restart Game ? </button>
                }
            </div>

        </div>
    )
}

export default RockPaperScissors
