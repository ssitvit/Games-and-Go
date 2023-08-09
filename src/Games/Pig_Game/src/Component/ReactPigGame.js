import React, { useState, useEffect, useRef } from "react";
import CommonPlayer from "./CommonPlayer";
import InputBox from "./InputBox";
import Dice from "./Dice";
import Rules from "./Rules";

function ReactPigGame() {
  const [active, setActive] = useState(1);
  const [showDice, setShowDice] = useState(null);
  const [inputValue, setInputValue] = useState(20);
  const [roundScore, setRoundScore] = useState({
    player1: 0,
    player2: 0,
  });
  const [finalScore, SetFinalScore] = useState({
    player1: 0,
    player2: 0,
  });
  function onChangeInput(e) {
    setInputValue(e.target.value);
  }
  const [win, setWin] = useState({
    player1Won: "",
    player2Won: "",
  });

  function winnerFun() {
    let winner = null;
    if (finalScore[`player1`] >= inputValue) {
      setActive(1);
      setWin({
        ...win,
        player1Won: "WINNER",
      });
    }
    if (finalScore[`player2`] >= inputValue) {
      setActive(2);
      setWin({
        ...win,
        player2Won: "WINNER",
      });
    }

    return winner;
  }
  let randomNo;

  function rollDiceFun() {
    const winner = winnerFun();
    if (!winner) {
      randomNo = Math.floor(Math.random() * 6) + 1;

      setShowDice(randomNo);
      if (randomNo === 1) {
        setShowDice(null);

        setActive(active === 1 ? 2 : 1);
        setRoundScore({
          ...roundScore,
          [`player${active}`]: 0,
        });

        return;
      }
      ///if two time 6 roundscore and finalscore =0
      if (randomNo === 6 && showDice === 6) {
        setActive(active === 1 ? 2 : 1);
        setRoundScore({
          ...roundScore,
          [`player${active}`]: 0,
        });
        SetFinalScore({
          ...finalScore,
          [`player${active}`]: 0,
        });
        return;
      }

      setRoundScore({
        ...roundScore,
        [`player${active}`]: randomNo + roundScore[`player${active}`],
      });
    }
  }
  const passstyle1 = {
    background: active === 1 ? "#e5cdcd" : "",
    border: win.player1Won ? "10px dotted #e50e71" : "",
  };
  const passstyle2 = {
    background: active === 2 ? "#e5cdcd" : "",
    border: win.player2Won ? "10px dotted #e50e71" : "",
  };
  function holdFun() {
    setShowDice(null);
    if (finalScore[`player${active}`] >= inputValue) {
      return;
    }
    setActive(active === 1 ? 2 : 1);

    setRoundScore({
      ...roundScore,
      [`player${active}`]: 0,
    });

    SetFinalScore({
      ...finalScore,
      [`player${active}`]: (finalScore[`player${active}`] +=
        roundScore[`player${active}`]),
    });
  }

  useEffect(() => {
    const winner = winnerFun();

    if (winner) {
      setShowDice(null);
    }
  }, [finalScore]);

  function resetGameFun() {
    setActive(1);
    SetFinalScore({
      player1: 0,
      player2: 0,
    });
    setRoundScore({
      player1: 0,
      player2: 0,
    });
    setWin({
      player1Won: "",
      player1Won: "",
    });
  }

  return (
    <>
      <Rules />
      <InputBox inputValue={inputValue} onChangeInput={onChangeInput} />
      <div className="container">
        <CommonPlayer
          passstyle={passstyle1}
          playerName="Player 1"
          finalScore={finalScore.player1}
          roundScore={roundScore.player1}
          win={win.player1Won}
        >
          <Dice
            rollDiceFun={rollDiceFun}
            showDice={showDice}
            holdFun={holdFun}
            resetGameFun={resetGameFun}
          />
        </CommonPlayer>
        <CommonPlayer
          playerName="Player 2"
          passstyle={passstyle2}
          roundScore={roundScore.player2}
          finalScore={finalScore.player2}
          win={win.player2Won}
        />
      </div>
    </>
  );
}

export default ReactPigGame;
