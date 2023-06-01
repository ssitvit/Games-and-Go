import './SingleCard.css'
import img from './hide.jpg'
export default function SingleCard({ src,card,handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if(!disabled){
      handleChoice(card)
    }
  }

  // console.log(card.src);
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt={card.src} />
        <img className="back" src={img} onClick={handleClick} alt="cover" />
      </div>
    </div>
  )
}