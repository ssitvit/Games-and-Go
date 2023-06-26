import React, { useState, useEffect } from "react";
import dice1 from "./Assets/dice1.png";
import dice2 from "./Assets/dice2.png";
import dice3 from "./Assets/dice3.png";
import dice4 from "./Assets/dice4.png";
import dice5 from "./Assets/dice5.png";
import dice6 from "./Assets/dice6.png";
import "./styles.css"

const Game = (props) => {
    // let [turn, setTurn] = useState(2);
    let [score1, setScore1] = useState(0);
    let [score2, setScore2] = useState(0);
    let [rand1, setRandom1] = useState(0);
    let [rand2,setRandom2] = useState(0);
    let [res, setRes] = useState("Tie");
    let [imageSource1, setImage1] = useState(dice1);
    let [imageSource2,setImage2] = useState(dice1);

    function num1() {
        let x = Math.floor(Math.random() * 6 + 1);
        if (rand1 === 1) {
            setImage1(dice1);
        } else if (rand1 === 2) {
            setImage1(dice2);
        } else if (rand1 === 3) {
            setImage1(dice3);
        } else if (rand1 === 4) {
            setImage1(dice4);
        } else if (rand1 === 5) {
            setImage1(dice5);
        } else if (rand1 === 6) {
            setImage1(dice6);
        }
        setTimeout(() => {
            setRandom1(x);
        }, 1000);
    }
    function num2() {
        let x = Math.floor(Math.random() * 6 + 1);
        if (rand2 === 1) {
            setImage2(dice1);
        } else if (rand2 === 2) {
            setImage2(dice2);
        } else if (rand2 === 3) {
            setImage2(dice3);
        } else if (rand2 === 4) {
            setImage2(dice4);
        } else if (rand2 === 5) {
            setImage2(dice5);
        } else if (rand2 === 6) {
            setImage2(dice6);
        }
        setTimeout(() => {
            setRandom2(x);
        }, 1000);
    }


    function play() {
        num1();
        num2();
        setScore1((prev)=>{
            return rand1;
        });
        setScore2((prev)=>{
            return rand2;
        });
    }
    useEffect(() => {
        if (score1 > score2) {
            setRes("Player 1 Wins");
        }
        else if(score2 > score1) {
            setRes("Player 2 Wins");
        }
        else{
            setRes("Tied");
        }
    }, [score1, score2]);

    // function inputHandler(e) {
    //     setTarget(e.target.value);
    // }
    return (
        <div className="container">
            <h1>&#128681;{res}&#128681;</h1>

            <div className="dice">
                <p>Player 1</p>
                <img src={imageSource1} />
            </div>

            <div className="dice">
                <p>Player 2</p>
                <img src={imageSource2}/>
            </div>

            <div>
                <button onClick={play} class="btn">Refresh</button>
            </div>
        </div>
    )
};

export default Game;
