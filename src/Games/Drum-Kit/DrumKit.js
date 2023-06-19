import React from 'react';
import './DrumKit.css';
import tom1 from './Sounds/tom-1.mp3';
import tom2 from './Sounds/tom-2.mp3';
import tom3 from './Sounds/tom-3.mp3';
import tom4 from './Sounds/tom-4.mp3';
import snare from './Sounds/snare.mp3';
import crash from './Sounds/crash.mp3';
import kickBass from './Sounds/kick-bass.mp3';

class DrumKit extends React.Component {
  componentDidMount() {
    const drumButtons = document.querySelectorAll('.drum');

    for (let i = 0; i < drumButtons.length; i++) {
      drumButtons[i].addEventListener('click', () => {
        const buttonInnerHTML = drumButtons[i].getAttribute('data-key');
        this.makeSound(buttonInnerHTML);
        this.buttonAnimation(buttonInnerHTML);
      });
    }

    document.addEventListener('keydown', (event) => {
      this.makeSound(event.key);
      this.buttonAnimation(event.key);
    });
  }

  makeSound(key) {
    switch (key) {
      case 'w':
        new Audio(tom1).play();
        break;
      case 'a':
        new Audio(tom2).play();
        break;
      case 's':
        new Audio(tom3).play();
        break;
      case 'd':
        new Audio(tom4).play();
        break;
      case 'j':
        new Audio(snare).play();
        break;
      case 'k':
        new Audio(crash).play();
        break;
      case 'l':
        new Audio(kickBass).play();
        break;
      default:
        console.log(key);
    }
  }

  buttonAnimation(currentKey) {
    const activeButton = document.querySelector(`.drum[data-key="${currentKey}"]`);
    if (activeButton) {
      activeButton.classList.add('pressed');
      setTimeout(() => {
        activeButton.classList.remove('pressed');
      }, 100);
    }
  }

  render() {
    return (
      <div className="drum-kit">
        <h1 id="title">Drum 🥁 Kit</h1>
        <div className="set">
          <button className="drum" data-key="w">
            <span className="drum-key">W</span>
          </button>
          <button className="drum" data-key="a">
            <span className="drum-key">A</span>
          </button>
          <button className="drum" data-key="s">
            <span className="drum-key">S</span>
          </button>
          <button className="drum" data-key="d">
            <span className="drum-key">D</span>
          </button>
          <button className="drum" data-key="j">
            <span className="drum-key">J</span>
          </button>
          <button className="drum" data-key="k">
            <span className="drum-key">K</span>
          </button>
          <button className="drum" data-key="l">
            <span className="drum-key">L</span>
          </button>
        </div>
      </div>
    );
  }
}

export default DrumKit;
