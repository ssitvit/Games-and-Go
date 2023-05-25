import React from 'react'
import './Xylophone.css'
import useSound from 'use-sound';
import audio1 from './tunes/note1.wav'
import audio2 from "./tunes/note2.wav"
import audio3 from "./tunes/note3.wav"
import audio4 from "./tunes/note4.wav"
import audio5 from "./tunes/note5.wav"
import audio6 from "./tunes/note6.wav"
import audio7 from "./tunes/note7.wav"

const Xylophone = () => {
  const [play1]= useSound(audio1)
  const [play2]=useSound(audio2)
  const [play3]=useSound(audio3)
  const [play4]=useSound(audio4)
  const [play5]=useSound(audio5)
  const [play6]=useSound(audio6)
  const [play7]=useSound(audio7)
  
  const keyInfo=[
    {id: 1,
    className: "button violet col-sm-12",
    name: "Violet",
    play: play1,
  },
  {id: 2,
  className: "button indigo col-sm-12",
  name: "Indigo",
  play: play2,
  },
  {id: 3,
  className: "button blue col-sm-12",
  name: "Blue",
  play: play3,
  },
  {id: 4,
  className: "button green col-sm-12",
  name: "Green",
  play: play4,
  },
  {id: 5,
    className: "button yellow col-sm-12",
    name: "Yellow",
    play: play5,
  },
  {id: 6,
    className: "button orange col-sm-12",
    name: "Orange",
  play: play6,
  },
  {id: 7,
    className: "button red col-sm-12",
    name: "Red",
  play: play7
 }]

  return (
    <div className='main'>
      {keyInfo.map(i=>(
        <div className="row" id={i.id} key={i.id}>
        <button className={i.className} onClick={i.play}>{i.name.toUpperCase()}</button>
      </div>
      ))}
    </div>
  )
}

export default Xylophone