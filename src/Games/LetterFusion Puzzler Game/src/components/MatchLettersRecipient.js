import { useContext } from "react"
import { GameContext } from "../context/GameContext"
import MatchLetterButton from "./MatchLetterButton";


export default function MatchLettersRecipient(){
    const {matchLetters} = useContext(GameContext);
    return(
        <>
        <div className="matchLettersRecipient grid grid-cols-3 grid-rows-2 gap-4">
            {matchLetters.map((letter, index)=>(
                <MatchLetterButton letter={letter} key={index} />
            ))}

        </div>
        </>
    )
}