import { useState, useEffect } from 'react'
import './magic_match.css'
import SingleCard from './components/SingleCard'
var matchedCount = 0;
const cardImages = [
  { src:  "/magic_match_img/cat1.jpg", matched: false },
  { src:  "/magic_match_img/cat2.jpg", matched: false },
  { src:  "/magic_match_img/cat3.jpg", matched: false },
  { src:  "/magic_match_img/cat4.jpg", matched: false },
  { src: "/magic_match_img/cat5.jpg", matched: false },
  { src:  "/magic_match_img/cat6.jpg", matched: false },
]

function MagicMatch() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // shuffle cards for new game
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }))
      
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0)
  }

  // handle a choice
  const handleChoice = (card) => {
    //console.log(card)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              // matchedCount++;
              // console.log(matchedCount);
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }

    }
  }, [choiceOne, choiceTwo])

  // reset choices & increase turn
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)

  }

  // start new game automagically
  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="Magic">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map(card => {
          matchedCount += card.matched;
          console.log(matchedCount);
          return <SingleCard 
            key={card.id}
            card={card}
            src = {card.src}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        })}
      </div>
      <p>Turns : {turns}</p>
    </div>
  );
}

export default MagicMatch;