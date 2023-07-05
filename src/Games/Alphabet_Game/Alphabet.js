import React from 'react';
import './Alphabet.css';

class Alphabet extends React.Component {
	// Button keyboard pressing functionality
	playSound = (name) => {
		const audio = new Audio(`./sounds/${name}.mp3`);
		audio.play();
	};

	handleKeyPress = (event) => {
		this.playSound(event.key);
	};

	handleClick = (buttonInnerHTML) => {
		this.playSound(buttonInnerHTML);
	};

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyPress);
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyPress);
	}

	render() {
		return (
			<div className='Alphabet'>
				<h1 id="title">ALPHABET GAME</h1>

				<div className="btns">
					<button id="a" className="btn a">A</button>
					<button id="b" className="btn b">B</button>
					<button id="c" className="btn c">C</button>
					<button id="d" className="btn d">D</button>
					<button id="e" className="btn e">E</button>
					<button id="f" className="btn f">F</button>
					<button id="g" className="btn g">G</button>
					<button id="h" className="btn h">H</button>
					<button id="i" className="btn i">I</button>
					<button id="j" className="btn j">J</button>
					<button id="k" className="btn k">K</button>
					<button id="l" className="btn l">L</button>
					<button id="m" className="btn m">M</button>
					<button id="n" className="btn n">N</button>
					<button id="o" className="btn o">O</button>
					<button id="p" className="btn p">P</button>
					<button id="q" className="btn q">Q</button>
					<button id="r" className="btn r">R</button>
					<button id="s" className="btn s">S</button>
					<button id="t" className="btn t">T</button>
					<button id="u" className="btn u">U</button>
					<button id="v" className="btn v">V</button>
					<button id="w" className="btn w">W</button>
					<button id="x" className="btn x">X</button>
					<button id="y" className="btn y">Y</button>
					<button id="z" className="btn z">Z</button>
				</div>

				<footer>
					Created By <a href="https://github.com/Avdhesh-Varshney">Avdhesh Varshney</a>
				</footer>
			</div>
		)
	}
}

export default Alphabet;