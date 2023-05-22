import React from 'react'
import data from '../BBdata';
import ResetBall from './ResetBall';

export default function AllBroke(bricks, player, canvas, ballObj) {
    let { brickObj, paddleProps } = data;
    let total = 0;
    for (let i = 0; i < bricks.length; i++) {
        if (bricks[i].broke === true) {
            total++ ;
        }
    }
    if (total === bricks.length) {
        // alert('All broken');
        player.level++ ;
        ResetBall(ballObj, canvas, paddleProps);
        brickObj.y = 50;
    }
}
