import { useContext } from "react"
import { GameContext } from "../context/GameContext"

export default function SubmitButton(){
    const {handleClickMergeLetters, error} = useContext(GameContext);
    return(
        <>
        <button onClick={handleClickMergeLetters} disabled={error ? true : false} className={`animate__bounceIn w-full p-2 mt-3 bg-white rounded ${error ? "btnDisabled" : ""}`}>Submit</button>
        </>
    )
}