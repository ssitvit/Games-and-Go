import React from 'react'

export default function PaddleHit(ballObj, paddleProps) {
    if (
        ballObj.x < paddleProps.x + paddleProps.width &&
        ballObj.x > paddleProps.x &&
        paddleProps.y < paddleProps.y + paddleProps.height &&
        ballObj.y + ballObj.rad > paddleProps.y - paddleProps.height / 2
    ) {
        // check where the ball hit the paddleProps
        let collidePoint = ballObj.x - (paddleProps.x + paddleProps.width / 2);

        // normalize the values
        collidePoint = collidePoint / (paddleProps.width / 2);

        // calculate the angle of the ballObj
        let angle = (collidePoint * Math.PI) / 3;
        // console.log(angle);

        ballObj.dx = ballObj.speed * Math.sin(angle);
        ballObj.dy = -ballObj.speed * Math.cos(angle);
    }
}
