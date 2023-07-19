import React from "react";
import { Link } from "react-router-dom";

function FirstPage() {
    return (
        <div id="rules">
            <p className="lead">Unscamble the words.</p>
            <p>Type in your guess.</p>
            <p>Get three correct words and level will increase.</p>
            <p>Get a word wrong three times and game will restart.</p>
            <p>Finish level 3 and you win.</p>
            <p>Good luck!</p>
            <Link to="/play">
                <button id="play-btn" className="button-49">
                    Let's Play
                </button>
            </Link>
        </div>
    )
}

export default FirstPage;