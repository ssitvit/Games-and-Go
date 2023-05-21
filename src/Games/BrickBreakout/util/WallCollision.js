import React from 'react'

export default function WallCollision(ballObj, canvas) {
    
    if(
        ballObj.y - ballObj.rad <= 0 ||
        ballObj.y + ballObj.rad >= canvas.height
        ) {
            ballObj.dy *= -1; // to prevent the ball going out of the top and bottom boundaries
    }
    if(
        ballObj.x - ballObj.rad <= 0 ||
        ballObj.x + ballObj.rad >= canvas.width
        ) {
            ballObj.dx *= -1; // to prevent the ball going out of the top and bottom boundaries
    }
}
