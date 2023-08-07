import React from 'react';
import './GuessNumber.css';

class GuessNumber extends React.Component {
    guessInput = React.createRef();
    guessBtn = React.createRef();
    msg1 = React.createRef();
    msg2 = React.createRef();
    msg3 = React.createRef();

    wrong = new Audio("./sounds/error.mp3");
    correct = new Audio("./sounds/correct.mp3");
    end = new Audio("./sounds/end.mp3");

    answer = Math.floor(Math.random() * 100) + 1;

    no_of_guesses = 0;
    guesses_num = [];

    lives = 10;

    componentDidMount() {
        this.guessBtn.current.addEventListener('click', this.play);
        this.guessInput.current.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                this.play();
            }
        });
    }

    play = () => {
        const user_guess = this.guessInput.current.value;
        if (user_guess < 1 || user_guess > 100) {
            this.wrong.play();
            alert("Please enter a number between 1 and 100");
        } else {
            this.guesses_num.push(user_guess);
            this.no_of_guesses += 1;

            if (this.lives === 1) {
                this.end.play();
                this.msg1.current.textContent = "Game Over !!!";
                this.msg2.current.textContent = "The number was: " + this.answer;
                this.msg3.current.textContent = "Guessed numbers are: " + this.guesses_num;
                document.querySelector("#lives").innerText = "Lives left: 0";
            }

            if (this.lives !== 1) {
                if (user_guess < this.answer) {
                    this.wrong.play();
                    this.lives -= 1;
                    this.msg1.current.textContent = "Oops, wrong number! Your guess is too low.";
                    this.msg2.current.textContent = "No. Of Guesses: " + this.no_of_guesses;
                    this.msg3.current.textContent = "Guessed numbers are: " + this.guesses_num;
                    document.querySelector("#lives").innerText = "Lives left: " + this.lives;
                } else if (user_guess > this.answer) {
                    this.wrong.play();
                    this.lives -= 1;
                    this.msg1.current.textContent = "Oops, wrong number! Your guess is too high.";
                    this.msg2.current.textContent = "No. Of Guesses: " + this.no_of_guesses;
                    this.msg3.current.textContent = "Guessed numbers are: " + this.guesses_num;
                    document.querySelector("#lives").innerText = "Lives left: " + this.lives;
                } else if (user_guess == this.answer) {
                    this.correct.play();
                    this.msg1.current.textContent = "Yayy! You guessed it right!";
                    this.msg2.current.textContent = "The number was " + this.answer;
                    this.msg3.current.textContent = "You guessed it in " + this.no_of_guesses + " guesses.";
                }
            }
        }
    };

    render() {
        return (
            <div className='GuessNumber'>
                <section class="box1"></section>
                <section class="box2"></section>

                <div className="container">
                    <h3>I am Thinking of a number Between 1-100.</h3>
                    <h3>Can you Guess it? </h3>

                    <input type="text" placeholder="Num" id="guess" ref={this.guessInput} /><br />
                    <button onClick={this.play} id="my_btn" ref={this.guessBtn}>GUESS</button>

                    <p id="message1" ref={this.msg1}>No. of Guesses: 0</p>
                    <p id="lives">Lives left: 10</p>
                    <p id="message2" ref={this.msg2}>Guessed numbers are: none</p>
                    <p id="message3" ref={this.msg3}></p>
                </div>
            </div>
        );
    }
}

export default GuessNumber;
