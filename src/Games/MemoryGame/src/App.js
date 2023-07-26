import React, { useEffect, useState } from 'react'
import GameBoard from './components/GameBoard';
import GameOver from './components/GameOver'
import game from './game/game'


export default function MemoryGame() {

    const [gameOver, setGameOver] = useState(false);
    const [cards, setCards] = useState([])
    const [timeLeft, setTimeLeft] = useState(60);

    useEffect(() => {
        setCards(game.createCardsFromTechs())
    }, [])

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime -1);
        }, 1000);
        return() => {
            clearInterval(timer)
        }
    })

    useEffect(() => {
        if (timeLeft === 0) {
          setGameOver(true);
        }
      }, [timeLeft]
    );
      

    function handleGameWin() {
        setTimeLeft(60); 
    }
      
    function restart() {
        game.clearCards();
        setCards(game.createCardsFromTechs());
        setGameOver(false);
        handleGameWin(); // Reinicia o tempo
    }
      

    function handleFlip(card) {
        if (gameOver) {
            return;
        }
        else{
            game.flipCard(card.id, () => {
                // GameOverCallback
                setGameOver(true)
            }, () => {
                //NoMatchCallback
                setCards([...game.cards])
            })
            setCards([...game.cards]) 
        }
        if (timeLeft === 0){
            setGameOver(true)
        }
    }

    return (
        <div>
            <div id="timer"> Voçê têm {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}s para completar o jogo</div>
            <GameBoard handleFlip={handleFlip} cards={cards}></GameBoard>
            <GameOver show={gameOver} handleRestart={restart}></GameOver>
        </div>
    )
}
