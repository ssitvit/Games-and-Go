/**
 * Eight Queens chess game
 * Status box
 */
import React, { Component } from 'react';
import './Status.css';

class Status extends Component {
    render() {
        const numberQueensNeeded = 8 - this.props.queensOnBoard;
        let gameStatus = numberQueensNeeded + ' Queen';
        if (numberQueensNeeded > 1) {
            gameStatus += 's';
        }
        gameStatus += ' needed';

        let statusClass = 'EightQueens-playing';

        if (!numberQueensNeeded) {
            gameStatus = 'Not Solved';
            statusClass = 'EightQueens-not';
        }

        if (this.props.queensOnBoard === 8 && this.props.queensUnderAttack === 0) {
            gameStatus = '😃 SOLVED! YOU WIN';
            statusClass = 'EightQueens-win';
        }

        return (
            <div className="EightQueens-status">
                <b>{this.props.queensOnBoard}</b> Queens on board
                <br />
                <b>{this.props.queensUnderAttack}</b> Queens attacked
                <br />
                <div className={statusClass}>{gameStatus}</div>
            </div>
        );
    }
}

export default Status;
