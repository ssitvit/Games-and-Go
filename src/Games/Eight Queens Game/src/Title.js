/**
 * Eight Queens chess game
 * Title box
 */
import React, { Component } from 'react';
import './Title.css';

class Title extends Component {
    render() {
        return (
            <div className="EightQueens-title">
                <a
                    href={this.props.gameHome}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {this.props.gameName}
                    <br />
                    <small>
                        v{this.props.gameVersion}
                    </small>
                </a>
            </div>
        );
    }
}

export default Title;
