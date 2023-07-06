import React from 'react';
import { useEffect } from 'react';
import './guess.css';

function ColorGame() {
    useEffect(() => {
        function changecolors(color) {
            for (let i = 0; i < colors.length; i++) {
                squares[i].style.background = color;
            }
        }

        function pickcolor() {
            const ran = Math.floor(Math.random() * colors.length);
            return colors[ran];
        }

        function generatecolors(num) {
            const arr = [];
            for (let i = 0; i < num; i++) {
                arr.push(randomcolor());
            }
            return arr;
        }

        function randomcolor() {
            const r = Math.floor(Math.random() * 256);
            const g = Math.floor(Math.random() * 256);
            const b = Math.floor(Math.random() * 256);
            return `rgb(${r}, ${g}, ${b})`;
        }

        // Get references to DOM elements
        const squares = document.querySelectorAll('.square');
        const colorDisplay = document.getElementById('colordisplay');
        const msgDisplay = document.querySelector('#msg');
        const resetBtn = document.querySelector('#reset');
        const easyBtn = document.querySelector('#easybtn');
        const hardBtn = document.querySelector('#hardbtn');
        const h1 = document.querySelector('h1');

        let num = 6;
        let colors = generatecolors(num);
        let picked = pickcolor();

        colorDisplay.textContent = picked;

        easyBtn.addEventListener('click', function () {
            easyBtn.classList.add('selected');
            hardBtn.classList.remove('selected');
            num = 3;
            colors = generatecolors(num);
            picked = pickcolor();
            colorDisplay.textContent = picked;
            msgDisplay.textContent = '';
            h1.style.background = 'steelblue';
            for (let i = 0; i < 3; i++) {
                squares[i].style.background = colors[i];
            }
            for (let i = 3; i < squares.length; i++) {
                squares[i].style.background = 'none';
            }
        });

        hardBtn.addEventListener('click', function () {
            hardBtn.classList.add('selected');
            easyBtn.classList.remove('selected');
            num = 6;
            colors = generatecolors(num);
            picked = pickcolor();
            colorDisplay.textContent = picked;
            msgDisplay.textContent = '';
            h1.style.background = 'steelblue';
            for (let i = 0; i < squares.length; i++) {
                squares[i].style.background = colors[i];
                squares[i].style.display = 'block';
            }
        });

        for (let i = 0; i < squares.length; i++) {
            squares[i].style.background = colors[i];
            squares[i].addEventListener('click', function () {
                const clicked = this.style.background;
                if (clicked === picked) {
                    msgDisplay.textContent = 'Correct';
                    h1.style.background = clicked;
                    changecolors(clicked);
                    resetBtn.textContent = 'Play Again?';
                } else {
                    this.style.background = '#232323';
                    msgDisplay.textContent = 'Try Again';
                }
            });
        }

        resetBtn.addEventListener('click', function () {
            colors = generatecolors(num);
            picked = pickcolor();
            colorDisplay.textContent = picked;
            for (let i = 0; i < squares.length; i++) {
                squares[i].style.background = colors[i];
            }
            h1.style.background = 'steelblue';
            msgDisplay.textContent = '';
            resetBtn.textContent = 'New Colors';
        });
    }, []);

    return (
        <div>
            <h1>Guess The Color<br />
                <span id="colordisplay">RGB</span><br />
                Color Game
            </h1>
            <div id="stripe">
                <button id="reset">New Colors</button>
                <span id="msg"></span>
                <button id="easybtn">Easy</button>
                <button className="selected" id="hardbtn">Hard</button>
            </div>
            <div id="container">
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
                <div className="square"></div>
            </div>
            {/* The JavaScript functionality will be added later */}
        </div>
    );
}

export default ColorGame;
