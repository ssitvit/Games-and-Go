import React, { useState, useEffect } from "react";

const lvlOneWords = [
    "aim", "bed", "buy", "can", "cow", "dry", "egg",  "fat", "fix", "few", "gym", "hen", "hut", "ice", "jet", "job", "jaw", 
    "kid", "lip", "leg", "let", "led", "law", "lid", "mud", "mid", "now", "oil", "owl", "off", "one", "pea", "pen", "rob", 
    "saw", "sec", "shy", "sly", "the", "try", "van", "vet", "wow", "yah", "yak", "yay", "you", "zig", "zip"
];

const lvlTwoWords = [
    "able", "acid", "also", "area", "aunt", "axis", "baby", "back", "ball", "babe", "bell", "bind", "book", "case", "chef", 
    "curl", "chat", "chin", "chop", "damp", "dart", "dark", "deck", "deep", "diva", "dice", "easy", "ends", "epic", "evil", 
    "exam", "face", "fact", "fail", "fair", "fall", "farm", "gain", "glad", "hats", "haze", "help", "head", "hers", "hike", 
    "junk", "jury", "kept", "keys", "kiss", "lamp", "less", "mark", "mile", "mine", "name", "obey", "pack", "palm", "raid", 
    "self", "slip", "thin", "tied", "tofu", "tree", "ugly", "used", "vans", "visa", "wait", "wasp", "zone", "zest", "zero"
];

const lvlThreeWords = [
    "about", "abort", "above", "adapt", "array", "angry", "basic", "brisk", "bends", "berry", "below", "blush", "cable", 
    "champ", "crack", "cycle", "daddy", "dance", "denim", "digit", "dolly", "douse", "dryer", "earth", "event", "exact", 
    "equal", "false", "fever", "fiber", "fifty", "froze", "fruit", "gamma", "gangs", "guild", "hairy", "hello", "honor", 
    "image", "issue", "ionic", "japan", "jewel", "juice", "keeps", "lamps", "laser", "miles", "meats", "might", "mixer", 
    "moths", "movie", "named", "newer", "nexus", "noise", "north", "nutty", "olive", "opens", "owner", "paced", "puppy", 
    "petty", "phone", "phase", "pound", "pride", "print", "purse", "queen", "query", "quiet", "rafts", "rated", "react", 
    "ready", "rides", "rigid", "rumor", "sadly", "safes", "salsa", "sauce", "seeds", "scums", "sense", "shark", "sheds", 
    "shout", "shove", "sides", "sixth", "skill", "solid", "sound", "south", "spoil", "stall", "stole", "store", "sword", 
    "texts", "texas", "today", "tried", "truth", "using", "usual", "valid", "venue", "vowel", "waked", "waist", "whole", 
    "wordy", "zones", "zeros", "yummy", "youth"
];

const SecondPage = () => {
	let [userGuess, setUserGuess] = useState("");
	let [userWord, setUserWord] = useState("");
	let [info, setInfo] = useState("");
	let [levelOutput, setLevelOutput] = useState(1);
	let [scoreOutput, setScoreOutput] = useState(0);
	let [attemptOutput, setAttemptOutput] = useState(0);

	let [level, setLevel] = useState(1);
	let [score, setScore] = useState(0);
	let [word, setWord] = useState("");
	let [attempts, setAttempts] = useState(0);
	let [correct, setCorrect] = useState(0);

    useEffect(() => {
        setCurrentLevel();
    }, [level]);

	const reset = () => {
        setLevel(1);
        setScore(0);
        setCorrect(0);
        setAttempts(0);
        setWord("");
        updateBoard();
        setInfo("");
        setUserGuess("");
    }

    const randomWord = (lvl) => {
        const randomIndex = Math.floor(Math.random() * lvl.length);
        setWord(lvl[randomIndex]);
        return lvl[randomIndex];
    }

    const scrambledWord = (word) => {
        let letter = word.split("");
        let currentIndex = letter.length;
        let temporaryValue, randomIndex;

        while(0 !== currentIndex)
        {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = letter[currentIndex];
            letter[currentIndex] = letter[randomIndex];
            letter[randomIndex] = temporaryValue;
        }
        return letter.join(" ");
    }

    const updateBoard = () => {
        setScoreOutput(score);
        setLevelOutput(level);
        setAttemptOutput(attempts);
    }

    const  checkAnswer = (guess) => {
        if(level === 1)
        {
            if(correct === 2)
            {
                setLevel(level + 1);
                setCorrect(0);
            }
        }
        else if(level === 2)
        {
            if (correct === 2) 
            {
                setLevel(level + 1);
                setCorrect(0);
            }
        }
        else if(level === 3)
        {
            if (correct === 2) 
            {
                setLevel(level + 1);
                setCorrect(0);
            }
        }

        if (attempts < 3) 
        {
            if(guess.toLowerCase() === word.toLowerCase())
            {
                setInfo("CORRECT");
                setScore(score + 1);
                setCorrect(correct + 1);
                setAttempts(0);
                setCurrentLevel();
            } 
            else 
            {
                setInfo("Bzzzt! That's not right!");
                setScore(score - 1);
                setAttempts(attempts + 1);
            }
        }
        else
        {
            alert("Attempts are over. Better luck next time.");
            reset();
            setCurrentLevel();
        }
        updateBoard();
    }

    const setCurrentLevel = () => {
        if(level === 1)
        {
            word = randomWord(lvlOneWords);
        }
        else if (level === 2) 
        {
            word = randomWord(lvlTwoWords);
        } 
        else if (level === 3) 
        {
            word = randomWord(lvlThreeWords);
        } 
        else if (level === 4) 
        {
            alert("You Win! Great job! Click Ok to reset Game");
            reset();
            setLevel();
        }
        setUserWord(scrambledWord(word));
    }

    return (
        <div id="game-container">
            <p>Level: {level} </p>
            <p>Score: {score} </p>
            <p>Attempts: {attempts} </p>
            <p id="info"> {info} </p>
      
            <div id="guess-container">
                <p id="scrambled-word"> {userWord} </p>
                <input id="user-guess" type="text" placeholder="Enter your guess"
                      onChange={(e) => setUserGuess(e.target.value)} />
                
                <button id="submit" onClick={() => checkAnswer(userGuess)}>
                    Submit
                </button>
                <button id="reset-btn" onClick={() => reset()}>
                    Reset
                </button>
            </div>
        </div>
    );
}

export default SecondPage;