import React from 'react'

export default function WallCollision(ballObj, canvas, player, paddleProps) {
    
    if (ballObj.y + ballObj.rad > canvas.height){
        player.lives--; // update lives
        ballObj.x = paddleProps.x ;
        ballObj.y = paddleProps.y - 30;
        ballObj.dx = 6 * (Math.random() * 2 - 1);
        ballObj.dy = -6;
        // ballObj.dy *= -1;
    }
    if(
        ballObj.y - ballObj.rad < 0
        ) {
            ballObj.dy *= -1; // to prevent the ball going out of the top and bottom boundaries
    }
    if(
        ballObj.x - ballObj.rad < 0 ||
        ballObj.x + ballObj.rad > canvas.width
        ) {
            ballObj.dx *= -1; // to prevent the ball going out of the top and bottom boundaries
    }
}
