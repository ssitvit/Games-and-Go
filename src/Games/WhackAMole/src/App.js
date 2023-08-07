import React, { useState, useEffect } from 'react';
import './App.css';
import MoleImage from './mole-image.jpg';
import MoleHitImage from './mole-hit-image.jpg';

const App = () => {
    const [score, setScore] = useState(0);
    const [activeMole, setActiveMole] = useState(null);
    const holes = [...Array(9).keys()];

    useEffect(() => {
        startGame();
    }, []);

    const startGame = () => {
        setScore(0);
        setActiveMole(null);
        showMole();
    };

    const showMole = () => {
        if (activeMole !== null) 
        {
            return;
        }

        const randomHoleIndex = Math.floor(Math.random() * holes.length);
        setActiveMole(randomHoleIndex);

        setTimeout(() => {
            setActiveMole(null);
            if (holes.length > 1) 
            {
                showMole();
            }
        }, 1000);
    };

    const handleHit = (holeIndex) => {
        if (holeIndex === activeMole) {
            setScore((prevScore) => prevScore + 1);
            setActiveMole(null);
        }
    };

    return (
        <div className="App">
            <p className="score">Score : <span> {score} </span></p>
            <div className="container">
                {
                    holes.map((holeIndex) => (
                    <div
                        key = {holeIndex}
                        className = {`hole ${holeIndex === activeMole ? 'active' : ''}`}
                        onClick = {() => handleHit(holeIndex)} >
                        {
                            holeIndex === activeMole && (
                            <img
                                className="mole"
                                src={holeIndex === activeMole ? MoleImage : MoleHitImage}
                                alt="Mole"
                            />
                            )
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
