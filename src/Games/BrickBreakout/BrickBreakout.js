import React from 'react'
import Board from './Board'
import './BrickBreakout.css'
import Game from "../pause_resume"

export default function BrickBreakout() {
    return (
        <div className='BBContainer'>
            <div>
                <Board />
            </div>
            <Game/>
        </div>
    )
}
